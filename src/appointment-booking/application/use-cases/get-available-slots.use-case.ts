import { Inject, Injectable } from '@nestjs/common';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';
@Injectable()
export class GetAvailableSlotsUseCase {
  constructor(
    @Inject('AppointmentRepositoryInterface')
    private repository: AppointmentRepositoryInterface,
  ) {}

  execute() {
    return this.repository.getAvailableSlots();
  }
}
