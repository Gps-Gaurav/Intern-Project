import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_FINANCE_BANK_MASTERModel extends BasePrimary  {

    ID: string;
BRANCH_CODE: string;
BRANCH_NAME: string;
BANK_CODE: string;
BANK: string;
PRINT_RPT: string;
BANK_NAME: string;
OD_LIMIT: string;
AVERAGE_BAL: string;
OPEN_DATE: string;
CLOSING_DATE: string;
ACC_NO: string;
IsChecked:boolean;

}