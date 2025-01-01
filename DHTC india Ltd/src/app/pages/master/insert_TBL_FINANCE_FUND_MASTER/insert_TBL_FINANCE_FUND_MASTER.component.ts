

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
import { TBL_FINANCE_FUND_MASTERModel } from '../TBL_FINANCE_FUND_MASTER/TBL_FINANCE_FUND_MASTER.model';
import { DatePipe } from '@angular/common';
import { distinctUntilChanged,throttleTime,takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-insert-TBL_FINANCE_FUND_MASTER',
  templateUrl: './insert-TBL_FINANCE_FUND_MASTER.component.html',
  styleUrls: ['./insert-TBL_FINANCE_FUND_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_FINANCE_FUND_MASTERComponent implements OnInit {
  branchData: TBL_BRANCH_MASTERModel[];
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_FINANCE_FUND_MASTERModel>,
    private toastr: ToastrService,private router: Router,private station_service:ResourceService<any>,
    private validservice:ResourceService<any>,
   private route: ActivatedRoute,public datepipe: DatePipe) { }
   
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
  search: string = "";
 
  image = '';
  file = '';


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'FUND MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
ACC_NO: ['', [Validators.required]],
ACC_TYPE: [null, [Validators.required]],
BENIFICERY_NAME: ['', [Validators.required]],
BRANCH_CODE: [null, [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
BANK_NAME: ['', [Validators.required]],
IFSC_CODE: ['', [Validators.required]],
// ADDRESS: ['', [Validators.required]],
EMAIL: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
MOBILE: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
CITY: ['', [Validators.required]],
LEDGER_CODE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
// ENTRY_DATE: ['', [Validators.required]],
// ENTRY_BY: ['', [Validators.required]],

    });
    this.formData.get("ACC_NO").valueChanges.pipe(distinctUntilChanged()).
    subscribe(selectedValue => {  
      let value=this.formData.get('ACC_NO').value;
      if(value.length>=10){
        let request={
          "table_name": "TBL_FINANCE_FUND_MASTER",
          "column_name": "ACC_NO",
          "column_value": value
        }
        this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
       
          console.log("response",response);
          if(response.statusMessage=="failed"){
         
            this.formData.controls['ACC_NO'].setErrors({ invalid: 'ACC NO Already Exist' });
          }
          else{
         
           
          }
         
         
        });
       
      }
    
    })
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
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_FINANCE_FUND_MASTERModel = <TBL_FINANCE_FUND_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
request.ACC_NO = this.formData.get('ACC_NO').value;
request.ACC_TYPE = this.formData.get('ACC_TYPE').value;
request.BENIFICERY_NAME = this.formData.get('BENIFICERY_NAME').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.BANK_NAME = this.formData.get('BANK_NAME').value;
request.IFSC_CODE = this.formData.get('IFSC_CODE').value;
// request.ADDRESS = this.formData.get('ADDRESS').value;
request.EMAIL = this.formData.get('EMAIL').value;
request.MOBILE = this.formData.get('MOBILE').value;
request.CITY = this.formData.get('CITY').value;
request.LEDGER_CODE = this.formData.get('LEDGER_CODE').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.ENTRY_DATE = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
// request.ENTRY_BY = this.formData.get('ENTRY_BY').value;

     // formData.append('id', this.id.toString());
     request.ID=this.id.toString();
     if(this.id>0){
      this.service.update(request,"TBL_FINANCE_FUND_MASTER/ID?ID="+this.id).subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/fund-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }    
       
      });

     }
     else
     {
      this.service.add(request,"TBL_FINANCE_FUND_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/fund-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
     }
     
     
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_FINANCE_FUND_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  //  this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['ACC_NO'].setValue(data['acC_NO']);
this.formData.controls['ACC_TYPE'].setValue(data['acC_TYPE']);
this.formData.controls['BENIFICERY_NAME'].setValue(data['benificerY_NAME']);
this.formData.controls['BRANCH_CODE'].setValue(data['brancH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['brancH_NAME']);
this.formData.controls['BANK_NAME'].setValue(data['banK_NAME']);
this.formData.controls['IFSC_CODE'].setValue(data['ifsC_CODE']);
// this.formData.controls['ADDRESS'].setValue(data['ADDRESS']);
this.formData.controls['EMAIL'].setValue(data['email']);
this.formData.controls['MOBILE'].setValue(data['mobile']);
this.formData.controls['CITY'].setValue(data['city']);
this.formData.controls['LEDGER_CODE'].setValue(data['ledgeR_CODE']);
this.formData.controls['REMARKS'].setValue(data['remarks']);
// this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
// this.formData.controls['ENTRY_BY'].setValue(data['ENTRY_BY']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

private _fetchBranchData() {
    
     
  this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search=" + this.search;
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.branchData = response.document;
   
  });



}

}
