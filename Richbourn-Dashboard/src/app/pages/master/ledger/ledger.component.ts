import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { LedgerModel } from 'src/app/core/models/ledger.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-category',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
  providers: [MessageService,ConfirmationService],
  encapsulation:ViewEncapsulation.None

})
export class LedgerComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: LedgerModel[];
  page:number=1;
  pageSize:number=10;
  item: LedgerModel=<LedgerModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedItems: LedgerModel[];
  submitted: boolean;
  searchChanged: Subject<string> = new Subject<string>();
  term:any;
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
    requestModel.spName="sp_admin_GetLedgerMast";
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
  this.router.navigate(['/master/CREATE_LEDGER_MASTER']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="AGLMast";
        requestModel.column_name="GLCode";
        requestModel.column_value=this.selectedItems.map(a=>a.GLCode).toString();
        this.service.MultiDeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => !this.selectedItems.includes(val));
        this.selectedItems = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
  });   

     
      }
  });
}

editProduct(data: LedgerModel) {
  console.log("LedgerModel",data)
 this.router.navigate(['/master/CREATE_LEDGER_MASTER', { id: data.GLCode }]);
  // this.item = {...data};
 // this.productDialog = true;
}

deleteProduct(data: LedgerModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.GLCode + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="AGLMast";
        requestModel.column_name="GLCode";
        requestModel.column_value=data.GLCode.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => val.GLCode !== data.GLCode);
        this.item =<LedgerModel>{};
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
