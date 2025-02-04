import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailabilityService } from '../../doctor-availability.service';
import { CreateSlotDto } from '../../dto/create-slot.dto';
import { Slot } from '../../entities/slot.entity';
import { SlotRepository } from '../../slot.repository';

describe('DoctorAvailabilityService', () => {
  let service: DoctorAvailabilityService;
  let repository: SlotRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorAvailabilityService,
        {
          provide: SlotRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DoctorAvailabilityService>(DoctorAvailabilityService);
    repository = module.get<SlotRepository>(SlotRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllSlots', () => {
    it('should return all slots', () => {
      const slots: Slot[] = [
        {
          id: '1',
          time: new Date(),
          doctorId: 'doc1',
          doctorName: 'Dr. Smith',
          isReserved: false,
          cost: 100,
        },
        {
          id: '2',
          time: new Date(),
          doctorId: 'doc2',
          doctorName: 'Dr. John',
          isReserved: true,
          cost: 200,
        },
      ];
      jest.spyOn(repository, 'findAll').mockReturnValue(slots);

      expect(service.getAllSlots()).toEqual(slots);
    });

    it('should return available slots if isAvailable is true', () => {
      const slots: Slot[] = [
        {
          id: '1',
          time: new Date(),
          doctorId: 'doc1',
          doctorName: 'Dr. Smith',
          isReserved: false,
          cost: 100,
        },
        {
          id: '2',
          time: new Date(),
          doctorId: 'doc2',
          doctorName: 'Dr. John',
          isReserved: true,
          cost: 200,
        },
      ];
      jest.spyOn(repository, 'findAll').mockReturnValue([slots[0]]);

      expect(service.getAllSlots(true)).toEqual([slots[0]]);
    });
  });

  describe('createSlot', () => {
    it('should create a new slot', () => {
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
      jest.spyOn(repository, 'create').mockReturnValue(newSlot);

      expect(service.createSlot(createSlotDto)).toEqual(newSlot);
    });
  });

  describe('reserveSlot', () => {
    it('should reserve a slot', () => {
      const slot: Slot = {
        id: '1',
        time: new Date(),
        doctorId: 'doc1',
        doctorName: 'Dr. Smith',
        isReserved: false,
        cost: 100,
      };
      jest.spyOn(repository, 'findById').mockReturnValue(slot);
      jest
        .spyOn(repository, 'update')
        .mockReturnValue({ ...slot, isReserved: true });

      expect(service.reserveSlot('1')).toEqual({ ...slot, isReserved: true });
    });

    it('should throw an error if slot is not found', () => {
      jest.spyOn(repository, 'findById').mockReturnValue(undefined);

      expect(() => service.reserveSlot('1')).toThrow('Slot not found.');
    });

    it('should throw an error if slot is already reserved', () => {
      const slot: Slot = {
        id: '1',
        time: new Date(),
        doctorId: 'doc1',
        doctorName: 'Dr. Smith',
        isReserved: true,
        cost: 100,
      };
      jest.spyOn(repository, 'findById').mockReturnValue(slot);

      expect(() => service.reserveSlot('1')).toThrow(
        'Slot is already reserved.',
      );
    });
  });

  describe('deleteSlot', () => {
    it('should delete a slot', () => {
      jest.spyOn(repository, 'delete').mockImplementation();

      expect(() => service.deleteSlot('1')).not.toThrow();
    });
  });
});
