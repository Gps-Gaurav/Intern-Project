

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
import { TBL_FINANCE_IFSC_CODE_MASTERModel } from '../TBL_FINANCE_IFSC_CODE_MASTER/TBL_FINANCE_IFSC_CODE_MASTER.model';
@Component({
  selector: 'app-insert-TBL_FINANCE_IFSC_CODE_MASTER',
  templateUrl: './insert-TBL_FINANCE_IFSC_CODE_MASTER.component.html',
  styleUrls: ['./insert-TBL_FINANCE_IFSC_CODE_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_FINANCE_IFSC_CODE_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_FINANCE_IFSC_CODE_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_FINANCE_IFSC_CODE_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
BANK_NAME: ['', [Validators.required]],
IFSC_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
CITY: ['', [Validators.required]],
STATE: ['', [Validators.required]],

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
      let request :TBL_FINANCE_IFSC_CODE_MASTERModel = <TBL_FINANCE_IFSC_CODE_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.BANK_NAME = this.formData.get('BANK_NAME').value;
request.IFSC_CODE = this.formData.get('IFSC_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.CITY = this.formData.get('CITY').value;
request.STATE = this.formData.get('STATE').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_FINANCE_IFSC_CODE_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_FINANCE_IFSC_CODE_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_FINANCE_IFSC_CODE_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['BANK_NAME'].setValue(data['BANK_NAME']);
this.formData.controls['IFSC_CODE'].setValue(data['IFSC_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['CITY'].setValue(data['CITY']);
this.formData.controls['STATE'].setValue(data['STATE']);

 
 
   
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
