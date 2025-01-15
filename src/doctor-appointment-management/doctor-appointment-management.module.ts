import { Module } from '@nestjs/common';
import { AppointmentBookingFacade } from '../appointment-booking/application/appointment-booking.facade';
import { AppointmentBookingModule } from '../appointment-booking/appointment-booking.module';
import { AppointmentManagementService } from './core/inputports/appointment-management.service';
import { AppointmentManagementAdapter } from './shell/infrastructure/appointment-management.adapter';
import { DoctorAppointmentManagementController } from './shell/interfaces/doctor-appointment-management.controller';

@Module({
  imports: [AppointmentBookingModule],
  providers: [
    AppointmentManagementService,
    AppointmentBookingFacade,
    {
      provide: 'AppointmentManagementInterface',
      useClass: AppointmentManagementAdapter,
    },
  ],
  controllers: [DoctorAppointmentManagementController],
  exports: [AppointmentManagementService],
})
export class DoctorAppointmentManagementModule {}
