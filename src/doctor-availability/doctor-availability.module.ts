import { Module } from '@nestjs/common';
import { DoctorAvailabilityController } from './doctor-availability.controller';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { SlotRepository } from './slot.repository';
@Module({
  controllers: [DoctorAvailabilityController],
  providers: [DoctorAvailabilityService, SlotRepository],
  exports: [DoctorAvailabilityService],
})
export class DoctorAvailabilityModule {}
