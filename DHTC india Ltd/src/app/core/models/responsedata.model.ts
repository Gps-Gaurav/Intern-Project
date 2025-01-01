import { BaseStatus } from "./basestatus.model";

export interface   ResponseData<T> extends BaseStatus {
    document :T;
    
}