import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService,ConfirmationService]

})
export class ProductComponent implements OnInit {
  productDialog: boolean;
  Delete:"Delete";
  items: ProductModel[];

  item: ProductModel=<ProductModel>{};

  selectedItems: ProductModel[];

  submitted: boolean;
breadCrumbItems: any;


  constructor(private router: Router,private  service:ResourceService<any>, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this. _fetchData();
   }
 
   private _fetchData() { 
     let requestModel = <RequestModel>{};
     requestModel.spName="sp_admin_GetProdMast";
     
     this.service.GetApiJson(requestModel).subscribe(response => {
       this.items = JSON.parse(response.items);
      
     });   
   }
 
 

openNew() {
  this.router.navigate(['/master/CREATE_PRODUCT_MASTER']);
  // this.item ==<ProductModel>{};
  // this.submitted = false;
  // this.productDialog = true;
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

editProduct(data: ProductModel) {
  this.router.navigate(['/master/CREATE_PRODUCT_MASTER', { id: data.SlNo }]);
  // this.item = {...data};
  // this.productDialog = true;
}

deleteProduct(data: ProductModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.ProdCate + '?',
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
        this.item =<ProductModel>{};
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
