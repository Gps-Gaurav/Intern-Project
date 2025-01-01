export interface RequestModel {
    SlNo: number;
    id: number,
    url: string,
    filter: any;
    SortOrder: string; // asc || desc
    SortColumn: string;
    pageNumber: number;
    pageSize: number;
    searchColumn: string;
    searchValue: string;
    search: string;
    type: number;
    refer: string;
    pageNo: number;
    spName: string;
    jsnData: string;
    ColumnName: string;
    ColumnValue: string;
    TableName:string;
    FilterColumn:string;
    SearchColumn:string;
}