import { Injectable } from '@nestjs/common';
import { Slot } from './entities/slot.entity';

@Injectable()
export class SlotRepository {
  private slots: Slot[] = [
    {
      id: 'dummy-slot-id',
      isReserved: false,
      time: new Date('2025-01-12T16:05:37.381Z'),
      doctorId: 'dummy-doctor-id',
      doctorName: 'Anas',
      cost: 1000,
    },

    {
      id: 'slot1',
      time: new Date('2025-02-01T14:30:00.000Z'),
      isReserved: true,
      doctorId: 'dummy-doctor-id',
      doctorName: 'Anas',
      cost: 1000,
    },
    {
      id: 'slot2',
      time: new Date('2025-02-01T15:30:00.000Z'),
      isReserved: false,
      doctorId: 'dummy-doctor-id',
      doctorName: 'Anas',
      cost: 1000,
    },
  ];

  findAll(isAvailable?: boolean): Slot[] {
    if (!isAvailable) {
      return this.slots;
    }
    return this.slots.filter((slot) => slot.isReserved !== isAvailable);
  }

  findById(id: string): Slot | undefined {
    return this.slots.find((slot) => slot.id === id);
  }

  create(slot: Slot): Slot {
    this.slots.push(slot);
    return slot;
  }

  update(id: string, updatedSlot: Partial<Slot>): Slot | undefined {
    const slot = this.findById(id);
    if (!slot) return undefined;
    Object.assign(slot, updatedSlot);
    return slot;
  }

  delete(id: string): void {
    this.slots = this.slots.filter((slot) => slot.id !== id);
  }
}
