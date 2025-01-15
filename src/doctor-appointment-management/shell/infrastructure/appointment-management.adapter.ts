import { Injectable } from '@nestjs/common';
import { AppointmentBookingFacade } from '../../../appointment-booking/application/appointment-booking.facade';
import { Appointment } from '../../core/domain/appointment.entity';
import { AppointmentManagementInterface } from '../../core/outputports/appointment-management.interface';

@Injectable()
export class AppointmentManagementAdapter
  implements AppointmentManagementInterface
{
  constructor(private readonly appointmentFacade: AppointmentBookingFacade) {}
  getUpcomingAppointments(): Appointment[] {
    return this.appointmentFacade.getUpcomingAppointments();
  }
  completedAppointment(appointmentId: string): Appointment {
    return this.appointmentFacade.completeAppointment(appointmentId);
  }
  cancelAppointment(appointmentId: string): Appointment {
    return this.appointmentFacade.cancelAppointment(appointmentId);
  }
}
