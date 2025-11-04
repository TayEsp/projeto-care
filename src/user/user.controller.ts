import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Usuario as UsuarioModel, Prisma } from 'generated/prisma';
import { CreateUser } from '../dto/create-user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(
    @Body() userId: Prisma.UsuarioWhereUniqueInput,
  ): Promise<UsuarioModel | null> {
    return this.userService.user(userId);
  }

  @Post('signup')
  async signupUser(@Body() userData: CreateUser): Promise<UsuarioModel> {
    return this.userService.createUser(userData);
  }

  @Put('update')
  async updateUser(
    @Body() userId: Prisma.UsuarioWhereUniqueInput,
    userData: CreateUser,
  ): Promise<UsuarioModel> {
    return this.userService.updateUser({ where: userId, data: userData });
  }

  @Delete('delete')
  async deleteUser(
    @Body() userId: Prisma.UsuarioWhereUniqueInput,
  ): Promise<UsuarioModel> {
    return this.userService.deleteUser(userId);
  }
}
