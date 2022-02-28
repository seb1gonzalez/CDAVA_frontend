import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from "@angular/common/http";;
import { MessageService } from 'primeng/components/common/api';
import { globals } from "../global"
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LeftBarData } from '../helpers/LeftBarData';
import { SelectedCrashService } from '../helpers/SelectedCrashService';
import { TrasferFilteredDataService } from '../helpers/TransferFilteredDataService';
import { TableDialogService } from '../helpers/TableDialogService';
import { containsElement } from '@angular/animations/browser/src/render/shared';


@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {

  leftbarDataArray: LeftBarData[];
  leftbarDataArrayAll: LeftBarData[];
  selectedCrash: LeftBarData;
  cols = ["CrashID", "Year", "People", "Injuries", "Types"]

  yrRange = globals.yearRange
  min_yr = globals.yearRange[0]
  max_yr = globals.yearRange[1]

  @Input() show: boolean;

  constructor(private http: HttpClient, private messageService: MessageService, public jwtHelper: JwtHelperService,
   private router: Router, private selectedCrashService: SelectedCrashService,
    private filterEvent: TrasferFilteredDataService,private tableShow:TableDialogService
  ) {

    // console.log(this.leftbarDataArrayAll)
    // console.log(this.leftbarDataArray)
  }


  fetchLeftbarData() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };

    var json = this.http.get(`https://${globals.restApiURL}${globals.leftBar}`,httpOptions).subscribe(res => {

      var res1 = res as Object[]

      this.leftbarDataArrayAll = res1.map(d => new LeftBarData(d))
      this.leftbarDataArray= res1.map(d=> new LeftBarData(d))
      //console.log(this.leftbarDataArrayAll)
    },
      err => {
        console.log(err)
        this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )


  }



  public crashSelectionEvent(evt) {
    var crash = this.selectedCrash
    this.selectedCrashService.newCrashSelected(crash.CrashID);

  }


  ngOnInit() {
    this.fetchLeftbarData();
    this.leftbarDataArray = this.leftbarDataArrayAll;
    this.filterEvent.filteredData.subscribe(val => this.newFilteredData(val))
    this.tableShow.tableShow.subscribe(val=>this.onShow(val))
  }

  newFilteredData(data) {
    // Remove main clustermap if present

    if (data["reset"]) {// reset is sent when all filters are reset
      this.leftbarDataArray = this.leftbarDataArrayAll
    } else {
      let selected_crashes = data["selected"].map(x => x.crash_id)

      this.leftbarDataArray = this.leftbarDataArrayAll.filter(function (e) {
        return selected_crashes.indexOf(e.CrashID) != -1
      })
      // console.log(selected_crashes)
      // console.log(this.leftbarDataArray)
    }

  }

  _filterByRange(values: any, column: any, min: number, max: number): any {
    //console.log(max, min, column)
    let filteredValues = [];
    for (let i = 0; i < values.length; i++) {
      var e = values[i]
      if (e[column] >= min && e[column] <= max) {
        filteredValues.push(e)
      }
    }
    return filteredValues;
  }

  yearTimeout: any;

  onYearChange(event, dt) {
    //console.log(event)
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      dt.filteredValue = this._filterByRange(this.leftbarDataArray, "Year", event.values[0], event.values[1])
      // console.log(dt.filteredValue)
      this._tableFiltered(dt.filteredValue)
    }, 1000);
  }

  tableFiltered(event) {
    //  console.log("filtered Called", event.filteredValue)
    this._tableFiltered(event.filteredValue)
  }

  _tableFiltered(fv) {

  }
  onShow(evt){

    if (evt){
      if (this.leftbarDataArray == undefined){

        this.leftbarDataArray=this.leftbarDataArrayAll
      }
    }
  }

}



