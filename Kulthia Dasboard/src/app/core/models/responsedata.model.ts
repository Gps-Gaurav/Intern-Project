import { BaseStatus } from "./basestatus.model";

export interface   ResponseData<T> extends BaseStatus {
    diamond: string;
    items :T;
    
}

export interface   ResponseToken<T> extends BaseStatus {
    document :T;
    
}