import { BasePrimary } from "./primary.model";

export interface Sale_returnModel extends BasePrimary {
  ProdSummery: any;
  Invoice: string;
  UserID: number;
  InvNo: any;
  SaleNo: any;
  BillAdd1: string;
  PartyID: string;
  DelvAdd1:String;
  TransporterName:String;
  InvDate:String;
  LocationID:number;
  DueDate:String;
  usersDetails:any;
  company:any;
  WayBillNo:String;
  CNNo:String;
  Remarks:String;
  GrossAmt:String;
  DiscPer:String;
  DiscAmt: String;
  OtherChargeDesc1:String;
  OtherChargeAmt1:String;
  OtherChargeDesc2:String;
  OtherChargeAmt2:String;
  OtherChargeDesc3:String;
  OtherChargeAmt3:String;
  RndOffAmt:String;
  NetAmt:String;
  RcvAmt:String;
  AmtAdjusted:String;
  SubTotal:String;
  BillType:any;
  TotalQty:number;
 }