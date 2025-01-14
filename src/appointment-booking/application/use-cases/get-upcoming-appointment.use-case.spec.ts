import { Test, TestingModule } from '@nestjs/testing';
import {
  Appointment,
  AppointmentStatus,
} from '../../domain/appointment.entity';
import { AppointmentRepositoryInterface } from '../../domain/appointment.repository.interface';
import { GetUpcomingAppointmentsUseCase } from './get-upcoming-appointment.use-case';

describe('GetUpcomingAppointmentsUseCase', () => {
  let useCase: GetUpcomingAppointmentsUseCase;
  let repository: AppointmentRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUpcomingAppointmentsUseCase,
        {
          provide: 'AppointmentRepositoryInterface',
          useValue: {
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetUpcomingAppointmentsUseCase>(
      GetUpcomingAppointmentsUseCase,
    );
    repository = module.get<AppointmentRepositoryInterface>(
      'AppointmentRepositoryInterface',
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return upcoming appointments', async () => {
      const appointments = [
        new Appointment(
          '1',
          'slot1',
          'patient1',
          'John Doe',
          new Date(),
          AppointmentStatus.UPCOMING,
        ),
        new Appointment(
          '2',
          'slot2',
          'patient2',
          'Jane Doe',
          new Date(),
          AppointmentStatus.UPCOMING,
        ),
      ];

      jest.spyOn(repository, 'getAll').mockReturnValue(appointments);

      const result = await useCase.execute();

      expect(result).toEqual(appointments);
      expect(repository.getAll).toHaveBeenCalledWith(
        AppointmentStatus.UPCOMING,
      );
    });
  });
});
