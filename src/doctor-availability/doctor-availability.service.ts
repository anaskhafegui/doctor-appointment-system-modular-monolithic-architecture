import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Slot } from './entities/slot.entity';
import { SlotRepository } from './slot.repository';

@Injectable()
export class DoctorAvailabilityService {
  constructor(private readonly slotRepository: SlotRepository) {}

  getAllSlots() {
    return this.slotRepository.findAll();
  }

  createSlot(createSlotDto: CreateSlotDto): Slot {
    const newSlot: Slot = {
      ...createSlotDto,
      id: crypto.randomUUID(),
      isReserved: false,
    };
    return this.slotRepository.create(newSlot);
  }

  reserveSlot(id: string): Slot {
    const slot = this.slotRepository.findById(id);
    if (!slot || slot.isReserved) throw new Error('Slot unavailable');
    return this.slotRepository.update(id, { isReserved: true });
  }

  deleteSlot(id: string): void {
    this.slotRepository.delete(id);
  }
}
