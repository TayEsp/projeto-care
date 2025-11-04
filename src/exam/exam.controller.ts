import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { ExamService } from './exam.service';
import { Exame as ExameModel, Prisma } from 'generated/prisma';
import { CreateExame } from 'src/dto/create-exam';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  async getExam(
    @Body() exameId: Prisma.ExameWhereUniqueInput,
  ): Promise<ExameModel | null> {
    return this.examService.exam(exameId);
  }

  @Get('listExams')
  async listExams(): Promise<ExameModel[]> {
    return this.examService.exams({});
  }

  @Post('create')
  async createExam(@Body() examData: CreateExame): Promise<ExameModel> {
    return this.examService.createExam(examData);
  }

  @Put('update')
  async updateExam(
    @Body() exameId: Prisma.ExameWhereUniqueInput,
    examData: CreateExame,
  ): Promise<ExameModel> {
    return this.examService.updateExam({ where: exameId, data: examData });
  }

  @Delete('delete')
  async deleteExam(
    @Body() exameId: Prisma.ExameWhereUniqueInput,
  ): Promise<ExameModel> {
    return this.examService.deleteExam(exameId);
  }
}
