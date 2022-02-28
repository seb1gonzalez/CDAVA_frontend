
import { Injectable, Output,EventEmitter } from '@angular/core';
@Injectable()
export class ResetFilterEventService {

  @Output() reset_event: EventEmitter <number> = new EventEmitter();

  reset(reset_event) {
     this.reset_event.emit(reset_event);
  }

}