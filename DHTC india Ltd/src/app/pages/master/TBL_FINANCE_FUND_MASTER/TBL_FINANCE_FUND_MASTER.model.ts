import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_FINANCE_FUND_MASTERModel extends BasePrimary {

    ID: string;
ACC_NO: string;
ACC_TYPE: string;
BENIFICERY_NAME: string;
BRANCH_CODE: string;
BRANCH_NAME: string;
BANK_NAME: string;
IFSC_CODE: string;
ADDRESS: string;
EMAIL: string;
MOBILE: string;
CITY: string;
LEDGER_CODE: string;
REMARKS: string;
ENTRY_DATE: string;
ENTRY_BY: string;
IsChecked:boolean;

}