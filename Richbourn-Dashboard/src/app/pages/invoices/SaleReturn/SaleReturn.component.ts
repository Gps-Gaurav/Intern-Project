import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { Sale_returnModel } from 'src/app/core/models/Sale_Return.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-category',
  templateUrl: './SaleReturn.component.html',
  styleUrls: ['./SaleReturn.component.scss'],
  providers: [MessageService,ConfirmationService]

})
export class SaleReturnComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: Sale_returnModel[];
  page:number=1;
  pageSize:number=10;
  item:  Sale_returnModel=<Sale_returnModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedItems: Sale_returnModel[];
  submitted: boolean;
  searchChanged: Subject<string> = new Subject<string>();
  term:any;
  selectedProduct:  Sale_returnModel;
  righmenu: MenuItem[];
cm: any;

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
    this.righmenu = [
      {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewProduct(this.selectedProduct)},
      {label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editProduct(this.selectedProduct)},
      {label: 'Print Envelope', icon: 'pi pi-fw pi-file', command: () => this.openPdf(this.selectedProduct)},
      {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.deleteProduct(this.selectedProduct)}
  ];
    this. _fetchData();
   }
   viewProduct(product: Sale_returnModel) {
    this.messageService.add({severity: 'info', summary: 'Product Selected', detail: product.InvNo });
   }
  
   private _fetchData() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetSaleReturnMast";
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
  this.router.navigate(['/invoices/insert_TBL_SALE_RETURN']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="FgSaleRetHead";
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

editProduct(data: Sale_returnModel) {
  this.router.navigate(['/invoices/insert_TBL_SALE_RETURN', { id: data.SlNo }]);
 
}
openPdf(data: Sale_returnModel) {
  this.router.navigate(['/invoices/Sale_Detail_Invoices', { id: data.SlNo }]);
 
}
deleteProduct(data: Sale_returnModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.Invoice + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="FgSaleRetHead";
        requestModel.column_name="SlNo";
        requestModel.column_value=data.SlNo.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => val.SlNo !== data.SlNo);
        this.item =<Sale_returnModel>{};
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
