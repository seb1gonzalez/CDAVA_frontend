import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {

  @Input() corridorScorecardData: any;
  
  constructor() {}

  ngOnInit() {
  }

}
