import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_DRIVER_MASTERModel extends BasePrimary {

    ID: string;
CODE: string;
NAME: string;
F_NAME: string;
ADDRESS: string;
LICENCE_NO: string;
LIC_VALID: string;
LIC_ISSUE: string;
PHONE: string;
REMARKS: string;
OPERATOR: string;
ENTRY_DATE: string;
IsChecked:boolean;

}