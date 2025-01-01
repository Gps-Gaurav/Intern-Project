

 import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BRANCH_MASTERModel } from '../../master/TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { TBL_LORRY_ACCIDENTModel } from '../TBL_LORRY_ACCIDENT/TBL_LORRY_ACCIDENT.model';
import { TBL_STATION_MASTERModel } from '../TBL_STATION_MASTER/TBL_STATION_MASTER.model';
@Component({
  selector: 'app-insert-TBL_LORRY_ACCIDENT',
  templateUrl: './insert-TBL_LORRY_ACCIDENT.component.html',
  styleUrls: ['./insert-TBL_LORRY_ACCIDENT.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_LORRY_ACCIDENTComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_LORRY_ACCIDENTModel>,
    private toastr: ToastrService,private router: Router,
    private validservice:ResourceService<any>,
   private route: ActivatedRoute) { }
   
  requestModel :RequestModel = <RequestModel>{};
  stationData: TBL_STATION_MASTERModel[];
  get form() {
    return this.formData.controls;
  }
 
 formData: FormGroup;
 id:Number=0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  branchData: TBL_BRANCH_MASTERModel[];
 
  image = '';
  file = '';
  search='';

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_LORRY_ACCIDENT_NEW', active: true }];
 
 this.formData = this.formBuilder.group({
   
FROM_STATION_CODE: ['', [Validators.required]],

CHALLAN_NO: ['', [Validators.required]],

ACCIDENT_DATE: ['', [Validators.required]],
LORRY_NO: ['', [Validators.required]],
ACCIDENT_AT: ['', [Validators.required]],
CONT_NU: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
POLICE_STATION: ['', [Validators.required]],
FIR_LODGE: ['', [Validators.required]],
PHOTO_RECEIVE: ['', [Validators.required]],
GOODS_COLLECTED_BY: ['', [Validators.required]],
BILTY_WISE_ENTRY: ['', [Validators.required]],
NAME_OF_PERSON: ['', [Validators.required]],
REASON_FOR_SHORTAGE: ['', [Validators.required]],
DAMAGE: ['', [Validators.required]],
LYING_SWEEPING_AT: ['', [Validators.required]],
ADV_DEDUCT: ['', [Validators.required]],

SHORTAGE_PKG: [''],

REMARKS: ['', [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
  this._fetchStationData();
  this._fetchBranchData();
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  

      this.submit = true;
	console.log("form");
    if (this.formData.valid) {
      let request :TBL_LORRY_ACCIDENTModel = <TBL_LORRY_ACCIDENTModel>{};

request.FROM_STATION_CODE = this.formData.get('FROM_STATION_CODE').value;
request.CHALLAN_NO = this.formData.get('CHALLAN_NO').value;

request.LORRY_NO = this.formData.get('LORRY_NO').value;
request.ACCIDENT_AT = this.formData.get('ACCIDENT_AT').value;
request.CONT_NU = this.formData.get('CONT_NU').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;

request.POLICE_STATION = this.formData.get('POLICE_STATION').value;
request.FIR_LODGE = this.formData.get('FIR_LODGE').value;
request.PHOTO_RECEIVE = this.formData.get('PHOTO_RECEIVE').value;
request.GOODS_COLLECTED_BY = this.formData.get('GOODS_COLLECTED_BY').value;
request.BILTY_WISE_ENTRY = this.formData.get('BILTY_WISE_ENTRY').value;
request.NAME_OF_PERSON = this.formData.get('NAME_OF_PERSON').value;
request.REASON_FOR_SHORTAGE = this.formData.get('REASON_FOR_SHORTAGE').value;
request.DAMAGE = this.formData.get('DAMAGE').value;
request.LYING_SWEEPING_AT = this.formData.get('LYING_SWEEPING_AT').value;
request.ADV_DEDUCT = this.formData.get('ADV_DEDUCT').value;

request.SHORTAGE_PKG = this.formData.get('SHORTAGE_PKG').value;

request.REMARKS = this.formData.get('REMARKS').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_LORRY_ACCIDENT_NEW").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/lorry-accident']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_LORRY_ACCIDENT_NEW/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['FROM_STATION_CODE'].setValue(data['FROM_STATION_CODE']);
this.formData.controls['FROM_STATION_NAME'].setValue(data['FROM_STATION_NAME']);
this.formData.controls['CHALLAN_NO'].setValue(data['CHALLAN_NO']);
this.formData.controls['FILE_NO'].setValue(data['FILE_NO']);
this.formData.controls['LORRY_NO'].setValue(data['LORRY_NO']);
this.formData.controls['ACCIDENT_AT'].setValue(data['ACCIDENT_AT']);
this.formData.controls['CONT_NU'].setValue(data['CONT_NU']);
this.formData.controls['BRANCH_CODE'].setValue(data['BRANCH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['POLICE_STATION'].setValue(data['POLICE_STATION']);
this.formData.controls['FIR_LODGE'].setValue(data['FIR_LODGE']);
this.formData.controls['PHOTO_RECEIVE'].setValue(data['PHOTO_RECEIVE']);
this.formData.controls['GOODS_COLLECTED_BY'].setValue(data['GOODS_COLLECTED_BY']);
this.formData.controls['BILTY_WISE_ENTRY'].setValue(data['BILTY_WISE_ENTRY']);
this.formData.controls['NAME_OF_PERSON'].setValue(data['NAME_OF_PERSON']);
this.formData.controls['REASON_FOR_SHORTAGE'].setValue(data['REASON_FOR_SHORTAGE']);
this.formData.controls['DAMAGE'].setValue(data['DAMAGE']);
this.formData.controls['LYING_SWEEPING_AT'].setValue(data['LYING_SWEEPING_AT']);
this.formData.controls['ADV_DEDUCT'].setValue(data['ADV_DEDUCT']);
this.formData.controls['SHORTAGE_WT'].setValue(data['SHORTAGE_WT']);
this.formData.controls['SHORTAGE_PKG'].setValue(data['SHORTAGE_PKG']);
this.formData.controls['SHORTAGE_VALUE'].setValue(data['SHORTAGE_VALUE']);
this.formData.controls['SWEEPING_WT'].setValue(data['SWEEPING_WT']);
this.formData.controls['SWEEPING_PKG'].setValue(data['SWEEPING_PKG']);
this.formData.controls['SWEEPING_VALUE'].setValue(data['SWEEPING_VALUE']);
this.formData.controls['REMARKS'].setValue(data['REMARKS']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

private _fetchStationData() {
   
  this.requestModel.url = "TBL_STATION_MASTER?PageNo=" + 1 + "&PageSize=" + 999999 + "&Search=" + this.search;
  this.validservice.getStoreList(this.requestModel).subscribe(response => {
    this.stationData = response.document;
   
  });

}

private _fetchBranchData() {
    
     
  this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search=" + this.search;
  this.validservice.getStoreList(this.requestModel).subscribe(response => {
    this.branchData = response.document;
   
  });
}
}
