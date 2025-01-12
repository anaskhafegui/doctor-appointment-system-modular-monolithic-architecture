import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import * as crypto from 'crypto';
import { SlotServiceInterface } from '../../contracts/slot.service.interface';
import { Appointment } from '../../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';
import { BookAppointmentUseCase } from './book-appointment.use-case';

describe('BookAppointmentUseCase', () => {
  let useCase: BookAppointmentUseCase;
  let repository: AppointmentRepositoryInterface;
  let eventEmitter: EventEmitter2;
  let slotService: SlotServiceInterface;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookAppointmentUseCase,
        {
          provide: 'AppointmentRepositoryInterface',
          useValue: {
            bookAppointment: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: 'SlotServiceInterface',
          useValue: {
            reserveSlot: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<BookAppointmentUseCase>(BookAppointmentUseCase);
    repository = module.get<AppointmentRepositoryInterface>(
      'AppointmentRepositoryInterface',
    );
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    slotService = module.get<SlotServiceInterface>('SlotServiceInterface');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should book an appointment if slot is available', () => {
      const slotId = 'slot1';
      const id = crypto.randomUUID();
      const time = new Date();
      const patientDetails = {
        id,
        slotId,
        patientId: 'patient1',
        patientName: 'John Doe',
        reservedAt: time,
      };
      const appointmentDetails = new Appointment(
        id,
        slotId,
        patientDetails.patientId,
        patientDetails.patientName,
        time,
      );

      jest.spyOn(slotService, 'reserveSlot').mockImplementation();
      jest
        .spyOn(repository, 'bookAppointment')
        .mockReturnValue(appointmentDetails);

      const result = useCase.execute(slotId, patientDetails);

      expect(result).toBeInstanceOf(Appointment);
      expect(result.slotId).toBe(slotId);
      expect(result.patientId).toBe(patientDetails.patientId);
      expect(result.patientName).toBe(patientDetails.patientName);
      expect(eventEmitter.emit).toHaveBeenCalled();
      expect(repository.bookAppointment).toHaveBeenCalled();
    });

    it('should throw an error if slot is not available', () => {
      const slotId = 'slot1';
      const patientDetails = { patientId: 'patient1', patientName: 'John Doe' };

      jest.spyOn(slotService, 'reserveSlot').mockImplementation(() => {
        throw new Error('Slot not available');
      });

      expect(() => useCase.execute(slotId, patientDetails)).toThrow(
        'Slot not available',
      );
    });
  });
});
