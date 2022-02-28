import { plainToClass } from 'class-transformer';
import { globals } from '../global';

//data to build filters 

export class Filters {
    crash: Filter_Elements[];
    crash_type: Filter_Elements[];
    gis_analysis: Filter_Elements[];
    person: Filter_Elements[];
    unit: Filter_Elements[];
    constructor(){
        
    }
}

export class Filter_Elements {
    COLUMN_NAME: string;
    DATA_TYPE: string;
    max_num: number;
    min_num: number;
    unique_count: number;
    label: string;
    render: string;
    options: any;
    TABLE_NAME: string;
  }
 

