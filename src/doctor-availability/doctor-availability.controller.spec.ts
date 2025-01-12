import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailabilityController } from './doctor-availability.controller';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Slot } from './entities/slot.entity';
import { SlotRepository } from './slot.repository';

describe('DoctorAvailabilityController', () => {
  let controller: DoctorAvailabilityController;
  let service: DoctorAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorAvailabilityController],
      providers: [
        SlotRepository,
        {
          provide: DoctorAvailabilityService,
          useValue: {
            getAllSlots: jest.fn(),
            createSlot: jest.fn(),
            reserveSlot: jest.fn(),
            deleteSlot: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DoctorAvailabilityController>(
      DoctorAvailabilityController,
    );
    service = module.get<DoctorAvailabilityService>(DoctorAvailabilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSlots', () => {
    it('should return all available slots', async () => {
      const slots: Slot[] = [
        {
          id: '1',
          time: new Date(),
          doctorId: 'doc1',
          doctorName: 'Dr. Smith',
          isReserved: false,
          cost: 100,
        },
      ];
      jest.spyOn(service, 'getAllSlots').mockReturnValue(slots);

      expect(controller.getAllSlots()).toEqual(slots);
    });
  });

  describe('createSlot', () => {
    it('should create a new slot', async () => {
      const createSlotDto: CreateSlotDto = {
        doctorId: 'doc1',
        doctorName: 'Dr. Smith',
        cost: 100,
      };
      const newSlot: Slot = {
        ...createSlotDto,
        id: 'uuid',
        isReserved: false,
        time: new Date(),
      };
      jest.spyOn(service, 'createSlot').mockReturnValue(newSlot);

      expect(controller.createSlot(createSlotDto)).toEqual(newSlot);
    });
  });

  describe('reserveSlot', () => {
    it('should reserve a slot', async () => {
      const slot: Slot = {
        id: '1',
        time: new Date(),
        doctorId: 'doc1',
        doctorName: 'Dr. Smith',
        isReserved: false,
        cost: 100,
      };
      const reservedSlot: Slot = { ...slot, isReserved: true };
      jest.spyOn(service, 'reserveSlot').mockReturnValue(reservedSlot);

      expect(controller.reserveSlot('1')).toEqual(reservedSlot);
    });
  });

  describe('deleteSlot', () => {
    it('should delete a slot', async () => {
      jest.spyOn(service, 'deleteSlot').mockImplementation();

      expect(() => controller.deleteSlot('1')).not.toThrow();
    });
  });
});
