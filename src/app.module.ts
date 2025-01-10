import { Module } from '@nestjs/common';
import { AppointmentBookingModule } from './appointment-booking/appointment-booking.module';
import { AppointmentConfirmationModule } from './appointment-confirmation/appointment-confirmation.module';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';
import { DoctorAppointmentManagementModule } from './doctor-appointment-management/doctor-appointment-management.module';

@Module({
  imports: [
    DoctorAvailabilityModule,
    AppointmentConfirmationModule,
    AppointmentBookingModule,
    DoctorAppointmentManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
