import { Component, OnInit, Input } from '@angular/core';
import { unit } from '../entity/unit';
import { AllowedValues } from '../helpers/AllowedValues';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  @Input() activeUnit:unit;
  constructor(public allowedValues: AllowedValues) { }

  ngOnInit() {
  }

}
