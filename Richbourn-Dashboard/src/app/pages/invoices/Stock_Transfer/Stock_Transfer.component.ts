import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { StockTrasferModel } from 'src/app/core/models/StockTransfer.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-category',
  templateUrl: './Stock_Transfer.component.html',
  styleUrls: ['./Stock_Transfer.component.scss'],
  providers: [MessageService,ConfirmationService]

})
export class Stock_TransferComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: StockTrasferModel[];
  page:number=1;
  pageSize:number=10;
  item: StockTrasferModel=<StockTrasferModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedProduct: StockTrasferModel;

  selectedItems: StockTrasferModel[];
  submitted: boolean;
  searchChanged: Subject<string> = new Subject<string>();
  term:any;
  righmenu: MenuItem[];
  constructor(private router: Router,private  service:ResourceService<any>,
     private messageService: MessageService, private confirmationService: ConfirmationService) { 
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
    this.righmenu = [
      {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewProduct(this.selectedProduct)},
      {label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editProduct(this.selectedProduct)},
      {label: 'Print Envelope', icon: 'pi pi-fw pi-file', command: () => this.openPdf(this.selectedProduct)},
      {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.deleteProduct(this.selectedProduct)}
  ];
    this. _fetchData();
   }
   viewProduct(product: StockTrasferModel) {
    this.messageService.add({severity: 'info', summary: 'Product Selected' });
   }
   private _fetchData() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetStockTransferMast";
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
  this.router.navigate(['/invoices/insert_TBL_STOCK_TRANSFER']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="ProdPurHead";
        requestModel.column_name="SlNo";
        requestModel.column_value=this.selectedItems.map(a=>a.SlNo).toString();
        this.service.MultiDeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => !this.selectedItems.includes(val));
        this.selectedItems = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
  });   

     
      }
  });
}

editProduct(data:StockTrasferModel) {
  
  this.router.navigate(['/invoices/insert_TBL_STOCK_TRANSFER', { id: data.SlNo }]);
  // this.item = {...data};
  // this.productDialog = true;
}
openPdf(data: StockTrasferModel) {
  this.router.navigate(['/invoices/Purchase_Detail_Invoices', { id: data.SlNo }]);
 
}
deleteProduct(data: StockTrasferModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.SlNo + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="ProdPurHead";
        requestModel.column_name="SlNo";
        requestModel.column_value=data.SlNo.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => val.id !== data.id);
        this.item =<StockTrasferModel>{};
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
