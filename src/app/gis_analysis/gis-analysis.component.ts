import { Component, OnInit,Input } from '@angular/core';
import { gis_analysis } from '../entity/gis_analysis';
import { AllowedValues } from '../helpers/AllowedValues';

@Component({
  selector: 'app-gis-analysis',
  templateUrl: './gis-analysis.component.html',
  styleUrls: ['./gis-analysis.component.css']
})
export class GisAnalysisComponent implements OnInit {
  @Input() gis_data: gis_analysis;
  constructor(public allowedValues: AllowedValues) { 
    
  }

  ngOnInit() {
  }

}
