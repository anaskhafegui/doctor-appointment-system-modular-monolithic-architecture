import { Test, TestingModule } from '@nestjs/testing';
import { SlotServiceInterface } from '../../contracts/slot.service.interface';
import { Slot } from '../../domain/slot.entity';
import { GetAvailableSlotsUseCase } from './get-available-slots.use-case';

describe('GetAvailableSlotsUseCase', () => {
  let useCase: GetAvailableSlotsUseCase;
  let slotService: SlotServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAvailableSlotsUseCase,
        {
          provide: 'SlotServiceInterface',
          useValue: {
            getAvailableSlots: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetAvailableSlotsUseCase>(GetAvailableSlotsUseCase);
    slotService = module.get<SlotServiceInterface>('SlotServiceInterface');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return available slots', () => {
      const slots: Slot[] = [
        {
          id: '1',
          isReserved: false,
          time: undefined,
          doctorId: '',
          doctorName: '',
          cost: 0,
        },
        {
          id: '2',
          isReserved: false,
          time: undefined,
          doctorId: '',
          doctorName: '',
          cost: 0,
        },
      ];
      jest.spyOn(slotService, 'getAvailableSlots').mockReturnValue(slots);

      const result = useCase.execute();

      expect(result).toEqual(slots);
      expect(slotService.getAvailableSlots).toHaveBeenCalledWith(true);
    });
  });
});
