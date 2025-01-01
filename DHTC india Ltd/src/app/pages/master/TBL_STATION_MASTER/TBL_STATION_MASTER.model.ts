import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_STATION_MASTERModel extends BasePrimary {

    ID: string;
STATION_CODE: string;
STATION_NAME: string;
CONTROL_BRANCH_CODE: string;
CONTROL_BRANCH_NAME: string;
STATION_TYPE: string;
STATE_CODE: string;
IN_WHICH_STATE: string;
DISTANCE: string;
PARALLEL_CODE: string;
PARALLEL_NAME: string;
ENTRY_DATE: string;
ENTRY_BY: string;

IsChecked:boolean;

}