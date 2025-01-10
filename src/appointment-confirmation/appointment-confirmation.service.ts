import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AppointmentConfirmationService {
  private readonly logger = new Logger(AppointmentConfirmationService.name);

  @OnEvent('appointment.booked')
  confirmAppointment(confirmationDto: any): string {
    const { patientName, doctorName, appointmentTime } = confirmationDto;

    // Log the confirmation message
    const message = `Appointment confirmed for ${patientName} with Dr. ${doctorName} at ${appointmentTime}`;
    this.logger.log(message);

    // Return confirmation message
    return message;
  }
}
