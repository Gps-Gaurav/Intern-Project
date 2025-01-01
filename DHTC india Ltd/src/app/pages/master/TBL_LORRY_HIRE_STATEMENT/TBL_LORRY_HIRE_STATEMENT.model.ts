import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_LORRY_HIRE_STATEMENTModel extends BasePrimary {

    ID: string;
BRANCH_CODE: string;
BRANCH_NAME: string;
STATEMENT_NO: string;
STATEMENT_DATE: string;
POSTING_DATE: string;
STATEMENT_TOTAL: string;
CASH_TOTAL: string;
CHQ_TOTAL: string;
IS_CANCEL: string;
ENTRY_BY: string;
ENTRY_DATE: string;
FINYR: string;
CHALLAN_NO:string;

}