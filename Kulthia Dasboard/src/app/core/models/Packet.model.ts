import { BasePrimary } from "./primary.model";

export interface PacketModel extends BasePrimary {
  Packet: string;
  UserID: number;
  ItemName:String;
  DShape:String;
  DColour:String;
  Purity:String;
  DSize:any;
  WRange:any;
  Unit:any;
  CertificateNo:String;
  DefaultRate:any;
  OpQty:any;
  OpPcs:any;
  Rate:Number;
  Value:String;
  PacketIDinteger:any;
  Remark:String;
 }