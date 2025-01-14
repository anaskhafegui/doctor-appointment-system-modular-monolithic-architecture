import { Inject, Injectable } from '@nestjs/common';
import { Appointment } from '../../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';

@Injectable()
export class MarkAsCompletedUseCase {
  constructor(
    @Inject('AppointmentRepositoryInterface')
    private appointmentRepository: AppointmentRepositoryInterface,
  ) {}

  execute(appointmentId: string): Appointment {
    const appointment = this.appointmentRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found.');
    }

    appointment.markAsCompleted();
    this.appointmentRepository.save(appointment);

    return appointment;
  }
}
