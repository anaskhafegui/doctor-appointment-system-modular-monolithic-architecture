import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Appointment } from '../../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';
import { BookAppointmentUseCase } from './book-appointment.use-case';

describe('BookAppointmentUseCase', () => {
  let useCase: BookAppointmentUseCase;
  let repository: AppointmentRepositoryInterface;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookAppointmentUseCase,
        {
          provide: 'AppointmentRepositoryInterface',
          useValue: {
            getAvailableSlots: jest.fn(),
            bookAppointment: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<BookAppointmentUseCase>(BookAppointmentUseCase);
    repository = module.get<AppointmentRepositoryInterface>(
      'AppointmentRepositoryInterface',
    );
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should book an appointment if slot is available', () => {
      const slot = {
        id: 'slot1',
        isReserved: false,
        time: new Date('2025-02-01T14:30:00.000Z'),
      };
      const appointmentDto = {
        id: 'appointment1',
        slotId: 'slot1',
        patientId: 'patient1',
        patientName: 'John Doe',
        reservedAt: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours in the future
      };
      jest.spyOn(repository, 'getAvailableSlots').mockReturnValue([slot]);
      jest
        .spyOn(repository, 'bookAppointment')
        .mockImplementation((appointment) => appointment);

      const result = useCase.execute(appointmentDto);

      expect(result).toBeInstanceOf(Appointment);
      expect(result.id).toBe(appointmentDto.id);
      expect(result.slotId).toBe(appointmentDto.slotId);
      expect(result.patientId).toBe(appointmentDto.patientId);
      expect(result.patientName).toBe(appointmentDto.patientName);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'appointment.booked',
        result,
      );
      expect(repository.bookAppointment).toHaveBeenCalledWith(result);
    });

    it('should throw an error if slot is unavailable', () => {
      const slot = {
        id: 'slot1',
        isReserved: true,
        time: new Date('2025-02-01T14:30:00.000Z'),
      };
      const appointmentDto = {
        id: 'appointment1',
        slotId: 'slot1',
        patientId: 'patient1',
        patientName: 'John Doe',
        reservedAt: new Date().toISOString(),
      };
      jest.spyOn(repository, 'getAvailableSlots').mockReturnValue([slot]);

      expect(() => useCase.execute(appointmentDto)).toThrow(
        'Slot is unavailable or already reserved.',
      );
    });

    it('should throw an error if slot does not exist', () => {
      const appointmentDto = {
        id: 'appointment1',
        slotId: 'slot1',
        patientId: 'patient1',
        patientName: 'John Doe',
        reservedAt: new Date().toISOString(),
      };
      jest.spyOn(repository, 'getAvailableSlots').mockReturnValue([]);

      expect(() => useCase.execute(appointmentDto)).toThrow(
        'Slot is unavailable or already reserved.',
      );
    });
  });
});
