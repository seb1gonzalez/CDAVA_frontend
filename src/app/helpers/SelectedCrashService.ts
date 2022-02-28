import { Injectable, Output,EventEmitter } from '@angular/core';


@Injectable()
export class SelectedCrashService {

  @Output() newCrash: EventEmitter <number> = new EventEmitter();

  newCrashSelected(selectedCrashID: number) {
     this.newCrash.emit(selectedCrashID);
  }

}