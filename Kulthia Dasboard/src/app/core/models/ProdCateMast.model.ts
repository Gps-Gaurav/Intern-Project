import { BasePrimary } from "./primary.model";

export interface CategoryModel extends BasePrimary {
    ProdCate: string;    
    ProductName:String;
    ShortName:String;
    UserID:Number;
    SubItem :String;
    NoOfPcs:number;
    FullDescription:String;
    Making:any;
    StartingNo:any;
    HSNCode:any;
    DisCont:String;
    Unit:String;
    PrintGrossWt:String;
    CalculatePoints:String;
    PCode:number;
 }