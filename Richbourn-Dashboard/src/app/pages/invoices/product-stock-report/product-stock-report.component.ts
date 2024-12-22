import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { ColorsModel } from 'src/app/core/models/colors.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-stock-report',
  templateUrl: './product-stock-report.component.html',
  styleUrls: ['./product-stock-report.component.scss'],
  providers: [MessageService,ConfirmationService],
  encapsulation:ViewEncapsulation.None

})
export class ProductStockReportComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: any[];
  page:number=1;
  pageSize:number=10;
  item: ColorsModel=<ColorsModel>{};
  search: string = "";
  totalRecords:number=0;
  filteritems: any[];
  PartyID=0;
  cols: any[];
  colsexpand: any[];
  public readonly ImgUrl = environment.ImgUrl;
  selectedItems: ColorsModel[];
  locationData: any[]=[];
  itemsall: any[]=[];
  submitted: boolean;
  searchChanged: Subject<string> = new Subject<string>();
  term:any;
  clonedProducts: { [s: string]: any; } = {};
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
    this.cols = [
      { field: 'ProdCode', header: 'Product Code' },
      { field: 'Image', header: 'Image' },
      { field: 'ProdCate', header: 'Category' },
      { field: 'HSNCode', header: 'HSN Code' },
      { field: 'MRP', header: 'MRP' }
  ];
  this.colsexpand = [
    { field: 'ProdCode', header: 'Product Code' },
    { field: 'Image', header: 'Image' },
    { field: 'ProdCate', header: 'Category' },
    { field: 'HSNCode', header: 'HSN Code' },
    { field: 'MRP', header: 'MRP' }
];
    this. _fetchData();
    this._fetchLocationData();
   }
 

   private _fetchDataAll() { 
    this.filteritems=[];
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_get_product_stock_report_group";
    requestModel.pageNo=this.page;
    requestModel.pageSize=this.pageSize;
    requestModel.search=this.search;
    requestModel.id =this.PartyID;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.items = JSON.parse(response.items);
      var columnsIn = this.items[0]; 
      for(var key in columnsIn){
        let col=this.cols.filter(m=>m.field===key);
        if(col.length==0){
          if(key!="ColorID"){

            this.cols.push({ field: key, header: key })
          }
        
        }
        // here is your column name you are looking for
      } 
      let i=1;
      this.items.forEach(element => {
        element.allstock=this.itemsall.filter(m=>m.ProdCode==element.ProdCode);
        element.id=i;
        i++;
      });
      console.log(this.cols);
      console.log("this.items",this.items);
      this.totalRecords = response.totalCount;
    });   
  }

   private _fetchData() { 
    this.filteritems=[];
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_get_product_stock_report";
    requestModel.pageNo=this.page;
    requestModel.pageSize=this.pageSize;
    requestModel.search=this.search;
    requestModel.id =this.PartyID;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.itemsall = JSON.parse(response.items);
      var columnsIn = this.itemsall[0]; 
      for(var key in columnsIn){
        let col=this.colsexpand.filter(m=>m.field===key);
        if(col.length==0){
          if(key!="ColorID"){

            this.colsexpand.push({ field: key, header: key })
          }
        
        }
        // here is your column name you are looking for
      } 
    
     this._fetchDataAll();
  
    });   
  }
 
   public handlePagination(paginationData): void {
    this.page = paginationData.page + 1;
    this._fetchData();
  }
 
  private _fetchLocationData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetLocationMast";
    requestModel.pageNo = 1;
   
    requestModel.pageSize =9999999;
    requestModel.search = "";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.locationData= JSON.parse(response.items);
    
    });
  }
  onChange(event){
this.PartyID=event.value;
this._fetchData();
  }

openNew() {
  this.router.navigate(['/master/insert-city-master']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected products?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {

      let requestModel = <DeleteModel>{};
      requestModel.table_name="CityMaster";
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

editProduct(data: ColorsModel) {
  this.router.navigate(['/master/insert-city-master', { id: data.SlNo }]);
  this.item = {...data};
  this.productDialog = true;
}

deleteProduct(data: ColorsModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.ColorName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="ColorMast";
        requestModel.column_name="SlNo";
        requestModel.column_value=data.SlNo.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this._fetchData();
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

onRowEditInit(product: any) {
  this.clonedProducts[product.id] = {...product};
}

onRowEditSave(product: any) {
  if (product.DiscPer > 0) {
      let jsonData: any[] = [];
      jsonData.push(product);
      let postrequest: RequestModel = <RequestModel>{};
      postrequest.spName = "sp_ui_admin_add_Party_hsn_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
         this._fetchData();
        }
        else{
         
          this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
        }
      })
      
  }
  else {
      this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
  }
}

onRowEditCancel(product: any, index: number) {
 // this.products2[index] = this.clonedProducts[product.id];
  //delete this.clonedProducts[product.id];
}
}
