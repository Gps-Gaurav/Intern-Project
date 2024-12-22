import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { SeriesModel } from 'src/app/core/models/series.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
  providers: [MessageService,ConfirmationService]

})
export class SeriesComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: SeriesModel[];
  page:number=1;
  pageSize:number=10;
  item: SeriesModel=<SeriesModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedItems: SeriesModel[];
  submitted: boolean;
  formData: any;
  submit: boolean;

  constructor(private router: Router,private  service:ResourceService<any>, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this. _fetchData();
   }
 
   private _fetchData() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetSeriesMast";
    requestModel.pageNo=this.page;
    requestModel.pageSize=this.pageSize;
    requestModel.search=this.search;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.items = JSON.parse(response.items);
      this.totalRecords = response.totalCount;
    });   
  }
 
   public handlePagination(paginationData): void {
    this.page = paginationData.page + 1;
    this._fetchData();
  }
 
 

openNew() {
  this.router.navigate(['/master/CREATE_SERIES_MASTER']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="SeriesMast";
        requestModel.column_name="SlNo";
        requestModel.column_value=this.selectedItems.map(a=>a.id).toString();
        this.service.MultiDeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => !this.selectedItems.includes(val));
        this.selectedItems = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
  });   

     
      }
  });
}

editProduct(data: SeriesModel) {
  this.router.navigate(['/master/CREATE_SERIES_MASTER', { id: data.SlNo }]);
  // this.item = {...data};
  // this.productDialog = true;
}

deleteProduct(data: SeriesModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.Series + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="SeriesMast";
        requestModel.column_name="SlNo";
        requestModel.column_value=data.SlNo.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => val.id !== data.id);
        this.item =<SeriesModel>{};
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
  });   
        
      }
  });
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}



findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id.toString() === id) {
          index = i;
          break;
      }
  }

  return index;
}

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
validSubmit() {
  const controls = this.formData.controls;
  this.submit = true;

  if (this.formData.valid) {
    let request:SeriesModel= <SeriesModel>{};

   
    request.SlNo = this.formData.get('CateID').value;//
    request.ShortName = this.formData.get('ShortName').value;//
    request.SeriesDesc = this.formData.get('SeriesDesc').value;//
    request.Cash = this.formData.get('Cash').value;//
    request.TaxType = this.formData.get('TaxType').value;//
    request.DiscPer = this.formData.get('DiscPer').value;//

    let jsonData: SeriesModel[] = [];
    jsonData.push(request);
    let postrequest: RequestModel = <RequestModel>{};

    postrequest.spName = "sp_ui_admin_add_SeriesMast_json";
    postrequest.jsnData = JSON.stringify(jsonData);
    this.service.PostApiJson(postrequest).subscribe(Response => { })

    console.log("post product", request);//


  }
}
}
