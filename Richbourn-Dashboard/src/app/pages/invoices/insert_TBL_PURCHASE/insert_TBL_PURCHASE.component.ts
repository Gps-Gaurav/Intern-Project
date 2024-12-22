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
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_PURCHASE.component.html',
  styleUrls: ['./insert-TBL_PURCHASE.component.scss'],
  providers: [MessageService, TabService, DialogService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_PURCHASEComponent implements OnInit, AfterViewInit, OnDestroy {
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
      TaxType: ['', [Validators.required]],
      InvNo: ['NEW', [Validators.required]],
      PartyID: ['', [Validators.required]],
      PartyBillNo: [''],
      BillDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
      ReceivedDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
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
      OtherChargeText1: [''],
      OtherChargeText2: [''],
      OtherChargeText3: [''],
      RndOffAmt: ['', [Validators.required]],
      NetAmt: ['', [Validators.required]],
      RcvAmt: [0, [Validators.required]],
      DueAmount: ['', [Validators.required]],
      SubTotal: [0, [Validators.required]],
      LocationID: [0, [Validators.required]],
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
        this._fetchData()
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
      request.PartyBillNo = this.formData.get('PartyBillNo').value;//
      request.BillDate = this.formData.get('BillDate').value;//
      request.ReceivedDate = this.formData.get('ReceivedDate').value;//
      request.DueDate = this.formData.get('DueDate').value;//
      request.BillType = this.formData.get('TaxType').value.SlNo;//
      request.WayBillNo = this.formData.get('WayBillNo').value;//
      request.CNNo = this.formData.get('CNNo').value;//
      request.Remarks = this.formData.get('Remarks').value;//
      request.GrossAmt = this.formData.get('GrossAmt').value;//
      //request.DiscPer = this.formData.get('DiscPer').value.toUpperCase();//
      request.DiscAmt = this.formData.get('DiscAmt').value;//
      request.OtherChargeText1 = this.formData.get('OtherChargeText1').value;//
      request.OtherChargeAmt1 = this.formData.get('OtherChargeAmt1').value;//
      request.OtherChargeText2 = this.formData.get('OtherChargeText2').value;//
      request.OtherChargeAmt2 = this.formData.get('OtherChargeAmt2').value;//
      request.OtherChargeText3 = this.formData.get('OtherChargeText3').value;//
      request.OtherChargeAmt3 = this.formData.get('OtherChargeAmt3').value;//
      request.RndOffAmt = this.formData.get('RndOffAmt').value;//
      request.NetAmt = this.formData.get('NetAmt').value;//
      // request.DiscAmt1 = this.formData.get('DiscAmt1').value;//
      request.LocationID = this.formData.get('LocationID').value;//
      request.SubTotal = this.formData.get('SubTotal').value;//
      request.RcvAmt = this.formData.get('RcvAmt').value;//
      request.DiscValue = this.formData.get('DiscValue').value;//

      request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//
      request.TotPcs=this.formData.get('usersDetails').value.length;
      request.UserID = 1;
      request.SlNo = Number(this.id);

      let jsonData: PurchaseModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_PurchaseInvoiceMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.document.statusMessage === "success") {
          this.toastr.success('Purchase Inserted Successfully!', 'Success!');
          this.router.navigate(['/invoices/Purchase']);
        }
        else {
          this.toastr.error('Purchase not added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }
  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetPurchaseMast_Slno";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.PurchaseData = JSON.parse(response.items);
      if (this.PurchaseData.length) {
        let data = this.PurchaseData[0];
        console.log("PurchaseData", data);
        //this.formData.controls['ID'].setValue(data['ID']);
        let summery = data.usersDetails;
        if (summery != null && summery.length) {
          summery.forEach(obj => {
            this.usersDetails.push(this.updateControls(obj));
          });

        }
        //this.formData.controls['InvNo'].setValue(data['InvNo']);
        // this.formData.controls['PartyID'].setValue(data['PartyID']);
        this.formData.controls['PartyID'].setValue({ GLName: data['PartyName'], GLCode: data['PartyID'] });
        this.formData.controls['TaxType'].setValue({ ShortName: data['TaxName'], SlNo: data['BillType'] });
        this.formData.controls['PartyBillNo'].setValue(data['PartyBillNo']);
        this.formData.controls['DueDate'].setValue(data['DueDate']);
        this.formData.controls['ReceivedDate'].setValue(data['ReceivedDate']);
        this.formData.controls['BillDate'].setValue(data['BillDate']);

        this.formData.controls['WayBillNo'].setValue(data['WayBillNo']);
        this.formData.controls['CNNo'].setValue(data['CNNo']);
        this.formData.controls['Remarks'].setValue(data['Remarks']);
        this.formData.controls['GrossAmt'].setValue(data['GrossAmt']);

        this.formData.controls['DiscAmt'].setValue(data['DiscAmt']);
        this.formData.controls['OtherChargeAmt1'].setValue(data['OtherChargeAmt1']);
        this.formData.controls['OtherChargeAmt2'].setValue(data['OtherChargeAmt2']);
        this.formData.controls['OtherChargeAmt3'].setValue(data['OtherChargeAmt3']);
        this.formData.controls['RndOffAmt'].setValue(data['RndOffAmt']);
        this.formData.controls['OtherChargeText1'].setValue(data['OtherChargeText1']);
        this.formData.controls['OtherChargeText2'].setValue(data['OtherChargeText2']);
        this.formData.controls['OtherChargeText3'].setValue(data['OtherChargeText3']);
        this.formData.controls['RndOffAmt'].setValue(data['RndOffAmt']);
        this.formData.controls['NetAmt'].setValue(data['NetAmt']);
        this.formData.controls['LocationID'].setValue(Number(data['LocationID']));
        this.formData.controls['DueAmount'].setValue(data['DueAmt']);
        this.rcv_amt = Number(data['AmtAdjusted']);
        this.LocationID=Number(data['LocationID']);
        console.log("this.LocationID", this.LocationID);
        this.formData.controls['SubTotal'].setValue(data['SubTotal']);
        this.formData.controls['RcvAmt'].setValue(data['AmtAdjusted']);
        this.formData.controls['DiscValue'].setValue(data['DiscValue']);
        this._fetchTaxCalculate(data['TaxName'], data['BillType']);
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
  public _fetchParty(event: any) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetPartyMast_purchase";
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
    requestModel.spName = "sp_admin_GetProdMast_invoice_purchase";
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
        Quantity: 0,
        Amount: t.MRP,
        ColoursName: t.ColoursName
      })

      prod.forEach(element => {
        element.Discount = 0;
        element.Qty = 0;
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
        element.Qty = '';
        element.Rate = element.MRP * (100 - element.Discount) / 100;
        element.Amt = element.Rate * element.Qty;
        element.Stock = element.stock,
        element.LocationID=this.LocationID,
        element.Location=this.locationData.find(x => x.SlNo === this.LocationID).Location
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
  CalculateAmount() {
    let items = this.formData.get("usersDetails").value;

    let gross = items.reduce((sum, current) => sum + current.Amt, 0);


    const grouped = this.groupBy(items, m => m.HSNCode);
    let keys = Array.from(grouped.keys());
    this.hsnata = [];
    keys.forEach(element => {
      let values = grouped.get(element);
      let taxdata = this.taxsetup.filter(m => m.HSNCode === element);
      let TaxPer1 = 0; let TaxPer2 = 0;
      if (taxdata) {
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
      DueAmount: Math.round(netvalue) - this.rcv_amt,
      RndOffAmt: (Math.round(netvalue) - netvalue).toFixed(2)
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
