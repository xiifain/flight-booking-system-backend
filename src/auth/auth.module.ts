import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Profile } from './profile.entity';
import { JwtStrategy } from './jwt.strategy';

dotenv.config();

const passportOptions = PassportModule.register({
  defaultStrategy: 'jwt',
  property: 'user',
  session: false,
});

const jwtOptions = JwtModule.register({
  secret: process.env.SECRET_KEY,
  signOptions: {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  },
});

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), jwtOptions, passportOptions],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
