import { BasePrimary } from "src/app/core/models/primary.model";

export interface PurchaseModel extends BasePrimary {

  ProdSummery: any;
  Invoice: string;
  UserID: number;
  InvNo: any;
  PartyBillNo: string;
  PartyID: string;
  ReceivedDate: String;
  BillDate: String;
  DueDate: String;
  usersDetails: any;
  TotPcs:number;
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
  SubTotal: String;
  OtherChargeText1: String;
  OtherChargeText2: String;
  OtherChargeText3: String;
  RcvAmt: String;
  DiscValue: String;
  BillType:any;
  LocationID:Number;
}
