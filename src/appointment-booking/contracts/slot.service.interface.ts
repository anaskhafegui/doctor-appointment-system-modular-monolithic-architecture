import { Slot } from '../domain/slot.entity';

export interface SlotServiceInterface {
  getAvailableSlots(): Slot[];
  reserveSlot(slotId: string): void;
}
