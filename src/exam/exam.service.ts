import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Exame, Prisma } from '../../generated/prisma';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async exam(
    examWhereUniqueInput: Prisma.ExameWhereUniqueInput,
  ): Promise<Exame | null> {
    return this.prisma.exame.findUnique({
      where: examWhereUniqueInput,
    });
  }

  async createExam(data: Prisma.ExameCreateInput): Promise<Exame> {
    return await this.prisma.exame.create({
      data,
    });
  }

  async exams(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ExameWhereUniqueInput;
    where?: Prisma.ExameWhereInput;
    orderBy?: Prisma.ExameOrderByWithRelationInput;
  }): Promise<Exame[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.exame.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateExam(params: {
    where: Prisma.ExameWhereUniqueInput;
    data: Prisma.ExameUpdateInput;
  }): Promise<Exame> {
    const { where, data } = params;
    return await this.prisma.exame.update({
      data,
      where,
    });
  }

  async deleteExam(where: Prisma.ExameWhereUniqueInput): Promise<Exame> {
    return await this.prisma.exame.delete({
      where,
    });
  }
}
