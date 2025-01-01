import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_MONEY_RECIPTModel extends BasePrimary {

    ID: string;
BRANCH_CODE: string;
BRANCH_NAME: string;
MR_NO: string;
MR_DATE: string;
POSTING_DATE: string;
STATEMENT_NO: string;
CLIAM: string;
TOTAL: string;
BANK_CODE: string;
CASH_AMT: Number;
ON_AC_ADJUST: string;
CHQ_AMT: string;
MR_TOTAL: string;
CHQ_NO: string;
RECD_FROM: string;
ENTRY_DATE: string;
SHORT_EXCESS: string;
TDS: string;
TDS_PER: Number;
TDS_DEDUCT: string;
LATE_DELIVERY: string;
BANK_NAME: string;
AC_CODE: string;
TV_NO: string;
FINYR: string;


}