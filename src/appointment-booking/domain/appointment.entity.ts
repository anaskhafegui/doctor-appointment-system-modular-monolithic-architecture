export class Appointment {
  id: string;
  slotId: string;
  patientId: string;
  patientName: string;
  reservedAt: Date;

  constructor(
    id: string,
    slotId: string,
    patientId: string,
    patientName: string,
    reservedAt: Date,
  ) {
    this.id = id;
    this.slotId = slotId;
    this.patientId = patientId;
    this.patientName = patientName;
    this.reservedAt = reservedAt;

    this.validateReservedAt();
  }

  private validateReservedAt() {
    if (!(this.reservedAt instanceof Date)) {
      throw new Error('The reserved date must be date type');
    }
  }
}
