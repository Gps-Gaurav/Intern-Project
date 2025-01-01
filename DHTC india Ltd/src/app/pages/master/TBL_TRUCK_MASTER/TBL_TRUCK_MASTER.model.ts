import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_TRUCK_MASTERModel extends BasePrimary {

    CODE: string;
LNO1: string;
LNO2: string;
LNO3: string;
BLACK_LISTED: string;
CHASSIS_NO: string;
GROUPS: string;
ENGINE_NO: string;
REGAT: string;
BODY_TYPE: string;
MAKE: string;
MODEL: string;
COLOR: string;
PERMIT: string;
DATE: string;
VALID_STATE: string;
INSURANCE: string;
POLICY_BO: string;
POLICY_VALID: string;
ADDRESS: string;
DIVNNO: string;
HIGHT: string;
LENGTH: string;
WIDTH: string;
LODING: string;
UNLODING: string;
FITNESS_VALID: string;
TAX_TOKEN_NO: string;
TAX_ISSUE_FROM: string;
TAX_VALID_UPTO: string;
VEHICLE_TYPE: string;
OWNER_NAME: string;
SONE_OF: string;
PAN: string;
ADDRES_PERM: string;
ADDRESS_TEMP: string;
PHONE: string;
LAST_INST: string;
FINANCER_NAME: string;
FINANCER_ADDRESS: string;
FINANCER_SON_OF: string;
PINANCER_PHONE: string;
DRIVER_CODE: string;
DRIVER_NAME: string;
ENTRY_BY: string;
ENTRY_DATE: string;
REMARKS: string;
IsChecked:boolean;

}