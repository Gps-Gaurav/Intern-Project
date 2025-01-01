import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_CHALLANModel extends BasePrimary {

    CHID: string;
CHNO: string;
BRANCH_CODE: string;
BRANCH_NAME: string;
DATE: string;
LNO1: string;
LNO2: string;
LNO3: string;
LORRYID: string;
LORRYTYPE: string;
DRIVERID: string;
FROMSTATION: string;
TOSTATION: string;
LOADFROM: string;
UNLOADAT: string;
TRANSITDAY: string;
PENALITYDAY: string;
DEPT_DATE: string;
CHALLANWT: string;
CHALLAN_PKG: string;
RATE_SETTED: string;
RATE_TYPE: string;
GAURANTEE_WT: string;
BAL_BRANCHID: string;
ADV_BRANCHID: string;
BROKERID: string;
HIRE: string;
LABOUR_CHARGES: string;
DETENTION: string;
OTHER: string;
TOTAL_HIRE: string;
LESS_ADVANCE: string;
BALANCE_HIRE: string;
TP: string;
TP_NO: string;
NO_OF_TIRPAL: string;
CHAL: string;
OE: string;
DRIVERMOB: string;
REMARKS1: string;
REMARKS2: string;
ENTRYBY: string;
ENTERYDATE: string;
FINYR: string;
PAYMENT_BY_OTHER_BRANCH: boolean;
STOP_PAYMENT: boolean;
PAYMENT_BY_OTHERBRANCH_CODE: string;
STOP_PAYMENT_CLAIM_RATE: string;
STOP_PAYMENT_OTHER_RATE: string;
SEAL_NO: string;
DRIVERMOBILE2: string;
CARD_NO: string;
ConEWaybill: string;


}