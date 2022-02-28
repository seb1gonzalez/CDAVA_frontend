import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService, } from 'primeng/api';
import { TrasferFilteredDataService } from '../helpers/TransferFilteredDataService';
import { Filters, Filter_Elements } from '../helpers/filters-data'
import { globals } from '../global';
import { plainToClass } from 'class-transformer';
import { FilterChangeEventService } from '../helpers/FilterChangeEventService';
import { ResetFilterEventService } from '../helpers/ResetFilterEventService';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})


export class FiltersComponent implements OnInit {

  qmap = {}
  crash: Filter_Elements[];
  crash_type: Filter_Elements[];
  gis_analysis: Filter_Elements[];
  person: Filter_Elements[];
  unit: Filter_Elements[];
  frequent_filters= []
  special_filters: Filter_Elements[]


  constructor(private filterChange: FilterChangeEventService, private resetFilters: ResetFilterEventService,
    private filterEvent: TrasferFilteredDataService,
    private http: HttpClient, private messageService: MessageService) { }


  ngOnInit() {
  //  console.log(globals.filters_json)
    let filters: Filters = plainToClass(Filters, globals.filters_json);
    this.getTopTen()


    this.crash = filters.crash
    this.crash_type = filters.crash_type
    this.gis_analysis = filters.gis_analysis
    this.person = filters.person
    this.unit = filters.unit
    this.special_filters = plainToClass(Filter_Elements,globals.special_filters)

    //console.log("allfilters: ...",this.crash)
    this.filterChange.filter_change.subscribe(val => this.buildQuery(val))

  }
  getTopTen(){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    var top10 = this.http.get(`https://${globals.restApiURL}${globals.getTopTenFilters}`,httpOptions).subscribe(res => {
      let response = res as any[]
      let user_frequent = []
      let base_array:any[];
      //if array.length == 0 => use default_frequent filters in global.filters_json
      if(response.length < 10){ // give user some time to go off default. Let them use atleast 10 filters
        response = globals.default_frequent
      }


      //save found top searches
      response.forEach(element => {
        let top = {
          table : element.table_searched,
          filter: element.filters_searched
        };
        user_frequent.push(top)
      });

      //console.log(user_frequent)

      //find frequent in JSON and push to array for frontend
      user_frequent.forEach(frequent => {

        //get the array from JSON of the top table
        let filter_arr =globals.filters_json[frequent.table]

        //then, find the filter and save it
        filter_arr.forEach(filter => {
          if(filter.COLUMN_NAME == frequent.filter){
            let frequently_used_filters = {TABLE:frequent.table,DATA:filter}
            this.frequent_filters.push(frequently_used_filters)
          }
        });
      })

      //console.log(this.frequent_filters)

    },
      err => {
       console.log(err)
      });

  }

  deleteFilters() {
    this.qmap = {}
    this.resetFilters.reset("")
    this.filterEvent.newFilters({ "reset": true })
  }

  buildQuery(dt) {
    let key = Object.keys(dt)[0]
    let val = dt[key]


    if (val.length <1){
      delete this.qmap[key]
      if (Object.keys(this.qmap).length <1){
        this.deleteFilters()
        return
      }

    }else{

      this.qmap[key] = val

    }
    let q:any[] = Object.values(this.qmap)
    let v = q.reduce((accumulator, value) => accumulator.concat(value), []);

    this.sendFinalQuery({"filters":v})

    /**
{"filters":[{"table":"crash","param":"crash_speed","value":[10,50]},
{"table":"crash","param":"weather_WeatherID", "value":[11]},
{"table":"crash","param":"weather_WeatherID", "value":[12]},
{"table":"person","param":"age", "value":[20,60]},
{"table":"person","param":"type_PersonTpyeID", "value":[1]},
{"table":"person","param":"alch_PersonAlcoholID", "value":[1]},
{"table":"gis_analysis","param":"schools", "value":[0,2]},
{"table":"crash_type","param":"crash_location", "value":[1]},
{"table":"crash_type","param":"bicyclist_position","value":[5]}
 */


  }




  sendFinalQuery(final_query) {
    //POST
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    var json = this.http.post(`https://${globals.restApiURL}${globals.mapQuery}`, final_query,httpOptions).subscribe(res => {
      let response = res as Array<any>

      //store unique values in new array
      let unique_crash_ids = []

      response.forEach(crash => {
        const crash_id = crash.crash_id
        const lat = crash.latitude
        const lon = crash.longitude
        unique_crash_ids.push({ "crash_id": crash_id, "latitude": lat, "longitude": lon })
      })


     // this.toast("Filters", "Found: " + unique_crash_ids.length)
      this.filterEvent.newFilters({ "selected": unique_crash_ids, "reset": false })
    },
      err => {
        console.log(err)
        //this.toast("Contact Administrator", "person@email.com")
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      });
  }


  /**Displays a message to the screen */
  toast(title: string, message: string) {
    this.messageService.add({  severity: 'info', summary: title, detail: message });
  }


}

