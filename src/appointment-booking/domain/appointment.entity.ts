export class Appointment {
  id: string;
  slotId: string;
  doctorId: string;
  patientId: string;
  reservedAt: Date;

  constructor(
    id: string,
    slotId: string,
    doctorId: string,
    patientId: string,
    reservedAt: Date,
  ) {
    this.id = id;
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.slotId = slotId;
    this.reservedAt = reservedAt;

    this.validateReservedAt();
  }

  private validateReservedAt() {
    if (this.reservedAt <= new Date()) {
      throw new Error('The reserved date must be in the future');
    }
  }
}
