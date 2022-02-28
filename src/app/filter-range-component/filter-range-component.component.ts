import { Component, OnInit, Input } from '@angular/core';
import { Filter_Elements } from '../helpers/filters-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { globals } from '../global';
import { FilterChangeEventService } from '../helpers/FilterChangeEventService';
import { ResetFilterEventService } from '../helpers/ResetFilterEventService';


@Component({
  selector: 'app-filter-range-component',
  templateUrl: './filter-range-component.component.html',
  styleUrls: ['./filter-range-component.component.css']
})
export class FilterRangeComponentComponent implements OnInit {

  @Input() filter_element: Filter_Elements
  @Input() table_name: String


  constructor(private http: HttpClient,
    private filterChange: FilterChangeEventService, private resetFilters: ResetFilterEventService) { }

  ngOnInit() {

    if (this.filter_element.render == "range") {
      this.rangeValues = [0, 100]
      this.linearSliderTranslator()
    }

    if (this.filter_element.render == "list") {
      this.getUniqueValues()
    }
    if (this.filter_element.render == "daterange") {
      this.minDateValue = new Date(Date.parse("01 Jan 2014"))
      this.maxDateValue = new Date(Date.parse("31 Dec 2018"))
      this.fromDate = new Date(Date.parse("01 Jan 2014"))
      this.toDate = new Date(Date.parse("31 Dec 2018"))

    }
    this.resetFilters.reset_event.subscribe(val => this.reset(val))
  }

  /** Code for range  */

  //UI goes form 0-100 but the real values go from min-max ...this will translate

  rangeOnChange(event) {
    this.linearSliderTranslator()
  }

  rangeOnSlideEnd(evt) {
    this.buildQuery()
  }

  rangeValues: number[];
  realValues: number[];
  linearSliderTranslator() {
    this.realValues = [this.maxminscaler(this.rangeValues[0], false), this.maxminscaler(this.rangeValues[1])]
    //console.log(this.rangeValues,this.realValues)
  }

  maxminscaler(x, roundup = true) {
    if (roundup) {
      return Math.ceil(x / 100 * (this.filter_element.max_num - this.filter_element.min_num))
    }
    return Math.floor(x / 100 * (this.filter_element.max_num - this.filter_element.min_num))
  }



  /////////////////////
  /**code for list */

  uniqueElements: any[] = []
  selectedElements: any[] = []

  getUniqueValues() {
    if (!this.filter_element.options) {
      //console.log('getUniquevalues called')
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': "Bearer "+localStorage.getItem("access_token")
      });

          const httpOptions = {
            headers: headers_object
          };

      let q_payload = { "colname": this.filter_element.COLUMN_NAME, "tablename": this.table_name }
      var json = this.http.post(`https://${globals.restApiURL}${globals.getDistinct}`, q_payload,httpOptions).subscribe(res => {
        this.uniqueElements = res as Array<any>
        //console.log(this.uniqueElements)
      },
        err => {
          console.log(err)
          // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
        });
    } else {
      this.uniqueElements = this.filter_element.options
    }

  }
  selectOnChange(event) {
    //console.log(this.selectedElements)
    this.buildQuery()
  }

  //////////////////////
  /**Code for date range */
  fromDate;
  toDate;
  minDateValue;
  maxDateValue

  dateOnChange(event) {
    this.buildQuery()
  }


  ///////

  reset(blah) {

    if (this.filter_element.render == "range") {
      this.rangeValues = [0, 100]
      this.linearSliderTranslator()
    }

    if (this.filter_element.render == "list") {
      this.selectedElements = []
    }
    if (this.filter_element.render == "daterange") {

      this.fromDate = new Date(Date.parse("01 Jan 2014"))
      this.toDate = new Date(Date.parse("31 Dec 2018"))

    }

  }
  buildQuery() {
    //console.log(this.buildQueryHelper())
    this.filterChange.filterChanged(this.buildQueryHelper())
  }

  buildQueryHelper() {
    let ret = {}
    let key = this.table_name + "+" + this.filter_element.COLUMN_NAME
    let val = { "table": this.table_name, "param": this.filter_element.COLUMN_NAME }
    if (this.filter_element.render == "range") {
      val["value"] = this.realValues
      ret[key] = val
      return ret
    }

    if (this.filter_element.render == "list") {
      let val1 = [];
      for (var i = 0; i < this.selectedElements.length; i++) {

        val1.push({ "table": this.table_name, "param": this.filter_element.COLUMN_NAME, "value": [this.selectedElements[i]["id"]] })
      }
      // let val1 = this.selectedElements.map(function (x) {
      //   return { "table": this.table_name, "param": this.filter_element.COLUMN_NAME , "value":x.id}
      // })
      ret[key] = val1
      return ret
    }
    if (this.filter_element.render == "daterange") {
      console.log(this.fromDate)
      console.log(this.toDate)
      val["value"] = [this.fromDate, new Date(this.toDate.getTime() + 1*86400*1000)] //adding one day to toDate. So if to date is Jan 1 2014 it means Jan 1 2014 2400 hrs not 0000hrs
      console.log(val["value"])
      ret[key] = val
      return ret
    }

  }
}
