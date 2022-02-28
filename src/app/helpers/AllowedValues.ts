import { Injectable } from '@angular/core';
import { person__helmet } from '../entity/person__helmet';
import { person__type } from '../entity/person__type';
import { person__gender } from '../entity/person__gender';
import { person__ethnicity } from '../entity/person__ethnicity';
import { person__alcohol } from '../entity/person__alcohol';
import { person__drug } from '../entity/person__drug';
import { person__injury } from '../entity/person__injury';
import { globals } from '../global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { city } from '../entity/city';
import { contributing_factors } from '../entity/contributing_factors';
import { county } from '../entity/county';
import { light_conditions } from '../entity/light_conditions';
import { rdwy_alignment } from '../entity/rdwy_alignment';
import { rdwy_classification } from '../entity/rdwy_classification';
import { rdwy_type } from '../entity/rdwy_type';
import { surface__condition } from '../entity/surface__condition';
import { surface__type } from '../entity/surface__type';
import { traffic__control } from '../entity/traffic__control';
import { vehicle__body } from '../entity/vehicle__body';
import { vehicle__description } from '../entity/vehicle__description';
import { vehicle_defects } from '../entity/vehicle_defects';
import { weather } from '../entity/weather';
import { plainToClass } from 'class-transformer';
import { rural_urban_type } from '../entity/rural_urban_type';
import { freight_network } from '../entity/freight_network';
import { marked_crosswalks } from '../entity/marked_crosswalks';
import { street_parking } from '../entity/street_parking';
import { sidewalk_presence } from '../entity/sidewalk_presence';
import { median_type } from '../entity/median_type';
// import { school_types } from '../entity/school_types';
import { rdwy_part } from '../entity/rdwy_part';
import { isString } from 'util';



@Injectable()
export class AllowedValues {

  citys: city[]
  contributing_factorss: contributing_factors[]
  countys: county[]
  freight_networks: freight_network[]
  light_conditionss: light_conditions[]
  marked_crosswalkss: marked_crosswalks[]
  median_types: median_type[]
  person__drugs: person__drug[]
  person__alcohols: person__alcohol[]
  person__ethnicitys: person__ethnicity[]
  person__helmets: person__helmet[]
  person__injurys: person__injury[]
  person__types: person__type[]
  person__genders: person__gender[]
  rdwy_alignments: rdwy_alignment[]
  rdwy_classifications: rdwy_classification[]
  rdwy_types: rdwy_type[]
  // school_typess: school_types[]
  sidewalk_presences: sidewalk_presence[]
  street_parkings: street_parking[]
  surface__conditions: surface__condition[]
  surface__types: surface__type[]

  traffic__controls: traffic__control[]
  vehicle__bodys: vehicle__body[]
  vehicle__descriptions: vehicle__description[]
  vehicle_defectss: vehicle_defects[]
  weathers: weather[]

  yes_no = [{ label: "Yes", value: "Y" }, { label: "No", value: "N" }, { label: "Empty", value: "" }]
  fetchedAllowed: boolean = false;
  rural_urban_types: rural_urban_type[];
  rdwy_part: rdwy_part[];



  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    this.getAllowed()

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


  getAllowed() {
    console.log("get allowed called")
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem("access_token")
    });

        const httpOptions = {
          headers: headers_object
        };
    var json = this.http.get(`https://${globals.restApiURL}${globals.city}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.citys = plainToClass(city, response)



      },
      err => {
        console.log(err)
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.contributing_factors}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })



        this.contributing_factorss = plainToClass(contributing_factors, response)
      },
      err => {
        console.log(err)
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    // var json = this.http.get(`https://${globals.restApiURL}${globals.school_types}`).subscribe(
    //   res => {
    //     let response = res as Object[]
    //     response.forEach(element => {
    //       for (let key in element) {
    //         if (isString(element[key])) {
    //           element[key] = this.toTitleCase(element[key])
    //         }
    //       }
    //     })

    //     this.school_typess = plainToClass(school_types, response)
    //   },
    //   err => {
    //     console.log(err)
    //     // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
    //   }
    // )


    var json = this.http.get(`https://${globals.restApiURL}${globals.median_type}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.median_types = plainToClass(median_type, response)
      },
      err => {
        console.log(err)
        // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )


    var json = this.http.get(`https://${globals.restApiURL}${globals.sidewalk_presence}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.sidewalk_presences = plainToClass(sidewalk_presence, response)
      },
      err => {
        console.log(err)
        //     this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.street_parking}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.street_parkings = plainToClass(street_parking, response)
      },
      err => {
        console.log(err)
        //  this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.marked_crosswalks}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.marked_crosswalkss = plainToClass(marked_crosswalks, response)
      },
      err => {
        console.log(err)
        //  this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.freight_network}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.freight_networks = plainToClass(freight_network, response)
      },
      err => {
        console.log(err)
        //   this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.county}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.countys = plainToClass(county, response)
      },
      err => {
        console.log(err)
        //   this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.light_conditions}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.light_conditionss = plainToClass(light_conditions, response)
      },
      err => {
        console.log(err)
        //  this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.person__drug}`,httpOptions).subscribe(

      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })


        this.person__drugs = plainToClass(person__drug, response)
      },
      err => {
        // console.log("Error in Drug\n")
        console.log(err)
        //   this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )
    var json = this.http.get(`https://${globals.restApiURL}${globals.person__gender}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.person__genders = plainToClass(person__gender, response)
      },
      err => {
        console.log(err)
        //  this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.person__alcohol}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.person__alcohols = plainToClass(person__alcohol, response)
      },
      err => {
        console.log(err)
        // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.person__ethnicity}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.person__ethnicitys = plainToClass(person__ethnicity, response)
      },
      err => {
        console.log(err)
        //   this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.person__helmet}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.person__helmets = plainToClass(person__helmet, response)
      },
      err => {
        console.log(err)
        //   this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.person__injury}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.person__injurys = plainToClass(person__injury, response)
      },
      err => {
        console.log(err)
        // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.person__type}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.person__types = plainToClass(person__type, response)
      },
      err => {
        console.log(err)
        //   this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.rdwy_alignment}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.rdwy_alignments = plainToClass(rdwy_alignment, response)
      },
      err => {
        console.log(err)
        //   this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.rdwy_classification}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.rdwy_classifications = plainToClass(rdwy_classification, response)
      },
      err => {
        console.log(err)
        //    this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.rdwy_type}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.rdwy_types = plainToClass(rdwy_type, response)
      },
      err => {
        console.log(err)
        // this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.surface__condition}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.surface__conditions = plainToClass(surface__condition, response)
      },
      err => {
        console.log(err)
        //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.surface__type}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.surface__types = plainToClass(surface__type, response)
      },
      err => {
        console.log(err)
        //  this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.traffic__control}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.traffic__controls = plainToClass(traffic__control, response)
      },
      err => {
        console.log(err)
        //  this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.vehicle__body}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.vehicle__bodys = plainToClass(vehicle__body, response)
      },
      err => {
        console.log(err)
        //  this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.vehicle__description}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.vehicle__descriptions = plainToClass(vehicle__description, response)
      },
      err => {
        console.log(err)
        //   this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.vehicle_defects}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.vehicle_defectss = plainToClass(vehicle_defects, response)
      },
      err => {
        console.log(err)
        //    this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )

    var json = this.http.get(`https://${globals.restApiURL}${globals.weather}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.weathers = plainToClass(weather, response)
      },
      err => {
        console.log(err)
        //  this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )
    var json = this.http.get(`https://${globals.restApiURL}${globals.rural_urban_type}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.rural_urban_types = plainToClass(rural_urban_type, response)
      },
      err => {
        console.log(err)
        //      this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )



    var json = this.http.get(`https://${globals.restApiURL}${globals.rdwy_part}`,httpOptions).subscribe(
      res => {
        let response = res as Object[]
        response.forEach(element => {
          for (let key in element) {
            if (isString(element[key])) {
              element[key] = this.toTitleCase(element[key])
            }
          }
        })

        this.rdwy_part = plainToClass(rdwy_part, response)
      },
      err => {
        console.log(err)
        //    this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
      }
    )
    this.fetchedAllowed = true


  }
}
