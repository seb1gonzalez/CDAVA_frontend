
import { Injectable, Output,EventEmitter } from '@angular/core';
@Injectable()
export class FilterChangeEventService {

  @Output() filter_change: EventEmitter <number> = new EventEmitter();

  filterChanged(payload) {
     this.filter_change.emit(payload);
  }

}