import { BasePrimary } from "./primary.model";

export interface ModifyModel extends BasePrimary {
     DisCont: any;
     UserID: number;
     SizeID: number;
     Age:Number;
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
     Height:String;
     Length:String;
     Width:String;
     Colours:String;
     HSNCode:String;
     LabourRt:String;
     Remarks:String;
     TagLine:String;
     ArtNo:String;
     usersDetails:any;
     MRP2:String;
     OnlineSKU:String;
     ColoursName:String;
 }