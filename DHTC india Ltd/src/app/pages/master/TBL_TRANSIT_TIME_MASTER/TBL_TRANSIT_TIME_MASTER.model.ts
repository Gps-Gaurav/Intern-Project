import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_TRANSIT_TIME_MASTERModel extends BasePrimary {

    ID: string;
FROM_CODE: string;
FROM_NAME: string;
TO_CODE: string;
TO_NAME: string;
TRANSIT_DAYS: Number;
DISTANCE: Number;
ENTERBY: string;
ENTERDATE: string;
IsChecked:boolean;

}