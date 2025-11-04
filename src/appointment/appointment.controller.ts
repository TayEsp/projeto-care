import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Agendamento as AgendamentoModel, Prisma } from 'generated/prisma';
import { CreateAppointment } from '../dto/create-appointment';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async getAppointment(
    @Body() appointmentId: Prisma.AgendamentoWhereUniqueInput,
  ): Promise<AgendamentoModel | null> {
    return this.appointmentService.appointment(appointmentId);
  }

  @Post('create')
  async createpAppointment(
    @Body() postData: CreateAppointment,
  ): Promise<AgendamentoModel> {
    const { data, observacoes, ExameId, UsuarioId } = postData;
    return this.appointmentService.createAppointment({
      data,
      observacoes,
      Exame: {
        connect: { id: ExameId },
      },
      Usuario: {
        connect: { id: UsuarioId },
      },
    });
  }

  @Put('update')
  async updateAppointment(
    @Body() appointmentId: Prisma.AgendamentoWhereUniqueInput,
    appointmentData: CreateAppointment,
  ): Promise<AgendamentoModel> {
    return this.appointmentService.updateAppointment({
      where: appointmentId,
      data: appointmentData,
    });
  }

  @Delete('delete')
  async deleteAppointment(
    @Body() appointmentId: Prisma.AgendamentoWhereUniqueInput,
  ): Promise<AgendamentoModel> {
    return this.appointmentService.deleteAppointment(appointmentId);
  }
}
