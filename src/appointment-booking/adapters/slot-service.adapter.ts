import { Injectable } from '@nestjs/common';
import { Slot } from '../../doctor-availability/entities/slot.entity';
import { SlotFacade } from '../../doctor-availability/facade/slot.facade';
import { SlotServiceInterface } from '../contracts/slot.service.interface';

@Injectable()
export class SlotServiceAdapter implements SlotServiceInterface {
  constructor(private readonly slotService: SlotFacade) {}

  getAvailableSlots(): Slot[] {
    return this.slotService.getAvailableSlots();
  }

  reserveSlot(slotId: string): void {
    this.slotService.reserveSlot(slotId);
  }
}
