import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEmitter } from '../contracts/IEmitter';
export class Emitter implements IEmitter {
  constructor(private eventEmitter: EventEmitter2) {}
  emit(event: string, data: any): void {
    this.eventEmitter.emit(event, data);
  }
}
