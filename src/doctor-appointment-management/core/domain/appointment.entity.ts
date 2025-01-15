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
  }
}

export enum AppointmentStatus {
  UPCOMING = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}
