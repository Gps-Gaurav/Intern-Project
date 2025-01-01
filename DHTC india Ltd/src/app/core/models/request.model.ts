export interface RequestModel {
    id: number,
    url: string,
    filter: any;
    sortOrder: string; // asc || desc
    sortField: string;
    pageNumber: number;
    pageSize: number;
    searchColumn: string;
    searchValue: string;
    type: number;
    refer: string;
}