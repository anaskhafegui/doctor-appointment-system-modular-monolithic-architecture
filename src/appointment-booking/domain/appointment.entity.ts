export class Appointment {
  id: string;
  slotId: string;
  patientId: string;
  patientName: string;
  reservedAt: Date;
  status?: AppointmentStatus;

  constructor(
    id: string,
    slotId: string,
    patientId: string,
    patientName: string,
    reservedAt: Date,
    status?: AppointmentStatus,
  ) {
    this.id = id;
    this.status = this.status;
    this.slotId = slotId;
    this.patientId = patientId;
    this.patientName = patientName;
    this.reservedAt = reservedAt;
    this.status = status || AppointmentStatus.UPCOMING;

    this.validateReservedAt();
  }

  markAsCompleted(): void {
    if (this.status !== AppointmentStatus.UPCOMING) {
      throw new Error('Only upcoming appointments can be marked as completed.');
    }
    this.status = AppointmentStatus.COMPLETED;
  }

  cancel(): void {
    if (this.status !== AppointmentStatus.UPCOMING) {
      throw new Error('Only upcoming appointments can be canceled.');
    }
    this.status = AppointmentStatus.CANCELLED;
  }

  private validateReservedAt() {
    if (!(this.reservedAt instanceof Date)) {
      throw new Error('The reserved date must be date type');
    }
  }
}

export enum AppointmentStatus {
  UPCOMING = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}
