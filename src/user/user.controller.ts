import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUser } from '../dto/create-user';

@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async getHello(@Body() body: CreateUser) {
    const { nome, email, senha, dataNascimento, cpf } = body;

    const user = await this.prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        dataDeNascimento: new Date(dataNascimento).toISOString(),
        cpf,
        agendamento: {
          create: [],
        },
      },
    });

    return {
      user,
    };
  }
}
