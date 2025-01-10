import { Module } from '@nestjs/common';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';
import { AppointmentBookingModule } from './appointment-booking/appointment-booking.module';

@Module({
  imports: [DoctorAvailabilityModule, AppointmentBookingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
