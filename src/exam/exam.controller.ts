import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { Exame as ExameModel, Prisma } from 'generated/prisma';
import { CreateExame } from 'src/dto/create-exam';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get('/:exameId')
  async getExam(@Param('exameId') exameId: string): Promise<ExameModel | null> {
    return this.examService.exam({ id: exameId });
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

  @Delete('delete/:exameId')
  async deleteExam(@Param('exameId') exameId: string): Promise<ExameModel> {
    return this.examService.deleteExam({ id: exameId });
  }
}
