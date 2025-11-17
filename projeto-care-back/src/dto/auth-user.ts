import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class AuthUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(8, 20)
  senha: string;
}
