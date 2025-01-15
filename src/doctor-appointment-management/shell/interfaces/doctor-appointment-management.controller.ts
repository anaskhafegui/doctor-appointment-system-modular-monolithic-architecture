import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AppointmentManagementService } from '../../core/inputports/appointment-management.service';

@Controller('appointments')
export class DoctorAppointmentManagementController {
  constructor(private readonly service: AppointmentManagementService) {}

  @Get()
  getAppointments() {
    return this.service.viewAppointments();
  }

  @Patch(':id/cancel')
  cancelAppointment(@Param('id') id: string) {
    return this.service.cancelAppointment(id);
  }

  @Patch(':id/complete')
  completeAppointment(@Param('id') id: string) {
    return this.service.completeAppointment(id);
  }
}
