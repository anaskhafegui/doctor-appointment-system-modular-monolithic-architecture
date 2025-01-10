import { Module } from '@nestjs/common';

import { GetAvailableSlotsUseCase } from './application//use-cases/get-available-slots.use-case';
import { BookAppointmentUseCase } from './application/use-cases/book-appointment.use-case';
import { AppointmentRepository } from './infrastructure/appointment.repository';
import { AppointmentBookingController } from './interfaces/appointment-booking.controller';
@Module({
  controllers: [AppointmentBookingController],
  providers: [
    BookAppointmentUseCase,
    GetAvailableSlotsUseCase,
    {
      provide: 'AppointmentRepositoryInterface', // Bind interface to implementation
      useClass: AppointmentRepository,
    },
  ],
})
export class AppointmentBookingModule {}
