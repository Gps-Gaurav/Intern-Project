import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TabService } from 'src/app/core/helpers/TabService';
import { VarientModel } from 'src/app/core/models/varient.model';
@Component({
  selector: 'app-category',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService,ConfirmationService,TabService]


})
export class ProductComponent implements OnInit {
  productDialog: boolean;
  Delete:"Delete";
  items: ProductModel[];
  selectedProduct:ProductModel;
  item: ProductModel=<ProductModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedItems: ProductModel[];
  page:number=1;
  colorsData:any[]=[];
  sizeData:any[]=[];
  pageSize:number=10;
  display: boolean;
  ColorID:Number=0;
  SizeID:Number=0;
  Age:Number=0;
  ProdCode:String="";
  submitted: boolean;
breadCrumbItems: any;
unique_key:string="";
searchChanged: Subject<string> = new Subject<string>();
term:any;
righmenu: MenuItem[];
public readonly ImgUrl = environment.ImgUrl;

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
    
      {label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editProduct(this.selectedProduct)},
      {label: 'Create Varient', icon: 'pi pi-fw pi-file', command: () => this.varient(this.selectedProduct)},
      {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.deleteProduct(this.selectedProduct)}
  ];
    this.unique_key=this.createId();
    this._fetchColor();
    this. _fetchData();
    this._fetchSize();
   }
 
   private _fetchData() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetProdMast";
    requestModel.pageNo=this.page;
    requestModel.pageSize=this.pageSize;
    requestModel.search=this.search;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.items = JSON.parse(response.items);
      this.totalRecords = response.totalCount;
    });   
    //  let requestModel = <RequestModel>{};
    //  requestModel.spName="sp_admin_GetProdMast";
     
    //  this.service.GetApiJson(requestModel).subscribe(response => {
    //    this.items = JSON.parse(response.items);
      
    //  });   
   }
 
   varient(data: ProductModel) {
   
    this.ProdCode=data.ProdCode;
   // console.log(data,this.ProdCode)
    console.log(this.ProdCode,this.ProdCode)
    this.display=true;
   }
   AddVarient(){
    // let requestModel = <RequestModel>{};
    // requestModel.spName="sp_admin_create_varient";
    // requestModel.pageNo=Number(this.Age);
    // requestModel.id=Number(this.ColorID);
    // requestModel.pageSize=Number(this.SizeID);
    // requestModel.search="";
    // requestModel.jsnData="";
    // requestModel.ColumnValue=this.ProdCode.toString();
    // requestModel.ColumnName=this.colorsData.filter(m=>m.SlNo==Number(this.ColorID))[0].ColorName;


    let request: VarientModel = <VarientModel>{};
    request.ColorID=Number(this.ColorID);
    request.ColorName =this.colorsData.filter(m=>m.SlNo==Number(this.ColorID))[0].ColorName;
    request.SizeID = Number(this.SizeID);

    request.Age=Number(this.Age);
    request.ProdCode=this.ProdCode.toString();
    let jsonData: VarientModel[] = [];
    jsonData.push(request);
    let postrequest: RequestModel = <RequestModel>{};

    postrequest.spName = "sp_admin_create_varient";
    postrequest.jsnData = JSON.stringify(jsonData);

    this.service.PostApiJson(postrequest).subscribe(Response => { 
      if(Response.document.statusMessage==="success"){
      
       this._fetchData();
      }
      else{
       
      //  this.toastr.error( Response.document.statusMessage,'Error!');
      }
    })
    this.display=false;
    console.log(this.ProdCode,this.SizeID,this.ColorID,this.Age)
   }
  CloseVarient(){
    this.display=false;
   }
openNew() {
  this.router.navigate(['/master/CREATE_MODIFY_PRODUCT_MASTER']);
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
        requestModel.table_name="ProdMast";
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

editProduct(data: ProductModel) {
  this.router.navigate(['/master/CREATE_MODIFY_PRODUCT_MASTER', { id: data.SlNo }]);
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
        requestModel.table_name="ProdMast";
        requestModel.column_name="SlNo";
        requestModel.column_value=data.SlNo.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => val.SlNo !== data.SlNo);
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

public handlePagination(paginationData): void {
  this.page = paginationData.page + 1;
  this._fetchData();
}

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}


public _fetchColor() { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_dropdown_GetColorMast";
  requestModel.pageNo=1;
  requestModel.pageSize=10;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.colorsData = JSON.parse(response.items);
  
  });   
}
public _fetchSize() { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_GetSizeMastdropdown";
  requestModel.pageNo=1;
  requestModel.pageSize=10;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.sizeData = JSON.parse(response.items);
  
  });   
}
}
