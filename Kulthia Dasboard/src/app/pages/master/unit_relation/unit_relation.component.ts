import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { UnitRelationModel } from 'src/app/core/models/unitrelation.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-unit_relation',
  templateUrl: './unit_relation.component.html',
  styleUrls: ['./unit_relation.component.scss'],
  providers: [MessageService,ConfirmationService]

})
export class UnitRelationComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items:UnitRelationModel[];
  page:number=1;
  pageSize:number=10;
  term: any;
  item: UnitRelationModel=<UnitRelationModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedItems: UnitRelationModel[];
  submitted: boolean;
  formData: any;
  submit: boolean;
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
    requestModel.spName="sp_admin_GetUnitRelMast";
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
  this.router.navigate(['/master/CREATE_UNIT_RELATION_MASTER']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="UnitRel";
        requestModel.column_name="SlNo";
        requestModel.column_value=this.selectedItems.map(a=>a.SlNo).toString();
        this.service.MultiDeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this._fetchData();
     
  });   

     
      }
  });
}

editProduct(data: UnitRelationModel) {
  this.router.navigate(['/master/CREATE_UNIT_RELATION_MASTER', { id: data.SlNo }]);
  this.item = {...data};
  // this.productDialog = true;
}

deleteProduct(data: UnitRelationModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.SlNo + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="UnitRel";
        requestModel.column_name="SlNo";
        requestModel.column_value=data.SlNo.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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
}
// validSubmit() {
//   const controls = this.formData.controls;
//   this.submit = true;

//   if (this.formData.valid) {
//     let request: UnitRelationModel = <UnitRelationModel>{};

   
//     request.SlNo = this.formData.get('CateID').value;//
//     request.FromUnit = this.formData.get('FromUnit').value;//
//     request.ToUnit = this.formData.get('ToUnit').value;//
//     request.ConvFactor = this.formData.get('ConvFactor').value;//
  

//     let jsonData: UnitRelationModel[] = [];
//     jsonData.push(request);
//     let postrequest: RequestModel = <RequestModel>{};

//     postrequest.spName = "sp_ui_admin_add_UnitMast_json";
//     postrequest.jsnData = JSON.stringify(jsonData);
//     this.service.PostApiJson(postrequest).subscribe(Response => { })

//     console.log("post product", request);//


//   }
// }

// }

