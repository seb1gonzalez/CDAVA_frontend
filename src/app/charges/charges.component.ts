import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { charges } from '../entity/charges';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent implements OnInit {
  @Input() activeCharge:charges;
  
  constructor() { }

  ngOnInit() {
    
  }

}
