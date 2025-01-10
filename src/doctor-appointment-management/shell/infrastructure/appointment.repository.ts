import { Injectable } from '@nestjs/common';
import { AppointmentRepositoryInterface } from '../../core/contracts/appointment.repository.interface';
import { Appointment } from '../../core/domain/appointment.entity';

@Injectable()
export class AppointmentRepository implements AppointmentRepositoryInterface {
  private appointments: Appointment[] = [];

  findAll(): Appointment[] {
    return this.appointments;
  }

  findById(id: string): Appointment | undefined {
    return this.appointments.find((app) => app.id === id);
  }

  save(appointment: Appointment): void {
    const index = this.appointments.findIndex(
      (app) => app.id === appointment.id,
    );
    if (index > -1) {
      this.appointments[index] = appointment;
    } else {
      this.appointments.push(appointment);
    }
  }
}
