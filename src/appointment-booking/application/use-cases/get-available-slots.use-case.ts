import { Inject, Injectable } from '@nestjs/common';
import { SlotServiceInterface } from '../../contracts/slot.service.interface';
import { Slot } from '../../domain/slot.entity';
@Injectable()
export class GetAvailableSlotsUseCase {
  constructor(
    @Inject('SlotServiceInterface')
    private readonly slotService: SlotServiceInterface,
  ) {}

  execute(): Slot[] {
    return this.slotService.getAvailableSlots(true);
  }
}
