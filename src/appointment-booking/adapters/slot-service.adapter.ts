import { Injectable } from '@nestjs/common';
import { DoctorAvailabilityService } from '../../doctor-availability/doctor-availability.service';
import { Slot } from '../../doctor-availability/entities/slot.entity';
import { SlotServiceInterface } from '../contracts/slot.service.interface';

@Injectable()
export class SlotServiceAdapter implements SlotServiceInterface {
  constructor(private readonly slotService: DoctorAvailabilityService) {}

  getAvailableSlots(isAvailable?: boolean): Slot[] {
    return this.slotService.getAllSlots(isAvailable);
  }

  reserveSlot(slotId: string): void {
    this.slotService.reserveSlot(slotId);
  }
}
