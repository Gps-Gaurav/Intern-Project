export interface RequestModel {
    TableName: string;
    FilterColumn: string;
    id: number,
    url: string,
    filter: any;
    sortOrder: string; // asc || desc
    sortField: string;
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
    SearchColumn: string;
}