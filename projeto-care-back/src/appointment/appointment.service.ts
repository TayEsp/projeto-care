import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Agendamento, Prisma } from '../../generated/prisma';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async appointment(
    appointmentWhereUniqueInput: Prisma.AgendamentoWhereUniqueInput,
  ): Promise<Agendamento | null> {
    return this.prisma.agendamento.findUnique({
      where: appointmentWhereUniqueInput,
    });
  }

  async createAppointment(
    data: Prisma.AgendamentoCreateInput,
  ): Promise<Agendamento> {
    return this.prisma.agendamento.create({
      data: {
        ...data,
        data: new Date(data.data).toISOString(),
      },
    });
  }

  async appointments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AgendamentoWhereUniqueInput;
    where?: Prisma.AgendamentoWhereInput;
    orderBy?: Prisma.AgendamentoOrderByWithRelationInput;
  }): Promise<Agendamento[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.agendamento.findMany({
      include: {
        Usuario: true,
        Exame: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateAppointment(params: {
    where: Prisma.AgendamentoWhereUniqueInput;
    data: Prisma.AgendamentoUpdateInput;
  }): Promise<Agendamento> {
    const { where, data } = params;
    return this.prisma.agendamento.update({
      data,
      where,
    });
  }

  async deleteAppointment(
    where: Prisma.AgendamentoWhereUniqueInput,
  ): Promise<Agendamento> {
    return this.prisma.agendamento.delete({
      where,
    });
  }
}
