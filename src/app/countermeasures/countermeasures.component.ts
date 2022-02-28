import { Component, OnInit,Input } from '@angular/core';
import { gis_analysis } from '../entity/gis_analysis';
import { AllowedValues } from '../helpers/AllowedValues';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService,Listbox} from 'primeng/primeng';
import { globals } from '../global';
import {countermeasures} from "../entity/countermeasures"
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-countermeasures',
  templateUrl: './countermeasures.component.html',
  styleUrls: ['./countermeasures.component.css']
})
export class CountermeasuresComponent implements OnInit {

  countermeasures_arr :countermeasures[]

  // getCountermeasures(){

  //   var json = this.http.get(`http://${globals.restApiURL}${globals.countermeasures}`).subscribe(response => {

  //     var res1 = response as countermeasures[]
  //     this.countermeasures_arr = res1
  //   },
  //   err => {
  //     console.log(err)
  //     this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
  //   }
  //   )
  // }



  constructor( private http: HttpClient, private messageService: MessageService, ) { }

  ngOnInit() {
      //this.getCountermeasures()
  }

}
