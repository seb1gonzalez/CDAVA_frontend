import { Component, EventEmitter, OnInit, Input, OnChanges, Output } from '@angular/core';
import { crash_type } from '../entity/crash_type';



@Component({
  selector: 'app-crash-typing',
  templateUrl: './crash-typing.component.html',
  styleUrls: ['./crash-typing.component.css']
})
export class CrashTypingComponent implements OnInit {


@Input() currentCrashType: crash_type;

  constructor() { }
  ngOnInit() {
   

  }

}
