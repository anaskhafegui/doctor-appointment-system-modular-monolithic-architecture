export class Appointment {
  constructor(
    public id: string,
    public slotId: string,
    public patientId: string,
    public patientName: string,
    public reservedAt: Date,
    public status: 'scheduled' | 'completed' | 'canceled' = 'scheduled',
  ) {}

  markAsCompleted() {
    if (this.status !== 'scheduled') {
      throw new Error(
        'Only scheduled appointments can be marked as completed.',
      );
    }
    this.status = 'completed';
  }

  cancel() {
    if (this.status !== 'scheduled') {
      throw new Error('Only scheduled appointments can be canceled.');
    }
    this.status = 'canceled';
  }
}
