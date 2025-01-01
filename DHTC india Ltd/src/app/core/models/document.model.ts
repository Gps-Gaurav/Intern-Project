export interface   DocumentModel<T>{
   
   pageNumber:number;
   pageSize:number;
    totalRecords:number;
    records :T[];
}

export interface   SingleDocumentModel<T>{
   
    pageNumber:number;
    pageSize:number;
     totalRecords:number;
     records :T;
 }