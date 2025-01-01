import { Component, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { RouteModel } from 'src/app/shared/data/model/Route.model';
import { DeleteModel } from 'src/app/shared/data/model/delete.model';
import { RequestModel } from 'src/app/shared/data/model/request.model';

import { ResourceService } from 'src/app/shared/services/resource.service';


@Component({
  selector: 'app-manage-location',
  templateUrl: './User-List.component.html',
  styleUrls: ['./User-List.component.scss'],
  providers: [MessageService,ConfirmationService],
  encapsulation:ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: RouteModel[];
  page:number=1;
  pageSize:number=10;
  item: RouteModel=<RouteModel>{};
  search: string = "";
  filter: string = "";
  totalRecords:number=0;
  selectedItems:RouteModel[];
  submitted: boolean;
  formData: any;
  sizes: any[];
  submit: boolean;
  searchChanged: Subject<string> = new Subject<string>();
  term:any;
  selectedSize: any = 'p-datatable-lg';
  constructor(private router: Router,private  service:ResourceService<any>, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.searchChanged
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(newText => {
      this.search = newText;
     this._fetchData();;
    });
    this.sizes = [
      { name: 'Small', class: 'p-datatable-sm' },
      { name: 'Normal', class: '' },
      { name: 'Large',  class: 'p-datatable-lg' }
  ];
   }

  ngOnInit(): void {


    this. _fetchData();
   }

   private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.url="Location/GetAllRouteMaster";
    requestModel.pageNo=this.page;
    requestModel.pageSize=this.pageSize;
    requestModel.search=this.search;
    requestModel.ColumnValue=this.filter;

    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.items = response.items;
      this.totalRecords = response.totalCount;
    });
  }


  public handlePagination(paginationData): void {
    this.page = paginationData.page + 1;
    this._fetchData();
  }


openNew() {

    this.router.navigate(['/master/CREATE_CATEGORY_MASTER']);


}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="ProdCateMast";
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

editProduct(data:RouteModel) {

    this.router.navigate(['/master/CREATE_CATEGORY_MASTER', { id: data.id }]);


  // this.item = {...data};
  this.productDialog = true;
}

deleteProduct(data: RouteModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="ProdCateMast";
        requestModel.column_name="SlNo";
        requestModel.column_value=data.id.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);

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
    let request: RouteModel = <RouteModel>{};

    this.service.PostApiJson(request).subscribe(Response => { })

    console.log("post product", request);//


  }
}

}
