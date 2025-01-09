import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';

@Injectable()
export class DoctorAvailabilityService {
  private slots = [];

  getAllSlots() {
    return this.slots.filter((slot) => !slot.isReserved);
  }

  createSlot(createSlotDto: CreateSlotDto) {
    const newSlot = {
      ...createSlotDto,
      id: crypto.randomUUID(),
      isReserved: false,
    };
    this.slots.push(newSlot);
    return newSlot;
  }

  reserveSlot(id: string) {
    const slot = this.slots.find((slot) => slot.id === id);
    if (!slot || slot.isReserved) throw new Error('Slot unavailable');
    slot.isReserved = true;
    return slot;
  }

  deleteSlot(id: string) {
    this.slots = this.slots.filter((slot) => slot.id !== id);
  }
}
