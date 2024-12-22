import { BasePrimary } from "src/app/core/models/primary.model";

export interface PurchaseRawModel extends BasePrimary {

  ProdSummery: any;
  Invoice: string;
  UserID: number;
  PurNo: any;
  PurDate: string;
  PartyID: string;
  ChallanNo: String;
  Location: String;
  PurAc: String;
  usersDetails: any;

  TotAmt: String;
  CGST: String;
  SGST: String;
  Advanced: String;
  RndOffAmt: String;
  NetAmt: String;
  Narr: String;

}
