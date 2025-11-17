import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Agendamento as AgendamentoModel, Prisma } from 'generated/prisma';
import { CreateAppointment } from '../dto/create-appointment';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('listAppointments')
  async listAgendamento(): Promise<AgendamentoModel[]> {
    return this.appointmentService.appointments({});
  }

  @Get(':appointmentId')
  async getAppointment(
    @Param('appointmentId') appointmentId: string,
  ): Promise<AgendamentoModel | null> {
    return this.appointmentService.appointment({ id: appointmentId });
  }

  @Post('create')
  async createpAppointment(
    @Body() postData: CreateAppointment,
  ): Promise<AgendamentoModel | null> {
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

  @Delete('delete/:appointmentId')
  async deleteAppointment(
    @Param('appointmentId') appointmentId: string,
  ): Promise<AgendamentoModel> {
    return this.appointmentService.deleteAppointment({ id: appointmentId });
  }
}
