
import { Injectable, Output,EventEmitter } from '@angular/core';
@Injectable()
export class TrasferFilteredDataService {

  @Output() filteredData: EventEmitter <number> = new EventEmitter();

  newFilters(filteredCrashes) {
     this.filteredData.emit(filteredCrashes);
  }

}