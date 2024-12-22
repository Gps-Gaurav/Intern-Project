import { BasePrimary } from "./primary.model";

export interface InvoiceModel extends BasePrimary {
  InvoiceDate: any;
  UserID: number;
  Invoice: string;
  InvoiceNo:String;
  Party:String;
  Baddress:String;
  
  Daddress:String;
  WayBillNo:String;
  GrossAmount:String;

  DueDate:String;
  TransporterName:String;
  Discount:String;
  OtherCharges:String;
  RoundOff:String;
  ReceivedAmount:String;
  NetAmount:String;
  DueAmount:String;
  CnNo:String;
  Narration:String;
 }