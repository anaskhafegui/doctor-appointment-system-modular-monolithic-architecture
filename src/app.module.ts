import { Module } from '@nestjs/common';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';
import { AppointmentConfirmationModule } from './appointment-confirmation/appointment-confirmation.module';

@Module({
  imports: [DoctorAvailabilityModule, AppointmentConfirmationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
