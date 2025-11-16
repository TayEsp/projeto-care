import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Usuario, Prisma } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UsuarioWhereUniqueInput,
  ): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      include: {
        agendamento: true,
      },
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    const hashSenha = await bcrypt.hash(data.senha, 10);
    return await this.prisma.usuario.create({
      data: {
        ...data,
        dataDeNascimento: new Date(data.dataDeNascimento).toISOString(),
        senha: hashSenha,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UsuarioWhereUniqueInput;
    data: Prisma.UsuarioUpdateInput;
  }): Promise<Usuario> {
    const { where, data } = params;
    return await this.prisma.usuario.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UsuarioWhereUniqueInput): Promise<Usuario> {
    return await this.prisma.usuario.delete({
      where,
    });
  }
}
