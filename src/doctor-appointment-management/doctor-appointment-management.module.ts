import { Module } from '@nestjs/common';
import { AppointmentManagementService } from './core/application/appointment-management.service';
import { AppointmentRepository } from './shell/infrastructure/appointment.repository';
import { DoctorAppointmentManagementController } from './shell/interfaces/doctor-appointment-management.controller';

@Module({
  providers: [
    AppointmentManagementService,
    {
      provide: 'AppointmentRepositoryInterface',
      useClass: AppointmentRepository,
    },
  ],
  controllers: [DoctorAppointmentManagementController],
  exports: [AppointmentManagementService],
})
export class DoctorAppointmentManagementModule {}
