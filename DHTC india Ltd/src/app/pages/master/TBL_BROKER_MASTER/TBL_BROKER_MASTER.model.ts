import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_BROKER_MASTERModel extends BasePrimary {

    ID: string;
BRANCH_CODE: string;
BRANCH_NAME: string;
BR_CODE: string;
BR_NAME: string;
CONTACT_PERSON: string;
ADDRESS: string;
PHONE_OFF1: string;
PHONE_OFF2: string;
PHONE_RES1: string;
PHONE_RES2: string;
DESTINATE_COMPANY: string;
COM_ADDRESS: string;
COM_CONTACT_PERSON: string;
COM_PHONE: string;
REMARKS: string;
STATUS: string;
STDNO: string;
FAXNO: string;
PAGER: string;
MOBILE: string;
ENTER_DATE: string;
ENTER_BY: string;
IsChecked:boolean;

}