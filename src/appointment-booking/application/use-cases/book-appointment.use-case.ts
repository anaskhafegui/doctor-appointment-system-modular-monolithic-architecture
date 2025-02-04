import { Inject, Injectable } from '@nestjs/common';
import { IEmitter } from '../../contracts/IEmitter';
import { SlotServiceInterface } from '../../contracts/slot.service.interface';
import { Appointment } from '../../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';

@Injectable()
export class BookAppointmentUseCase {
  constructor(
    @Inject('SlotServiceInterface')
    private readonly slotService: SlotServiceInterface,
    @Inject('AppointmentRepositoryInterface')
    private appointmentRepository: AppointmentRepositoryInterface,
    @Inject('IEmitter')
    private readonly eventEmitter: IEmitter,
  ) {}
  execute(
    slotId: string,
    patientDetails: { patientId: string; patientName: string },
  ): Appointment {
    // Check if the slot exists and is not reserved
    this.slotService.reserveSlot(slotId);
    // Create an appointment (validated in the entity)
    const appointmentDetails = new Appointment(
      crypto.randomUUID(),
      slotId,
      patientDetails.patientId,
      patientDetails.patientName,
      new Date(),
    );

    // Emit confirmation event
    this.eventEmitter.emit('appointment.booked', appointmentDetails);

    // Save to the repository
    return this.appointmentRepository.bookAppointment(appointmentDetails);
  }
}
