import { person } from '../entity/person';
import { contributing_factors } from '../entity/contributing_factors';
import { crash_type } from '../entity/crash_type'

/**
 *
 * [
    {
        "crash_id": 16279183,
        "crash_date": "2018-03-03T12:00:00.000Z",
        "latitude": 32.842754,
        "longitude": -97.341064,
        "progress": 0,
        "persons": [
            {
                "id": 3,
                "age": 27,
                "typePersonType": {
                    "Person_Type_ID": 4,
                    "Description": "PEDESTRIAN"
                },
                "injuryPersonInjury": {
                    "Person_Injury_ID": 4,
                    "Description": "KILLED"
                }
            },
 */
export class LeftBarData {

  CrashID: number;
  crash_date: Date;
 // crash_types: string = "";
  Year: number;
  latitude: number;
  longitude: number;
  Complete: number;
  persons: person[];
  People: number;
  Injuries: string = "";
  Types: string = "";
  constructor(data) {
    this.CrashID = data.crash_id
    this.crash_date = new Date(data.crash_date)
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.Complete = data.progress
    this.Year = this.crash_date.getFullYear()
    this.People = data.persons.length

    var injuries = new Set<string>()
    var types = new Set<string>()
   // var pbcat_crash_types = new Set<string>()

    for (var p of data.persons) {
      injuries.add(p.injuryPersonInjury.Description)
      types.add(p.typePersonType.Description)
    }

    this.Injuries = Array.from(injuries).sort().join(",")
    this.Types = Array.from(types).sort().join(",")
    //this.crash_types = Array.from(pbcat_crash_types).sort().join(",")

  }

}
