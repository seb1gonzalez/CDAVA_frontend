import { Component, OnInit, Input } from '@angular/core';
import { person } from '../entity/person';
import { AllowedValues } from '../helpers/AllowedValues';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input() activePerson: person;
  constructor(public allowedValues: AllowedValues) { }

  ngOnInit() {
  }

}
