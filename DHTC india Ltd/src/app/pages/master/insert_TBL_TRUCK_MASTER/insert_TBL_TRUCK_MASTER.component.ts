

 import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BRANCH_MASTERModel } from '../../master/TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { TBL_TRUCK_MASTERModel } from '../TBL_TRUCK_MASTER/TBL_TRUCK_MASTER.model';
@Component({
  selector: 'app-insert-TBL_TRUCK_MASTER',
  templateUrl: './insert-TBL_TRUCK_MASTER.component.html',
  styleUrls: ['./insert-TBL_TRUCK_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_TRUCK_MASTERComponent implements OnInit ,AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_TRUCK_MASTERModel>,
    private toastr: ToastrService,private router: Router,
   private route: ActivatedRoute) { }
   
  requestModel :RequestModel = <RequestModel>{};
 
  get form() {
    return this.formData.controls;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'TRUCK MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // CODE: ['', [Validators.required]],
      DRIVER_NAME: ['', [Validators.required]],
LNO1: ['', [Validators.required]],

BLACK_LISTED: [null, [Validators.required]],
CHASSIS_NO: ['', [Validators.required]],
// GROUPS: ['', [Validators.required]],
ENGINE_NO: ['', [Validators.required]],
// REGAT: ['', [Validators.required]],
BODY_TYPE: ['', [Validators.required]],
// MAKE: ['', [Validators.required]],
MODEL: ['', [Validators.required]],
// COLOR: ['', [Validators.required]],
PERMIT: ['', [Validators.required]],
// DATE: ['', [Validators.required]],
// VALID_STATE: ['', [Validators.required]],
// INSURANCE: ['', [Validators.required]],
// POLICY_BO: ['', [Validators.required]],
// POLICY_VALID: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
// DIVNNO: ['', [Validators.required]],
//HIGHT: ['', [Validators.required]],
//LENGTH: ['', [Validators.required]],
//WIDTH: ['', [Validators.required]],
//LODING: ['', [Validators.required]],
//UNLODING: ['', [Validators.required]],
//FITNESS_VALID: ['', [Validators.required]],
TAX_TOKEN_NO: ['', [Validators.required]],
TAX_ISSUE_FROM: ['', [Validators.required]],
TAX_VALID_UPTO: ['', [Validators.required]],
//VEHICLE_TYPE: ['', [Validators.required]],
//OWNER_NAME: ['', [Validators.required]],
SONE_OF: ['', [Validators.required]],
PAN: ['', [Validators.required, Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')]],
//ADDRES_PERM: ['', [Validators.required]],
//ADDRESS_TEMP: ['', [Validators.required]],
PHONE: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
//LAST_INST: ['', [Validators.required]],
// FINANCER_NAME: ['', [Validators.required]],
// FINANCER_ADDRESS: ['', [Validators.required]],
// FINANCER_SON_OF: ['', [Validators.required]],
// PINANCER_PHONE: ['', [Validators.required]],
// DRIVER_CODE: ['', [Validators.required]],

// ENTRY_BY: ['', [Validators.required]],
// ENTRY_DATE: ['', [Validators.required]],
// REMARKS: ['', [Validators.required]],

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
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_TRUCK_MASTERModel = <TBL_TRUCK_MASTERModel>{};
// request.CODE = this.formData.get('code').value;
request.LNO1 = this.formData.get('LNO1').value;

request.BLACK_LISTED = this.formData.get('BLACK_LISTED').value;
request.CHASSIS_NO = this.formData.get('CHASSIS_NO').value;
// request.GROUPS = this.formData.get('groups').value;
request.ENGINE_NO = this.formData.get('ENGINE_NO').value;
//request.REGAT = this.formData.get('regat').value;
request.BODY_TYPE = this.formData.get('BODY_TYPE').value;
// request.MAKE = this.formData.get('make').value;
request.MODEL = this.formData.get('MODEL').value;
// request.COLOR = this.formData.get('color').value;
request.PERMIT = this.formData.get('PERMIT').value;
//request.DATE = this.formData.get('date').value;
// request.VALID_STATE = this.formData.get('valiD_STATE').value;
// request.INSURANCE = this.formData.get('insurance').value;
// request.POLICY_BO = this.formData.get('policY_BO').value;
// request.POLICY_VALID = this.formData.get('policY_VALID').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
// request.DIVNNO = this.formData.get('divnno').value;
// request.HIGHT = this.formData.get('hight').value;
// request.LENGTH = this.formData.get('length').value;
// request.WIDTH = this.formData.get('width').value;
// request.LODING = this.formData.get('loding').value;
// request.UNLODING = this.formData.get('unloding').value;
//request.FITNESS_VALID = this.formData.get('fitnesS_VALID').value;
request.TAX_TOKEN_NO = this.formData.get('TAX_TOKEN_NO').value;
request.TAX_ISSUE_FROM = this.formData.get('TAX_ISSUE_FROM').value;
request.TAX_VALID_UPTO = this.formData.get('TAX_VALID_UPTO').value;
//request.VEHICLE_TYPE = this.formData.get('vehiclE_TYPE').value;
// request.OWNER_NAME = this.formData.get('owneR_NAME').value;
request.SONE_OF = this.formData.get('SONE_OF').value;
request.PAN = this.formData.get('PAN').value;
// request.ADDRES_PERM = this.formData.get('addressS_PERM').value;
// request.ADDRESS_TEMP = this.formData.get('addressS_TEMP').value;
request.PHONE = this.formData.get('PHONE').value;
//request.LAST_INST = this.formData.get('lasT_INST').value;
// request.FINANCER_NAME = this.formData.get('financeR_NAME').value;
// request.FINANCER_ADDRESS = this.formData.get('financeR_ADDRESS').value;
// request.FINANCER_SON_OF = this.formData.get('financeR_SON_OF').value;
// request.PINANCER_PHONE = this.formData.get('financeR_PHONE').value;
// request.DRIVER_CODE = this.formData.get('driveR_CODE').value;
request.DRIVER_NAME = this.formData.get('DRIVER_NAME').value;
// request.ENTRY_BY = this.formData.get('ENTRY_BY').value;
// request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
// request.REMARKS = this.formData.get('REMARKS').value;


//request.ID = this.formData.get('REMARKS').value;

if(this.id>0){
  this.service.update(request,"TBL_TRUCK_MASTER/CODE?CODE="+this.id).subscribe(response => {
     
    console.log("response",response);
    if(response.document>0){
      this.toastr.success( 'Product Inserted Successfully!','Success!');
      this.router.navigate(['/master/truck-master']);
      
    }
    else{
      this.toastr.error( 'Something went wrong!','Error!');
     
    }
   
   
  });
}
else{
  this.service.add(request,"TBL_TRUCK_MASTER").subscribe(response => {
     
    console.log("response",response);
    if(response.document>0){
      this.toastr.success( 'Product Inserted Successfully!','Success!');
      this.router.navigate(['/master/truck-master']);
      
    }
    else{
      this.toastr.error( 'Something went wrong!','Error!');
     
    }
   
   
  });
}
   
} 

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_TRUCK_MASTER/CODE?CODE="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   //this.formData.controls['CODE'].setValue(data['CODE']);
this.formData.controls['LNO1'].setValue(data['lnO1']);
this.formData.controls['LNO2'].setValue(data['lnO2']);
this.formData.controls['LNO3'].setValue(data['lnO3']);
this.formData.controls['BLACK_LISTED'].setValue(data['blacK_LISTED']);
this.formData.controls['CHASSIS_NO'].setValue(data['chassiS_NO']);
//this.formData.controls['GROUPS'].setValue(data['GROUPS']);
this.formData.controls['ENGINE_NO'].setValue(data['enginE_NO']);
//this.formData.controls['REGAT'].setValue(data['REGAT']);
this.formData.controls['BODY_TYPE'].setValue(data['bodY_TYPE']);
//this.formData.controls['MAKE'].setValue(data['MAKE']);
this.formData.controls['MODEL'].setValue(data['model']);
// this.formData.controls['COLOR'].setValue(data['COLOR']);
this.formData.controls['PERMIT'].setValue(data['permit']);
// this.formData.controls['DATE'].setValue(data['DATE']);
// this.formData.controls['VALID_STATE'].setValue(data['VALID_STATE']);
// this.formData.controls['INSURANCE'].setValue(data['INSURANCE']);
// this.formData.controls['POLICY_BO'].setValue(data['POLICY_BO']);
// this.formData.controls['POLICY_VALID'].setValue(data['POLICY_VALID']);
this.formData.controls['ADDRESS'].setValue(data['address']);
// this.formData.controls['DIVNNO'].setValue(data['DIVNNO']);
// this.formData.controls['HIGHT'].setValue(data['HIGHT']);
// this.formData.controls['LENGTH'].setValue(data['LENGTH']);
// this.formData.controls['WIDTH'].setValue(data['WIDTH']);
// this.formData.controls['LODING'].setValue(data['LODING']);
// this.formData.controls['UNLODING'].setValue(data['UNLODING']);
// this.formData.controls['FITNESS_VALID'].setValue(data['FITNESS_VALID']);
this.formData.controls['TAX_TOKEN_NO'].setValue(data['taX_TOKEN_NO']);
this.formData.controls['TAX_ISSUE_FROM'].setValue(data['taX_ISSUE_FROM']);
this.formData.controls['TAX_VALID_UPTO'].setValue(data['taX_VALID_UPTO']);
// this.formData.controls['VEHICLE_TYPE'].setValue(data['VEHICLE_TYPE']);
//this.formData.controls['OWNER_NAME'].setValue(data['OWNER_NAME']);
this.formData.controls['SONE_OF'].setValue(data['sonE_OF']);
this.formData.controls['PAN'].setValue(data['pan']);
//this.formData.controls['ADDRES_PERM'].setValue(data['ADDRES_PERM']);
//this.formData.controls['ADDRESS_TEMP'].setValue(data['ADDRESS_TEMP']);
this.formData.controls['PHONE'].setValue(data['phone']);
//this.formData.controls['LAST_INST'].setValue(data['LAST_INST']);
//this.formData.controls['FINANCER_NAME'].setValue(data['FINANCER_NAME']);
// this.formData.controls['FINANCER_ADDRESS'].setValue(data['FINANCER_ADDRESS']);
// this.formData.controls['FINANCER_SON_OF'].setValue(data['FINANCER_SON_OF']);
// this.formData.controls['PINANCER_PHONE'].setValue(data['PINANCER_PHONE']);
// this.formData.controls['DRIVER_CODE'].setValue(data['DRIVER_CODE']);
this.formData.controls['DRIVER_NAME'].setValue(data['driveR_NAME']);
//this.formData.controls['ENTRY_BY'].setValue(data['ENTRY_BY']);
// this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
// this.formData.controls['REMARKS'].setValue(data['REMARKS']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
ngAfterViewInit() {
  this.myInputField.nativeElement.focus();
  }
}
