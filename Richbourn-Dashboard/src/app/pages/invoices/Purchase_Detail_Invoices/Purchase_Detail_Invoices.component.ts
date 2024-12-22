import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PurchaseDetailModel } from 'src/app/core/models/PurchaseDetail.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PurchaseModel } from 'src/app/core/models/Purchase.model';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './Purchase_Detail_Invoices.component.html',
  styleUrls: ['./Purchase_Detail_Invoices.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class Purchase_Detail_InvoicesComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  id: Number = 0;
  items: PurchaseDetailModel[];
  PurchaseData: PurchaseModel[] = [];
  prodData: PurchaseModel[] = [];
  page: number = 1;
  pageSize: number = 10;
  item: PurchaseModel = <PurchaseModel>{};
  purchaseData: PurchaseModel = <PurchaseModel>{};
  search: string = "";
  totalRecords: number = 0;
  selectedItems: PurchaseDetailModel[];
  submitted: boolean;
  searchChanged: Subject<string> = new Subject<string>();
  term: any;


  cols: any[];
  productData: any;
  formData: any;
  selectedProduct: string;
  constructor(private router: Router, private service: ResourceService<any>,
    private route: ActivatedRoute,
    private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
      else { }
    })

  }


  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetPurchaseMast_Slno";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);
    this.prodData = [];
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.PurchaseData = JSON.parse(response.items);
      if (this.PurchaseData.length) {
        let data = this.PurchaseData[0];
        console.log("PurchaseData", data);
        this.purchaseData = data;
        //this.formData.controls['ID'].setValue(data['ID']);
        let summery = data.usersDetails;
        if (summery != null && summery.length) {
          summery.forEach(obj => {
            this.prodData.push(obj);
          });

        }
        console.log("this.prodData", this.prodData);
      }
    });
  }

  onSelect(event: any, index: number) {
    console.log(event, index);
    let prod = this.productData.filter(m => m.ProdCode == event.value);
    if (prod) {
      let t = prod[0];
      console.log("proditem", t);
      const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
      myForm.patchValue({
        ProductDescription: t.ProdDesc,
        MRP: t.MRP,
        HSNCode: t.HSNCode,
        Location: t.Location,
        Discount: t.Discount,
        Quantity: 0,
        Amount: t.MRP,
        ColoursName: t.ColoursName,
        ColorID: Number(t.ColorID)
      })

      prod.forEach(element => {
        element.Discount = 0;
        element.Qty = 0;
        element.Rate = 0;
        element.Amt = 0;
      });

      this.showDialog(prod);
      this.selectedProduct = "";
    }



  }
  showDialog(prod: any) {
    throw new Error('Method not implemented.');
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
