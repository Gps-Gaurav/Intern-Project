import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { ColorsModel } from 'src/app/core/models/colors.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-party-discount',
  templateUrl: './party-discount.component.html',
  styleUrls: ['./party-discount.component.scss'],
  providers: [MessageService,ConfirmationService],
  encapsulation:ViewEncapsulation.None

})
export class PartyDiscountComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: ColorsModel[];
  page:number=1;
  pageSize:number=10;
  item: ColorsModel=<ColorsModel>{};
  search: string = "";
  totalRecords:number=0;
  PartyID=0;
  selectedItems: ColorsModel[];
  partyData: any[]=[];
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
    this. _fetchData();
    this._fetchPartyData();
   }
 
   private _fetchData() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_get_party_hsn";
    requestModel.pageNo=this.page;
    requestModel.pageSize=this.pageSize;
    requestModel.search=this.search;
    requestModel.id =this.PartyID;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.items = JSON.parse(response.items);
      this.totalRecords = response.totalCount;
    });   
  }
 
   public handlePagination(paginationData): void {
    this.page = paginationData.page + 1;
    this._fetchData();
  }
 
  private _fetchPartyData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetPartyMast";
    requestModel.pageNo = 1;
   
    requestModel.pageSize =9999999;
    requestModel.search = "";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this. partyData= JSON.parse(response.items);
    
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
