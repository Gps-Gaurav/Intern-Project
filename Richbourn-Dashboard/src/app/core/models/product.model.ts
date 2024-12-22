import { BasePrimary } from "./primary.model";
// SlNo, ProdCateID,ProdCode,ProdDesc,SubCateID,GroupID,ReOrdQty,MRP,ProdPicName,
      // UserID,CompName,Cost,BaseQty,LastCost,LastPurDate,DisContDt,
      // ProdSize,ProdColors,ProdCreateDate,HSNCode,LabourRate,DesignCode,MRP2,ArtNo,OnlineSKU
export interface ProductModel extends BasePrimary {
  ProdCate: string;
     file2: any;
     file1: any;
     DisCont: any;
     UserID: number;
    ProdCode:String;
    ProdPicName:String;
     ProdCateID:String;
     SubCateID:String;
     GroupID:String;
     ProdDesc:String;
     Cost:String;
     MRP:String;
     ReOrdQty:String;
     BaseQty:String;
     ProdSize:String;
     ProdColors:String;
     HSNCode:String;
     LabourRate:String;
     DesignCode:String;
     OnlineSKU:String;
     ArtNo:String;
     MRP2:String;
 }