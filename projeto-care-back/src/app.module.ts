import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ExamModule } from './exam/exam.module';
import { AppointmentModule } from './appointment/appointment.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(__dirname, '../.env')],
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
    ExamModule,
    AppointmentModule,
  ],
})
export class AppModule {}
