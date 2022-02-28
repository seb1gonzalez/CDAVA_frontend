///old file remove 

export const filters_json = 
[
    
    { //CRASH: CITIES
        "tag-type":"p-listbox",
        "options": "citys",
        "ngModel": "selectedCities",
        "optionLabel":"description",
        "dataKey":"city_id",
        "onClick":"cities",
        "header":"City",
        "toogle-menu":"top-filters"
    },

    { //CRASH: COUNTIES
        "tag-type":"p-listbox",
        "options": "countys",
        "ngModel": "selectedCounties",
        "optionLabel":"description",
        "dataKey":"county_id",
        "onClick":"counties",
        "header":"County",
        "toogle-menu":"top-filters"
    },

    { //CRASH: RDWY CLASSIFICATIONS
        "tag-type":"p-listbox",
        "options": "rdwy_alignments",
        "ngModel": "selectedRwdyAl",
        "optionLabel":"description",
        "dataKey":"alignment_id",
        "onClick":"rwdy_alignments",
        "header":"Roadway Alignment",
        "toogle-menu":"top-filters"
    },

    { //CRASH: RWDY TYPES
        "tag-type":"p-listbox",
        "options": "rdwy_classifications",
        "ngModel": "selectedRwdyCl",
        "optionLabel":"description",
        "dataKey":"classification_id",
        "onClick":"rdwy_classifications",
        "header":"Roadway Classification",
        "toogle-menu":"top-filters"
    },

    { //CRASH: RDWY PART
        "tag-type":"p-listbox",
        "options": "rdwy_types",
        "ngModel": "selectedRdwyType",
        "optionLabel":"description",
        "dataKey":"Rdwy_type_id",
        "onClick":"rdwy_types",
        "header":"Roadway Type",
        "toogle-menu":"top-filters"
    },

    { //CRASH: LIGHT CONDITIONS
        "tag-type":"p-listbox",
        "options": "light_conditionss",
        "ngModel": "selectedLightCond",
        "optionLabel":"description",
        "dataKey":"condition_id",
        "onClick":"light_conditions",
        "header":"Light Condition",
        "toogle-menu":"top-filters"
    },

    { //CRASH: WEATHERS
        "tag-type":"p-listbox",
        "options": "weathers",
        "ngModel": "selectedWeather",
        "optionLabel":"Description",
        "dataKey":"Weather_ID",
        "onClick":"weathers",
        "header":"Weather",
        "toogle-menu":"top-filters"
    },

    { //PERSON: PERSON ETHNICITY
        "tag-type":"p-listbox",
        "options": "person__ethnicitys",
        "ngModel": "selectedPersonEth",
        "optionLabel":"Description",
        "dataKey":"Person_Ethn_ID",
        "onClick":"person__ethnicitys",
        "header":"Person Ethnicity",
        "toogle-menu":"top-filters"
    },

    { //PERSON: PERSON TYPES
        "tag-type":"p-listbox",
        "options": "person__types",
        "ngModel": "selectedPersonType",
        "optionLabel":"Description",
        "dataKey":"Person_Type_ID",
        "onClick":"person_type",
        "header":"Person Type",
        "toogle-menu":"top-filters"
    },

    { //PERSON: PERSON INJURY
        "tag-type":"p-listbox",
        "options": "person__injurys",
        "ngModel": "selectedPersonInj",
        "optionLabel":"Description",
        "dataKey":"Person_Injury_ID",
        "onClick":"person__injury",
        "header":"Person Injury",
        "toogle-menu":"top-filters"
    },

    { //PERSON: PERSON GENDER
        "tag-type":"p-listbox",
        "options": "person__genders",
        "ngModel": "selectedPersonGen",
        "optionLabel":"Description",
        "dataKey":"Person_Gender_ID",
        "onClick":"person_gender",
        "header":"Person Gender",
        "toogle-menu":"top-filters"
    },

    { //PERSON: PERSON ALCOHOL
        "tag-type":"p-listbox",
        "options": "person__alcohols",
        "ngModel": "selectedPersonAlch",
        "optionLabel":"Description",
        "dataKey":"Person_Alcohol_ID",
        "onClick":"person__alcohol",
        "header":"Alcohol Result",
        "toogle-menu":"top-filters"
    },

    { //PERSON: PERSON DRUGS
        "tag-type":"p-listbox",
        "options": "person__drugs",
        "ngModel": "selectedPersonDrug",
        "optionLabel":"Description",
        "dataKey":"Person_Drug_ID",
        "onClick":"person_drug",
        "header":"Drug Result",
        "toogle-menu":"top-filters"
    },

    { //PERSON: PERSON HELMET
        "tag-type":"p-listbox",
        "options": "person__helmets",
        "ngModel": "selectedPersonHelmet",
        "optionLabel":"Description",
        "dataKey":"Person_Helmet_ID",
        "onClick":"person_helmet",
        "header":"Pedalcyclist Helmet",
        "toogle-menu":"top-filters"
    },

    { //UNIT: VEHICLE BODIES
        "tag-type":"p-listbox",
        "options": "vehicle__bodys",
        "ngModel": "selectedVehicleBod",
        "optionLabel":"description",
        "dataKey":"veh_body_id",
        "onClick":"vehicle__bodys",
        "header":"Vehicle Body",
        "toogle-menu":"top-filters"
    },

    { //UNIT: VEHICLE DESCRIPTIONS
        "tag-type":"p-listbox",
        "options": "vehicle__descriptions",
        "ngModel": "selectedVehicleDesc",
        "optionLabel":"description",
        "dataKey":"description_id",
        "onClick":"vehicle__descriptions",
        "header":"Vehicle Description",
        "toogle-menu":"top-filters"
    },

    { //UNIT: VEHICLE DEFECTS
        "tag-type":"p-listbox",
        "options": "vehicle_defectss",
        "ngModel": "selectedVehicleDef",
        "optionLabel":"description",
        "dataKey":"defect_id",
        "onClick":"vehicle_defectss",
        "header":"Vehicle Defect",
        "toogle-menu":"top-filters"
    },

    { //CONTRIBUTING FACTORS
        "tag-type":"p-listbox",
        "options": "contributing_factorss",
        "ngModel": "selectedContribFactors",
        "optionLabel":"description",
        "dataKey":"factor_id",
        "onClick":"contributing_factors",
        "header":"Contributing Factor",
        "toogle-menu":"top-filters"
    },

    { //GIS_ANAYLISIS: FREIGHT NETWORKS
        "tag-type":"p-listbox",
        "options": "freight_networks",
        "ngModel": "selectedFreightNet",
        "optionLabel":"Description",
        "dataKey":"Freight_Net_ID",
        "onClick":"freight_network",
        "header":"Freight Network",
        "toogle-menu":"top-filters"
    },

    { //GIS_ANAYLISIS: MARKED CROSSWALKS
        "tag-type":"p-listbox",
        "options": "marked_crosswalkss",
        "ngModel": "selectedCrosswalks",
        "optionLabel":"Description",
        "dataKey":"Marked_Crswlk_ID",
        "onClick":"marked_crosswalks",
        "header":"Marked Crosswalk",
        "toogle-menu":"top-filters"
    },

    { //GIS_ANAYLISIS: MEDIAN TYPES 
        "tag-type":"p-listbox",
        "options": "median_types",
        "ngModel": "selectedMedianTypes",
        "optionLabel":"Description",
        "dataKey":"Median_Type_ID",
        "onClick":"median_types",
        "header":"Median Type",
        "toogle-menu":"top-filters"
    },
    
    { //GIS_ANAYLISIS: SIDEWALK PRESENCE
        "tag-type":"p-listbox",
        "options": "sidewalk_presences",
        "ngModel": "selectedSidewalkPresences",
        "optionLabel":"Description",
        "dataKey":"Sdwlk_Pres_ID",
        "onClick":"sidewalk_presences",
        "header":"Sidewalk Presence",
        "toogle-menu":"top-filters"
    },

    { //GIS_ANAYLISIS: STREET PARKINGS
        "tag-type":"p-listbox",
        "options": "street_parkings",
        "ngModel": "selectedStreetParkings",
        "optionLabel":"Description",
        "dataKey":"Street_Parking_ID",
        "onClick":"street_parkings",
        "header":"Street Parking",
        "toogle-menu":"top-filters"
    },

    { //CRASH: SURFACE CONDITIONS
        "tag-type":"p-listbox",
        "options": "surface__conditions",
        "ngModel": "selectedSurfaceCond",
        "optionLabel":"Description",
        "dataKey":"Surf_Cond_ID",
        "onClick":"surface__conditions",
        "header":"Surface Condition",
        "toogle-menu":"top-filters"
    },

    { //CRASH: SURFACE TYPES
        "tag-type":"p-listbox",
        "options": "surface__types",
        "ngModel": "selectedSurfaceTyp",
        "optionLabel":"Description",
        "dataKey":"Surface_Type_ID",
        "onClick":"surface__types",
        "header":"Surface Type",
        "toogle-menu":"top-filters"
    },

    {//TRAFFIC CONTROLS
        "tag-type":"p-listbox",
        "options": "traffic__controls",
        "ngModel": "selectedTraffContr",
        "optionLabel":"description",
        "dataKey":"control_id",
        "onClick":"traffic__controls",
        "header":"Traffic Control",
        "toogle-menu":"top-filters"
    },

    {//CRASH: RURAL URBAN TYPES
        "tag-type":"p-listbox",
        "options": "rural_urban_types",
        "ngModel": "selectedRuralUrbTyp",
        "optionLabel":"description",
        "dataKey":"rural_urban_type_id",
        "onClick":"rural_urban_types",
        "header":"Rural Urban Type",
        "toogle-menu":"top-filters"
    }
]