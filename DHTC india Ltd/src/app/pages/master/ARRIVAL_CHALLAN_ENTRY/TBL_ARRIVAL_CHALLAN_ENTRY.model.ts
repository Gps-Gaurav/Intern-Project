import { BasePrimary } from "src/app/core/models/primary.model";

export interface TBL_ARRIVAL_CHALLAN_ENTRYModel extends BasePrimary {

    ID: string;
    CHALLAN_NO: string;
    DATE: string;
    BILTY: string;
    FFROM: string;
    TTO: string;
    LOADED_PKG: string;
    LOADED_PKG_SHT: string;
    ARR_PKG_WT: string;
    LOADED_WT: string;
    LESS_ADVANCE: string;
    ARR_WT_SHEET: string;
    DETENTION: string;
    REMARKS: string;
    UNLOAD_TERM: string;
    UNLOADING_REMARKS: string;
    OTHER: string;
    IsChecked:boolean;

}