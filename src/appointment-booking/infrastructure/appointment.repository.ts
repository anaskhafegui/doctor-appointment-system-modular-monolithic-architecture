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

  getAll(status: string): Appointment[] | never {
    console.log('status', status);
    return this.appointments.filter(
      (appointment) => appointment.status === status,
    );
  }

  findById(appointmentId: string): Appointment {
    return this.appointments.find(
      (appointment) => appointment.id === appointmentId,
    );
  }

  save(appointment: Appointment): Appointment {
    const index = this.appointments.findIndex((a) => a.id === appointment.id);
    this.appointments[index] = appointment;
    return appointment;
  }
}
