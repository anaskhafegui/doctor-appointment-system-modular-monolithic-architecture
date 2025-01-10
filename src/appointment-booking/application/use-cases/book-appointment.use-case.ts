import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Appointment } from '../../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';

@Injectable()
export class BookAppointmentUseCase {
  constructor(
    @Inject('AppointmentRepositoryInterface')
    private repository: AppointmentRepositoryInterface,
    private readonly eventEmitter: EventEmitter2,
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
    const appointmentDetails = new Appointment(
      appointmentDto.id,
      appointmentDto.slotId,
      appointmentDto.patientId,
      appointmentDto.patientName,
      new Date(appointmentDto.reservedAt),
    );

    // Emit confirmation event
    this.eventEmitter.emit('appointment.booked', appointmentDetails);

    // Save to the repository
    return this.repository.bookAppointment(appointmentDetails);
  }
}
