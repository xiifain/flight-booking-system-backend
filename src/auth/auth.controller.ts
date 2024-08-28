import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, MessageDto, RegisterDto, TokenDto } from './auth.dto';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';

import * as dotenv from 'dotenv';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from './profile.entity';
import { RolesGuard } from 'src/utils/role.guard';

dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
);

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: MessageDto,
  })
  async register(@Body() dto: RegisterDto): Promise<MessageDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiBadRequestResponse({
    description: 'Invalid credentials',
    type: MessageDto,
  })
  async login(@Body() dto: LoginDto): Promise<TokenDto> {
    return this.authService.login(dto);
  }

  @Get('me')
  @Roles(Role.GENERAL_USER)
  @UseGuards(RolesGuard)
  async me(@Req() req: Request) {
    return req.user;
  }

  @Post('google/login')
  @HttpCode(200)
  async googleRedirect(@Req() req: Request) {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens

    const data = await this.getGoogleProfile(tokens.id_token);

    return this.authService.googleLogin(data);
  }

  private async getGoogleProfile(idToken: string) {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    return ticket.getPayload();
  }
}
