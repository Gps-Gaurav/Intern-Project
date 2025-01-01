import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_DELIVERY_STATEMENT_ENTRYModel extends BasePrimary {

    CODE: string;
DELIVERY_NO: string;
FROM_BRANCH_CODE: string;
FROM_BRANCH_NAME: string;
D_Date: string;
CNCL: string;
ENTRY_BY: string;
ENTRY_DATE: string;
REMARKS: string;
BILTYNO: string;
BILTY_DATE: string;
FROM_STATION_CODE: string;
FROM_STATION_NAME: string;
TO_STATION_CODE: string;
TO_STATION_NAME: string;
PKG: string;
BILTY_WT: string;
CODES: string;
PARTY_NAME: string;
SHORT_PKG: string;
DLY_PKG: string;
SHORT_WT: string;
BROKEN_WT: string;
FRESH_WT: string;
RETURN_PKG: string;
RETURN_WT: string;
REJECT_WT: string;
FRESH_PKG: string;


}