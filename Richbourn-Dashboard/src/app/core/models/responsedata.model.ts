import { BaseStatus } from "./basestatus.model";

export interface   ResponseData<T> extends BaseStatus {
    document: any;
    items :T;
    
    
}

export interface   ResponseToken<T> extends BaseStatus {
    document :T;
    
}