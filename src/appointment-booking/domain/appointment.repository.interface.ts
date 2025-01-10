import { Appointment } from './appointment.entity';

export interface AppointmentRepositoryInterface {
  getAvailableSlots(): { id: string; time: Date; isReserved: boolean }[];
  bookAppointment(appointment: Appointment): Appointment;
}
