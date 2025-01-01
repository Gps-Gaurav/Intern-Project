import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_RENT_MASTERModel extends BasePrimary {

    ID: string;
CODE: string;
BRANCH_CODE: string;
BRANCH_NAME: string;
TYPE: string;
AREA: string;
NAME: string;
LANDLORD_NAME: string;
ADDRESS: string;
CITY: string;
PIN: string;
RENT: Number;
OCCUPIED_FROM: string;
VACATE_DATE: string;
PRV_AMOUNT: string;
FROM_DATE: string;
TO_DATE: string;
IsChecked:boolean;

}