import { Appointment } from './appointment.entity';

export interface AppointmentRepositoryInterface {
  bookAppointment(appointment: Appointment): Appointment;
  getAll(status: string): Appointment[];
  findById(appointmentId: string): Appointment;
  save(appointment: Appointment): Appointment;
}
