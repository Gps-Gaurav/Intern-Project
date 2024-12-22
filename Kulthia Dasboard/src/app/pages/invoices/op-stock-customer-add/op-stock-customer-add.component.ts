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
import { GhatModel } from 'src/app/core/models/Ghat.model';
import { OpStockCustomerModel } from 'src/app/core/models/OpStockCustomer.model';
@Component({
  selector: 'app-op-stock-customer-add',
  templateUrl: './op-stock-customer-add.component.html',
  styleUrls: ['./op-stock-customer-add.component.scss'],
  providers: [MessageService,TabService],
  encapsulation:ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */

export class OpStockCustomerAddComponent implements OnInit, AfterViewInit {
//  selectedValues: string[] = ['val1','val2'];
//  selectedCities: string[] = [];

  @ViewChild("myinput") myInputField: ElementRef;
  GhatType: { name: string; code: string; }[];
  selectUsers: any;

  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }
    subcategoryData: CategoryModel[]=[];
    // goldData: any[]=[];
  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
 seriesData: OpStockCustomerModel[]=[];
 selectedUsers: any = [];
 packetData: any[] = [];
 partyData: any[] = [];
 subItemData: any[] = [];
 unitData: any[] = [];
  get form() {

    return this.formData.controls;
  }

  formData: FormGroup;
  Weight=0;
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  Diamond_wt=0;
  Pcs=0;
  Total_Value=0;
  Metal_wt=0;
  Stone_Wt=0;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'INVOICES' }, { label: 'OPENING STOCK-CUSTOMER', active: true }];

    this.formData = this.formBuilder.group({
      OpNo: ['', [Validators.required]],
      OpDt: [''],
      PartyID: ['', [Validators.required]],
      Ref: [''],
      Address: ['', [Validators.required]],
      Narr: ['', [Validators.required]],


      usersDetails: this.formBuilder.array([]),
      usersData: this.formBuilder.array([]),

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

    this.submit = false;
    
  }
 
  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    if (this.formData.valid) {

      let request: OpStockCustomerModel = <OpStockCustomerModel>{};
      request.SlNo=Number(this.id);
      request.OpNo = this.formData.get('OpNo').value;//
      
      request.OpDt = this.formData.get('OpDt').value;//
      request.PartyID = this.formData.get('PartyID').value.SlCode;//
     
      request.Ref = this.formData.get('Ref').value;//
      request.Address = this.formData.get('Address').value;//
      request.Narr= this.formData.get('Narr').value;//

      request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//
      request.usersData = JSON.stringify(this.formData.get('usersData').value);//
      let jsonData: OpStockCustomerModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_op-stock-customer_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.code==1){
          this.toastr.success( 'Series Inserted Successfully!','Success!');
          this.router.navigate(['/invoices/op-stock-customer']);
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
    requestModel.spName="sp_admin_Get_op-stock-customer_SlNo";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];

      this.formData.controls['OpNo'].setValue(data['OpNo']);
   
      this.formData.controls['OpDt'].setValue(data['OpDt']);
      this.formData.controls['PartyID'].setValue( {SlCode: data['PartyID'], SlName: data['SlName']});
      //this.formData.controls['PartyID'].setValue(data['PartyID']);
      this.formData.controls['Ref'].setValue(data['Ref'])
      this.formData.controls['Address'].setValue(data['Address']);
      this.formData.controls['Narr'].setValue(data['Narr']);
      let summery=data.usersDetails;		
      console.log("summery",summery)
      if(summery!=null && summery.length){
        summery.forEach(obj => {
          this.usersDetails.push(this.uodateControls(obj));
      });
      }

      let RawRM=data.usersData;		
      console.log("RawRM",RawRM)
      if(RawRM!=null && RawRM.length){
        RawRM.forEach(obj => {
          this.usersData.push(this.uodateRawRMControls(obj));
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
    PktDesc: new FormControl(""),
    Unit: new FormControl(""),
    Weight: new FormControl(""),
    Pcs: new FormControl(""),
    Rate: new FormControl(""),
    Amount: new FormControl(""),
   
   
  });
}
private uodateControls(item:any) {
  return new FormGroup({
    SlNo: new FormControl(item.SlNo),
    PacketID: new FormControl(item.PacketID),
    PktDesc: new FormControl(item.PktDesc),
    Unit: new FormControl(item.UnitID),
    Weight: new FormControl(""),
    Pcs: new FormControl(""),
    Rate: new FormControl(""),
    Amount: new FormControl(""),
   
   
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

onAdd1() {
  this.formData.markAllAsTouched();
  this.usersData.push(this.addCtr());
}
private uodateRawRMControls(item:any) {
  return new FormGroup({
    SlNo: new FormControl(item.SlNo),
    ItemDesc: new FormControl(""),
    Unit: new FormControl(""),
  
    Weight: new FormControl(""),
    Purity: new FormControl(""),
    Pcs: new FormControl(""),
    Rate: new FormControl(""),
    Amount: new FormControl(""),
    
  });
}

private addCtr() {
  return new FormGroup({
    SlNo: new FormControl(0),
    ItemDesc: new FormControl(""),
    Unit: new FormControl(""),
  
    Weight: new FormControl(""),
    Purity: new FormControl(""),
    Pcs: new FormControl(""),
    Rate: new FormControl(""),
    Amount: new FormControl(""),
   
   
  });
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

public _fetchParty(event) {

  let requestModel = <RequestModel>{};
   requestModel.pageNo=1;
   requestModel.pageSize=10;
   requestModel.search=event.query;
   requestModel.TableName="ASLMast";
   requestModel.FilterColumn="SlCode";
   requestModel.SearchColumn="SlName";
   this.service.GetDynamicApiJson(requestModel).subscribe(response => {
     this.partyData= JSON.parse(response.items);
   });  
}

public _fetchPacket() {

  let requestModel = <RequestModel>{};
  
   requestModel.spName="sp_admin_Get_Packet_dropdown";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
   this.service.GetApiJson(requestModel).subscribe(response => {
     this.packetData= JSON.parse(response.items);
   });  
}

onSelectPacket(event: any,index:number){
  console.log( event,index );
  let item= this.packetData.find(m=>m.PKTID==event.value);
  if(item){
  const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
      myForm.patchValue({
      
    PktDesc: item.PktDesc,
    Unit: item.UnitID,
    Weight: item.OpQty,
    Pcs: item.SItemCode,
    Rate:item.SItemCode,
    Amount: item.SItemCode,
      })
    }
}


private _fetchSubItem() {
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
}
