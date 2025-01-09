import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailabilityController } from './doctor-availability.controller';
import { DoctorAvailabilityService } from './doctor-availability.service';

describe('DoctorAvailabilityController', () => {
  let controller: DoctorAvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorAvailabilityService],
      controllers: [DoctorAvailabilityController],
    }).compile();

    controller = module.get<DoctorAvailabilityController>(
      DoctorAvailabilityController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
