import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_SHORT_CERTIFICATE_ENTRYModel extends BasePrimary {

    CODE: string;
CERTIFICATE_NO: string;
FROM_BRANCH_CODE: string;
FROM_BRANCH_NAME: string;
D_Date: string;
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
PKG_BOOKED: string;
DLY_PKG: string;
PKG_SHORT: string;
PKG_DAMAGE: string;
WT_BOOKED: string;
DELIVERED_WT: string;
WT_SHORT: string;
WT_DAMAGE: string;
AMOUNT: string;
IsChecked:boolean;

}