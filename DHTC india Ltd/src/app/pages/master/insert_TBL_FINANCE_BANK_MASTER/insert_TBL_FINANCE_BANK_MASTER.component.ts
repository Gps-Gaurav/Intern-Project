

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
import { TBL_FINANCE_BANK_MASTERModel } from '../TBL_FINANCE_BANK_MASTER/TBL_FINANCE_BANK_MASTER.model';
@Component({
  selector: 'app-insert-TBL_FINANCE_BANK_MASTER',
  templateUrl: './insert-TBL_FINANCE_BANK_MASTER.component.html',
  styleUrls: ['./insert-TBL_FINANCE_BANK_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_FINANCE_BANK_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_FINANCE_BANK_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BANK ACCOUNT MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
BRANCH_CODE: [null, [Validators.required]],
// BRANCH_NAME: ['', [Validators.required]],
BANK_CODE: ['', [Validators.required]],
// BANK: ['', [Validators.required]],
PRINT_RPT: ['', [Validators.required]],
BANK_NAME: ['', [Validators.required]],
// OD_LIMIT: ['', [Validators.required]],
// AVERAGE_BAL: ['', [Validators.required]],
// OPEN_DATE: ['', [Validators.required]],
// CLOSING_DATE: ['', [Validators.required]],
 ACC_NO: ['', [Validators.required]],

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
      let request :TBL_FINANCE_BANK_MASTERModel = <TBL_FINANCE_BANK_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
// request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.BANK_CODE = this.formData.get('BANK_CODE').value;
// request.BANK = this.formData.get('BANK').value;
request.PRINT_RPT = this.formData.get('PRINT_RPT').value;
request.BANK_NAME = this.formData.get('BANK_NAME').value;
// request.OD_LIMIT = this.formData.get('OD_LIMIT').value;
// request.AVERAGE_BAL = this.formData.get('AVERAGE_BAL').value;
// request.OPEN_DATE = this.formData.get('OPEN_DATE').value;
// request.CLOSING_DATE = this.formData.get('CLOSING_DATE').value;
request.ACC_NO = this.formData.get('ACC_NO').value;

     // formData.append('id', this.id.toString());
     request.ID=this.id.toString();
     if(this.id>0){
      this.service.update(request,"TBL_FINANCE_BANK_MASTER/ID?ID="+this.id).subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/bank-account-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }    
       
      });
     }
     else
     {
      this.service.add(request,"TBL_FINANCE_BANK_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/bank-account-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });


     }
     
 

}
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_FINANCE_BANK_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  //  this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['BRANCH_CODE'].setValue(data['brancH_CODE']);
// this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['BANK_CODE'].setValue(data['banK_CODE']);
// this.formData.controls['BANK'].setValue(data['BANK']);
this.formData.controls['PRINT_RPT'].setValue(data['prinT_RPT']);
this.formData.controls['BANK_NAME'].setValue(data['banK_NAME']);
// this.formData.controls['OD_LIMIT'].setValue(data['OD_LIMIT']);
// this.formData.controls['AVERAGE_BAL'].setValue(data['AVERAGE_BAL']);
// this.formData.controls['OPEN_DATE'].setValue(data['OPEN_DATE']);
// this.formData.controls['CLOSING_DATE'].setValue(data['CLOSING_DATE']);
this.formData.controls['ACC_NO'].setValue(data['acC_NO']);

 
 
   
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
