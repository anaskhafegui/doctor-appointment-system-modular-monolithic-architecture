import { Injectable } from '@nestjs/common';
import { Appointment } from '../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../domain/appointment.repository.interface';

@Injectable()
export class AppointmentRepository implements AppointmentRepositoryInterface {
  private appointments: Appointment[] = [];
  private slots = [
    {
      id: 'slot1',
      time: new Date('2025-02-01T14:30:00.000Z'),
      isReserved: false,
    },
    {
      id: 'slot2',
      time: new Date('2025-02-01T15:30:00.000Z'),
      isReserved: false,
    },
  ];

  getAvailableSlots() {
    return this.slots.filter((slot) => !slot.isReserved);
  }

  bookAppointment(appointment: Appointment): Appointment {
    const slot = this.slots.find((slot) => slot.id === appointment.slotId);
    if (!slot || slot.isReserved) {
      throw new Error('Slot is unavailable or already reserved');
    }

    slot.isReserved = true;
    this.appointments.push(appointment);
    return appointment;
  }
}
