import { BasePrimary } from "./primary.model";

export interface StockTrasferModel extends BasePrimary {
    StockTrasfer: string;
    id: any;
    SlNo: any;
    PartyID: any;

    TransNo:String;
    TransDt:String;
    ProdCode:String;
    Qty:String;
    IssuesDt:String;
    MRP:String;
    LocationFrom:String;
    LocationTo:String;
    TotPcs:String;
    Narr:String;
    UserID: number;
    usersDetails: any;

  
}