import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { LocationModel } from 'src/app/core/models/location.model';
import { CategoryModel } from 'src/app/core/models/ProdCateMast.model';
import { MessageService } from 'primeng/api';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { PurchaseFinishesGoodsModel } from 'src/app/core/models/Purchsefinishedgoods.model';
@Component({
  selector: 'app-insert-finished-goods',
  templateUrl: './insert-Purchase-finished-goods.component.html',
  styleUrls: ['./insert-Purchase-finished-goods.component.scss'],
  providers: [MessageService, TabService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */

export class InsertPurchaseFinishedGoodsComponent implements OnInit, AfterViewInit {
  selectedValues: string[] = ['val1', 'val2'];
  selectedCities: string[] = [];
  uploadedFiles: any[] = [];
  imageURL: string;
  @ViewChild("myinput") myInputField: ElementRef;
  selectUsers: any[];
  select: any;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }
  subcategoryData: CategoryModel[] = [];
  goldData: any[] = [];
  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
  seriesData: PurchaseFinishesGoodsModel[] = [];
  
  sizeData: any = [];
  subItemData: any = [];
  packetData: any = [];
  selectedUsers: any = [];
  gradeData: any = [];
  prodcatData: any = [];
  unitData: any = [];
  get form() {

    return this.formData.controls;
  }

  formData: FormGroup;
  Gross_wt = 0;
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  Diamond_wt = 0;
  Net_wt = 0;

  image = '';
  file = '';

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'INVOICES' }, { label: 'PURCHASE FINISHED GOODS', active: true }];

    this.formData = this.formBuilder.group({

      usersDetails: this.formBuilder.array([]),
      usersData: this.formBuilder.array([]),


      PurNo: ['', [Validators.required]],
      CashPurchase: [true],
      PartyID: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      PurAc: ['', [Validators.required]],
      PurDt: ['', [Validators.required]],
      DueDate: ['', [Validators.required]],
      RefNo: ['', [Validators.required]],

      Product: ['', [Validators.required]],
      ProdNo: ['', [Validators.required]],
      OldProdNo: ['', [Validators.required]],
      Size: ['', [Validators.required]],
      Pcs: ['', [Validators.required]],
      Gold: ['', [Validators.required]],
      GrossWt: ['', [Validators.required]],
      image: [null],
      HallMark: [true],
      Certified: [false],

      GrossAmt: ['', [Validators.required]],
      // VatPer: ['', [Validators.required]],
      VatAmt: ['', [Validators.required]],

      RndOffAmt: ['', [Validators.required]],
      NetAmt: ['', [Validators.required]],
      Narr: ['', [Validators.required]],
      MakingPaid: ['', [Validators.required]],
      Making: ['', [Validators.required]],

    });
    this._fetchPacket();
    this._fetchSubItem();
    this._fetchUnit();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });


    // this.formData.get("GrossWt").valueChanges.pipe(distinctUntilChanged(),
    //  throttleTime(500)).
    //  subscribe(selectedValue => {  
    //    let value=this.formData.get('GrossWt').value;
    //   this.Gross_wt=value;
    //  })
    // this.submit = false;


    // for(var i=0;i<2;i++){
    //   this.onAdd()
    // }
    // for(var i=0;i<2;i++){
    //   this.OnAdd()
    // }
  }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    if (this.formData.valid) {

      let request: PurchaseFinishesGoodsModel = <PurchaseFinishesGoodsModel>{};

      request.PurNo = this.formData.get('PurNo').value;//
      request.CashPurchase = this.formData.get('CashPurchase').value;//
      request.PartyID = this.formData.get('PartyID').value;//
      request.Address = this.formData.get('Address').value;//
      request.PurAc = this.formData.get('PurAc').value;//
      request.PurDt = this.formData.get('PurDt').value;//
      request.DueDate = this.formData.get('DueDate').value;//
      request.RefNo = this.formData.get('RefNo').value;//

      request.Product = this.formData.get('Product').value;//
      request.ProdNo = this.formData.get('ProdNo').value;//
      request.OldProdNo = this.formData.get('OldProdNo').value;//
      request.Size = this.formData.get('Size').value;//
      request.Pcs = this.formData.get('Pcs').value;//
      request.Gold = this.formData.get('Gold').value;//
      request.GrossWt = this.formData.get('GrossWt').value;//
      request.HallMark = this.formData.get('HallMark').value;//
      request.Certified = this.formData.get('Certified').value;//

      request.GrossAmt = this.formData.get('GrossAmt').value;//
      // request.VatPer = this.formData.get('VatPer').value;//
      request.VatAmt = this.formData.get('VatAmt').value;//
      request.RndOffAmt = this.formData.get('RndOffAmt').value;//
      request.NetAmt = this.formData.get('NetAmt').value;//
      request.Narr = this.formData.get('Narr').value;//
      request.MakingPaid = this.formData.get('MakingPaid').value;//
      request.Making = this.formData.get('Making').value;//

      request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//
      request.usersData = JSON.stringify(this.formData.get('usersData').value);//

      let jsonData: PurchaseFinishesGoodsModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_PurchaseFinished_Mast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.code == 1) {
          this.toastr.success('Series Inserted Successfully!', 'Success!');
          this.router.navigate(['/invoices/Purchase-finished-goods']);
        }
        else {
          this.toastr.error('Series not Added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_PurchaseFinished_Mast_SlNo";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData = JSON.parse(response.items);
      if (this.seriesData.length) {
        let data = this.seriesData[0];

        this.formData.controls['PurNo'].setValue(data['PurNo']);
        this.formData.controls['CashPurchase'].setValue(data['CashPurchase']);
        this.formData.controls['PartyID'].setValue(data['PartyID']);
        this.formData.controls['Address'].setValue(data['Address']);
        this.formData.controls['PurAc'].setValue(data['PurAc']);
        this.formData.controls['PurDt'].setValue(data['PurDt']);
        this.formData.controls['DueDate'].setValue(data['DueDate']);
        this.formData.controls['RefNo'].setValue(data['RefNo']);

        this.formData.controls['Product'].setValue(data['Product']);
        this.formData.controls['ProdNo'].setValue(data['ProdNo']);
        this.formData.controls['OldProdNo'].setValue(data['OldProdNo']);
        this.formData.controls['Size'].setValue(data['Size']);
        this.formData.controls['Pcs'].setValue(data['Pcs']);
        this.formData.controls['Gold'].setValue(data['Gold']);
        this.formData.controls['GrossWt'].setValue(data['GrossWt']);

        this.formData.controls['HallMark'].setValue(data['HallMark']);
        this.formData.controls['Certified'].setValue(data['Certified']);

        this.formData.controls['GrossAmt'].setValue(data['GrossAmt']);
        this.formData.controls['VatPer'].setValue(data['VatPer']);
        // this.formData.controls['VatAmt'].setValue(data['VatAmt']);
        this.formData.controls['RndOffAmt'].setValue(data['RndOffAmt']);
        this.formData.controls['NetAmt'].setValue(data['NetAmt']);
        this.formData.controls['MakingPaid'].setValue(data['MakingPaid']);
        this.formData.controls['Making'].setValue(data['Making']);

        this.formData.controls['usersDetails'].setValue(data['usersDetails']);
        this.formData.controls['usersData'].setValue(data['usersData']);

        let usersDetails = data.usersDetails;
        console.log("usersDetails", usersDetails)
        if (usersDetails != null && usersDetails.length) {
          usersDetails.forEach(obj => {
            this.usersDetails.push(this.UpdateaddCtr(obj));
          });
        }
        let usersData = data.usersData;
        console.log("usersData", usersData)
        if (usersData != null && usersData.length) {
          usersData.forEach(obj => {
            this.usersData.push(this.UpdateAddCtr(obj));
          });
        }


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


  public _fetchProductCategory(event) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_ProdCateMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.subcategoryData = JSON.parse(response.items);

    });
  }


  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }


  get usersDetails(): FormArray {
    return this.formData.get("usersDetails") as FormArray;
  }
  get usersData(): FormArray {
    return this.formData.get("usersData") as FormArray;
  }

  onAdd() {
    this.formData.markAllAsTouched();
    this.usersDetails.push(this.addControls());
  }
  private addControls() {
    return new FormGroup({

      SlNo: new FormControl("0"),
      PacketID: new FormControl(""),
      PktDesc: new FormControl(""),
      UnitID: new FormControl(""),
      Weight: new FormControl(""),
      Pcs: new FormControl(""),
      Rate: new FormControl(""),
      Amt: new FormControl(""),
      SaleAmt: new FormControl(""),


    });
  }
  private UpdateaddCtr(item: any) {

    return new FormGroup({
      SlNo: new FormControl(item.SlNo),
      PacketID: new FormControl(Number(item.PacketID)),
      PktDesc: new FormControl(Number(item.PktDesc)),
      UnitID: new FormControl(Number(item.UnitID)),
      Weight: new FormControl(Number(item.Weight)),
      Pcs: new FormControl(Number(item.Pcs)),
      Rate: new FormControl(Number(item.Rate)),
      Amt: new FormControl(Number(item.Amt)),
      SaleAmt: new FormControl(Number(item.SaleAmt)),


    });
  }

  onDelete() {
    if (this.selectedUsers.length < 1) {
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



  OnAdd() {
    this.formData.markAllAsTouched();
    this.usersData.push(this.AddControls());
  }
  private AddControls() {


    return new FormGroup({
      SlNo: new FormControl("0"),
      ItemDesc: new FormControl(""),
      UnitID: new FormControl(""),
      Weight: new FormControl(""),
      Purity: new FormControl(""),
      Pcs: new FormControl(""),
      Rate: new FormControl(""),
      Amt: new FormControl(""),
      SaleAmt: new FormControl(""),

    });
  }

  private UpdateAddCtr(item: any) {

    return new FormGroup({
      SlNo: new FormControl(item.SlNo),
      ItemDesc: new FormControl(Number(item.ItemDesc)),
      UnitID: new FormControl(Number(item.UnitID)),
      Weight: new FormControl(Number(item.Weight)),
      Purity: new FormControl(Number(item.Purity)),
      Pcs: new FormControl(Number(item.Pcs)),
      Rate: new FormControl(Number(item.Rate)),
      Amt: new FormControl(Number(item.Amt)),
      SaleAmt: new FormControl(Number(item.SaleAmt)),

    });
  }


  OnDelete() {
    if (this.selectUsers.length < 1) {
      this.messageService.add({
        severity: "warn",
        summary: "Info",
        detail: "Please select a record to delete!",
      });
      return;
    }
    console.log(this.selectUsers);
    for (var i = this.selectUsers.length - 1; i >= 0; i--) {
      this.usersData.controls.splice(this.selectUsers[i] - 1, 1);
    }
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Selected records deleted!",
    });

    this.selectUsers = [];
  }



  private _fetchProdCat() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_ProdCate_dropdown";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.prodcatData = JSON.parse(response.items);

    });
  }

  public _fetchUnit() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_UnitMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 999999;
    requestModel.search = "";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.unitData = JSON.parse(response.items);

    });
  }
  private _fetchSubItem() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_SubItemMast_dropdown";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.subItemData = JSON.parse(response.items);

    });
  }

  public _fetchPacket() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_Get_Packet_dropdown";
    requestModel.pageNo=1;
    requestModel.pageSize=9999999;
    requestModel.search="";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.packetData= JSON.parse(response.items);
      
    });   
  }
  onSelect(event: any,index:number){
    console.log( event,index );
    let item= this.packetData.find(m=>m.PKTID==event.value);
    let items= this.subItemData.find(m=>m.ItemDesc==event.value);
    if(item){
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
        myForm.patchValue({
          PktDesc:item.PktDesc,
          UnitID:item.UnitID,
        })
      }
      else if(items)
      {
      const myForm = (<FormArray>this.formData.get("usersData")).at(index);
          myForm.patchValue({
            ItemDesc:item.ItemDesc,
            UnitID:item.UnitID,
          })
        }
  }
  ChangeRate(event: any,index:number){
    console.log( event.target.value,index );
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
        myForm.patchValue({
          Amount:event.target.value*myForm.value.Qty,
         
        })
   this.Calculate_Gross();
  }
  
  Calculate_Gross(){
    this.Diamond_wt=0;
    this.Net_wt=0;
    const ctrl = <FormArray>this.formData.controls['usersDetails'];
    // iterate each object in the form array
    ctrl.controls.forEach(x => {
      console.log(x.get('Qty').value)
      // get the itemmt value and need to parse the input to number
      let wt = Number(x.get('Qty').value);
      let net_amount = Number(x.get('Amount').value)
      // add to total
      this.Diamond_wt += wt
      this.Net_wt += net_amount
    });
    
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

  public _fetchGold(event) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_SubItemMast_gold";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.goldData = JSON.parse(response.items);

    });
  }



}
