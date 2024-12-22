import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestModel } from '../models/request.model';
import { ResponseData, ResponseToken } from '../models/responsedata.model';
import { DocumentModel, SingleDocumentModel } from '../models/document.model';
import { DeleteModel } from '../models/delete.model';

@Injectable({
  providedIn: 'root'
})
export  class ResourceService<T> {
  private readonly APIUrl = environment.APIUrl;

  constructor(protected httpClient: HttpClient ) {
  }

  postStoreList(resource: RequestModel): Observable<ResponseData<T[]>> {
    

    return this.httpClient.post<ResponseData<T[]>>(this.APIUrl+'Data/GetAllData',resource)
      .pipe(
        catchError(this.handleError)
      );
  }


  GetApiJson(resource: RequestModel): Observable<ResponseData<T>> {
    

    return this.httpClient.post<ResponseData<T>>(this.APIUrl+'Data/GetAllData',resource)
      .pipe(
        catchError(this.handleError)
      );
  }
  DeleteApiJson(resource: DeleteModel): Observable<ResponseData<T>> {
    

    return this.httpClient.post<ResponseData<T>>(this.APIUrl+'Data/DeleteData',resource)
      .pipe(
        catchError(this.handleError)
      );

  }
  PostApiJson(resource: RequestModel): Observable<ResponseData<T>> {
    

    return this.httpClient.post<ResponseData<T>>(this.APIUrl+'Data/InsertData',resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  MultiDeleteApiJson(resource: DeleteModel): Observable<ResponseData<T>> {
    

    return this.httpClient.post<ResponseData<T>>(this.APIUrl+'Data/MultiDeleteData',resource)
      .pipe(
        catchError(this.handleError)
      );
  }
  CheckData(resource: any): Observable<ResponseToken<T>> {
    

    return this.httpClient.post<ResponseToken<T>>(this.APIUrl+'Data/CheckData',resource)
      .pipe(
        catchError(this.handleError)
      );

  }

  getStoreList(resource: RequestModel): Observable<ResponseData<T[]>> {
    

    return this.httpClient.get<ResponseData<T[]>>(this.APIUrl+resource.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  GetFilterApiJson(resource: RequestModel): Observable<ResponseData<T>> {
    

    return this.httpClient.post<ResponseData<T>>(this.APIUrl+'Data/GetAllFilterData',resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  GetSortApiJson(resource: RequestModel): Observable<ResponseData<T>> {
    

    return this.httpClient.post<ResponseData<T>>(this.APIUrl+'Data/GetAllSortData',resource)
      .pipe(
        catchError(this.handleError)
      );
  }

 getList(page: number, count: number,path:String): Observable<ResponseData<DocumentModel<T>>> {
    let params = new HttpParams()
			.set('page', page.toString())
			.set('count', count.toString());

    return this.httpClient.get<ResponseData<DocumentModel<T>>>(this.APIUrl+path+"?PageNo="+page+"&itemsPerPage="+count)
      .pipe(
        catchError(this.handleError)
      );
  }
  //  getList(page: number, count: number,path:String): Observable<T[]> {
  //   let params = new HttpParams()
	// 		.set('page', page.toString())
	// 		.set('count', count.toString());

  //   return this.httpClient.get<T[]>(`/${this.APIUrl+path}}?${params.toString()}`)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  get(id: string | number): Observable<ResponseData<SingleDocumentModel<T>>> {
    return this.httpClient.get<ResponseData<SingleDocumentModel<T>>>(this.APIUrl+id)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  add(resource: any,url:string): Observable<any> {
    return this.httpClient.post(this.APIUrl+url, resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string | number,url:string ): Observable<any> {
    return this.httpClient.delete(this.APIUrl+url+id) 
      .pipe(
        catchError(this.handleError)
      );
  }
  login(email: string, password: string) : Observable<ResponseData<any>>{
    return this.httpClient.post<ResponseData<any>>(this.APIUrl+'token', {username:email, password:password })
    .pipe(
      catchError(this.handleError)
    );
}
  update(resource: any,url:string): Observable<any> {
    return this.httpClient.put(this.APIUrl+url, resource)
      .pipe(
        catchError(this.handleError)
      );
  }
  


  UploadFile(resource: FormData): Observable<any> {
    return this.httpClient.post(this.APIUrl+"Upload/upload", resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  GetDynamicApiJson(resource: RequestModel): Observable<ResponseData<T>> {
    

    return this.httpClient.post<ResponseData<T>>(this.APIUrl+'Data/GetDynamicData',resource)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError('Something wrong happened');
  }
}