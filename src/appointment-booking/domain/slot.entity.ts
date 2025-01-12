export class Slot {
  constructor(
    public id: string,
    public time: Date,
    public doctorId: string,
    public doctorName: string,
    public isReserved: boolean,
    public cost: number,
  ) {}
}
