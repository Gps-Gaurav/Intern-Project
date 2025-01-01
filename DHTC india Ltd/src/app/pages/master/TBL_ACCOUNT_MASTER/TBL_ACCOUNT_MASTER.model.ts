import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_ACCOUNT_MASTERModel extends BasePrimary {

    ID: string;
ACC_CODE: string;
ACC_NAME: string;
GRP_ID: string;
SUB_GRP_ID: string;
PARTY_ID: string;
ACC_ADDRESS: string;
PAN_NO: string;
BANK_BRANCH_ID: string;
AC_NO: string;
OD_LIMIT: string;
AVERAGE_BAL: string;
OPENING_DATE: string;
CLOSING_DATE: string;
OPENING_BAL: string;
BAL_TYPE: string;
OPERATOR: string;
ENTRY_DATE: string;
DEFINE: boolean;
IsChecked:boolean;

}