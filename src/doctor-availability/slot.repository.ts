import { Injectable } from '@nestjs/common';
import { Slot } from './entities/slot.entity';

@Injectable()
export class SlotRepository {
  private slots: Slot[] = [
    {
      id: 'dummy-slot-id',
      isReserved: false,
      time: new Date(),
      doctorId: 'dummy-doctor-id',
      doctorName: 'Anas',
      cost: 1000,
    },
  ];

  findAll(): Slot[] {
    return this.slots.filter((slot) => !slot.isReserved);
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
