import { BasePrimary } from "src/app/core/models/primary.model";

export interface SaleRawModel extends BasePrimary {

  ProdSummery: any;
  Invoice: string;
  UserID: number;
  SaleNo: any;
  SaleDate: string;
  PartyID: string;
  ChallanNo: String;
  Location: String;
  SaleAc: String;
  usersDetails: any;

  TotAmt: String;
  DiscAmt: String;
  CGST: String;
  SGST: String;
  Advanced: String;
  RndOffAmt: String;
  NetAmt: String;
  Narr: String;

}
