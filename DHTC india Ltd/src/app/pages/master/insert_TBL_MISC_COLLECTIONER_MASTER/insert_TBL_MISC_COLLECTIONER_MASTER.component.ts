

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
import { TBL_MISC_COLLECTIONER_MASTERModel } from '../TBL_MISC_COLLECTIONER_MASTER/TBL_MISC_COLLECTIONER_MASTER.model';
@Component({
  selector: 'app-insert-TBL_MISC_COLLECTIONER_MASTER',
  templateUrl: './insert-TBL_MISC_COLLECTIONER_MASTER.component.html',
  styleUrls: ['./insert-TBL_MISC_COLLECTIONER_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_MISC_COLLECTIONER_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_MISC_COLLECTIONER_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_MISC_COLLECTIONER_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
COLLECTIONER_CODE: ['', [Validators.required]],
COLLECTIONER_NAME: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
ADDRESS1: ['', [Validators.required]],
ADDRESS2: ['', [Validators.required]],
CITY: ['', [Validators.required]],
STATE: ['', [Validators.required]],
PIN_CODE: ['', [Validators.required]],
MOBILE_NO: ['', [Validators.required]],
ACC_CODE: ['', [Validators.required]],

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
      let request :TBL_MISC_COLLECTIONER_MASTERModel = <TBL_MISC_COLLECTIONER_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.COLLECTIONER_CODE = this.formData.get('COLLECTIONER_CODE').value;
request.COLLECTIONER_NAME = this.formData.get('COLLECTIONER_NAME').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.ADDRESS1 = this.formData.get('ADDRESS1').value;
request.ADDRESS2 = this.formData.get('ADDRESS2').value;
request.CITY = this.formData.get('CITY').value;
request.STATE = this.formData.get('STATE').value;
request.PIN_CODE = this.formData.get('PIN_CODE').value;
request.MOBILE_NO = this.formData.get('MOBILE_NO').value;
request.ACC_CODE = this.formData.get('ACC_CODE').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_MISC_COLLECTIONER_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_MISC_COLLECTIONER_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_MISC_COLLECTIONER_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['COLLECTIONER_CODE'].setValue(data['COLLECTIONER_CODE']);
this.formData.controls['COLLECTIONER_NAME'].setValue(data['COLLECTIONER_NAME']);
this.formData.controls['BRANCH_CODE'].setValue(data['BRANCH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['ADDRESS1'].setValue(data['ADDRESS1']);
this.formData.controls['ADDRESS2'].setValue(data['ADDRESS2']);
this.formData.controls['CITY'].setValue(data['CITY']);
this.formData.controls['STATE'].setValue(data['STATE']);
this.formData.controls['PIN_CODE'].setValue(data['PIN_CODE']);
this.formData.controls['MOBILE_NO'].setValue(data['MOBILE_NO']);
this.formData.controls['ACC_CODE'].setValue(data['ACC_CODE']);

 
 
   
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