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
import { PurchaseRawModel } from 'src/app/core/models/PurchaseRaw.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogInsertPURCHASEComponent } from '../dialog-insert-purchase/dialog-insert-purchase.component';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert_TBL_PURCHASE_RAW.component.html',
  styleUrls: ['./insert_TBL_PURCHASE_RAW.component.scss'],
  providers: [MessageService, TabService, DialogService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_PURCHASE_RAWComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild('autocomplete') ac: AutoComplete;
  InvoiceData: any;
  //messageService: any;
  uploadedFiles: any[];
  productData: any[] = [];
  productData_distinct: any[] = [];
  taxsetup: any[] = [];
  unitData: any[] = [];
  imageURL: string;
  selectedDoc:string="";
  selectedProduct="";
  ItemDiscount: number = 0;
  ref: DynamicDialogRef;
  selectedUser: any;
  unique_key="";
  totalDiscount=0;

  public readonly ImgUrl = environment.ImgUrl;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    public dialogService: DialogService,
    public messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  PurchaseRawData: PurchaseRawModel[] = [];
  PartyData: PartyModel[] = [];
  LocationData: PartyModel[] = [];
  docTypeData: any[] = [];
  docData: any[] = [];
  itemData: any[] = [];

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

  image = '';
  file = '';


  ngOnInit() {

    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'INVOICE MASTER', active: true }];
    this.formData = this.formBuilder.group({
       ItemDiscount: [0],
      usersDetails: this.formBuilder.array([]),
      TaxType: ['', [Validators.required]],
      PurNo: ['', [Validators.required]],
      PurDate: ['', [Validators.required]],
      PartyID: ['', [Validators.required]],
      ChallanNo: ['', [Validators.required]],
      Location: ['', [Validators.required]],
      PurAc: ['', [Validators.required]],

      TotAmt: ['', [Validators.required]],
      CGST: ['', [Validators.required]],
      SGST: ['', [Validators.required]],
      Advanced: ['', [Validators.required]],
      RndOffAmt: ['', [Validators.required]],
       NetAmt: ['', [Validators.required]],
       Narr: ['', [Validators.required]],
      
    });
    this.unique_key=this.createId();
    this._fetchUnit();
    this._fetchLocation();
    this._fetchAllTax();
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

  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    console.log("hellooo");

    if (this.formData.valid) {
      let request: PurchaseRawModel = <PurchaseRawModel>{};

      request.PurNo = this.formData.get('PurNo').value;//
      request.PurDate = this.formData.get('PurDate').value;//
      request.PartyID = this.formData.get('PartyID').value;//
      request.ChallanNo = this.formData.get('ChallanNo').value;//
      request.Location = this.formData.get('Location').value;//
      request.PurAc = this.formData.get('PurAc').value;//

      request.TotAmt = this.formData.get('TotAmt').value;//
      request.CGST = this.formData.get('CGST').value;//
      request.SGST = this.formData.get('SGST').value;//
      request.Advanced = this.formData.get('Advanced').value;//
      request.RndOffAmt = this.formData.get('RndOffAmt').value;//
      request.NetAmt = this.formData.get('NetAmt').value;//
      request.Narr = this.formData.get('Narr').value;//
    
      request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//

      request.UserID = 1;
      request.SlNo = Number(this.id);

      let jsonData: PurchaseRawModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_PurchaseRawMast_json";
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
    requestModel.spName = "sp_admin_GetPurchaseRawMast_SlNo";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.PurchaseRawData = JSON.parse(response.items);
      if (this.PurchaseRawData.length) {
        let data = this.PurchaseRawData[0];
        console.log("PurchaseRawData", data);
        //this.formData.controls['ID'].setValue(data['ID']);
        let summery = data.usersDetails;
        if (summery != null && summery.length) {
          summery.forEach(obj => {
            this.usersDetails.push(this.updateControls(obj));
          });

        }
        this.formData.controls['PurNo'].setValue(data['PurNo']);
        this.formData.controls['PurDate'].setValue(data['PurDate']);
        this.formData.controls['PartyID'].setValue(data['PartyID']);
        this.formData.controls['ChallanNo'].setValue(data['ChallanNo']);
        this.formData.controls['Location'].setValue(data['Location']);
        this.formData.controls['PurAc'].setValue(data['PurAc']);

        this.formData.controls['TotAmt'].setValue(data['TotAmt']);
        this.formData.controls['CGST'].setValue(data['CGST']);
        this.formData.controls['SGST'].setValue(data['SGST']);
        this.formData.controls['Advanced'].setValue(data['Advanced']);

        this.formData.controls['RndOffAmt'].setValue(data['RndOffAmt']);
        this.formData.controls['NetAmt'].setValue(data['NetAmt']);
        this.formData.controls['Narr'].setValue(data['Narr']);
 


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
  public _fetchParty(event: { query: string; }) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetPartyMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    requestModel.ColumnValue="";

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.PartyData = JSON.parse(response.items);
      
    });   
  }

  private _fetchLocation() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_dropdown_GetLocationMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.LocationData= JSON.parse(response.items);
      
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
      SlNo : new FormControl(0),
      ItemCode: new FormControl(""),
      HSNCode: new FormControl(""),
      UnitID: new FormControl(""),
      Qty: new FormControl(""),
      Rate: new FormControl(""),
      Amt: new FormControl("")

    });
  }

  private updateControls(item: any) {
    return new FormGroup({
      SlNo : new FormControl(Number(item.SlNo)),
      ItemCode: new FormControl(item.ItemCode),
      HSNCode: new FormControl(item.HSNCode),
      Unit: new FormControl(item.UnitID),
      Qty: new FormControl(Number(item.ReOrdQty)),
      Rate: new FormControl(Number(item.MRP)),
      Amt: new FormControl(Number(item.MRP)*Number(item.ReOrdQty))

    });
  }


  public ChangeTotalDiscount(event: any){
    console.log("ChangeTotalDiscount", event);
    this.totalDiscount=event.value;
   
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
      Rate:myForm.value.MRP*(100-event.value)/100,
      Amt: myForm.value.Qty* myForm.value.MRP*(100-event.value)/100,

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

  public _fetchUnit() {
    let requestModel = <RequestModel>{};
    // requestModel.spName="sp_admin_Get_SubItemMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 9999999;
    requestModel.search = "";
    requestModel.TableName = "UnitMast";
    requestModel.FilterColumn = "UnitID";
    requestModel.SearchColumn = "ShortName";
    this.service.GetDynamicApiJson(requestModel).subscribe(response => {
      this.unitData = JSON.parse(response.items);
    
    });
  }

  onSelect(event: any, index: number) {
    console.log(event, index);
   

  }



  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  _fetchAllTax(){
    console.log("sp_admin_GetSeriesTaxMast",event);
    
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetSeriesMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 100;
    requestModel.search = "";
     requestModel.ColumnValue="FG PURCHASE";
    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.docData = JSON.parse(response.items);

    });
    }
    
  public _fetchDoctype(event) {


    this.docTypeData = [];
    this.docData.forEach(element => {
      this.docTypeData.push(element)
    });
   // this.docTypeData = this.docData;
    // let requestModel = <RequestModel>{};
    // requestModel.spName = "sp_admin_GetSeriesMast";
    // requestModel.pageNo = 1;
    // requestModel.pageSize = 100;
    // requestModel.search = "";
    //  requestModel.ColumnValue="FG PURCHASE";
    // this.service.GetFilterApiJson(requestModel).subscribe(response => {
    //   this.docTypeData = JSON.parse(response.items);

    // });
  }

  onItemSelect(index: number) {
   


  }


  public _fetchProductFilter(event) {

    if(this.selectedDoc!=""){
      this.productData_distinct=[];
   this.itemData.filter(m=>m.ItemName.toLowerCase().includes(event.query.toLowerCase())).slice(0, 10).forEach(element => {
    this.productData_distinct.push(element);
   });
      
  }
  else{
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Select Invoice Type', life: 3000});
  }
  }


  onProductSelect(obj: any) {
   console.log("itemselect",obj)
    let items = this.formData.get("usersDetails").value;
    let index = items.findIndex(x => x.ItemCode.toString() === obj.ItemCode.toString());
    if (index>=0) {
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
      this.usersDetails.push(this.updateControls(obj));
    }
    this.CalculateAmount();
  }
  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  clearValue()
  {
      this.selectedProduct = null;
  }
  CalculateAmount(){
    let items = this.formData.get("usersDetails").value;

 let gross= items.reduce((sum, current) => sum + current.Amt, 0);
    this.formData.patchValue({
    GrossAmt: gross*(100-this.totalDiscount)/100,
    TotAmt: gross,
  //   DiscValue: gross*this.totalDiscount/100,
  //   NetAmt:gross*(100-this.totalDiscount)/100+ 
  //   this.other_charge1+
  //   this.other_charge2+
  //   this.other_charge3,
  //   AmtAdjusted:gross*(100-this.totalDiscount)/100+ 
  //   this.other_charge1+
  //   this.other_charge2+
  //   this.other_charge3 -this.rcv_amt
   })

  const grouped = this.groupBy(items, m => m.HSNCode);
  let keys = Array.from( grouped.keys() );
  this.hsnata=[];
  keys.forEach(element => {
    let values=grouped.get(element);
    let taxdata=this.taxsetup.filter(m=>m.HSNCode===element);
    let TaxPer1=0;let TaxPer2=0;
    if(taxdata){
      let taxamt=taxdata[0];
      TaxPer1=taxamt.TaxPer1;
      TaxPer2=taxamt.TaxPer2;
      console.log("taxamt",taxamt);
    }
    let taxamt= values.reduce((sum, current) => sum + current.Amt, 0)*(100-this.totalDiscount)/100;
    this.hsnata.push({
      HSNCode:element,
      TaxableAmount:taxamt,
      Tax1:TaxPer1 +" %",
      TaxAmount1:taxamt*TaxPer1/100,
      Tax2:TaxPer2 +" %",
      TaxAmount2:taxamt*TaxPer2/100
    })
  });
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






_fetchTax(event: any){
console.log("sp_admin_GetSeriesTaxMast",event);
this.selectedDoc=event.ShortName;
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_GetSeriesTaxSetup";
  requestModel.pageNo=1;
  requestModel.pageSize=9999;
  requestModel.search=event.SlNo.toString();
  requestModel.id=Number(this.id);
  requestModel.ColumnValue="FG PURCHASE";

  this.service.GetFilterApiJson(requestModel).subscribe(response => {

    this.taxsetup = JSON.parse(response.items);
    console.log("taxsetup",this.taxsetup);
  }); 
  this._fetchItemFilter();
}

UpdateItemDiscount(event){
  this.ItemDiscount=event.value;
  let items = this.formData.get("usersDetails").value;
  items.forEach((value, index) => {
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
    myForm.patchValue({
      Rate:myForm.value.MRP*(100-event.value)/100,
      Amt: myForm.value.Qty* myForm.value.MRP*(100-event.value)/100,
      Discount:event.value
    })
    
  });

this.CalculateAmount();
}
public _fetchItemFilter() {
  if(this.selectedDoc!=""){
  let requestModel = <RequestModel>{};
  // requestModel.spName="sp_admin_Get_SubItemMast";
  requestModel.pageNo = 1;
  requestModel.pageSize = 9999999;
  requestModel.search="";
  requestModel.TableName = "ItemMast";
  requestModel.FilterColumn = "ItemCode";
  requestModel.SearchColumn = "ItemName";
  this.service.GetDynamicApiJson(requestModel).subscribe(response => {
    this.itemData = JSON.parse(response.items);
   

  });
}
else{
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Select Invoice Type', life: 3000});
}
}
}
