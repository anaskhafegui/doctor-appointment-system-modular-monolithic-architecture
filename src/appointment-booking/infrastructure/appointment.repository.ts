import { Injectable } from '@nestjs/common';
import { Appointment } from '../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../domain/appointment.repository.interface';

@Injectable()
export class AppointmentRepository implements AppointmentRepositoryInterface {
  private appointments: Appointment[] = [];

  bookAppointment(appointment: Appointment): Appointment {
    this.appointments.push(appointment);
    return appointment;
  }
}
