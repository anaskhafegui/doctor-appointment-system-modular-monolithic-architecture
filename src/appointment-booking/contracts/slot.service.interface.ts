import { Slot } from '../domain/slot.entity';

export interface SlotServiceInterface {
  getAvailableSlots(isAvailable?: boolean): Slot[];
  reserveSlot(slotId: string): void;
}
