export class Slot {
  id: string; // Guid
  time: Date; // Date in format 22/02/2023 04:30 pm
  doctorId: string; // Guid
  doctorName: string;
  isReserved: boolean; // bool
  cost: number; // Decimal
}
