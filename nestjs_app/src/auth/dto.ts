import { IsString, IsEmail } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignupDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
