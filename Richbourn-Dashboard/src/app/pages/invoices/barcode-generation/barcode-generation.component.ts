import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { PartyModel } from 'src/app/core/models/Party.model';
import { PurchaseModel } from 'src/app/core/models/Purchase.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogInsertPURCHASEComponent } from '../dialog-insert-purchase/dialog-insert-purchase.component';
import { AutoComplete } from 'primeng/autocomplete';


@Component({
  selector: 'app-barcode-generation',
  templateUrl: './barcode-generation.component.html',
  styleUrls: ['./barcode-generation.component.scss'],
  providers: [MessageService, TabService, DialogService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */
export class BarcodeGenerationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild('autocomplete') ac: AutoComplete;
  InvoiceData: any;
  //messageService: any;
  uploadedFiles: any[];
  productData: any[] = [];
  productData_distinct: any[] = [];
  taxsetup: any[] = [];
  imageURL: string;
  selectedDoc: string = "";
  selectedProduct = "";
  ItemDiscount: number = 0;

  app_name = "";
  ref: DynamicDialogRef;
  selectedUser: any;
  unique_key = "";
  LocationID = 0;
  totalDiscount = 0;
  other_charge1 = 0;
  other_charge2 = 0;
  other_charge3 = 0;
  total_tax = 0;
  rcv_amt = 0;
  public readonly ImgUrl = environment.ImgUrl;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    public dialogService: DialogService,
    public messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  PurchaseData: PurchaseModel[] = [];
  PartyData: PartyModel[] = [];
  LocationData: PartyModel[] = [];
  docTypeData: any[] = [];
  alldocTypeData: any[] = [];
  hsnata: any[] = [];
  selectedUsers: any = [];
  locationData: any[] = [];
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

  public placeholder: string = 'Enter the Product Code';
  public keyword = 'ProdCode';
  public historyHeading: string = 'Recently selected';

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'INVOICE MASTER', active: true }];
    this.formData = this.formBuilder.group({
      ItemDiscount: [0],
      usersDetails: this.formBuilder.array([]),
      PartyID: ['', [Validators.required]],
      Location: [''],
      ReceivedDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
    
      
     
    });

    if (localStorage.getItem("app_name") === "work") {

      this.app_name = "work";
    }
    else {

      this.app_name = "op";
    }
    this.unique_key = this.createId();
    this._fetchProduct();
    this._fetchLocation();
    this._fetchAllDoctype();
    this._fetchLocationData();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
       // this._fetchData()
      }
      else { }
    })

    this.submit = false;
  }
  onLocationChange(event) {
    this.LocationID = event.value;
    (this.formData.get('usersDetails') as FormArray).clear();
    this._fetchProduct();
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
  submitTemplateForm(value) {
    console.log(value);
  }
  selectEvent(item) {
    console.log(item);
    this.onProductSelect(item);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    console.log("hellooo");

    if (this.formData.valid) {
      let request: PurchaseModel = <PurchaseModel>{};

      //  request.InvNo = this.formData.get('InvNo').value;//
      request.PartyID = this.formData.get('PartyID').value.GLCode;//
      request.ReceivedDate = this.formData.get('ReceivedDate').value;//
    
    

      request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//

      request.UserID = 1;
      request.SlNo = Number(this.id);

    

      console.log("post product", request);//
      sessionStorage.setItem("qr",JSON.stringify(request))
      this.router.navigate(['/invoices/barcode-print']);
    }
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
  public _fetchParty(event: any) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetPartyMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    requestModel.ColumnValue = "";

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.PartyData = JSON.parse(response.items);

    });
  }

  private _fetchLocation() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_dropdown_GetLocationMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.LocationData = JSON.parse(response.items);

    });
  }

  ngAfterViewInit() {
    ///this.myInputField.nativeElement.focus();
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
      ProductImage: new FormControl(""),
      ColorID: new FormControl(""),
      LocationID: new FormControl(0),
      ProdCate:new FormControl(""),
    });
  }

  private updateControls(item: any) {
    console.log("item_t", item)
    return new FormGroup({
      SlNo: new FormControl(Number(item.SlNo)),
      ProdCode: new FormControl(item.ProdCode.toString()),
      ColoursName: new FormControl(item.ColoursName),
      Location: new FormControl(item.Location),
      HSNCode: new FormControl(item.HSNCode),
      MRP: new FormControl(item.MRP),
      Discount: new FormControl(Number(item.Discount)),
      Qty: new FormControl(Number(item.Qty)),
      Rate: new FormControl(Number(item.Rate)),
      Amt: new FormControl(Number(item.Amt)),
      ProductImage: new FormControl(item.ProductImage),
      ColorID: new FormControl(item.ColorID),
      LocationID: new FormControl(Number(item.LocationID)),
      Size:new FormControl(item.Size),
      SizeID:new FormControl(item.SizeID),
      ProdCate:new FormControl(item.ProdCate),
      
    });
  }

  public ChangeTotalDiscount(event: any) {
    console.log("ChangeTotalDiscount", event);
    this.totalDiscount = event.value;

    this.CalculateAmount();
  }
  public ChangeRate(event: any, index: number) {
    console.log(event.value, index);
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
    myForm.patchValue({
      Amt: event.value * myForm.value.Qty,

    })
    //this.Calculate_Gross();
    this.CalculateAmount();
  }
  public ChangeQty(event: any, index: number) {
    console.log(event.value, index);
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
    myForm.patchValue({
      Amt: event.value * myForm.value.Rate,

    })
    this.CalculateAmount();
  }
  public ChangeDiscount(event: any, index: number) {
    console.log(event.value, index);
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
    myForm.patchValue({
      Rate: myForm.value.MRP * (100 - event.value) / 100,
      Amt: myForm.value.Qty * myForm.value.MRP * (100 - event.value) / 100,

    })
    this.CalculateAmount();
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

  public _fetchProduct() {
    let requestModel = <RequestModel>{};
    // requestModel.spName="sp_admin_Get_SubItemMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 9999999;
    requestModel.search = this.LocationID + "";
    requestModel.spName = "sp_admin_GetProdMast_invoice";
    // requestModel.pageNo = 1;
    // requestModel.pageSize = 10;
    // requestModel.search=event.query;
    // requestModel.TableName = "ProdMast";
    // requestModel.FilterColumn = "SlNo";
    // requestModel.SearchColumn = "ProdCode";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.productData = JSON.parse(response.items);
      this.productData_distinct = this.productData.filter(
        (thing, i, arr) => arr.findIndex(t => t.ProdCode === thing.ProdCode) === i
      );

    });
    this.CalculateAmount();
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
      this.CalculateAmount();
    }



  }


  showDialog(item) {
    this.ref = this.dialogService.open(DialogInsertPURCHASEComponent, {
      closable: true,
      showHeader: false,
      width: '100%',
      data: { item: item, location: this.LocationData },
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((summery: any[]) => {
      console.log("abc", summery)
      let items = this.formData.get("usersDetails").value;

      console.log("usersDetails", items)
      if (summery != null && summery.length) {
        summery.forEach(obj => {
          let index = items.findIndex(x => x.ProdCode.toString() === obj.ProdCode.toString() && x.ColoursName.toString() === obj.ColoursName.toString());
          if (index >= 0) {
            const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
            myForm.patchValue({
              SlNo: Number(obj.SlNo),
              ProdCode: obj.ProdCode.toString(),
              ColoursName: obj.ColoursName,

              ProductDescription: obj.ProductDescription,
              Location: obj.Location,
              HSNCode: obj.HSNCode,
              MRP: obj.MRP,
              Discount: Number(obj.Discount),
              Qty: Number(obj.Qty),
              Rate: Number(obj.Rate),
              Amt: Number(obj.Amt)



            })

          }
          else {
            console.log("index", index)
            if (obj.Qty > 0) {
              this.usersDetails.push(this.updateControls(obj));
            }
          }

        });

      }
      this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: "" });
      this.CalculateAmount();
    });

  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

 
  public _fetchAllDoctype() {

    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetSeriesMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 100;
    requestModel.search = "";
    requestModel.ColumnValue = "FG PURCHASE";
    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.alldocTypeData = JSON.parse(response.items);

    });
    this.CalculateAmount();
  }


  public _fetchDoctype(event) {
    this.docTypeData = [];
    this.alldocTypeData.forEach(element => {
      this.docTypeData.push(element)

    });
    this.CalculateAmount();
  }

  onItemSelect(index: number) {
    const dataForm = (<FormArray>this.formData.get("usersDetails")).at(index);
    console.log(event, index);
    let prod = this.productData.filter(m => m.ProdCode == dataForm.value.ProdCode);
    if (prod) {
      let t = prod[0];
      // console.log("proditem", t);
      const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
      myForm.patchValue({
        ProductDescription: t.ProdDesc,
        MRP: t.MRP,
        HSNCode: t.HSNCode,
        Location: t.Location,
        Discount: t.Discount,
        Quantity: 1,
        Amount: t.MRP,
        ColoursName: t.ColoursName
      })

      prod.forEach(element => {
        element.Discount = 0;
        element.Qty = 1;
        element.Rate = 0;
        element.Amt = 0;
      });

      this.showDialog(prod);
    }


    this.CalculateAmount();
  }


  public _fetchProductFilter(event) {
    if (this.selectedDoc != "") {

      this.productData_distinct = this.productData.filter(
        (thing, i, arr) => arr.findIndex(t => t.ProdCode === thing.ProdCode) === i
      );


    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Select Invoice Type', life: 3000 });
    }
  }


  onProductSelect(event: any) {
    console.log(event);
    let prod = this.productData.filter(m => m.ProdCode == event.ProdCode);
    console.log("proditem", prod);
    if (prod.length) {
      let t = prod[0];
      // console.log("proditem", t);
      // const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
      // myForm.patchValue({
      //   ProductDescription: t.ProdDesc,
      //   MRP: t.MRP,
      //   HSNCode: t.HSNCode,
      //   Location: t.Location,
      //   Discount: t.Discount,
      //   Quantity: 1,
      //   Amount: t.MRP,
      //   ColoursName: t.ColoursName
      // })

      prod.forEach(element => {
        element.Discount = this.ItemDiscount;
        element.Qty = 1;
        element.Rate = element.MRP * (100 - element.Discount) / 100;
        element.Amt = element.Rate * element.Qty;
        element.Stock = element.stock
      
      });

      this.showDialog(prod);
    }

    this.clearValue();

  }
  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  clearValue() {
    this.selectedProduct = null;
  }

  groupBy(list, keyGetter) {
    const map = new Map();

    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  _fetchTax(event: any) {
    console.log("sp_admin_GetSeriesTaxMast", event);
    this.selectedDoc = event.ShortName;
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetSeriesTaxSetup";
    requestModel.pageNo = 1;
    requestModel.pageSize = 9999;
    requestModel.search = event.SlNo.toString();
    requestModel.id = Number(this.id);
    requestModel.ColumnValue = "FG PURCHASE";

    this.service.GetFilterApiJson(requestModel).subscribe(response => {

      this.taxsetup = JSON.parse(response.items);
      console.log("taxsetup", this.taxsetup);
    });
  }

  _fetchTaxCalculate(ShortName: any, SlNo: any) {
    console.log("sp_admin_GetSeriesTaxMast", event);
    this.selectedDoc = ShortName;
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetSeriesTaxSetup";
    requestModel.pageNo = 1;
    requestModel.pageSize = 9999;
    requestModel.search = SlNo.toString();
    requestModel.id = Number(this.id);
    requestModel.ColumnValue = "FG PURCHASE";

    this.service.GetFilterApiJson(requestModel).subscribe(response => {

      this.taxsetup = JSON.parse(response.items);
      this.CalculateAmount();
      console.log("taxsetup", this.taxsetup);
    });
  }


  UpdateItemDiscount(event) {
    this.ItemDiscount = event.value;
    let items = this.formData.get("usersDetails").value;
    items.forEach((value, index) => {
      const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
      myForm.patchValue({
        Rate: myForm.value.MRP * (100 - event.value) / 100,
        Amt: myForm.value.Qty * myForm.value.MRP * (100 - event.value) / 100,
        Discount: event.value
      })

    });

    this.CalculateAmount();
  }

  private CalculateAmount() {
  }
  private _fetchLocationData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetLocationMast";
    requestModel.pageNo = 1;

    requestModel.pageSize = 9999999;
    requestModel.search = "";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.locationData = JSON.parse(response.items);

    });
  }
  OnOtherCharge1(event) {
    this.other_charge1 = event.value;
    this.CalculateAmount();
  }
  OnOtherCharge2(event) {
    this.other_charge2 = event.value;
    this.CalculateAmount();
  }
  OnOtherCharge3(event) {
    this.other_charge3 = event.value;
    this.CalculateAmount();
  }
  ChangeRcvAmt(event) {
    this.rcv_amt = event.value;
    this.CalculateAmount();
  }
  Close() {
    this.router.navigate(['/invoices/Purchase']);
  }
}
