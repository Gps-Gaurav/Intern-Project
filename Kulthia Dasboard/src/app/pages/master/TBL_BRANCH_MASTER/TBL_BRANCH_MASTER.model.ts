import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_BRANCH_MASTERModel extends BasePrimary {

  
    brancH_CODE: string;
    brancH_NAME: string;
STATE_CODE: string;
STATE_NAME: string;
MANAGER_NAME: string;
ADDRESS: string;
CITY: string;
PIN: string;
STD_CODE: string;
FAX_NO: string;
PHONE_OFFICE: string;
PHONE_RESI: string;
MOBILE: string;
PAGER: string;
EMAIL: string;
AGENT_BRANCH: string;
REGIONAL_BRANCH: string;
ZONE: string;
ADDRESS_OF_REGIONAL_BRANCK: string;
CASH_LIMIT: string;
BANK_LIMIT: Number;
OPENING_DATE: string;
CLOSING_DATE: string;
STATION_CODE: string;
STATION_NAME: string;
ESI_DEDUCT: string;
SALARY_QUIT: string;
SHORTING_GROUP_CODE: string;
ENTERBY: string;
ENTERDATE: string;
ADDRESS2: string;
IsChecked:boolean;

}