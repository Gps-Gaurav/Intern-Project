import { BasePrimary } from "./primary.model";

export interface CategoryModel extends BasePrimary {    
    ProdCateID:String;
    ProdCate:String;
    UserID:Number;
    CompName :String;
    SubCateWeb:String;
    DisCont:String;
    Filter:String;
    ProdSummery:any;
    SlNo:any;
 }