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
    // Check if the slot exists and is not reserved
    const slot = this.repository
      .getAvailableSlots()
      .find((s) => s.id === appointmentDto.slotId);
    if (!slot || slot.isReserved) {
      throw new Error('Slot is unavailable or already reserved.');
    }

    // Create an appointment (validated in the entity)
    const appointment = new Appointment(
      appointmentDto.id,
      appointmentDto.slotId,
      appointmentDto.patientId,
      appointmentDto.patientName,
      new Date(appointmentDto.reservedAt),
    );

    // Save to the repository
    return this.repository.bookAppointment(appointment);
  }
}
