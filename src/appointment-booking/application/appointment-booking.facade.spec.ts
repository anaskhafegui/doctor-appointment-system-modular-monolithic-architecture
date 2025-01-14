import { Test, TestingModule } from '@nestjs/testing';
import { Appointment } from '../domain/appointment.entity';
import { AppointmentBookingFacade } from './appointment-booking.facade';
import { CancelAppointmentUseCase } from './use-cases/cancel-appointment.use-case';
import { GetUpcomingAppointmentsUseCase } from './use-cases/get-upcoming-appointment.use-case';
import { MarkAsCompletedUseCase } from './use-cases/mark-as-completed.use-case';

describe('AppointmentBookingFacade', () => {
  let facade: AppointmentBookingFacade;
  let getUpcomingAppointmentsUseCase: GetUpcomingAppointmentsUseCase;
  let markAsCompletedUseCase: MarkAsCompletedUseCase;
  let cancelAppointmentUseCase: CancelAppointmentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentBookingFacade,
        {
          provide: GetUpcomingAppointmentsUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: MarkAsCompletedUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CancelAppointmentUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    facade = module.get<AppointmentBookingFacade>(AppointmentBookingFacade);
    getUpcomingAppointmentsUseCase = module.get<GetUpcomingAppointmentsUseCase>(
      GetUpcomingAppointmentsUseCase,
    );
    markAsCompletedUseCase = module.get<MarkAsCompletedUseCase>(
      MarkAsCompletedUseCase,
    );
    cancelAppointmentUseCase = module.get<CancelAppointmentUseCase>(
      CancelAppointmentUseCase,
    );
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  describe('getUpcomingAppointments', () => {
    it('should return upcoming appointments', () => {
      const appointments: Appointment[] = [
        new Appointment('1', 'slot1', 'patient1', 'John Doe', new Date()),
        new Appointment('2', 'slot2', 'patient2', 'Jane Doe', new Date()),
      ];
      jest
        .spyOn(getUpcomingAppointmentsUseCase, 'execute')
        .mockReturnValue(appointments);

      const result = facade.getUpcomingAppointments();

      expect(result).toEqual(appointments);
      expect(getUpcomingAppointmentsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('completeAppointment', () => {
    it('should mark an appointment as completed', () => {
      const appointmentId = 'appointment1';
      const appointment = new Appointment(
        appointmentId,
        'slot1',
        'patient1',
        'John Doe',
        new Date(),
      );
      jest
        .spyOn(markAsCompletedUseCase, 'execute')
        .mockReturnValue(appointment);

      const result = facade.completeAppointment(appointmentId);

      expect(result).toEqual(appointment);
      expect(markAsCompletedUseCase.execute).toHaveBeenCalledWith(
        appointmentId,
      );
    });
  });

  describe('cancelAppointment', () => {
    it('should cancel an appointment', () => {
      const appointmentId = 'appointment1';
      const appointment = new Appointment(
        appointmentId,
        'slot1',
        'patient1',
        'John Doe',
        new Date(),
      );
      jest
        .spyOn(cancelAppointmentUseCase, 'execute')
        .mockReturnValue(appointment);

      const result = facade.cancelAppointment(appointmentId);

      expect(result).toEqual(appointment);
      expect(cancelAppointmentUseCase.execute).toHaveBeenCalledWith(
        appointmentId,
      );
    });
  });
});
