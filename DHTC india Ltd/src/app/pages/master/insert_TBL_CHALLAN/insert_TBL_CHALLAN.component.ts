

 import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { MessageService, SelectItem } from "primeng/api";
import { TBL_CHALLANModel } from '../TBL_CHALLAN/TBL_CHALLAN.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TabService } from 'src/app/core/helpers/TabService';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-insert-TBL_CHALLAN',
  templateUrl: './insert-TBL_CHALLAN.component.html',
  styleUrls: ['./insert-TBL_CHALLAN.component.scss'],
  providers: [MessageService,TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_CHALLANComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_CHALLANModel>,
    private toastr: ToastrService,private router: Router,
    private messageService: MessageService,
    public datepipe: DatePipe,
   private route: ActivatedRoute) { }
   selectedUsers: any = [];
  requestModel :RequestModel = <RequestModel>{};
 
  get form() {
    return this.formData.controls;
  }
 
 formData: FormGroup;
 id:Number=0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

 
  image = '';
  file = '';


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_CHALLAN', active: true }];
 
 this.formData = this.formBuilder.group({
      CHID: ['', [Validators.required]],
CHNO: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
DATE: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
LNO1: ['', [Validators.required]],
LNO2: ['', [Validators.required]],
LNO3: ['', [Validators.required]],
LORRYID: ['', [Validators.required]],
LORRYTYPE: ['', [Validators.required]],
DRIVERID: ['', [Validators.required]],
FROMSTATION: ['', [Validators.required]],
FROMSTATION_Name: ['', [Validators.required]],
TOSTATION: ['', [Validators.required]],
TOSTATION_Name: ['', [Validators.required]],
LOADFROM: [null, [Validators.required]],
UNLOADAT: [null, [Validators.required]],
TRANSITDAY: ['', [Validators.required]],
PENALITYDAY: ['', [Validators.required]],
DEPT_DATE: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
CHALLANWT: ['', [Validators.required]],
CHALLAN_PKG: ['', [Validators.required]],
RATE_SETTED: ['', [Validators.required]],
RATE_TYPE: [null, [Validators.required]],
GAURANTEE_WT: ['', [Validators.required]],
BAL_BRANCHID: ['', [Validators.required]],
ADV_BRANCHID: ['', [Validators.required]],
BROKERID: ['', [Validators.required]],
HIRE: ['', [Validators.required]],
LABOUR_CHARGES: ['', [Validators.required]],
DETENTION: ['', [Validators.required]],
OTHER: ['', [Validators.required]],
TOTAL_HIRE: ['', [Validators.required]],
LESS_ADVANCE: ['', [Validators.required]],
BALANCE_HIRE: ['', [Validators.required]],
TP: ['', [Validators.required]],
TP_NO: ['', [Validators.required]],
NO_OF_TIRPAL: ['', [Validators.required]],
CHAL: ['', [Validators.required]],
OE: ['', [Validators.required]],
DRIVERMOB: ['', [Validators.required]],
REMARKS1: ['', [Validators.required]],
REMARKS2: ['', [Validators.required]],
ENTRYBY: ['', [Validators.required]],
ENTERYDATE: ['', [Validators.required]],
FINYR: ['', [Validators.required]],
PAYMENT_BY_OTHER_BRANCH: ['', [Validators.required]],
STOP_PAYMENT: ['', [Validators.required]],
PAYMENT_BY_OTHERBRANCH_CODE: ['', [Validators.required]],
STOP_PAYMENT_CLAIM_RATE: ['', [Validators.required]],
STOP_PAYMENT_OTHER_RATE: ['', [Validators.required]],
SEAL_NO: ['', [Validators.required]],
DRIVERMOBILE2: ['', [Validators.required]],
CARD_NO: ['', [Validators.required]],
ConEWaybill: ['', [Validators.required]],
usersDetails: this.formBuilder.array([]),
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
  
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  
console.log("grid",JSON.stringify(this.usersDetails.value))
      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_CHALLANModel = <TBL_CHALLANModel>{};
request.CHID = this.formData.get('CHID').value;
request.CHNO = this.formData.get('CHNO').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.DATE = this.formData.get('DATE').value;
request.LNO1 = this.formData.get('LNO1').value;
request.LNO2 = this.formData.get('LNO2').value;
request.LNO3 = this.formData.get('LNO3').value;
request.LORRYID = this.formData.get('LORRYID').value;
request.LORRYTYPE = this.formData.get('LORRYTYPE').value;
request.DRIVERID = this.formData.get('DRIVERID').value;
request.FROMSTATION = this.formData.get('FROMSTATION').value;
request.TOSTATION = this.formData.get('TOSTATION').value;
request.LOADFROM = this.formData.get('LOADFROM').value;
request.UNLOADAT = this.formData.get('UNLOADAT').value;
request.TRANSITDAY = this.formData.get('TRANSITDAY').value;
request.PENALITYDAY = this.formData.get('PENALITYDAY').value;
request.DEPT_DATE = this.formData.get('DEPT_DATE').value;
request.CHALLANWT = this.formData.get('CHALLANWT').value;
request.CHALLAN_PKG = this.formData.get('CHALLAN_PKG').value;
request.RATE_SETTED = this.formData.get('RATE_SETTED').value;
request.RATE_TYPE = this.formData.get('RATE_TYPE').value;
request.GAURANTEE_WT = this.formData.get('GAURANTEE_WT').value;
request.BAL_BRANCHID = this.formData.get('BAL_BRANCHID').value;
request.ADV_BRANCHID = this.formData.get('ADV_BRANCHID').value;
request.BROKERID = this.formData.get('BROKERID').value;
request.HIRE = this.formData.get('HIRE').value;
request.LABOUR_CHARGES = this.formData.get('LABOUR_CHARGES').value;
request.DETENTION = this.formData.get('DETENTION').value;
request.OTHER = this.formData.get('OTHER').value;
request.TOTAL_HIRE = this.formData.get('TOTAL_HIRE').value;
request.LESS_ADVANCE = this.formData.get('LESS_ADVANCE').value;
request.BALANCE_HIRE = this.formData.get('BALANCE_HIRE').value;
request.TP = this.formData.get('TP').value;
request.TP_NO = this.formData.get('TP_NO').value;
request.NO_OF_TIRPAL = this.formData.get('NO_OF_TIRPAL').value;
request.CHAL = this.formData.get('CHAL').value;
request.OE = this.formData.get('OE').value;
request.DRIVERMOB = this.formData.get('DRIVERMOB').value;
request.REMARKS1 = this.formData.get('REMARKS1').value;
request.REMARKS2 = this.formData.get('REMARKS2').value;
request.ENTRYBY = this.formData.get('ENTRYBY').value;
request.ENTERYDATE = this.formData.get('ENTERYDATE').value;
request.FINYR = this.formData.get('FINYR').value;
request.PAYMENT_BY_OTHER_BRANCH = this.formData.get('PAYMENT_BY_OTHER_BRANCH').value;
request.STOP_PAYMENT = this.formData.get('STOP_PAYMENT').value;
request.PAYMENT_BY_OTHERBRANCH_CODE = this.formData.get('PAYMENT_BY_OTHERBRANCH_CODE').value;
request.STOP_PAYMENT_CLAIM_RATE = this.formData.get('STOP_PAYMENT_CLAIM_RATE').value;
request.STOP_PAYMENT_OTHER_RATE = this.formData.get('STOP_PAYMENT_OTHER_RATE').value;
request.SEAL_NO = this.formData.get('SEAL_NO').value;
request.DRIVERMOBILE2 = this.formData.get('DRIVERMOBILE2').value;
request.CARD_NO = this.formData.get('CARD_NO').value;
request.ConEWaybill = this.formData.get('ConEWaybill').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_CHALLAN").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_CHALLAN']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_CHALLAN/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['CHID'].setValue(data['CHID']);
this.formData.controls['CHNO'].setValue(data['CHNO']);
this.formData.controls['BRANCH_CODE'].setValue(data['BRANCH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['DATE'].setValue(data['DATE']);
this.formData.controls['LNO1'].setValue(data['LNO1']);
this.formData.controls['LNO2'].setValue(data['LNO2']);
this.formData.controls['LNO3'].setValue(data['LNO3']);
this.formData.controls['LORRYID'].setValue(data['LORRYID']);
this.formData.controls['LORRYTYPE'].setValue(data['LORRYTYPE']);
this.formData.controls['DRIVERID'].setValue(data['DRIVERID']);
this.formData.controls['FROMSTATION'].setValue(data['FROMSTATION']);
this.formData.controls['TOSTATION'].setValue(data['TOSTATION']);
this.formData.controls['LOADFROM'].setValue(data['LOADFROM']);
this.formData.controls['UNLOADAT'].setValue(data['UNLOADAT']);
this.formData.controls['TRANSITDAY'].setValue(data['TRANSITDAY']);
this.formData.controls['PENALITYDAY'].setValue(data['PENALITYDAY']);
this.formData.controls['DEPT_DATE'].setValue(data['DEPT_DATE']);
this.formData.controls['CHALLANWT'].setValue(data['CHALLANWT']);
this.formData.controls['CHALLAN_PKG'].setValue(data['CHALLAN_PKG']);
this.formData.controls['RATE_SETTED'].setValue(data['RATE_SETTED']);
this.formData.controls['RATE_TYPE'].setValue(data['RATE_TYPE']);
this.formData.controls['GAURANTEE_WT'].setValue(data['GAURANTEE_WT']);
this.formData.controls['BAL_BRANCHID'].setValue(data['BAL_BRANCHID']);
this.formData.controls['ADV_BRANCHID'].setValue(data['ADV_BRANCHID']);
this.formData.controls['BROKERID'].setValue(data['BROKERID']);
this.formData.controls['HIRE'].setValue(data['HIRE']);
this.formData.controls['LABOUR_CHARGES'].setValue(data['LABOUR_CHARGES']);
this.formData.controls['DETENTION'].setValue(data['DETENTION']);
this.formData.controls['OTHER'].setValue(data['OTHER']);
this.formData.controls['TOTAL_HIRE'].setValue(data['TOTAL_HIRE']);
this.formData.controls['LESS_ADVANCE'].setValue(data['LESS_ADVANCE']);
this.formData.controls['BALANCE_HIRE'].setValue(data['BALANCE_HIRE']);
this.formData.controls['TP'].setValue(data['TP']);
this.formData.controls['TP_NO'].setValue(data['TP_NO']);
this.formData.controls['NO_OF_TIRPAL'].setValue(data['NO_OF_TIRPAL']);
this.formData.controls['CHAL'].setValue(data['CHAL']);
this.formData.controls['OE'].setValue(data['OE']);
this.formData.controls['DRIVERMOB'].setValue(data['DRIVERMOB']);
this.formData.controls['REMARKS1'].setValue(data['REMARKS1']);
this.formData.controls['REMARKS2'].setValue(data['REMARKS2']);
this.formData.controls['ENTRYBY'].setValue(data['ENTRYBY']);
this.formData.controls['ENTERYDATE'].setValue(data['ENTERYDATE']);
this.formData.controls['FINYR'].setValue(data['FINYR']);
this.formData.controls['PAYMENT_BY_OTHER_BRANCH'].setValue(data['PAYMENT_BY_OTHER_BRANCH']);
this.formData.controls['STOP_PAYMENT'].setValue(data['STOP_PAYMENT']);
this.formData.controls['PAYMENT_BY_OTHERBRANCH_CODE'].setValue(data['PAYMENT_BY_OTHERBRANCH_CODE']);
this.formData.controls['STOP_PAYMENT_CLAIM_RATE'].setValue(data['STOP_PAYMENT_CLAIM_RATE']);
this.formData.controls['STOP_PAYMENT_OTHER_RATE'].setValue(data['STOP_PAYMENT_OTHER_RATE']);
this.formData.controls['SEAL_NO'].setValue(data['SEAL_NO']);
this.formData.controls['DRIVERMOBILE2'].setValue(data['DRIVERMOBILE2']);
this.formData.controls['CARD_NO'].setValue(data['CARD_NO']);
this.formData.controls['ConEWaybill'].setValue(data['ConEWaybill']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

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
    summery_date: new FormControl(""),
    bilty: new FormControl("", [Validators.email, Validators.required]),
    pkgs: new FormControl(""),
    loaded: new FormControl(""),
    from: new FormControl(""),
    to: new FormControl(""),
    item: new FormControl(""),
    bilty_wt: new FormControl(""),
    loaded_wt: new FormControl("")
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
}
