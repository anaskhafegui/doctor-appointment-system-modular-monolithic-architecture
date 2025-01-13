import { Injectable } from '@nestjs/common';
import { DoctorAvailabilityService } from '../doctor-availability.service';
import { Slot } from '../entities/slot.entity';
@Injectable()
export class SlotFacade {
  constructor(private readonly slotService: DoctorAvailabilityService) {}

  getAvailableSlots(): Slot[] {
    return this.slotService.getAllSlots(true);
  }

  reserveSlot(slotId: string): void {
    this.slotService.reserveSlot(slotId);
  }
}
