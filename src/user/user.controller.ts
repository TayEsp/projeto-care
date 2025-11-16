import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Usuario as UsuarioModel, Prisma } from 'generated/prisma';
import { CreateUser } from '../dto/create-user';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/:userEmail')
  async getUser(
    @Param('userEmail') userEmail: string,
  ): Promise<UsuarioModel | null> {
    return this.userService.user({ email: userEmail });
  }

  @Post('signup')
  async signupUser(@Body() userData: CreateUser): Promise<UsuarioModel> {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async updateUser(
    @Body() userId: Prisma.UsuarioWhereUniqueInput,
    userData: CreateUser,
  ): Promise<UsuarioModel> {
    return this.userService.updateUser({ where: userId, data: userData });
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<UsuarioModel> {
    return this.userService.deleteUser({ id: userId });
  }
}
