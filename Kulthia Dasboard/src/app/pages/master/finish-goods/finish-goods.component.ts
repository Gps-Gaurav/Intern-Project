import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { DiamondModel } from 'src/app/core/models/diamond.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
@Component({
  selector: 'app-finish-goods',
  templateUrl: './finish-goods.component.html',
  styleUrls: ['./finish-goods.component.scss'],
  providers: [MessageService,ConfirmationService, TabViewModule]

})
export class FinishGoodsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: DiamondModel[];
  page:number=1;
  pageSize:number=10;
  item: DiamondModel=<DiamondModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedItems: DiamondModel[];
  submitted: boolean;
  diamond_type: any[]=[];
  selectedDiamondType: any;
  constructor(private router: Router,private  service:ResourceService<any>, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.diamond_type = [
      {name: 'Weight Ranges', code: 'W'},
      {name: 'Colours', code: 'C'},
      {name: 'Sizes', code: 'Z'},
      {name: 'Shapes', code: 'S'},
      {name: 'Purities', code: 'P'}
  ];
  this.selectedDiamondType=this.diamond_type[0];
    this. _fetchData();
   }
 
   private _fetchData() { 
    this.items=[];
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_Get_DiamondMast";
    requestModel.pageNo=this.page;
    requestModel.pageSize=this.pageSize;
    requestModel.search=this.search;
    requestModel.ColumnValue=this.selectedDiamondType.code;

    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.items = JSON.parse(response.items);
      this.totalRecords = response.totalCount;
    });   
  }
 
   public handlePagination(paginationData): void {
    this.page = paginationData.page + 1;
    this._fetchData();
  }
 
 
public ChangeType(obj:any){

  this.selectedDiamondType=obj.value;
  this._fetchData();
}
openNew() {
  this.router.navigate(['/master/CREATE_DIAMOND_MASTER']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="DiamondMast";
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

editProduct(data: DiamondModel) {
  this.router.navigate(['/master/CREATE_DIAMOND_MASTER', { id: data.SlNo }]);
  // this.item = {...data};
  // this.productDialog = true;
}

deleteProduct(data: DiamondModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.Series + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="DiamondMast";
        requestModel.column_name="SlNo";
        requestModel.column_value=data.SlNo.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => val.id !== data.id);
        this.item =<DiamondModel>{};
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