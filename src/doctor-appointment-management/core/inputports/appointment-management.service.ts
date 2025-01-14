import { Inject, Injectable } from '@nestjs/common';
import { Appointment } from '../domain/appointment.entity';
import { AppointmentManagementInterface } from '../outputports/appointment-management.interface';

@Injectable()
export class AppointmentManagementService {
  constructor(
    @Inject('AppointmentManagementInterface')
    private readonly appointmentManagementAdapter: AppointmentManagementInterface,
  ) {}

  viewAppointments(): Appointment[] {
    return this.appointmentManagementAdapter.getUpcomingAppointments();
  }

  cancelAppointment(id: string): Appointment {
    return this.appointmentManagementAdapter.cancelAppointment(id);
  }

  completeAppointment(id: string): Appointment {
    return this.appointmentManagementAdapter.completedAppointment(id);
  }
}
