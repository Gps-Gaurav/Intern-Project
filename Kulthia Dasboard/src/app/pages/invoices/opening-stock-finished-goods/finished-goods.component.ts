import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { InseretFinishesGoodsModel } from 'src/app/core/models/insertfinishedgoods.model';

import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finished-goods',
  templateUrl: './finished-goods.component.html',
  styleUrls: ['./finished-goods.component.scss'],
  providers: [MessageService,ConfirmationService]

})
export class FinishedGoodsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: InseretFinishesGoodsModel[];
  page:number=1;
  pageSize:number=10;
  item: InseretFinishesGoodsModel=<InseretFinishesGoodsModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedItems: InseretFinishesGoodsModel[];
  submitted: boolean;

  searchChanged: Subject<string> = new Subject<string>();
  term:any;
  unique_key:string="";
public readonly ImgUrl = environment.APIUrl;

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
   }
  ngOnInit(): void {
    this. _fetchData();
   }
 
   private _fetchData() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_Get_op_stock_finish_goods";
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
  this.router.navigate(['/invoices/insert-finished-goods']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="tbl_menu";
        requestModel.column_name="id";
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

editProduct(data: InseretFinishesGoodsModel) {
  //this.router.navigate(['/invoices/insert-finished-goods']);
  this.router.navigate(['/invoices/insert-finished-goods', { id: data.SlNo }]);
 
}

deleteProduct(data: InseretFinishesGoodsModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.Packet + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="tbl_menu";
        requestModel.column_name="id";
        requestModel.column_value=data.id.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => val.id !== data.id);
        this.item =<InseretFinishesGoodsModel>{};
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
}
