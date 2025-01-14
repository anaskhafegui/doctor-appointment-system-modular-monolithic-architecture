import { Appointment } from '../domain/appointment.entity';

export interface AppointmentManagementInterface {
  getUpcomingAppointments(): Appointment[];
  completedAppointment(appointmentId: string): Appointment;
  cancelAppointment(appointmentId: string): Appointment;
}
