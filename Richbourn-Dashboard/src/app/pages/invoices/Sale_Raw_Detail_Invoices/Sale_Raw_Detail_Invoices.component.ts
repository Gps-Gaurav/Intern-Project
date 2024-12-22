import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PurchaseDetailModel } from 'src/app/core/models/PurchaseDetail.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './Sale_Raw_Detail_Invoices.component.html',
  styleUrls: ['./Sale_Raw_Detail_Invoices.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class Sale_Raw_Detail_InvoicesComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;

  items: PurchaseDetailModel[];
  page: number = 1;
  pageSize: number = 10;
  item: PurchaseDetailModel = <PurchaseDetailModel>{};
  search: string = "";
  totalRecords: number = 0;
  selectedItems: PurchaseDetailModel[];
  submitted: boolean;
  searchChanged: Subject<string> = new Subject<string>();
  term: any;
  constructor(private router: Router, private service: ResourceService<any>,
    private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this._fetchData();
  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetPurchaseMast";
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
