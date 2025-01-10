import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppointmentConfirmationService } from './appointment-confirmation.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [],
  providers: [AppointmentConfirmationService],
})
export class AppointmentConfirmationModule {}
