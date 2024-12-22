import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { InvoiceModel } from 'src/app/core/models/Invoice.model';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { PartyModel } from 'src/app/core/models/Party.model';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-insert-purchase',
  templateUrl: './dialog-insert-sale.component.html',
  styleUrls: ['./dialog-insert-sale.component.scss'],
  providers: [MessageService, TabService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */
export class DialogInsertSALEComponent implements OnInit {

  InvoiceData: any;
  messageService: any;
  uploadedFiles: any[];
  productData: any[] = [];
  imageURL: string;
  selectedUser: any;
  public readonly ImgUrl = environment.ImgUrl;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    public config: DynamicDialogConfig,public ref: DynamicDialogRef,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  SaleData: InvoiceModel[] = [];
  PartyData: PartyModel[] = [];
  //LocationData: LocationModel[] = [];
  InvoiceModel: PartyModel[] = [];


  selectedUsers: any = [];
  get form() {

    return this.formData.controls;
  }


  // results: string[]=[];

  formData: FormGroup;
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

  image = '';
  file = '';


  ngOnInit() {

    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'INVOICE MASTER', active: true }];
    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
      usersDetails: this.formBuilder.array([]),

     
    });
     this.SaleData=this.config.data.item;
    // this.LocationData=this.config.data.location;
     console.log("this.PurchaseData",this.SaleData)
   if (this.SaleData != null && this.SaleData.length) {
    this.SaleData.forEach(obj => {
      this.usersDetails.push(this.updateControls(obj));
    });

  }

    this.submit = false;

   
   // this._fetchLocation();
  }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  validSubmit() {
    const controls = this.formData.controls;
  
    

      let usersDetails = this.formData.get('usersDetails').value;//
      this.ref.close(usersDetails);
     
  }

  

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  private _fetchState() {
    this.requestModel.url = "SP/sp_app_get_state";
    this.stateservice.postStoreList(this.requestModel).subscribe(response => {
      this.stateData = response.items;
      console.log("this.stateData", this.stateData);
    });
  }
  public _fetchParty(event) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetPartyMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    requestModel.ColumnValue = "finish";

    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.PartyData = JSON.parse(response.items);

    });
  }
  
 


  get usersDetails(): FormArray {
    return this.formData.get("usersDetails") as FormArray;
  }

  onAdd() {
    this.formData.markAllAsTouched();
    this.usersDetails.push(this.addControls());
  }

  private addControls() {
    return new FormGroup({
      SlNo: new FormControl(0),
      ColoursName: new FormControl(""),
      ProdCode: new FormControl(""),
      Location: new FormControl(""),
      HSNCode: new FormControl(""),
      MRP: new FormControl(""),
      Discount: new FormControl(""),
      Qty: new FormControl(""),
      Rate: new FormControl(""),
      Amt: new FormControl(""),
      Stock: new FormControl(""),
      ProductImage: new FormControl(""),
      ColorID: new FormControl(""),
      LocationID: new FormControl(""),
      Size:new FormControl(""),
      SizeID:new FormControl(0)
    });
  }

  private updateControls(item: any) {
    // if(item.Location){

    // }else{
    //   item.Location=this.LocationData[0].SlNo
    // }
    console.log("item_t", item)
    return new FormGroup({
      SlNo: new FormControl(Number(item.SlNo)),
      ProdCode: new FormControl(item.ProdCode.toString()),
      ColoursName: new FormControl(item.ColoursName),
      Location: new FormControl(item.Location),
      LocationID: new FormControl(Number(item.LocationID)),
      HSNCode: new FormControl(item.HSNCode),
      MRP: new FormControl(item.MRP),
      Discount: new FormControl(Number(item.Discount)),
      Qty: new FormControl(Number(item.Qty)),
      Rate: new FormControl(Number(item.Rate)),
      Amt: new FormControl(Number(item.Amt)),
      Stock: new FormControl(Number(item.stock)),
      ProductImage: new FormControl(item.ProductImage),
      ColorID: new FormControl(item.ProdColors),
      Size:new FormControl(item.Size),
      SizeID:new FormControl(item.SizeID)
    });
  }

  public ChangeRate(event: any, index: number) {
    console.log(event.value, index);
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
    myForm.patchValue({
      Amt: event.value * myForm.value.Qty,

    })
    //this.Calculate_Gross();
  }
  public ChangeQty(event: any, index: number) {
    console.log(event.value, index);
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
    myForm.patchValue({
      Amt: event.value * myForm.value.Rate,

    })
    //this.Calculate_Gross();
  }

  public ChangeDiscount(event: any, index: number) {
    console.log(event.value, index);
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
    myForm.patchValue({
      Rate:myForm.value.MRP*(100-event.value)/100,
      Amt: myForm.value.Qty* myForm.value.MRP*(100-event.value)/100,

    })
    //this.Calculate_Gross();
  }


  onDelete() {
    if (this.selectedUsers.length == 0) {
      this.messageService.add({
        severity: "warn",
        summary: "Info",
        detail: "Please select a record to delete!",
      });
      return;
    }
    console.log(this.selectedUsers);
    for (var i = this.selectedUsers.length - 1; i >= 0; i--) {
      this.usersDetails.controls.splice(this.selectedUsers[i] - 1, 1);
    }
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Selected records deleted!",
    });

    this.selectedUsers = [];
  }

  onUpload(event) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }


  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formData.patchValue({
      image: file
    });
    this.formData.get('image').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  onDialogClose(){
    this.ref.close();
  }
 
}
