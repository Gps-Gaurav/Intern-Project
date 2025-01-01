import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_ITEM_MASTERModel extends BasePrimary {

    ID: string;
ITEM_CODE: string;
ITEM_NAME: string;
ITEM_MODE: string;
ITEM_GROUP: string;
COSTING_RATIO: string;
IS_EXEMPT: string;
ENTRY_DATE: string;
ENTRY_BY: string;
IsChecked:boolean;

}