

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
import { TBL_ACCOUNT_MASTERModel } from '../TBL_ACCOUNT_MASTER/TBL_ACCOUNT_MASTER.model';
import { DatePipe } from '@angular/common';
import { TBL_GROUP_MASTERModel } from '../TBL_GROUP_MASTER/TBL_GROUP_MASTER.model';
import { TBL_ACCOUNT_SUB_GROUP_MASTERModel } from '../TBL_ACCOUNT_SUB_GROUP_MASTER/TBL_ACCOUNT_SUB_GROUP_MASTER.model';
@Component({
  selector: 'app-insert-TBL_ACCOUNT_MASTER',
  templateUrl: './insert-TBL_ACCOUNT_MASTER.component.html',
  styleUrls: ['./insert-TBL_ACCOUNT_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_ACCOUNT_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_ACCOUNT_MASTERModel>,
    private toastr: ToastrService,private router: Router,
    private anyservice:ResourceService<any>,
   private route: ActivatedRoute,public datepipe: DatePipe) { }
   
  requestModel :RequestModel = <RequestModel>{};
  groupData: TBL_GROUP_MASTERModel[];
  subgroupData: TBL_ACCOUNT_SUB_GROUP_MASTERModel[];
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ACCOUNT MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
ACC_CODE: ['', [Validators.required]],
ACC_NAME: ['', [Validators.required]],
GRP_ID: [null, [Validators.required]],
SUB_GRP_ID: [null, [Validators.required]],
// PARTY_ID: ['', [Validators.required]],
ACC_ADDRESS: ['', [Validators.required]],
PAN_NO: ['', [Validators.required,Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')]],
// BANK_BRANCH_ID: ['', [Validators.required]],
// AC_NO: ['', [Validators.required]],
// OD_LIMIT: ['', [Validators.required]],
// AVERAGE_BAL: ['', [Validators.required]],
// OPENING_DATE: ['', [Validators.required]],
// CLOSING_DATE: ['', [Validators.required]],
// OPENING_BAL: ['', [Validators.required]],
// BAL_TYPE: ['', [Validators.required]],
// OPERATOR: ['', [Validators.required]],
// ENTRY_DATE: ['', [Validators.required]],
// DEFINE: ['', [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
  this._fetchGroupData();
  this._fetchSubGroupData();
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_ACCOUNT_MASTERModel = <TBL_ACCOUNT_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
request.ACC_CODE = this.formData.get('ACC_CODE').value;
request.ACC_NAME = this.formData.get('ACC_NAME').value;
request.GRP_ID = this.formData.get('GRP_ID').value;
request.SUB_GRP_ID = this.formData.get('SUB_GRP_ID').value;
// request.PARTY_ID = this.formData.get('PARTY_ID').value;
request.ACC_ADDRESS = this.formData.get('ACC_ADDRESS').value;
request.PAN_NO = this.formData.get('PAN_NO').value;
// request.BANK_BRANCH_ID = this.formData.get('BANK_BRANCH_ID').value;
// request.AC_NO = this.formData.get('AC_NO').value;
// request.OD_LIMIT = this.formData.get('OD_LIMIT').value;
// request.AVERAGE_BAL = this.formData.get('AVERAGE_BAL').value;
// request.OPENING_DATE = this.formData.get('OPENING_DATE').value;
// request.CLOSING_DATE = this.formData.get('CLOSING_DATE').value;
// request.OPENING_BAL = this.formData.get('OPENING_BAL').value;
// request.BAL_TYPE = this.formData.get('BAL_TYPE').value;
// request.OPERATOR = this.formData.get('OPERATOR').value;
request.ENTRY_DATE =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
//request.DEFINE = this.formData.get('DEFINE').value;

     // formData.append('id', this.id.toString());
     request.ID=this.id.toString();
     if(this.id>0){
      this.service.update(request,"TBL_ACCOUNT_MASTER/ID?ID="+this.id).subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/account-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }    
       
      });

     }
     else{
  
      this.service.add(request,"TBL_ACCOUNT_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/account-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });

     }

   
    }
  

  
}
 
 
 
 
 private _fetchData() {
   debugger;
  this.service.get("TBL_ACCOUNT_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  //  this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['ACC_CODE'].setValue(data['acC_CODE']);
this.formData.controls['ACC_NAME'].setValue(data['acC_NAME']);
this.formData.controls['GRP_ID'].setValue(data['grP_ID']);
this.formData.controls['SUB_GRP_ID'].setValue(data['suB_GRP_ID']);
// this.formData.controls['PARTY_ID'].setValue(data['PARTY_ID']);
this.formData.controls['ACC_ADDRESS'].setValue(data['acC_ADDRESS']);
this.formData.controls['PAN_NO'].setValue(data['paN_NO']);
// this.formData.controls['BANK_BRANCH_ID'].setValue(data['BANK_BRANCH_ID']);
// this.formData.controls['AC_NO'].setValue(data['AC_NO']);
// this.formData.controls['OD_LIMIT'].setValue(data['OD_LIMIT']);
// this.formData.controls['AVERAGE_BAL'].setValue(data['AVERAGE_BAL']);
// this.formData.controls['OPENING_DATE'].setValue(data['OPENING_DATE']);
// this.formData.controls['CLOSING_DATE'].setValue(data['CLOSING_DATE']);
// this.formData.controls['OPENING_BAL'].setValue(data['OPENING_BAL']);
// this.formData.controls['BAL_TYPE'].setValue(data['BAL_TYPE']);
// this.formData.controls['OPERATOR'].setValue(data['OPERATOR']);
// this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
// this.formData.controls['DEFINE'].setValue(data['DEFINE']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

private _fetchGroupData() {
 

  this.requestModel.url = "TBL_GROUP_MASTER?PageNo=" + 1 + "&PageSize=" + 999999 + "&Search=";
  this.anyservice.getStoreList(this.requestModel).subscribe(response => {
    this.groupData = response.document;
  
  });

}

private _fetchSubGroupData() {
 

  this.requestModel.url = "TBL_ACCOUNT_SUB_GROUP_MASTER?PageNo=" + 1 + "&PageSize=" + 999999 + "&Search=";
  this.anyservice.getStoreList(this.requestModel).subscribe(response => {
    this.subgroupData = response.document["records"];
  
  });

}
}
