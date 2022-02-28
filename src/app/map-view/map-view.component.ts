import { Component, OnInit } from '@angular/core';

import { globals } from '../global';
import { google } from '@google/maps';
import MarkerClusterer from '@google/markerclustererplus'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService, ConfirmationService, Listbox, MenuItem } from 'primeng/primeng';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Router } from '@angular/router';
import { AllowedValues } from '../helpers/AllowedValues';


import { HostListener } from "@angular/core";

import { TrasferFilteredDataService } from '../helpers/TransferFilteredDataService';

import { SelectedCrashService } from '../helpers/SelectedCrashService';
import { TableDialogService } from '../helpers/TableDialogService';
//import { element } from '@angular/core/src/render3';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';
import { AuthenticationService } from '../helpers/authentication.service';
//import { timeStamp } from 'console';

declare var google: any;
declare var OverlappingMarkerSpiderfier: any;
//declare var MarkerClusterer: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],

})

export class MapViewComponent implements OnInit {

  scorecardData =
    {
      "length": 0,
      "corridor_start": "",
      "corridor_end": "",
      "data": {},
      "ready": false,
      "countermeasures": [],
      "chart_data":
      {
        "year_data": {}
      }
    }
  // logout_items: MenuItem[];


  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    public allowedValues: AllowedValues,
    public confirmationService: ConfirmationService,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private filterEvent: TrasferFilteredDataService,
    private selectedCrashService: SelectedCrashService,
    private tableShow: TableDialogService,
    private authenticationService: AuthenticationService

  ) {

  }
  spiderConfig = {
    keepSpiderfied: true,
    event: 'mouseover'
  };
  markerSpiderfier: any// using http://github.com/yagoferrer/markerclusterer-plus-spiderfier-example/blob/master/src/demo.js
  iw: google.maps.InfoWindow;

  ngOnInit() {
    this.onResize();
    console.log("map:", this.map)
    if (this.map){
      this.markerSpiderfier = new OverlappingMarkerSpiderfier(this.map, this.spiderConfig);
    }
    this.iw = new google.maps.InfoWindow();
    this.getMainMapClusters();
    this.getCorridorsTable()
    this.filterEvent.filteredData.subscribe(val => this.newFilteredData(val))
    this.selectedCrashService.newCrash.subscribe(val => this.tableCrashSelected(val))


    //   this.logout_items = [
    //     {label: 'Change Password', command: () => {
    //         this.change_password();
    //     }}
    // ];
  }

  old_password: string
  new_password: string
  display_change_password = false
  change_password(evt) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };

    var json = this.http.post(`https://${globals.restApiURL}${globals.passwordChange}`, { 'oldPassword': this.old_password, 'newPassword': this.new_password },httpOptions)
      .subscribe(res => {
        this.toast("Password Changed", "Horray!")
        this.display_change_password = false
      },
        err => {
          console.log(err)
          //this.toast("Password Not Changed","Error"+err)
          // this.toast("Contact Administrator", "person@email.com") // Send contact nome and email to global.ts
          this.messageService.add({ "severity": "error", "summary": err.error });
        });

  }

  displaySidebar = false;
  displayLogin = false;
  displayTable = false;
  displayCrash = false;
  displayCorridorTable = false;
  bikeTableReady = false
  pedestrianTableReady = false


  //For Corridors
  countermeasures_list = []
  display_dialog_corridors = false
  displayScorecard = false
  corridor_type = ""
  corridor_name = ""
  corridor_on = false
  corridorTable = []
  corridor_crash_ids = []
  corridor_scorecard_data = []
  rowIndexCorridors: number = 0




  clustermap_on = true



  all_polylines: any[]
  showMap: boolean;
  map: google.maps.Map;
  markerCluster: MarkerClusterer;
  mainMapClusters_saved;

  mapOptions = {
    center: globals.startCenter,
    zoom: 10,
    fullscreenControl: false
  };


  mapStyle = {
    'width': "100%",
    'height': "400px"
  }

  filterStyle = {
    'width': "100%",
    'height': "400px"
  }
  tableStyle = {
    'width': "600px",
    'height': "700px"
  }

  scorecardStyle = {
    'width': "100%"

  }
  crashStyle = {
    "width": "10px",
    "height": "10px"
  }
  crashStyleScroll = {
    "width": "10px",
    "height": "10px"
  }

  RED = '#ff1744' //bike lines/charts
  BLUE = '#2962ff'//pedestrian lines/charts


  screenHeight: number;
  screenWidth: number;


  showTable(evt) {
    this.displayTable = true;
    this.tableShow.tableShowSet(this.displayTable);
  }

  tableCrashSelected(val) {
    // console.log("map view says", val)
    this.toast("Display Crash", "Showing Crash " + val)
    this.displayCrash = true;
  }


  createMap(event) {
    this.map = event.map;
    if (!this.markerSpiderfier){
      this.markerSpiderfier = new OverlappingMarkerSpiderfier(this.map, this.spiderConfig);
    }
  }

  fraction = 0.85

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight - 70;
    this.screenWidth = window.innerWidth - 60;
    this.mapStyle = { "width": this.screenWidth.toString() + "px", "height": this.screenHeight.toString() + "px" }
    if (this.screenWidth < 1024) {
      this.crashStyle = { "width": Math.floor(this.screenWidth * this.fraction).toString() + "px", "height": Math.floor(this.screenHeight * .85).toString() + "px" }
      this.crashStyleScroll = { "width": Math.floor(this.screenWidth * this.fraction - 20).toString() + "px", "height": Math.floor(this.screenHeight * .85 - 10).toString() + "px" }
    } else {
      this.crashStyle = { "width": Math.floor(1000).toString() + "px", "height": Math.floor(this.screenHeight * .85).toString() + "px" }
      this.crashStyleScroll = { "width": Math.floor(1000 - 20).toString() + "px", "height": Math.floor(this.screenHeight * .85 - 10).toString() + "px" }
    }

    //// console.log(this.crashStyle)
    this.filterStyle = { "width": "100%", "height": this.screenHeight.toString() + "px" }
    //// console.log(this.mapStyle, this.map)
    if (this.map) {
      google.maps.event.trigger(this.map, "resize");
    }
  }

  mapClusterDrawn = [];
  newFilteredData(data) {    // Remove main clustermap if present
    this.removeAllCluster()
    if (data["reset"]) {// reset is sent when all filters are reset
      this.getMainMapClusters()
      this.toast("Cluster", "Showing all Crashes")
    } else {
      this.drawClusters(data["selected"])
      // console.log("Showing " + data["selected"].length + " crashes ")
      this.toast("Cluster", "Showing " + data["selected"].length + " crashes ")
    }

  }
  markerClicked(id) { // function called when a marker is clicked

    //this.toast("Display Crash", "Showing Crash " + id)
    this.selectedCrashService.newCrashSelected(id)
    this.displayCrash = true
  }

  /**Given the response from backend, draws unique Crash IDs */
  drawClusters(array: Array<any>) {
    this.mapClusterDrawn = array;
    let c_temp = []
    array.forEach(element => {
      let crash_id = element.crash_id.toString()
      // Do we already have this crash_id in our map?
      //if not, create new marker, add it to clusters, mark crash_id as displayed
      var marker = new google.maps.Marker({
        position: { lat: element.latitude, lng: element.longitude },
        title: crash_id
      });
      google.maps.event.addListener(marker, 'click', (evt) => this.markerClicked(crash_id))
      if (!this.markerSpiderfier){
        this.markerSpiderfier = new OverlappingMarkerSpiderfier(this.map, this.spiderConfig);
      }
      this.markerSpiderfier.addMarker(marker);
      c_temp.push(marker)

    });


    // this.markerSpiderfier.addListener('click', function (marker, e) {
    //   this.iw.setContent(marker.title);
    //   this.iw.open(this.map, marker);
    // });

    // this.markerSpiderfier.addListener('spiderfy', function (markers) {
    //   this.iw.close();
    // });

    this.markerCluster = new MarkerClusterer(this.map, c_temp,
       { imagePath: 'assets/images/m' }
      );
    this.markerCluster.setMaxZoom(18)
  }

  showHideClustermap() {
    if (this.markerCluster) {
      this.removeAllCluster()
      this.clustermap_on = false
    } else {
      this.drawClusters(this.mapClusterDrawn)
      this.clustermap_on = true
    }

  }

  showHideCorridors() {
    if (this.all_polylines) {
      this.all_polylines.forEach(line => {
        line.setMap(null)
      })
      this.all_polylines = null
      this.corridor_on = false
    } else {
      this.showCorridors()
      this.corridor_on = true
    }

  }



  /**Fetched initial data for main map cluster */
  getMainMapClusters() {
    if (this.mainMapClusters_saved) {
      this.drawClusters(this.mainMapClusters_saved)
      this.toast("Crashes", "Found: " + this.mainMapClusters_saved.length)
    }
    else {

      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': "Bearer "+localStorage.getItem("access_token")
      });

          const httpOptions = {
            headers: headers_object
          };
      var json = this.http.get(`https://${globals.restApiURL}${globals.clusterMap}`,httpOptions).subscribe(res => {
        let response = res as Array<any>
        this.mainMapClusters_saved = response
        this.toast("Crashes", "Found: " + response.length)
        this.drawClusters(response)
      },
        err => {
          console.log(err)
          // this.toast("Contact Administrator", "person@email.com") // Send contact nome and email to global.ts
          // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
        });
    }
  }

  clear() {
    this.removeAllCluster()
  }

  removeAllCluster() {
    if (this.markerCluster) {
      this.markerCluster.clearMarkers();
      this.markerCluster = null
    }
  }


  logout(event) {

    this.authenticationService.logout()

  }

  /**Displays a message to the UI */
  toast(title: string, message: string) {
    this.messageService.add({ severity: 'info', summary: title, detail: message });
  }





  /**Retrieves cluster corridors (SHAPE) from DB and displays in map */
  showCorridors() {

    this.all_polylines = []

    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    var ped = this.http.get(`https://${globals.restApiURL}${globals.corridorsPedBike}`,httpOptions).subscribe(res => {
      let response = res as Array<any>
      this.drawLines(response)
    },
      err => {
        console.log(err)
        //this.toast("Contact Administrator", "person@email.com")
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      });

  }
  /**To display the corridor table p-dialog */
  showCorridorTable() {
    this.displayCorridorTable = true


  }

  /**Gets a list of corridors to display as a table */
  getCorridorsTable() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    var pedbike = this.http.get(`https://${globals.restApiURL}${globals.corridorsPedBike}`,httpOptions).subscribe(res => {
      let response = res as Array<any>
      response.forEach(element => {

        let corr_name: string[] = element.cluster.split(",")
        let clust_name = "Pedestrian"
        if (element.cluster_type == "BIKE") {
          clust_name = "Pedalcyclist"
        }
        let corridor_data = {
          "cluster_name_UI": corr_name[0],
          "cluster_type_UI": clust_name,
          "cluster_name": element.cluster,
          "cluster_type": element.cluster_type,
          "location": element.shape[0],
          "corridor_length": element.length.toFixed(1),
          "corridor_start": element.corridor_start,
          "corridor_end": element.corridor_end
        }
        this.corridorTable.push(corridor_data)
      })
    },
      err => {
        console.log(err)
        //this.toast("Contact Administrator", "person@email.com")
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      });

  }

  /** Draws the corridor lines in the map */
  drawLines(array: Array<any>) {
    // console.log(array)

    array.forEach(element => {

      let coords = element.shape;
      let latlong = []

      let color = this.RED // bikes

      if (element.cluster_type == "pedestrian") {
        color = this.BLUE
      }

      coords.forEach(element => {
        let latitude = element.y
        let longitude = element.x
        let line = { lat: latitude, lng: longitude }
        latlong.push(line)
      });



      //drawLines
      var polylines = new google.maps.Polyline({
        path: latlong,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0.7,
        strokeWeight: 8,
        title: element.cluster,
        cluster_type: element.cluster_type,
        initial_position: element.shape[0],
        corridor_length: element.length,
        corridor_start: element.corridor_start,
        corridor_end: element.corridor_end
      });
      polylines.setMap(this.map);
      this.all_polylines.push(polylines)

      google.maps.event.addListener(polylines, 'click', () => {
        this.zoomTo(polylines.initial_position)

        this.findCountermeasures(polylines.title, polylines.cluster_type)

        this.corridor_name = polylines.title
        this.corridor_type = polylines.cluster_type
        this.scorecardData.length = polylines.corridor_length.toFixed(1)
        this.scorecardData.corridor_start = polylines.corridor_start
        this.scorecardData.corridor_end = polylines.corridor_end

        this.getScorecardData(this.corridor_name, this.corridor_type)

        //this.display_dialog_corridors = true
        this.displayScorecard = true
      })
    })
  }
  /**Zooms and pans map to specified coordinates {lat,long} */
  zoomTo(coords: any[]) {

    let latLng = { lat: coords["y"], lng: coords["x"] }
    this.map.setZoom(14);
    this.map.panTo(latLng);
  }

  /**Initializes all crash IDs and data fetching for the scorecard for the given corridor*/
  getScorecardData(corridor: string, cluster_type: string, event?: any) {
    this.corridor_scorecard_data = []


    /** STEPS
 * 1. figure out crash ID list
 * 2. fetch data based on the crash IDs
 * 3. build response object
 * 4. send
 */
    let request_obj = {}
    request_obj = { "cluster_name": corridor, "cluster_type": cluster_type }

    if (cluster_type == 'b' && event) {
      corridor = event.data.cluster_name
      cluster_type = event.data.cluster_type
      request_obj = { "cluster_name": corridor, "cluster_type": cluster_type }
      this.scorecardData.length = event.data.corridor_length
      this.scorecardData.corridor_start = event.data.corridor_start
      this.scorecardData.corridor_end = event.data.corridor_end
      this.findCountermeasures(corridor, cluster_type)
      this.zoomTo(event.data.location)
    }
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };

    this.corridor_crash_ids = []
    /**FIRST FETCH: Get crash ids for the selected corridor */
    var crash_ids = this.http.post(`https://${globals.restApiURL}${globals.getScorecardCrashes}`, request_obj,httpOptions).subscribe(res => {
      let response = res as Array<any>
      response.forEach(crash => {
        this.corridor_crash_ids.push(crash.crashId)
      })

      /**SECOND FETCH: For every crash id, get their scorecard data*/
      this.getScorecardsByCrashID(this.corridor_crash_ids, cluster_type)
      //console.log(this.scorecardData)
      this.displayScorecard = true
    },
      err => {
        console.log(err)
        //this.toast("Contact Administrator", "person@email.com")
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      });



  }

  /**Finds all data for scorecard, for the given crash IDs */
  getScorecardsByCrashID(crash_ids, cluster_type) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    let request_obj = { "crash_ids": crash_ids, "cluster_type": cluster_type }
    //console.log("BY ID: " + JSON.stringify(request_obj))
    var scorecards = this.http.post(`https://${globals.restApiURL}${globals.scorecardHelper}`, request_obj,httpOptions).subscribe(res => {
      let response = res as any[]

      let uniques = {}
      response.forEach(crash => {
        let crash_id = crash.crash_id
        uniques[crash_id] = crash
      })
      for (let key in uniques) {
        this.corridor_scorecard_data.push(uniques[key])
      }
      this.calculateScorecard(this.corridor_scorecard_data)
      this.scorecardData.countermeasures = this.countermeasures_list;
      this.scorecardData.ready = true
    },
      err => {
        console.log(err)
        //this.toast("Contact Administrator", "person@email.com")
        // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      });



  }

  /**On-the-fly calculations for scorecard */
  calculateScorecard(array) {
    console.log(array)
    let this_corridor_data = {

      total_crashes: 0,
      total_inj: 0,
      cluster: "",
      county: "",
      crash_lane_number: '',
      crash_roadway_classification: "",
      crash_roadway_classification_extra: "",
      crash_sev_: 0,//findMax
      gis_avg_daily_traffic: 0, //get median
      gis_parks: 0, // get median
      gis_schools: 0, //get median
      gis_transit_stops: 0, //get median
      hit_run: 0, //count Y
      pbcat_crash_group: [],
      person_alcohol_involved_positive: 0,//get AVG
      person_drug_involved_positive: 0,//get AVG
      type: ''
    }

    let crash_sev_max = 0
    let parks = [0]
    let schools = [0]
    let stops = [0]
    let daily_traffic = []
    let injs = 0
    let hitrun = 0
    let alchohol_avg = []
    let drug_avg = []
    let crash_group_counter = {}


    array.forEach(element => {
      //calculated fields

      if (element.hit_run == "Y") {
        hitrun += 1
      }
      if (element.alch_PersonAlcoholID == 1) {
        alchohol_avg.push(element.alch_PersonAlcoholID)
      }
      if (element.drug_PersonDrugID == 1) {
        drug_avg.push(element.drug_PersonDrugID)
      }
      if (!crash_group_counter[element.crash_group_description]) {
        crash_group_counter[element.crash_group_description] = 1
      }
      else {
        crash_group_counter[element.crash_group_description] += 1
      }
      // current-row -> sev 4, next is 2
      if (element.crash_sev_ > crash_sev_max) {
        crash_sev_max = element.crash_sev_
      }
      if (element.crash_sev_ID == 1 || element.crash_sev_ID == 4) { injs += 1 }
      console.log(element.crash_sev_)

      parks.push(element.parks)
      schools.push(element.schools)
      stops.push(element.transit_stops)

      daily_traffic.push(element.avg_daily_traffic)



      let corr_name: string[] = element.cluster.split(":")
      corr_name.pop()
      this_corridor_data.cluster = this.toTitleCase(corr_name.pop())
      this_corridor_data.county = element.county
      this_corridor_data.crash_lane_number = element.crash_lane_number
      this_corridor_data.crash_roadway_classification = element.on_off_system

      if (element.rural_urban) {
        if (element.rural_urban < 2) {
          this_corridor_data.crash_roadway_classification_extra = "Rural"

        }
        else if (element.rural_urban >= 2 && element.rural_urban < 5) {
          this_corridor_data.crash_roadway_classification_extra = "Urban"
        }
        else {
          this_corridor_data.crash_roadway_classification_extra = "Unknown"
        }

      }



      if (element.type_ == "BIKE") { this_corridor_data.type = "Pedalcyclist" }
      if (element.type_ == "PEDESTRIAN") { this_corridor_data.type = "Pedestrian" }

    });

    let alch_AVG = (this.getSUM(alchohol_avg) / array.length) * 100
    let drug_AVG = (this.getSUM(drug_avg) / array.length) * 100

    //check nulls roadway classification
    if (!this_corridor_data.crash_roadway_classification) {
      this_corridor_data.crash_roadway_classification = this.scorecardFixNulls(array, "on_off_system")
    }

    //check null rural urban
    if (!this_corridor_data.crash_roadway_classification_extra) {
      this_corridor_data.crash_roadway_classification_extra = this.scorecardFixNulls(array, "rural_urban")
    }

    //check lane num
    if (!this_corridor_data.crash_lane_number) {
      this_corridor_data.crash_lane_number = this.scorecardFixNulls(array, "lane_num")
    }

    this_corridor_data.person_alcohol_involved_positive = parseFloat(alch_AVG.toFixed(1))
    this_corridor_data.person_drug_involved_positive = parseFloat(drug_AVG.toFixed(1))
    this_corridor_data.gis_parks = this.getMedian(parks)
    this_corridor_data.crash_sev_ = crash_sev_max
    this_corridor_data.gis_schools = this.getMedian(schools)
    this_corridor_data.hit_run = hitrun
    this_corridor_data.total_crashes = array.length
    this_corridor_data.gis_transit_stops = this.getMedian(stops)

    this_corridor_data.total_inj = injs


    let median_traffic = this.getMedian(daily_traffic)
    this_corridor_data.gis_avg_daily_traffic = this.commafy(median_traffic)

    //For crash group table
    for (let key in crash_group_counter) {
      let crash_group_desc =
      {
        "description": key,
        "count": crash_group_counter[key]
      }
      this_corridor_data.pbcat_crash_group.push(crash_group_desc)

    }
    this.scorecardData.data = this_corridor_data

    this.calculateCrashesByYear(array)



  }
  /**On-the-fly calculations for scorecard Year data */
  calculateCrashesByYear(array) {
    let _2014 = 0
    let _2015 = 0
    let _2016 = 0
    let _2017 = 0
    let _2018 = 0

    let color = this.RED //bikes

    if (array[0].type_ == "PEDESTRIAN") {
      color = this.BLUE

    }




    let labels = ['2018', '2017', '2016', '2015', '2014'] //2018 on top of all years - horizontal bar chart

    array.forEach(element => {
      if (element.year_) {
        if (element.year_ == 2014) { _2014++ }
        if (element.year_ == 2015) { _2015++ }
        if (element.year_ == 2016) { _2016++ }
        if (element.year_ == 2017) { _2017++ }
        if (element.year_ == 2018) { _2018++ }
      }

    });
    let data = [_2018, _2017, _2016, _2015, _2014] //2018 on top of all years - horizontal bar chart
    let year_data =
    {
      labels: labels,
      datasets: [
        {
          label: 'Crashes by Year',
          backgroundColor: color,
          borderColor: color,
          data: data,
        }
      ],
      options: {
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,   // minimum value will be 0.,
              stepSize: 1
            }
          }]
        }
      }
    }
    this.scorecardData.chart_data.year_data = year_data

  }

  /**Returns the sum of an array of digits */
  getSUM(array: number[]) {
    let sum = 0
    array.forEach(element => {
      sum += element
    });
    return sum
  }
  /**Returns the average of an array of digits */
  getAVG(array: number[]) {
    let sum = this.getSUM(array)

    if (sum > 0) {
      return (sum / array.length) * 100
    }
    return 0
  }
  /**Gets a list of countermeasure IDs for the given cluster*/
  findCountermeasures(cluster_name: string, cluster_type: string) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    let req_obj = { cluster_name: cluster_name, cluster_type: cluster_type }
    var scorecards = this.http.post(`https://${globals.restApiURL}${globals.getCountermeasures}`, req_obj,httpOptions).subscribe(res => {
      let response = res as any[]
      this.countermeasures_list = []
      response.forEach(cluster => {
        this.findCountermeasuresByID(cluster.cmId)
      });

      console.log(this.countermeasures_list)



    },
      err => {
        console.log(err)
        //this.toast("Contact Administrator", "person@email.com")
        // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      });


  }
  /**Gets a list of countermeasures with description, given the list of countermeasure IDs*/
  findCountermeasuresByID(counterID: number) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };

    var counters = this.http.post(`https://${globals.restApiURL}${globals.getCountermeasuresbyID}`, { "cmId": counterID },httpOptions).subscribe(res => {
      let response = res as any

      this.countermeasures_list.push(response[0])
    },
      err => {
        console.log(err)
        //this.toast("Contact Administrator", "person@email.com")
        // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      });


  }
  /**For every word, capitalize the first character */
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  /**Finds non null values and returns the value or string message */
  scorecardFixNulls(array: any[], field?: string): string {

    if (field) {

      array.forEach(element => {
        if (element[field]) { // null/undefined values returns false
          return element[field]
        }
      });
    }
    else {
      array.forEach(element => {
        if (element) { // null/undefined values returns false
          return element
        }
      });
    }
    return "No data found"
  }

  /**Adds commas after every 3rd digit */
  commafy(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**Sorts array and returns median value */
  getMedian(array: number[]): number {

    if (!array || array.length == 0) {
      return 0
    }
    //sort
    let sorted = array.sort()
    //find middle
    let middle = Math.round(((sorted.length) / 2))
    //return
    return sorted[middle]
  }
}
