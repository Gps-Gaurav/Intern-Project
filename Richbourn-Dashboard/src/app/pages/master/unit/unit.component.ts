import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { UnitModel } from 'src/app/core/models/unit.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-category',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  providers: [MessageService,ConfirmationService],
  encapsulation:ViewEncapsulation.None
})
export class UnitComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: UnitModel[];
  page:number=1;
  pageSize:number=10;
  item: UnitModel=<UnitModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedItems: UnitModel[];
  submitted: boolean;
  formData: any;
  submit: boolean;
  term: any;
  searchChanged: Subject<string> = new Subject<string>();
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
    requestModel.spName="sp_admin_GetUnitMast";
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
  this.router.navigate(['/master/CREATE_UNIT_MASTER']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="UnitMast";
        requestModel.column_name="UnitID";
        requestModel.column_value=this.selectedItems.map(a=>a.UnitID).toString();
        this.service.MultiDeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
       
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this._fetchData();
  });   

     
      }
  });
}

editProduct(data: UnitModel) {
  this.router.navigate(['/master/CREATE_UNIT_MASTER', { id: data.UnitID }]);
  // this.item = {...data};
  // this.productDialog = true;
}

deleteProduct(data: UnitModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.Unit + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="UnitMast";
        requestModel.column_name="UnitID";
        requestModel.column_value=data.UnitID.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
    
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this._fetchData();


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
    let request: UnitModel = <UnitModel>{};

   
  
    request.ShortName = this.formData.get('ShortName').value;//
    request.Description = this.formData.get('Description').value;//
    request.Decimal = this.formData.get('Decimal').value;//
  

    let jsonData: UnitModel[] = [];
    jsonData.push(request);
    let postrequest: RequestModel = <RequestModel>{};

    postrequest.spName = "sp_ui_admin_add_UnitMast_json";
    postrequest.jsnData = JSON.stringify(jsonData);
    this.service.PostApiJson(postrequest).subscribe(Response => { })

    console.log("post product", request);//


  }
}

}

