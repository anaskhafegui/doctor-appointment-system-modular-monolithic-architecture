import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailabilityService } from './doctor-availability.service';

describe('DoctorAvailabilityService', () => {
  let service: DoctorAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorAvailabilityService],
    }).compile();

    service = module.get<DoctorAvailabilityService>(DoctorAvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
