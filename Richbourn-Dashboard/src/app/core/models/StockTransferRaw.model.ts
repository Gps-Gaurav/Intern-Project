import { BasePrimary } from "./primary.model";

export interface StockTrasferRawModel extends BasePrimary {
    StockTrasfer: string;
    id: any;
    SlNo: any;

    TransNo:String;
    TransDt:String;
    ProdCode:String;
    Qty:String;
    MRP:String;
    LocationFrom:String;
    LocationTo:String;
    TotPcs:String;
    Narr:String;
    UserID: number;
    usersDetails: any;

  WayBillNo: String;
  CNNo: String;
  Remarks: String;
  GrossAmt: String;
  DiscPer: String;
  DiscAmt: String;
  OtherChargeDesc1: String;
  OtherChargeAmt1: String;
  OtherChargeDesc2: String;
  OtherChargeAmt2: String;
  OtherChargeDesc3: String;
  OtherChargeAmt3: String;
  RndOffAmt: String;
  NetAmt: String;
  DiscAmt1: String;
  AmtAdjusted: String;
}