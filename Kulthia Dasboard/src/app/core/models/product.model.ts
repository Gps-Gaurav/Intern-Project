import { BasePrimary } from "./primary.model";

export interface ProductModel extends BasePrimary {
     DisCont: any;
     UserID: number;
     ProdCate: string;    
     ProductCode:String;
     ProductName:String;
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
     DesignCode:String;
     OnlineSKU:String;
     ArtNo:String;
     MRP2:String;
 }