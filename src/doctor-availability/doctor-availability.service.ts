import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Slot } from './entities/slot.entity';
import { SlotRepository } from './slot.repository';

@Injectable()
export class DoctorAvailabilityService {
  constructor(private readonly slotRepository: SlotRepository) {}

  getAllSlots(isAvailable?: boolean): Slot[] {
    return this.slotRepository.findAll(isAvailable);
  }

  createSlot(createSlotDto: CreateSlotDto): Slot {
    const newSlot: Slot = {
      ...createSlotDto,
      id: crypto.randomUUID(),
      isReserved: false,
      time: new Date(),
    };
    return this.slotRepository.create(newSlot);
  }

  reserveSlot(id: string): Slot {
    const slot = this.slotRepository.findById(id);
    if (!slot) {
      throw new Error('Slot not found.');
    }
    if (slot.isReserved) {
      throw new Error('Slot is already reserved.');
    }
    return this.slotRepository.update(id, { isReserved: true });
  }

  deleteSlot(id: string): void {
    this.slotRepository.delete(id);
  }
}
