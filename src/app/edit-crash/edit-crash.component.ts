import { Component, OnInit } from '@angular/core';

import { MessageService, ConfirmationService } from 'primeng/primeng';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Router, ActivatedRoute } from '@angular/router';
import { SelectedCrashService } from '../helpers/SelectedCrashService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { crash } from '../entity/crash';
import { plainToClass } from 'class-transformer';
import { globals } from '../global';
import { google } from '@google/maps';
import { charges } from '../entity/charges';
import { AllowedValues } from '../helpers/AllowedValues';
import { person } from '../entity/person';
import { unit } from '../entity/unit';
import { crash_type } from '../entity/crash_type'
import { diff} from 'deep-object-diff'
import { UserStore } from '../helpers/user.store';
declare var google: any;


@Component({
  selector: 'app-edit-crash',
  templateUrl: './edit-crash.component.html',
  styleUrls: ['./edit-crash.component.css']
})
export class EditCrashComponent implements OnInit {

  diffJson: any;
  originalCrash: crash;
  selectedCrash: crash;
  crashTypeInfo: crash_type;
  crashTypeJson: any;
  crash_date: Date; // need to feed to selected crash on save
  numberOfPedestrians: number;
  numberOfBicyclists: number;
  hitAndRun: boolean;
  modifyCrashType: crash_type;
  currentUser: any;

  initialComputations(c: crash) {
    this.numberOfPedestrians = 0
    this.numberOfBicyclists = 0
    this.crash_date = new Date(this.selectedCrash.crash_date)
    this.hitAndRun = false;


    c.persons.forEach((p: person) => {
      //console.log(this)
      if (p.typePersonType.Person_Type_ID === 3) {//pedalcyclist
        this.numberOfBicyclists = this.numberOfBicyclists + 1
      }
      if (p.typePersonType.Person_Type_ID === 4) {
        this.numberOfPedestrians = this.numberOfPedestrians + 1
      }
    })

    c.units.forEach(function (u: unit) {
      //console.log(u.hit_run.trim())
      if (u.hit_run.trim() == "Y") {
        //console.log(this)
        this.hitAndRun = true
      }
    }.bind(this))


  }

  public schoolZoneOptions: any = [{
    value: "Y", label: "Y"
  }, {
    value: "N", label: "N"
  }];

  mapOptions = {
    center: globals.startCenter,
    zoom: 18,
    mapTypeId: 'satellite'
  };
  map: google.maps.Map;
  setMap(event) {
    this.map = event.map;
    this.locationUpdated();
  }
  mapOverlays = []

  dateUpdated() {
    this.selectedCrash.crash_date = this.crash_date;
  }

  locationUpdated() {
    this.map.panTo(new google.maps.LatLng({ lat: this.selectedCrash.latitude, lng: this.selectedCrash.longitude }))
    this.mapOverlays = [new google.maps.Marker({
      position: { lat: this.selectedCrash.latitude, lng: this.selectedCrash.longitude },
      draggable: true
    })]
  }
  dragEnd(event) {

    this.selectedCrash.latitude = event.originalEvent.latLng.lat()
    this.selectedCrash.longitude = event.originalEvent.latLng.lng()
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    public allowedValues: AllowedValues,
    public confirmationService: ConfirmationService,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private selectedCrashService: SelectedCrashService,
    private activatedRoute: ActivatedRoute) { }



  fetchCrashData(crashID: number) {

    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };

    this.http.get(`https://${globals.restApiURL}${globals.crash}${crashID}`,httpOptions).subscribe(res => {
      this.selectedCrash = <crash>plainToClass(crash, res as Object)
      this.originalCrash = <crash>plainToClass(crash, res as Object)
      //console.table(this.selectedCrash.gisAnalysiss)
      this.initialComputations(this.selectedCrash)
      this.mapOptions.center = { lat: this.selectedCrash.latitude, lng: this.selectedCrash.longitude }
      this.mapOverlays = [new google.maps.Marker({
        position: { lat: this.selectedCrash.latitude, lng: this.selectedCrash.longitude }
      })]
      if (this.map) {
        this.locationUpdated();
      }
    },
      err => {
        console.log(err)
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      })



  }

  removeCharge(i: number) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    this.http.delete(`https://${globals.restApiURL}${globals.delCharge}${this.selectedCrash.chargess[i].id}`,httpOptions).subscribe(res => {
      this.messageService.add({ "severity": "info", "summary": "Charge removed." })
      this.fetchCrashData(this.selectedCrash.crash_id)
    },
      err => {
        console.log(err)
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      })

  }
  addCharge() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    this.http.put(`https://${globals.restApiURL}${globals.addCharge}`, { crash_id: this.selectedCrash.crash_id },httpOptions).subscribe(res => {
      this.messageService.add({ "severity": "info", "summary": "New charge created." })
      let c = <charges>plainToClass(charges, res as Object)
      this.selectedCrash.chargess.push(c)

    },
      err => {
        console.log(err)
      //  this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      })

  }
  removePerson(i: number) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    this.http.delete(`https://${globals.restApiURL}${globals.delPerson}${this.selectedCrash.persons[i].id}`,httpOptions).subscribe(res => {
      this.messageService.add({ "severity": "info", "summary": "Person removed." })
      this.fetchCrashData(this.selectedCrash.crash_id)
    },
      err => {
        console.log(err)
     //   this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      })

  }
  addPerson() {

    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    this.http.put(`https://${globals.restApiURL}${globals.addPerson}`, { crash_id: this.selectedCrash.crash_id },httpOptions).subscribe(res => {
      this.messageService.add({ "severity": "info", "summary": "New person created." })
      let c = <person>plainToClass(person, res as Object)
      this.selectedCrash.persons.push(c)
    },
      err => {
        console.log(err)
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      })

  }
  removeUnit(i: number) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    this.http.delete(`https://${globals.restApiURL}${globals.delUnit}${this.selectedCrash.units[i].id}`,httpOptions).subscribe(res => {
      this.messageService.add({ "severity": "info", "summary": "Unit removed." })
      this.fetchCrashData(this.selectedCrash.crash_id)
    },
      err => {
        console.log(err)
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      })

  }
  addUnit() {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    this.http.put(`https://${globals.restApiURL}${globals.addUnit}`, { crash_id: this.selectedCrash.crash_id },httpOptions).subscribe(res => {
      this.messageService.add({ "severity": "info", "summary": "New unit created." })
      let c = <unit>plainToClass(unit, res as Object)
      this.selectedCrash.units.push(c)
    },
      err => {
        console.log(err)
       // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      })

  }

  showSave: boolean = false;
  commitChanges() {

    this.diffJson = diff(this.originalCrash, this.selectedCrash);
    this.showSave = true;
  }

  cancelSave() {
    this.messageService.add({ "severity": "info", "summary": "Nothing done to the Database." })
    this.showSave = false;
  }
  finalSave() {

    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    this.http.put(`https://${globals.restApiURL}${globals.crash}${this.selectedCrash.crash_id}`, this.selectedCrash,httpOptions).subscribe(res => {
      this.messageService.add({ "severity": "info", "summary": "Edits saved." })
      this.showSave = false;
      this.fetchCrashData(this.selectedCrash.crash_id)

    },
      err => {
        console.log(err)
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      })

  }

  ngOnInit() {

      this.activatedRoute
      .queryParams
      .subscribe(params => {
        let selectedId = +params['id'];
        console.log(selectedId)
        if (selectedId){
        this.fetchCrashData(selectedId)
        }
      });
    this.currentUser =<UserStore>(JSON.parse(localStorage.getItem('currentUser')));
    this.selectedCrashService.newCrash.subscribe((crashID) => {
      //handle crash change
      this.fetchCrashData(crashID)

    });
  }


}
