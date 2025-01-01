import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_ACCOUNT_SUB_GROUP_MASTERModel extends BasePrimary {
    
    ID: string;
ACC_GRP_CODE: string;
ACC_GRP_NAME: string;
ACC_SUB_GRP_CODE: string;
ACC_SUB_GRP_NAME: string;
TYPE: string;
IsChecked:boolean;

}