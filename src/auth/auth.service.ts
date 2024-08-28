import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtPayload, LoginDto, MessageDto, RegisterDto, TokenDto } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Profile } from './profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: +payload.sub },
      relations: { profile: true },
    });
    if (!user) throw new BadRequestException('Invalid token');

    return user;
  }

  async login(dto: LoginDto): Promise<TokenDto> {
    let user = await this.userRepository.findOne({
      where: { userName: dto.identifier },
      relations: { profile: true },
    });

    const profile = await this.profileRepository.findOneBy({ email: dto.identifier });

    if (!user && profile) {
      user = await this.userRepository.findOne({
        where: { profile: { id: profile.id }, type: UserType.APP },
        relations: { profile: true },
      });
    }

    if (!user) throw new BadRequestException('Invalid Credentials');

    const res = await this.comparePasswords(dto.password, user.password);
    if (!res) throw new BadRequestException('Invalid credentials');

    const payload: JwtPayload = {
      email: user.profile.email,
      firstName: user.profile.firstName,
      userName: user.userName,
      sub: user.id.toString(),
    };

    const token: TokenDto = await this.createJWTToken(payload);

    return token;
  }

  async register(dto: RegisterDto): Promise<MessageDto> {
    // Check if the username is already in use
    const user = await this.userRepository.findOne({
      where: { userName: dto.userName },
    });
    if (user) throw new BadRequestException('Username already in use');

    let profile = undefined;

    // need to check the profile email already exists
    profile = await this.profileRepository.findOneBy({ email: dto.email });

    if (!profile) {
      profile = await this.profileRepository.save(dto);
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    dto.password = await bcrypt.hash(dto.password, salt);

    try {
      await this.userRepository.save({
        ...dto,
        profile,
      });
    } catch (e) {
      throw new BadRequestException('Invalid data');
    }

    //TODO: Sends Verification Email

    return {
      message: 'successfully created the user',
    };
  }

  async googleLogin(data: any): Promise<TokenDto> {
    const user: { email: string; given_name: string; family_name: string; picture: string } = data;

    const existingProfile = await this.profileRepository.findOneBy({ email: user.email });

    // create profile from google response
    const newProfile = this.profileRepository.create({
      id: existingProfile?.id ?? undefined,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      image: user.picture,
    });

    const profile = await this.profileRepository.save(newProfile);

    const existingUser = await this.userRepository.findOne({
      where: { profile: { id: profile.id } },
    });

    const createdUser = await this.userRepository.save({
      id: existingUser?.id ?? undefined,
      profile,
      type: UserType.GOOGLE,
    });

    const payload: JwtPayload = {
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      sub: createdUser.id.toString(),
    };

    const token: TokenDto = await this.createJWTToken(payload);

    return token;
  }

  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private async createJWTToken(payload: JwtPayload): Promise<TokenDto> {
    const token = await this.jwtService.sign(payload);

    return {
      token,
      expiresAt: new Date(), //TODO: calculate expiration date
    };
  }
}
