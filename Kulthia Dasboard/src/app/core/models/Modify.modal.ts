import { BasePrimary } from "./primary.model";

export interface ModifyModel extends BasePrimary {
     DisCont: any;
     UserID: number;
     ProdCate: string;    
     ProductCode:String;
     MRPCode:String;
     Category:String;
     SubCategory:String;
     Group:String;
     Description:String;
     CT:String;
     MRP:String;
     ReOrderLevel:String;
     BaseQty:String;
     Size:String;
     Colours:String;
     HSNCode:String;
     LabourRt:String;
     Remarks:String;
     TagLine:String;
     ArtNo:String;
     MRP2:String;
 }