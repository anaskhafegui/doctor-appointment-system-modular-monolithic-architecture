import { Appointment } from './appointment.entity';

export interface AppointmentRepositoryInterface {
  bookAppointment(appointment: Appointment): Appointment;
}
