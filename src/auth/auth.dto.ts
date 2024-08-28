import { IsNotEmpty, IsString, IsEmail, IsDate, IsOptional } from 'class-validator';
import { TrimTransformer } from 'src/utils/custom-transformers';

export class JwtPayload {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  userName?: string;

  @IsNotEmpty()
  @IsEmail()
  firstName: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  sub: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @TrimTransformer()
  identifier: string;

  @IsNotEmpty()
  @IsString()
  @TrimTransformer()
  password: string;
}

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @TrimTransformer()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @TrimTransformer()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @TrimTransformer()
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  @TrimTransformer()
  email: string;

  @IsNotEmpty()
  @IsString()
  @TrimTransformer()
  password: string;
}

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
