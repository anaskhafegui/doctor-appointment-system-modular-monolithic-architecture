import { Module } from '@nestjs/common';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { DoctorAvailabilityModule } from '../doctor-availability/doctor-availability.module';
import { SlotServiceAdapter } from './adapters/slot-service.adapter';
import { AppointmentBookingController } from './api/appointment-booking.controller';
import { GetAvailableSlotsUseCase } from './application//use-cases/get-available-slots.use-case';
import { AppointmentBookingFacade } from './application/appointment-booking.facade';
import { BookAppointmentUseCase } from './application/use-cases/book-appointment.use-case';
import { CancelAppointmentUseCase } from './application/use-cases/cancel-appointment.use-case';
import { GetUpcomingAppointmentsUseCase } from './application/use-cases/get-upcoming-appointment.use-case';
import { MarkAsCompletedUseCase } from './application/use-cases/mark-as-completed.use-case';
import { AppointmentRepository } from './infrastructure/appointment.repository';
import { Emitter } from './infrastructure/Emitter';
@Module({
  imports: [DoctorAvailabilityModule, EventEmitterModule.forRoot()],
  controllers: [AppointmentBookingController],
  providers: [
    GetUpcomingAppointmentsUseCase,
    CancelAppointmentUseCase,
    MarkAsCompletedUseCase,
    BookAppointmentUseCase,
    GetAvailableSlotsUseCase,
    AppointmentBookingFacade,
    {
      provide: 'IEmitter', // Bind interface to implementation
      useClass: Emitter,
    },
    {
      provide: 'AppointmentRepositoryInterface', // Bind interface to implementation
      useClass: AppointmentRepository,
    },
    {
      provide: 'SlotServiceInterface',
      useClass: SlotServiceAdapter, // Use the adapter directly
    },
  ],
  exports: [
    AppointmentBookingFacade,
    GetUpcomingAppointmentsUseCase,
    MarkAsCompletedUseCase,
    CancelAppointmentUseCase,
  ],
})
export class AppointmentBookingModule {}
