import { Module } from '@nestjs/common';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { DoctorAvailabilityModule } from '../doctor-availability/doctor-availability.module';
import { SlotServiceAdapter } from './adapters/slot-service.adapter';
import { AppointmentBookingController } from './api/appointment-booking.controller';
import { GetAvailableSlotsUseCase } from './application//use-cases/get-available-slots.use-case';
import { BookAppointmentUseCase } from './application/use-cases/book-appointment.use-case';
import { AppointmentRepository } from './infrastructure/appointment.repository';
@Module({
  imports: [DoctorAvailabilityModule, EventEmitterModule.forRoot()],
  controllers: [AppointmentBookingController],
  providers: [
    BookAppointmentUseCase,
    GetAvailableSlotsUseCase,
    {
      provide: 'AppointmentRepositoryInterface', // Bind interface to implementation
      useClass: AppointmentRepository,
    },
    {
      provide: 'SlotServiceInterface',
      useClass: SlotServiceAdapter, // Use the adapter directly
    },
  ],
})
export class AppointmentBookingModule {}
