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
import { PRICELISTADDModel } from 'src/app/core/models/price_list_add.model';
import { CategoryModel } from 'src/app/core/models/ProdCateMast.model';
import { MessageService } from 'primeng/api';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
@Component({
  selector: 'app-insert-opening-stock',
  templateUrl:'./price-list-add.component.html',
  styleUrls: ['./price-list-add.component.scss'],
  providers: [MessageService,TabService],
  encapsulation:ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */

export class PRICELISTADDComponent implements OnInit, AfterViewInit {
 selectedValues: string[] = ['val1','val2'];
 selectedCities: string[] = [];
 uploadedFiles: any[] = [];
 imageURL: string;
  @ViewChild("myinput") myInputField: ElementRef;
  date3: Date;
  minDate: Date;
  maxDate: Date;
  selectUsers: any;
  select: any[];
  
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }
    subcategoryData: CategoryModel[]=[];
  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
 seriesData: PRICELISTADDModel[]=[];
 PartyData: any = [];
 selectedUsers: any = [];
 subItemData: any = [];
 wpcData: any = [];
 shapeData: any = [];
 sizeData: any = [];
 gradeData: any = [];
 prodcatData: any = [];
 unitData: any = [];
 
  get form() {

    return this.formData.controls;
  }

  formData: FormGroup;
  
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

  image = '';
  file = '';

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'INVOICES' }, { label: 'PRICE LIST ADD', active: true }];

    this.formData = this.formBuilder.group({
     
      PListNo: ['', [Validators.required]],
    
      PartyID: [''],
      EffectFrom: [''],
      EffectTo: [''],
     usersDetails: this.formBuilder.array([]),
     nonPacket: this.formBuilder.array([]),
     Making: this.formBuilder.array([]),
    
    });
    this._fetchSubItem();
    this._fetchWPC();
    this._fetchProdCat();
    this._fetchUnit();
    console.log(" this.route", this.router.url.split(';')[0]);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });

    this.formData.get("PListNo").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(500)).
    subscribe(selectedValue => {  
      let value=this.formData.get('PListNo').value;
      
      if(this.id>0){

      }else{
      console.log("PListNo",value)
      if(value.length >1){
        let request={
          "table_name": "PriceListMast",
          "column_name": "PListNo",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['PListNo'].setErrors({ invalid: 'ListNo Already Exist!' });
         
            this.toastr.error( 'ListNo Already Exist!','Error!');
            this.submit = true;
          }
          else{
         
            this.submit = false;
          }
         
         
        });
       
      }
    }
    });
    this.formData.get("ItemDescription").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(500)).
    subscribe(selectedValue => {  
      let value=this.formData.get('ItemDescription').value;
      
      if(this.id>0){

      }else{
      console.log("ItemDescription",value)
      if(value.length >1){
        let request={
          "table_name": "PListDia",
          "column_name": "ItemDescription",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['ItemDescription'].setErrors({ invalid: 'ItemDescription Already Exist!' });
         
            this.toastr.error( 'ItemDescription Already Exist!','Error!');
            this.submit = true;
          }
          else{
         
            this.submit = false;
          }
         
         
        });
       
      }
    }
    });
    this.formData.get("ProdCateID").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(500)).
    subscribe(selectedValue => {  
      let value=this.formData.get('ProdCateID').value;
      
      if(this.id>0){

      }else{
      console.log("ProdCateID",value)
      if(value.length >1){
        let request={
          "table_name": "PListMK",
          "column_name": "ProdCateID",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['ProdCateID'].setErrors({ invalid: 'ProdCateID Already Exist!' });
         
            this.toastr.error( 'ProdCateID Already Exist!','Error!');
            this.submit = true;
          }
          else{
         
            this.submit = false;
          }
         
         
        });
       
      }
    }
    });

    this.submit = false;
    // for(var i=0;i<1;i++){
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
      let request: PRICELISTADDModel = <PRICELISTADDModel>{};

      request.SlNo=Number(this.id);
      request.PListNo = this.formData.get('PListNo').value;//
      request.PartyID = this.formData.get('PartyID').value;//
      request.EffectFrom = this.formData.get('EffectFrom').value;//
      request.EffectTo = this.formData.get('EffectTo').value;//
      
      request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//
      request.Making = JSON.stringify(this.formData.get('Making').value);//
      request.nonPacket = JSON.stringify(this.formData.get('nonPacket').value);//
      let jsonData: PRICELISTADDModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_PriceListMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.code==1){
          this.toastr.success( 'Series Inserted Successfully!','Success!');
          this.router.navigate(['/invoices/price-list']);
        }
        else{
          this.toastr.error( 'Series not Added!','Error!');
        }
      })

      console.log("post product", request);//

    }

  }
  public _fetchParty(event) {
    let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_Get_Party_dropdown";
  requestModel.pageNo=1;
  requestModel.pageSize=10;
  requestModel.search=event.query;
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.PartyData= JSON.parse(response.items);
    
  });   
  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_Get_PriceListMast_SlNo";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];

     this.formData.controls['PListNo'].setValue(data['PListNo']);
      this.formData.controls['PartyID'].setValue(data['PartyID']);
     this.formData.controls['EffectTo'].setValue(data['EffectTo']);
      this.formData.controls['EffectFrom'].setValue(data['EffectFrom']);
     
     
      
      let summery=data.usersDetails;		
      console.log("summery",summery)
      if(summery!=null && summery.length){
        summery.forEach(obj => {
          this.usersDetails.push(this.uodateControls(obj));
      });
      }

      let making=data.Making;		
      console.log("making",making)
      if(making!=null && making.length){
        making.forEach(obj => {
          this.Making.push(this.uodateMakingControls(obj));
      });
      }

      let nonPacket=data.nonPacket;		
      console.log("making",nonPacket)
      if(nonPacket!=null && nonPacket.length){
        nonPacket.forEach(obj => {
          this.nonPacket.push(this.UpdateaddCtr(obj));
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
  private uodateControls(item:any) {
    return new FormGroup({
      SlNo: new FormControl(item.SlNo),
      ItemDescription: new FormControl(Number(item.ItemDescription)),
      ShapeID: new FormControl(item.ShapeID),
      SizeID: new FormControl(item.SizeID),
      Grade: new FormControl(item.Grade),
      Rate: new FormControl(item.Rate),
      
    });
  }

 


  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  // public _fetchProductCategory(event) { 
  //   let requestModel = <RequestModel>{};
  //   requestModel.spName="sp_admin_Get_ProdCateMast";
  //   requestModel.pageNo=1;
  //   requestModel.pageSize=10;
  //   requestModel.search=event.query;
  //   this.service.GetApiJson(requestModel).subscribe(response => {
  //     this.subcategoryData= JSON.parse(response.items);
      
  //   });   
  // }

  
get usersDetails(): FormArray {
  return this.formData.get("usersDetails") as FormArray;
}
get nonPacket(): FormArray {
  return this.formData.get("nonPacket") as FormArray;
}
get Making(): FormArray {
  return this.formData.get("Making") as FormArray;
}


onAdd() {
  this.formData.markAllAsTouched();
  this.usersDetails.push(this.addControls());
}
private addControls() {
  return new FormGroup({
    SlNo: new FormControl("0"),
    ItemDescription: new FormControl(""),
    ShapeID: new FormControl(""),
    SizeID: new FormControl(""),
    Grade: new FormControl(""),
    Rate: new FormControl(""),
  
   
  });
}
onAd() {
  this.formData.markAllAsTouched();
  this.nonPacket.push(this.addCtr());
}
private addCtr() {
  return new FormGroup({
    SlNo: new FormControl("0"),
    ItemDescription: new FormControl(""),
    Unit: new FormControl(""),
    
    SaleRt: new FormControl(""),
    LossPer: new FormControl("")
   
  });
}
private UpdateaddCtr(item:any) {
  return new FormGroup({
    SlNo: new FormControl(item.SlNo),
    ItemDescription: new FormControl(Number(item.ItemDescription)),
    Unit: new FormControl(Number(item.Unit)),
    
    SaleRt: new FormControl(item.SaleRt),
    LossPer: new FormControl(item.LossPer)
   
  });
}
onA() {
  this.formData.markAllAsTouched();
  this.Making.push(this.addCt());
}
private addCt() {
  return new FormGroup({
    SlNo: new FormControl("0"),
    ProdCateID: new FormControl(""),
    MakingRate: new FormControl(""),
   
   
  });
}
private uodateMakingControls(item:any) {
  return new FormGroup({
    SlNo: new FormControl(item.SlNo),
    ProdCateID: new FormControl(Number(item.ProdCateID)),
    MakingRate: new FormControl(item.MakingRate),
    
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



onDel() {
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
    this.nonPacket.controls.splice(this.selectUsers[i] - 1, 1);
  }
  this.messageService.add({
    severity: "success",
    summary: "Success",
    detail: "Selected records deleted!",
  });

  this.selectUsers = [];
}

onDele() {
  if (this.select.length < 1) {
    this.messageService.add({
      severity: "warn",
      summary: "Info",
      detail: "Please select a record to delete!",
    });
    return;
  }
  console.log(this.select);
  for (var i = this.select.length - 1; i >= 0; i--) {
    this.Making.controls.splice(this.select[i] - 1, 1);
  }
  this.messageService.add({
    severity: "success",
    summary: "Success",
    detail: "Selected records deleted!",
  });

  this.select = [];
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

private _fetchWPC() {
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_Get_WPCMast_dropdown";
  requestModel.pageNo=1;
  requestModel.pageSize=1;
  requestModel.search= "";
  requestModel.id=Number(this.id);
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.wpcData= JSON.parse(response.items);
    console.log("this.wpcData",this.wpcData)
    this.shapeData = this.wpcData.filter(m => m.RecType ==="S");
    this.sizeData = this.wpcData.filter(m => m.RecType ==="Z");
    this.gradeData = this.wpcData.filter(m => m.RecType ==="P");
  });
}


private _fetchProdCat() {
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_Get_ProdCate_dropdown";
  requestModel.pageNo=1;
  requestModel.pageSize=1;
  requestModel.search= "";
  requestModel.id=Number(this.id);
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.prodcatData= JSON.parse(response.items);
    
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





