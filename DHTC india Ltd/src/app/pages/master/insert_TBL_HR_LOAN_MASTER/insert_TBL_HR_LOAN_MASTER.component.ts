

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
import { TBL_HR_LOAN_MASTERModel } from '../TBL_HR_LOAN_MASTER/TBL_HR_LOAN_MASTER.model';
@Component({
  selector: 'app-insert-TBL_HR_LOAN_MASTER',
  templateUrl: './insert-TBL_HR_LOAN_MASTER.component.html',
  styleUrls: ['./insert-TBL_HR_LOAN_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_HR_LOAN_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_HR_LOAN_MASTERModel>,
    private toastr: ToastrService,private router: Router,
   private route: ActivatedRoute) { }
   
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_HR_LOAN_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      RNo: ['', [Validators.required]],
ID: ['', [Validators.required]],
TRANS_NO: ['', [Validators.required]],
TRANS_DATE: ['', [Validators.required]],
USER_CODE: ['', [Validators.required]],
USER_NAME: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
LOAN_ISSUE_DATE: ['', [Validators.required]],
LOAN_AMOUNT: ['', [Validators.required]],
NO_OF_MONTHS: ['', [Validators.required]],
MONTHS: ['', [Validators.required]],
YEAR: ['', [Validators.required]],
AMOUNT: ['', [Validators.required]],

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
      let request :TBL_HR_LOAN_MASTERModel = <TBL_HR_LOAN_MASTERModel>{};
request.RNo = this.formData.get('RNo').value;
request.ID = this.formData.get('ID').value;
request.TRANS_NO = this.formData.get('TRANS_NO').value;
request.TRANS_DATE = this.formData.get('TRANS_DATE').value;
request.USER_CODE = this.formData.get('USER_CODE').value;
request.USER_NAME = this.formData.get('USER_NAME').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.LOAN_ISSUE_DATE = this.formData.get('LOAN_ISSUE_DATE').value;
request.LOAN_AMOUNT = this.formData.get('LOAN_AMOUNT').value;
request.NO_OF_MONTHS = this.formData.get('NO_OF_MONTHS').value;
request.MONTHS = this.formData.get('MONTHS').value;
request.YEAR = this.formData.get('YEAR').value;
request.AMOUNT = this.formData.get('AMOUNT').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_HR_LOAN_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_HR_LOAN_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_HR_LOAN_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['RNo'].setValue(data['RNo']);
this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['TRANS_NO'].setValue(data['TRANS_NO']);
this.formData.controls['TRANS_DATE'].setValue(data['TRANS_DATE']);
this.formData.controls['USER_CODE'].setValue(data['USER_CODE']);
this.formData.controls['USER_NAME'].setValue(data['USER_NAME']);
this.formData.controls['BRANCH_CODE'].setValue(data['BRANCH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['LOAN_ISSUE_DATE'].setValue(data['LOAN_ISSUE_DATE']);
this.formData.controls['LOAN_AMOUNT'].setValue(data['LOAN_AMOUNT']);
this.formData.controls['NO_OF_MONTHS'].setValue(data['NO_OF_MONTHS']);
this.formData.controls['MONTHS'].setValue(data['MONTHS']);
this.formData.controls['YEAR'].setValue(data['YEAR']);
this.formData.controls['AMOUNT'].setValue(data['AMOUNT']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
}
