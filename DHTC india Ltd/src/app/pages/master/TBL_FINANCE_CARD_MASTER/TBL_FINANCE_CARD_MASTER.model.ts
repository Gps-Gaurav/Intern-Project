import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_FINANCE_CARD_MASTERModel extends BasePrimary {

    ID: string;
BRANCH_CODE: string;
BRANCH_NAME: string;
CARD_TYPE: string;
CARD_KEY: string;
CARD_NO: string;
VALID_FROM: string;
VALID_TO: string;
PIN: string;
REMARKS: string;
ENTRY_DATE: string;
ENTRY_BY: string;
IsChecked:boolean;

}