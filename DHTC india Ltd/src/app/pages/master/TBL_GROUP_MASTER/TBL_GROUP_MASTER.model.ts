import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_GROUP_MASTERModel extends BasePrimary {

    ID: string;
GROUP_CODE: string;
GROUP_NAME: string;
CONTACT_PERSON: string;
ADDRESS: string;
CITY: string;
PIN: string;
STATE: string;
PHONE_OFFICE: string;
PHONE_RESIDENCE: string;
MOBILE: string;
FAX: string;
EMAIL: string;
GROUP_TYPE: string;
IS_CONTACT_GROUP: boolean;
HAMAIL_TERM: string;
HAMAIL_REMARKS: string;
UNLOAD_TERM: string;
UNLOAD_REMARKS: string;
ENTRY_DATE: string;
ENTER_BY: string;
IsChecked:boolean;

}