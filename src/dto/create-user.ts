import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  @Length(1, 40)
  nome: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(8, 20)
  senha: string;
  dataNascimento: string;
  @IsNotEmpty()
  @Length(1, 40)
  cpf: string;
}
