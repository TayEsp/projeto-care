import { IsNotEmpty, Length, IsEmail, IsDateString } from 'class-validator';
import { Prisma } from '../../generated/prisma';

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
  @IsNotEmpty()
  @IsDateString()
  dataDeNascimento: string;
  @IsNotEmpty()
  @Length(1, 40)
  cpf: string;
  agendamento: Prisma.AgendamentoCreateNestedManyWithoutUsuarioInput;
}
