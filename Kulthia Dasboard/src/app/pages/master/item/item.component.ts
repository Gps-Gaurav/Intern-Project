import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { ItemModel } from 'src/app/core/models/item.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class ItemComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete: "Delete";
  items: ItemModel[];
  page: number = 1;
  pageSize: number = 10;
  term: any;
  item: ItemModel = <ItemModel>{};
  search: string = "";
  totalRecords: number = 0;
  selectedItems: ItemModel[];
  submitted: boolean;
  searchChanged: Subject<string> = new Subject<string>();
  constructor(private router: Router, private service: ResourceService<any>, private messageService: MessageService, private confirmationService: ConfirmationService) { 
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
    this._fetchData();
  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_ItemMast";
    requestModel.pageNo = this.page;
    requestModel.pageSize = this.pageSize;
    requestModel.search = this.search;
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
    this.router.navigate(['/master/CREATE_ITEM_MASTER']);
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name = "ItemMast";
        requestModel.column_name = "ItemCode";
        requestModel.column_value = this.selectedItems.map(a => a.ItemCode).toString();
        this.service.MultiDeleteApiJson(requestModel).subscribe(response => {
          console.log("delete", response);
          this.items = this.items.filter(val => !this.selectedItems.includes(val));
          this.selectedItems = null;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        });


      }
    });
  }

  editProduct(data: ItemModel) {
    this.router.navigate(['/master/CREATE_ITEM_MASTER', { id: data.ItemCode }]);
    // this.item = {...data};
    // this.productDialog = true;
  }

  deleteProduct(data: ItemModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.Item + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name = "ItemMast";
        requestModel.column_name = "ItemCode";
        requestModel.column_value = data.ItemCode.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
          console.log("delete", response);
       
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
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
