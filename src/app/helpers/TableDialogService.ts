import { Injectable, Output,EventEmitter } from '@angular/core';


@Injectable()
export class TableDialogService {

  @Output() tableShow: EventEmitter <boolean> = new EventEmitter();

  tableShowSet(v:boolean) {

     this.tableShow.emit(v);
  }

}