import { Appointment } from '../domain/appointment.entity';

export interface AppointmentRepositoryInterface {
  findAll(): Appointment[];
  findById(id: string): Appointment | undefined;
  save(appointment: Appointment): void;
}
