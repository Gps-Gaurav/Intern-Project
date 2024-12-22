import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { CategoryModel } from 'src/app/core/models/ProdCateMast.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [MessageService,ConfirmationService],
  encapsulation:ViewEncapsulation.None

})
export class CategoryComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: CategoryModel[];
  page:number=1;
  pageSize:number=10;
  item: CategoryModel=<CategoryModel>{};
  search: string = "";
  totalRecords:number=0;
  selectedItems: CategoryModel[];
  submitted: boolean;
  formData: any;
  submit: boolean;


  constructor(private router: Router,private  service:ResourceService<any>, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this. _fetchData();
   }
 
   private _fetchData() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetProdCateMast";
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
  this.router.navigate(['/master/CREATE_CATEGORY_MASTER']);
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name="ProdCateMast";
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

editProduct(data: CategoryModel) {
  this.router.navigate(['/master/CREATE_CATEGORY_MASTER', { id: data.SlNo }]);
  // this.item = {...data};
  // this.productDialog = true;
}

deleteProduct(data: CategoryModel) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.ProdCate + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name="ProdCateMast";
        requestModel.column_name="SlNo";
        requestModel.column_value=data.SlNo.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
        console.log("delete",response);
        this.items = this.items.filter(val => val.SlNo !== data.SlNo);
        this.item =<CategoryModel>{};
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
validSubmit() {
  const controls = this.formData.controls;
  this.submit = true;

  if (this.formData.valid) {
    let request: CategoryModel = <CategoryModel>{};

    request.ProductName = this.formData.get('ProductName').value;//
    request.ShortName = this.formData.get('ShortName').value;//
    request.SubItem = this.formData.get('SubItem').value;//
    request.NoOfPcs = this.formData.get('NoOfPcs').value;//
    request.FullDescription = this.formData.get('FullDescription').value;//
    request.Making = this.formData.get('Making').value;//
    request.StartingNo = this.formData.get('StartingNo').value;//
    request.HSNCode = this.formData.get('HSNCode').value;//
    request.Unit = this.formData.get('Unit').value;//
    request.PrintGrossWt = this.formData.get('PrintGrossWt').value;//
    request.CalculatePoints = this.formData.get('CalculatePoints').value;//
  

    let jsonData: CategoryModel[] = [];
    jsonData.push(request);
    let postrequest: RequestModel = <RequestModel>{};

    postrequest.spName = "sp_ui_admin_add_SubCateMast_json";
    postrequest.jsnData = JSON.stringify(jsonData);
    this.service.PostApiJson(postrequest).subscribe(Response => { })

    console.log("post product", request);//


  }
}

}
