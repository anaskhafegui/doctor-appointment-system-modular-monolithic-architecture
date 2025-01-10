import { Inject, Injectable } from '@nestjs/common';
import { AppointmentRepositoryInterface } from '../contracts/appointment.repository.interface';
import { Appointment } from '../domain/appointment.entity';

@Injectable()
export class AppointmentManagementService {
  constructor(
    @Inject('AppointmentRepositoryInterface')
    private readonly repository: AppointmentRepositoryInterface,
  ) {}

  viewAppointments(): Appointment[] {
    return this.repository.findAll();
  }

  cancelAppointment(id: string): Appointment {
    const appointment = this.repository.findById(id);
    if (!appointment) {
      throw new Error('Appointment not found.');
    }

    appointment.cancel();
    this.repository.save(appointment);

    return appointment;
  }

  completeAppointment(id: string): Appointment {
    const appointment = this.repository.findById(id);
    if (!appointment) {
      throw new Error('Appointment not found.');
    }

    appointment.markAsCompleted();
    this.repository.save(appointment);

    return appointment;
  }
}
