import { Injectable } from '@nestjs/common';
import { Appointment } from '../domain/appointment.entity';
import { CancelAppointmentUseCase } from './use-cases/cancel-appointment.use-case';
import { GetUpcomingAppointmentsUseCase } from './use-cases/get-upcoming-appointment.use-case';
import { MarkAsCompletedUseCase } from './use-cases/mark-as-completed.use-case';

@Injectable()
export class AppointmentBookingFacade {
  constructor(
    private readonly getUpcomingAppointmentsUseCase: GetUpcomingAppointmentsUseCase,
    private readonly markAsCompletedUseCase: MarkAsCompletedUseCase,
    private readonly cancelAppointmentUseCase: CancelAppointmentUseCase,
  ) {}

  getUpcomingAppointments(): Appointment[] {
    return this.getUpcomingAppointmentsUseCase.execute();
  }

  completeAppointment(appointmentId: string): Appointment {
    return this.markAsCompletedUseCase.execute(appointmentId);
  }

  cancelAppointment(appointmentId: string): Appointment {
    return this.cancelAppointmentUseCase.execute(appointmentId);
  }
}
