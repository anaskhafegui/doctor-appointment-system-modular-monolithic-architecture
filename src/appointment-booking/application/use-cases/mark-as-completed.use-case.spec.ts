import { Test, TestingModule } from '@nestjs/testing';
import { Appointment } from '../../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';
import { MarkAsCompletedUseCase } from './mark-as-completed.use-case';

describe('MarkAsCompletedUseCase', () => {
  let useCase: MarkAsCompletedUseCase;
  let repository: AppointmentRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarkAsCompletedUseCase,
        {
          provide: 'AppointmentRepositoryInterface',
          useValue: {
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<MarkAsCompletedUseCase>(MarkAsCompletedUseCase);
    repository = module.get<AppointmentRepositoryInterface>(
      'AppointmentRepositoryInterface',
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should mark an appointment as completed if it exists', () => {
      const appointmentId = 'appointment1';
      const appointment = new Appointment(
        appointmentId,
        'slot1',
        'patient1',
        'John Doe',
        new Date(),
      );
      jest.spyOn(repository, 'findById').mockReturnValue(appointment);
      jest.spyOn(repository, 'save').mockImplementation();

      const result = useCase.execute(appointmentId);

      expect(result).toBeInstanceOf(Appointment);
      expect(result.id).toBe(appointmentId);
      expect(repository.findById).toHaveBeenCalledWith(appointmentId);
      expect(repository.save).toHaveBeenCalledWith(appointment);
    });

    it('should throw an error if appointment is not found', () => {
      const appointmentId = 'appointment1';
      jest.spyOn(repository, 'findById').mockReturnValue(undefined);

      expect(() => useCase.execute(appointmentId)).toThrow(
        'Appointment not found.',
      );
    });
  });
});
