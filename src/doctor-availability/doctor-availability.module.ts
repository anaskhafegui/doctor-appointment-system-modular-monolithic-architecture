import { Module } from '@nestjs/common';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { SlotRepository } from './slot.repository';
@Module({
  providers: [DoctorAvailabilityService, SlotRepository],
})
export class DoctorAvailabilityModule {}
