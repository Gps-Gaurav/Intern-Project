

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
import { TBL_BROKER_MASTERModel } from '../TBL_BROKER_MASTER/TBL_BROKER_MASTER.model';
@Component({
  selector: 'app-insert-TBL_BROKER_MASTER',
  templateUrl: './insert-TBL_BROKER_MASTER.component.html',
  styleUrls: ['./insert-TBL_BROKER_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_BROKER_MASTERComponent implements OnInit ,AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_BROKER_MASTERModel>,
    private toastr: ToastrService,private router: Router,
    private station_service:ResourceService<any>,
   private route: ActivatedRoute) { }
   
  requestModel :RequestModel = <RequestModel>{};
 
  get form() {
    return this.formData.controls;
  }
  branchData: TBL_BRANCH_MASTERModel[];
 formData: FormGroup;
 id:Number=0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

 
  image = '';
  file = '';


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BROKER MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
 BRANCH_CODE: [null, [Validators.required]],
//BRANCH_NAME: ['', [Validators.required]],
BR_CODE: ['', [Validators.required]],
BR_NAME: ['', [Validators.required]],
CONTACT_PERSON: [''],
 ADDRESS: [''],
//  CITY: [''],
//  PIN_CODE: [''],

// PHONE_OFF1: ['', [Validators.required]],
// PHONE_OFF2: ['', [Validators.required]],
// PHONE_RES1: ['', [Validators.required]],
// PHONE_RES2: ['', [Validators.required]],
// DESTINATE_COMPANY: ['', [Validators.required]],
COM_ADDRESS: [''],
// COM_CONTACT_PERSON: ['', [Validators.required]],
// COM_PHONE: ['', [Validators.required]],
// REMARKS: ['', [Validators.required]],
// STATUS: ['', [Validators.required]],
// STDNO: ['', [Validators.required]],
// FAXNO: ['', [Validators.required]],
// PAGER: ['', [Validators.required]],
MOBILE: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
// EMAIL: [''],
// ENTER_DATE: ['', [Validators.required]],
// ENTER_BY: ['', [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
  this._fetchBranchData();
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  
    debugger;
      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_BROKER_MASTERModel = <TBL_BROKER_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
 request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
//request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.BR_CODE = this.formData.get('BR_CODE').value;
request.BR_NAME = this.formData.get('BR_NAME').value;
request.CONTACT_PERSON = this.formData.get('CONTACT_PERSON').value;
request.ADDRESS = this.formData.get('ADDRESS').value;

// request.PHONE_OFF1 = this.formData.get('PHONE_OFF1').value;
// request.PHONE_OFF2 = this.formData.get('PHONE_OFF2').value;
// request.PHONE_RES1 = this.formData.get('PHONE_RES1').value;
// request.PHONE_RES2 = this.formData.get('PHONE_RES2').value;
// request.DESTINATE_COMPANY = this.formData.get('DESTINATE_COMPANY').value;
request.COM_ADDRESS = this.formData.get('COM_ADDRESS').value;
// request.COM_CONTACT_PERSON = this.formData.get('COM_CONTACT_PERSON').value;
// request.COM_PHONE = this.formData.get('COM_PHONE').value;
// request.REMARKS = this.formData.get('REMARKS').value;
// request.STATUS = this.formData.get('STATUS').value;
// request.STDNO = this.formData.get('STDNO').value;
// request.FAXNO = this.formData.get('FAXNO').value;
// request.PAGER = this.formData.get('PAGER').value;
request.MOBILE = this.formData.get('MOBILE').value;
// request.ENTER_DATE = this.formData.get('ENTER_DATE').value;
// request.ENTER_BY = this.formData.get('ENTER_BY').value;

     // formData.append('id', this.id.toString());
     if(this.id>0){
      this.service.update(request,"TBL_BROKER_MASTER/ID?ID="+this.id).subscribe(response => {
         
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/broker-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    else{
     
      this.service.add(request,"TBL_BROKER_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/broker-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_BROKER_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  //  this.formData.controls['ID'].setValue(data['ID']);
 this.formData.controls['BRANCH_CODE'].setValue(data['brancH_CODE']);
//this.formData.controls['BRANCH_NAME'].setValue(data['brancH_NAME']);
this.formData.controls['BR_CODE'].setValue(data['bR_CODE']);
this.formData.controls['BR_NAME'].setValue(data['bR_NAME']);
this.formData.controls['CONTACT_PERSON'].setValue(data['contacT_PERSON']);
this.formData.controls['ADDRESS'].setValue(data['address']);
// this.formData.controls['PHONE_OFF1'].setValue(data['PHONE_OFF1']);
// this.formData.controls['PHONE_OFF2'].setValue(data['PHONE_OFF2']);
// this.formData.controls['PHONE_RES1'].setValue(data['PHONE_RES1']);
// this.formData.controls['PHONE_RES2'].setValue(data['PHONE_RES2']);
// this.formData.controls['DESTINATE_COMPANY'].setValue(data['DESTINATE_COMPANY']);
this.formData.controls['COM_ADDRESS'].setValue(data['coM_ADDRESS']);
// this.formData.controls['COM_CONTACT_PERSON'].setValue(data['COM_CONTACT_PERSON']);
// this.formData.controls['COM_PHONE'].setValue(data['COM_PHONE']);
// this.formData.controls['REMARKS'].setValue(data['REMARKS']);
// this.formData.controls['STATUS'].setValue(data['STATUS']);
// this.formData.controls['STDNO'].setValue(data['STDNO']);
// this.formData.controls['FAXNO'].setValue(data['FAXNO']);
// this.formData.controls['PAGER'].setValue(data['PAGER']);
this.formData.controls['MOBILE'].setValue(data['mobile']);
// this.formData.controls['ENTER_DATE'].setValue(data['ENTER_DATE']);
// this.formData.controls['ENTER_BY'].setValue(data['ENTER_BY']);

 
 
   
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


  private _fetchBranchData() {
    
     
    this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search=";
    this.station_service.getStoreList(this.requestModel).subscribe(response => {
      this.branchData = response.document;
     
    });
  }
}
