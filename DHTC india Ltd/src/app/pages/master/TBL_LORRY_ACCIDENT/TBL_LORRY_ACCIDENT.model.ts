import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_LORRY_ACCIDENTModel extends BasePrimary{

    ID: string;
    FROM_STATION_CODE: string;
    FROM_STATION_NAME: string;
    CHALLAN_NO: string;
    FILE_NO: string;
    LORRY_NO: string;
    ACCIDENT_AT: string;
    CONT_NU: string;
    BRANCH_CODE: string;
    BRANCH_NAME: string;
    POLICE_STATION: string;
    FIR_LODGE: string;
    PHOTO_RECEIVE: string;
    GOODS_COLLECTED_BY: string;
    BILTY_WISE_ENTRY: string;
    NAME_OF_PERSON: string;
    REASON_FOR_SHORTAGE: string;
    DAMAGE: string;
    LYING_SWEEPING_AT: string;
    ADV_DEDUCT: string;
    SHORTAGE_WT: string;
    SHORTAGE_PKG: string;
    SHORTAGE_VALUE: string;
    SWEEPING_WT: string;
    SWEEPING_PKG: string;
    SWEEPING_VALUE: string;
    REMARKS: string;
    IsChecked:boolean;
}