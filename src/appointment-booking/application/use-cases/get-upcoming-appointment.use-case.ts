import { Inject } from '@nestjs/common';
import {
  Appointment,
  AppointmentStatus,
} from '../../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';
export class GetUpcomingAppointmentsUseCase {
  constructor(
    @Inject('AppointmentRepositoryInterface')
    private appointmentRepository: AppointmentRepositoryInterface,
  ) {}

  execute(): Appointment[] {
    return this.appointmentRepository.getAll(AppointmentStatus.UPCOMING);
  }
}
