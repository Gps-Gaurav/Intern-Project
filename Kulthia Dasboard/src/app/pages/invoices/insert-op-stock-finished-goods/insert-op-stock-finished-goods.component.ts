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
import { MessageService } from 'primeng/api';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { InseretFinishesGoodsModel } from 'src/app/core/models/insertfinishedgoods.model';


@Component({
  selector: 'app-insert-finished-goods',
  templateUrl: './insert-op-stock-finished-goods.component.html',
  styleUrls: ['./insert-op-stock-finished-goods.component.scss'],
  providers: [MessageService,TabService],
  encapsulation:ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */

export class InsertFinishedGoodsComponent implements OnInit, AfterViewInit {
 selectedValues: string[] = ['val1','val2'];
 selectedCities: string[] = [];
 uploadedFiles: any[] = [];
 imageURL: string;
  @ViewChild("myinput") myInputField: ElementRef;
  selectUsers: any[];
i: number;
  hsnata: any[];
  taxsetup: any;
  totalDiscount: number;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }
    subcategoryData: any[]=[];
    packetData: any[]=[];
    unitData: any[]=[];
    subItemData: any[]=[];
    goldData: any[]=[];
  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
 seriesData: LocationModel[]=[];
 selectedUsers: any = [];
  get form() {

    return this.formData.controls;
  }

  formData: FormGroup;
  Gross_wt=0;
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  Diamond_wt=0;
  Net_wt=0;
  Making=0;
  image = '';
  file = '';

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'INVOICES' }, { label: 'INSERT FINISHED GOODS', active: true }];

    this.formData = this.formBuilder.group({
      ProdCateID: ['', [Validators.required]],
      ProdNo: ['', [Validators.required]],
      OldProdNo: [''],
      Size: [''],
      Pcs: [''],
      GOLD: ['', [Validators.required]],
      GrosWt: ['', [Validators.required]],
      image: [null],
      Making: ['', [Validators.required]],
      KundanMaking: ['', [Validators.required]],
      Jobber: ['', [Validators.required]],
      JobNo: ['', [Validators.required]],
      Hallmarked: [true],
      Certified: [false],
      Kundan: [false],
      JobberCharge: ['', [Validators.required]],
      usersDetails: this.formBuilder.array([]),
      usersData: this.formBuilder.array([]),
    });
this._fetchPacket();
this._fetchUnit();
this._fetchItem();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });


    this.formData.get("GrosWt").valueChanges.pipe(distinctUntilChanged(),
     throttleTime(500)).
     subscribe(selectedValue => {
       let value=this.formData.get('GrosWt').value;
      this.Gross_wt=value;
     })
    this.submit = false;

    this.formData.get("Making").valueChanges.pipe(distinctUntilChanged(),
     throttleTime(500)).
     subscribe(selectedValue => {
       let value=this.formData.get('Making').value;
      this.Making=value;
     })
    this.submit = false;



    // for(var i=0;i<3;i++){
    //   this.onAdd()
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

      let request: InseretFinishesGoodsModel = <InseretFinishesGoodsModel>{};
      request.SlNo=Number(this.id);
      request.ProdCateID = this.formData.get('ProdCateID').value.PCode;//
      request.ProdNo = this.formData.get('ProdNo').value;//
      request.OldProdNo = this.formData.get('OldProdNo').value;//
      request.Size = this.formData.get('Size').value;//
      request.Pcs = this.formData.get('Pcs').value;//
      request.GOLD = this.formData.get('GOLD').value.SItemCode;//
      request.GrosWt = this.formData.get('GrosWt').value;//




      request.Making = this.formData.get('Making').value;//
      request.KundanMaking = this.formData.get('KundanMaking').value;//
      request.Jobber = this.formData.get('Jobber').value;//
      request.JobNo = this.formData.get('JobNo').value;//
      request.Hallmarked = this.formData.get('Hallmarked').value;//
      request.Certified = this.formData.get('Certified').value;//
      request.Kundan = this.formData.get('Kundan').value;//

      request.JobberCharge = this.formData.get('JobberCharge').value;//
      //request.usersDetails = this.formData.get('usersDetails').value;//
      //request.usersData = this.formData.get('usersData').value;//

      request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//
      request.usersData = JSON.stringify(this.formData.get('usersData').value);//
      let jsonData: InseretFinishesGoodsModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_op_finish_goods_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if(Response.code==1){
          this.toastr.success( 'Series Inserted Successfully!','Success!');
          this.router.navigate(['/invoices/finished-goods']);
        }
        else{
          this.toastr.error( 'Series not Added!','Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_Get_op_stock_finish_goods_SlNo";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];

      //this.formData.controls['ProdCateID'].setValue(data['ProdCateID']);
      this.formData.controls['ProdCateID'].setValue( {PCode: data['ProdCateID'], ProductName: data['ProdNo']});
      this.formData.controls['ProdNo'].setValue(data['ProdNo']);
      this.formData.controls['OldProdNo'].setValue(data['OldProdNo']);
      this.formData.controls['Size'].setValue(data['Size']);
      this.formData.controls['Pcs'].setValue(data['Pcs']);
    //  this.formData.controls['GOLD'].setValue(data['GOLD']);
      this.formData.controls['GOLD'].setValue( {SItemCode: data['MainGoldID'], ItemName: data['GoldName']});
      this.formData.controls['GrosWt'].setValue(data['GrossWt']);
      this.formData.controls['Making'].setValue(data['Making']);
      this.formData.controls['KundanMaking'].setValue(data['KundanMaking']);
      this.formData.controls['Jobber'].setValue(data['JobberName']);
      this.formData.controls['JobNo'].setValue(data['JobNo']);
      this.formData.controls['Hallmarked'].setValue(data['Hallmarked']);
      this.formData.controls['Certified'].setValue(data['Certified']);
      this.formData.controls['Kundan'].setValue(data['Kundan']);
      this.formData.controls['JobberCharge'].setValue(data['JobberCharge']);
      //this.formData.controls['usersDetails'].setValue(data['usersDetails']);
     // this.formData.controls['usersData'].setValue(data['usersData']);
      let summery=data['usersDetails'];
      console.log("summery",summery)
      if(summery!=null && summery.length){
        summery.forEach(obj => {
          this.usersDetails.push(this.uodateControls(obj));
      });
      }

      let nonPacket=data['usersData'];
      console.log("nonPacket",nonPacket)
      if(nonPacket!=null && nonPacket.length){
        nonPacket.forEach(obj => {
          this.usersData.push(this.uodatenonpacketControls(obj));
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

  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  public _fetchProductCategory(event) {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_Get_ProdCateMast";
    requestModel.pageNo=1;
    requestModel.pageSize=15;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.subcategoryData= JSON.parse(response.items);

    });
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
    SlNo: new FormControl(0),
    PacketID: new FormControl(""),
    PacketDescription: new FormControl(""),
    Unit: new FormControl(""),
    Qty: new FormControl(""),
    Pcs: new FormControl(""),
    Rate: new FormControl(""),
    Amount: new FormControl("")

  });
}
private uodateControls(item:any) {
  return new FormGroup({
    SlNo: new FormControl(item.SlNo),
    PacketID: new FormControl(Number(item.PacketID)),
    PacketDescription: new FormControl(item.PacketDescription),
    Unit: new FormControl(item.Unit),
    Qty: new FormControl(item.Qty),
    Pcs: new FormControl(item.Pcs),
    Rate: new FormControl(item.Rate),
    Amount: new FormControl(item.Amount),
  });
}


onNonpacket() {
  this.formData.markAllAsTouched();
  this.usersData.push(this.addNonPacketCtr());
}

private addNonPacketCtr() {
  return new FormGroup({
    SlNo: new FormControl(0),
    ItemName: new FormControl(""),
    PacketDescription: new FormControl(""),
    Unit: new FormControl(""),
    Qty: new FormControl(""),
    Pcs: new FormControl(""),
    Rate: new FormControl(""),
    Amount: new FormControl(""),
    PureQty: new FormControl(""),
    Purity: new FormControl(""),
    GhatNo: new FormControl(""),
  });
}
private uodatenonpacketControls(item:any) {
  return new FormGroup({
    SlNo: new FormControl(item.SlNo),
    PacketID: new FormControl(Number(item.PacketID)),
    PacketDescription: new FormControl(item.PacketDescription),
    Unit: new FormControl(item.Unit),
    Qty: new FormControl(item.Qty),
    Pcs: new FormControl(item.Pcs),
    Rate: new FormControl(item.Rate),
    Amount: new FormControl(item.Amount),
    PureQty: new FormControl(""),
    Purity: new FormControl(""),
    GhatNo: new FormControl(""),
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


onDelete1() {
  if (this.selectUsers.length < 1) {
    this.messageService.add({
      severity: "warn",
      summary: "Info",
      detail: "Please select a record to delete!",
    });
    return;
  }
  console.log(this.selectUsers);
  for (var j = this.selectUsers.length - 1; j >= 0; j--) {
    this.usersData.controls.splice(this.selectUsers[j] - 1, 1);
  }
  this.messageService.add({
    severity: "success",
    summary: "Success",
    detail: "Selected records deleted!",
  });

  this.selectUsers = [];
}


onUpload(event) {
  this.uploadedFiles=[];
  for(let file of event.files) {
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


CalculateAmount() {
  let items = this.formData.get("usersDetails").value;

  let gross = items.reduce((sum, current) => sum + current.Amt, 0);

}
  groupBy(items: any, arg1: (m: any) => any) {
    throw new Error('Method not implemented.');
  }
public _fetchSubItem(event) {
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_Get_SubItemMast";
  requestModel.pageNo=1;
  requestModel.pageSize=10;
  requestModel.search=event.query;
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.subcategoryData= JSON.parse(response.items);

  });
}

public _fetchGold(event) {
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_Get_SubItemMast_gold";
  requestModel.pageNo=1;
  requestModel.pageSize=10;
  requestModel.search=event.query;
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.goldData= JSON.parse(response.items);

  });
}

onSelect(event: any,index:number){
  console.log( event,index );
  let item= this.packetData.find(m=>m.PKTID==event.value);
  if(item){
  const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
      myForm.patchValue({
        PacketDescription:item.PktDesc,
        Unit:item.UnitID,
      })
    }
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


public _fetchPacket() {
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_GetPacketMast";
  requestModel.pageNo=1;
  requestModel.pageSize=9999999;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.packetData= JSON.parse(response.items);

  });
}
public _fetchUnit() {
  let requestModel = <RequestModel>{};
requestModel.spName="sp_admin_Get_UnitMast";
requestModel.pageNo=1;
requestModel.pageSize=999999;
requestModel.search="";
this.service.GetApiJson(requestModel).subscribe(response => {
  this.unitData= JSON.parse(response.items);

});
}

private _fetchItem() {
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_Get_SubItemMast_dropdown";
  requestModel.pageNo=1;
  requestModel.pageSize=1;
  requestModel.search= "";
  requestModel.id=Number(this.id);
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.subItemData= JSON.parse(response.items);

  });
}

}
