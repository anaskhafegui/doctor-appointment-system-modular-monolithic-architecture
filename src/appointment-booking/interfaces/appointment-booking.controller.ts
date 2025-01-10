import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookAppointmentUseCase } from '../application/use-cases/book-appointment.use-case';
import { GetAvailableSlotsUseCase } from '../application/use-cases/get-available-slots.use-case';

@Controller('appointments')
export class AppointmentBookingController {
  constructor(
    private readonly bookAppointment: BookAppointmentUseCase,
    private readonly getAvailableSlots: GetAvailableSlotsUseCase,
  ) {}

  @Get('slots')
  async fetchAvailableSlots() {
    return this.getAvailableSlots.execute();
  }

  @Post()
  async createAppointment(@Body() appointmentDto: any) {
    return this.bookAppointment.execute(appointmentDto);
  }
}
