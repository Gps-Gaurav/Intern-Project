import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_ACKNOWLEDGEMENT_ENTRYModel extends BasePrimary {

    CODE: string;
LETTER_NO: string;
FROM_BRANCH_CODE: string;
FROM_BRANCH_NAME: string;
TO_BRANCH_CODE: string;
TO_BRANCH_NAME: string;
LETTER_Date: string;
RECD_Date: string;
ENTRY_BY: string;
ENTRY_DATE: string;
BILTYNO: string;
BILTY_DATE: string;
FROM_STATION_CODE: string;
FROM_STATION_NAME: string;
TO_STATION_CODE: string;
TO_STATION_NAME: string;
PKG: string;
CODES: string;
REMARKS: string;
IsChecked:boolean;

}