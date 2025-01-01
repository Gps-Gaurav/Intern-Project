import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_PARTY_MASTERModel extends BasePrimary{

    ID: string;
BRANCH_AGENT_CODE: string;
BRANCH_AGENT_NAME: string;
PARTY_CODE: string;
PARTY_NAME: string;
GROUP_CODE: string;
GROUP_NAME: string;
ADDRESS: string;
CITY: string;
PIN: string;
STATE: string;
CONTACT_PERSON: string;
PHONE_OFFICE: string;
PHONE_RESIDENCE: string;
MOBILE: string;
FAX: string;
EMAIL: string;
PARTY_TYPE: string;
OPERATOR: string;
ENTRY_DATE: string;
PAYMENT_DAY: string;
INSURANCE: string;
INS_FROM_DATE: string;
INS_TO_DATE: string;
CST_NO: string;
DATE: string;
VAT: string;
RISK: string;
SERVICE_TAX: string;
SERVICE_TAX_BY: string;
PARTY_REG_NO: string;
PAYMODE: string;
BILLEDAT: string;
ADDRESS2: string;
PANNO: string;
GST1: string;
GST2: string;
GST3: string;
GSTNO: string;
TANNO: string;
STATE_CODE: string;

IsChecked:boolean;

}