import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_CLAIM_REMARKSModel  extends BasePrimary{

    ID: string;
BILTYNO: string;
REMARKS: string;
IsChecked:boolean;

}