import { Inject, Injectable } from '@nestjs/common';
import { Appointment } from '../../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';

@Injectable()
export class BookAppointmentUseCase {
  constructor(
    @Inject('AppointmentRepositoryInterface')
    private repository: AppointmentRepositoryInterface,
  ) {}

  execute(appointmentDto: any): Appointment {
    // Automatically validates upon instantiation
    const appointment = new Appointment(
      appointmentDto.id,
      appointmentDto.slotId,
      appointmentDto.patientId,
      appointmentDto.patientName,
      new Date(appointmentDto.reservedAt),
    );

    // Check if the slot is available
    const slot = this.repository
      .getAvailableSlots()
      .find((s) => s.id === appointment.slotId);
    if (!slot) {
      throw new Error('Slot is unavailable or already reserved.');
    }

    // Book the appointment
    return this.repository.bookAppointment(appointment);
  }
}
