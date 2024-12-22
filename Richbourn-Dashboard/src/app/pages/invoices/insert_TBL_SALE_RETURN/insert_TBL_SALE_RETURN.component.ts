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
import { Sale_returnModel } from 'src/app/core/models/Sale_Return.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogInsertPURCHASEComponent } from '../dialog-insert-purchase/dialog-insert-purchase.component';
import { AutoComplete } from 'primeng/autocomplete';
import { DialogInsertSALEComponent } from '../dialog-insert-sale/dialog-insert-sale.component';

@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_SALE_RETURN.component.html',
  styleUrls: ['./insert-TBL_SALE_RETURN.component.scss'],
  providers: [MessageService, TabService, DialogService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_SALE_RETURNComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild('autocomplete') ac: AutoComplete;

  app_name = "";
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
  ref: DynamicDialogRef;
  selectedUser: any;
  unique_key = "";
  LocationID = 0;
  totalDiscount = 0;
  other_charge1 = 0;
  other_charge2 = 0;
  other_charge3 = 0;
  totalqty = 0;
  public readonly ImgUrl = environment.ImgUrl;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    public dialogService: DialogService,
    public messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  SaleData: Sale_returnModel[] = [];
  PartyData: PartyModel[] = [];
  LocationData: PartyModel[] = [];
  locationData: any[] = [];
  docTypeData: any[] = [];
  total_tax = 0;
  alldocTypeData: any[] = [];
  hsnata: any[] = [];
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
  rcv_amt = 0;
  image = '';
  file = '';
  public placeholder: string = 'Enter the Product Code';
  public keyword = 'ProdCode';
  public historyHeading: string = 'Recently selected';

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'SALE_RETURN MASTER', active: true }];
    this.formData = this.formBuilder.group({
      ItemDiscount: [0],
      usersDetails: this.formBuilder.array([]),

      TaxType: ['', [Validators.required]],
      InvNo: [''],
      LocationID: ['', [Validators.required]],
      PartyID: ['', [Validators.required]],
      BillAdd1: ['', [Validators.required]],
      DelvAdd1: ['', [Validators.required]],
      InvDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
      TransporterName: [''],
      DueDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],

      WayBillNo: [''],
      CNNo: [''],
      Remarks: [''],
      GrossAmt: ['', [Validators.required]],
      DiscAmt: [0, [Validators.required]],
      DiscValue: [0],
      OtherChargeAmt1: [0],
      OtherChargeAmt2: [0],
      OtherChargeAmt3: [0],
      OtherChargeDesc1: [''],
      OtherChargeDesc2: [''],
      OtherChargeDesc3: [''],
      RndOffAmt: [0, [Validators.required]],
      NetAmt: ['', [Validators.required]],
      RcvAmt: [0],
      DueAmount: ['', [Validators.required]],
      SubTotal: [0, [Validators.required]],
      TotalItem: [0],
    });
    this.unique_key = this.createId();
    if (localStorage.getItem("app_name") === "work") {

      this.app_name = "work";
    }
    else {

      this.app_name = "op";
    }

    this._fetchParty();
    this._fetchLocation();
    this._fetchAllDoctype();
    this._fetchLocationData();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
      else { }
    })

    this.submit = false;



  }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
  submitTemplateForm(value) {
    console.log(value);
  }
  selectEvent(item) {
    console.log("selectedproduct", item);
    this.onProductSelect(item);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onLocationChange(event) {
    this.LocationID = event.value;
    console.log("event", event);
    (this.formData.get('usersDetails') as FormArray).clear();
    this._fetchProduct();
  }
  onFocused(e) {
    // do something
  }
  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    console.log("hellooo");

    if (this.formData.valid) {
      let request: Sale_returnModel= <Sale_returnModel>{};

      //   request.InvNo = this.formData.get('InvNo').value;//
      request.LocationID = this.formData.get('LocationID').value;//
      request.BillAdd1 = this.formData.get('BillAdd1').value;//
      request.PartyID = this.formData.get('PartyID').value;//
      request.DelvAdd1 = this.formData.get('DelvAdd1').value;//
      request.TransporterName = this.formData.get('TransporterName').value;//
      request.InvDate = this.formData.get('InvDate').value;//
      request.DueDate = this.formData.get('DueDate').value;//
      request.BillType = this.formData.get('TaxType').value;//
      request.WayBillNo = this.formData.get('WayBillNo').value;//
      request.CNNo = this.formData.get('CNNo').value;//
      request.Remarks = this.formData.get('Remarks').value;//
      request.GrossAmt = this.formData.get('GrossAmt').value;//
      //request.DiscPer = this.formData.get('DiscPer').value.toUpperCase();//
      request.DiscAmt = this.formData.get('DiscAmt').value;//
      request.OtherChargeDesc1 = this.formData.get('OtherChargeDesc1').value//
      request.OtherChargeAmt1 = this.formData.get('OtherChargeAmt1').value;//
      request.OtherChargeDesc2 = this.formData.get('OtherChargeDesc2').value;//
      request.OtherChargeAmt2 = this.formData.get('OtherChargeAmt2').value;//
      request.OtherChargeDesc3 = this.formData.get('OtherChargeDesc3').value;//
      request.OtherChargeAmt3 = this.formData.get('OtherChargeAmt3').value;//
      request.RndOffAmt = this.formData.get('RndOffAmt').value;//
      request.NetAmt = this.formData.get('NetAmt').value;//
      request.RcvAmt = this.formData.get('RcvAmt').value;//
      request.AmtAdjusted = this.formData.get('DueAmount').value;//
      request.SubTotal = this.formData.get('SubTotal').value;//
      request.TotalQty = this.totalqty;

      request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//

      request.UserID = 1;
      request.SlNo = Number(this.id);

      let jsonData: Sale_returnModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_SaleReturnInvoiceMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.document.statusMessage === "success") {
          this.toastr.success('Sale Inserted Successfully!', 'Success!');
          this.router.navigate(['/invoices/SaleReturn']);
        }
        else {
          this.toastr.error('Sale not added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }
  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetSaleReturnMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.SaleData = JSON.parse(response.items);
      if (this.SaleData.length) {
        let data = this.SaleData[0];
        console.log("SaleData", data);
        //this.formData.controls['ID'].setValue(data['ID']);
        let summery = data.usersDetails;
        if (summery != null && summery.length) {
          summery.forEach(obj => {
            this.usersDetails.push(this.updateControls(obj));
          });

        }
        this.formData.controls['InvNo'].setValue(data['InvNo']);
        // this.formData.controls['SaleNo'].setValue(data['SaleNo']);
        this.formData.controls['BillAdd1'].setValue(data['BillAdd1']);
        this.formData.controls['DelvAdd1'].setValue(data['DelvAdd1']);
        this.formData.controls['LocationID'].setValue(data['LocationID']);
        this.LocationID = data['LocationID'];
        this.formData.controls['PartyID'].setValue(data['PartyID']);
        this.formData.controls['TaxType'].setValue(Number(data['BillType']));
        this.formData.controls['TransporterName'].setValue(data['TransporterName']);
        this.formData.controls['InvDate'].setValue(data['InvDate']);
        this.formData.controls['DueDate'].setValue(data['DueDate']);

        this.formData.controls['WayBillNo'].setValue(data['WayBillNo']);
        this.formData.controls['CNNo'].setValue(data['CNNo']);
        this.formData.controls['Remarks'].setValue(data['Remarks']);
        this.formData.controls['GrossAmt'].setValue(data['GrossAmt']);
        this.formData.controls['DiscAmt'].setValue(data['DiscAmt']);

        this.formData.controls['OtherChargeAmt1'].setValue(data['OtherChargeAmt1']);
        this.formData.controls['OtherChargeDesc1'].setValue(data['OtherChargeDesc1']);
        this.formData.controls['OtherChargeAmt2'].setValue(data['OtherChargeAmt2']);
        this.formData.controls['OtherChargeDesc2'].setValue(data['OtherChargeDesc2']);
        this.formData.controls['OtherChargeAmt3'].setValue(data['OtherChargeAmt3']);
        this.formData.controls['OtherChargeDesc3'].setValue(data['OtherChargeDesc3']);
        this.formData.controls['RndOffAmt'].setValue(data['RndOffAmt']);
        this.formData.controls['NetAmt'].setValue(data['NetAmt']);
        this.formData.controls['RcvAmt'].setValue(data['RcvAmt']);
        this.formData.controls['DueAmount'].setValue(data['AmtAdjusted']);
        this.formData.controls['SubTotal'].setValue(data['SubTotal']);
        this.rcv_amt = Number(data['AmtAdjusted']);
        this.other_charge1 = Number(data['OtherChargeAmt1']);
        this.other_charge2 = Number(data['OtherChargeAmt2']);
        this.other_charge3 = Number(data['OtherChargeAmt3']);
        this._fetchProduct();
        this._fetchTax({ value: Number(data['BillType']) })

      }
    });
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
  public _fetchParty() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetFilterParty";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10000;
    requestModel.search = "1,2,8";
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
    this.myInputField.nativeElement.focus();
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
      LocationID: new FormControl(0)
    });
  }

  private updateControls(item: any) {
    console.log("item_t", item)
    console.log("item_LOcation", item.LocationID)
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
      Size: new FormControl(item.Size),
      SizeID: new FormControl(item.SizeID),
      ProductImage: new FormControl(item.ProductImage),
      ColorID: new FormControl(item.ColorID),
      LocationID: new FormControl(Number.isNaN(item.LocationID) ? 0 : Number(item.LocationID))
    });
  }
  ChangeRcvAmt(event) {
    this.rcv_amt = event.value;
    this.CalculateAmount();
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
    this.productData = [];
    this.productData_distinct = [];
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
  }

  onSelect(event: any, index: number) {
    console.log(event, index);
    let prod = this.productData.filter(m => m.ProdCode == event.value);
    if (prod.length) {
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
      console.log("all item prod", prod);
      this.showDialog(prod);
      this.selectedProduct = "";
    }



  }


  showDialog(item) {
    this.ref = this.dialogService.open(DialogInsertSALEComponent, {
      closable: true,
      showHeader: false,
      width: '100%',
      data: { item: item },
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
              Amt: Number(obj.Amt),
              Size: Number(obj.SizeName),
              SizeID: Number(obj.SizeID)


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
    requestModel.ColumnValue = "FG SALE";
    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.alldocTypeData = JSON.parse(response.items);

    });
  }
  public _fetchDoctype(event) {
    this.docTypeData = [];
    this.alldocTypeData.forEach(element => {
      this.docTypeData.push(element)
    });
    // this.docTypeData = this.alldocTypeData;

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

    let prod = this.productData.filter(m => m.ProdCode == event.ProdCode);
    if (prod.length) {
      let t = prod[0];


      prod.forEach(element => {
        element.Discount = this.ItemDiscount;
        element.Qty = 1;
        element.Rate = element.MRP * (100 - element.Discount) / 100;
        element.Amt = element.Rate * element.Qty;
        element.LocationID = this.LocationID,
          element.Location = this.locationData.find(x => x.SlNo === this.LocationID).Location
      });
      console.log("onProductSelect", prod);
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
  CalculateAmount() {
    let items = this.formData.get("usersDetails").value;

    const grouped = this.groupBy(items, m => m.HSNCode);
    let keys = Array.from(grouped.keys());
    this.hsnata = [];
    keys.forEach(element => {
      let values = grouped.get(element);
      let taxdata = this.taxsetup.filter(m => m.HSNCode === element);
      let TaxPer1 = 0; let TaxPer2 = 0;
      if (taxdata.length) {
        let taxamt = taxdata[0];
        TaxPer1 = taxamt.TaxPer1;
        TaxPer2 = taxamt.TaxPer2;
        console.log("taxamt", taxamt);
      }
      let taxamt = values.reduce((sum, current) => sum + current.Amt, 0) * (100 - this.totalDiscount) / 100;
      this.hsnata.push({
        HSNCode: element,
        TaxableAmount: taxamt,
        Tax1: TaxPer1 + " %",
        TaxAmount1: taxamt * TaxPer1 / 100,
        Tax2: TaxPer2 + " %",
        TaxAmount2: taxamt * TaxPer2 / 100
      })
    });
    console.log("calculate amt");
    let gross = items.reduce((sum, current) => sum + current.Amt, 0);
    let total_item = items.reduce((sum, current) => sum + current.Qty, 0);
    this.totalqty = total_item;
    this.total_tax = this.hsnata.reduce((sum, current) => sum + (current.TaxAmount1 + current.TaxAmount2), 0)
    let netvalue = (gross * (100 - this.totalDiscount) / 100 +
      this.other_charge1 +
      this.other_charge2 +
      this.other_charge3 + this.total_tax);
    this.formData.patchValue({
      GrossAmt: gross * (100 - this.totalDiscount) / 100,
      SubTotal: gross,
      DiscValue: gross * this.totalDiscount / 100,
      NetAmt: Math.round(netvalue),
      TotalItem: total_item,
      DueAmount: Math.round(netvalue) - this.rcv_amt,
    })

    console.log("grouped", grouped);
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
  SelectParty(data) {
    console.log("selectparty", data)
    let party = this.PartyData.filter(m => m.GLCode == data.value);
    if (party.length) {
      let event = party[0];
      this.formData.patchValue({
        DelvAdd1: event.DelvAddress + "," + event.DCityName + "," + event["DStateName"] + "-" + event['DelvPinCode'],
        BillAdd1: event.GlBillingAdd + "," + event.CityName + "," + event['StateName'] + "-" + event['GlPinCode'],
        TransporterName: event.TransporterName
      })
    }
  }
  _fetchTax(event: any) {
    console.log("sp_admin_GetSeriesTaxMast", event);
    this.selectedDoc = event.ShortName;
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetSeriesTaxSetup";
    requestModel.pageNo = 1;
    requestModel.pageSize = 9999;
    requestModel.search = event.value.toString();
    requestModel.id = Number(this.id);
    requestModel.ColumnValue = "FG SALE";

    this.service.GetFilterApiJson(requestModel).subscribe(response => {

      this.taxsetup = JSON.parse(response.items);
      console.log("taxsetup", this.taxsetup);
      this.CalculateAmount();
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

  Close() {
    this.router.navigate(['/invoices/SaleReturn']);
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
}
