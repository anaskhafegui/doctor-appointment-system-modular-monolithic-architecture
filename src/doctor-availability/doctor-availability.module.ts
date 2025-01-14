import { Module } from '@nestjs/common';
import { DoctorAvailabilityController } from './doctor-availability.controller';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { SlotFacade } from './facade/slot.facade';
import { SlotRepository } from './slot.repository';
@Module({
  controllers: [DoctorAvailabilityController],
  providers: [DoctorAvailabilityService, SlotRepository, SlotFacade],
  exports: [SlotFacade],
})
export class DoctorAvailabilityModule {}
