

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
import { TBL_MODULE_DETAILS_MASTERModel } from '../TBL_MODULE_DETAILS_MASTER/TBL_MODULE_DETAILS_MASTER.model';
@Component({
  selector: 'app-insert-TBL_MODULE_DETAILS_MASTER',
  templateUrl: './insert-TBL_MODULE_DETAILS_MASTER.component.html',
  styleUrls: ['./insert-TBL_MODULE_DETAILS_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_MODULE_DETAILS_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_MODULE_DETAILS_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_MODULE_DETAILS_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
USER_CODE: ['', [Validators.required]],
USER_NAME: ['', [Validators.required]],
MODULE_NAME: ['', [Validators.required]],
FORMS_NAME: ['', [Validators.required]],
CAT: ['', [Validators.required]],
ADD_ENTRY: ['', [Validators.required]],
EDIT_ENTRY: ['', [Validators.required]],
DELETE_ENTRY: ['', [Validators.required]],
VIEW_DATA: ['', [Validators.required]],
VIEW_FORM: ['', [Validators.required]],
FROM_DATE: ['', [Validators.required]],
TO_DATE: ['', [Validators.required]],
ADD_DAYS_BEFORE: ['', [Validators.required]],
ADD_DAYS_AFTER: ['', [Validators.required]],
EDIT_DAYS_BEFORE: ['', [Validators.required]],
EDIT_DAYS_AFTER: ['', [Validators.required]],

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
      let request :TBL_MODULE_DETAILS_MASTERModel = <TBL_MODULE_DETAILS_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.USER_CODE = this.formData.get('USER_CODE').value;
request.USER_NAME = this.formData.get('USER_NAME').value;
request.MODULE_NAME = this.formData.get('MODULE_NAME').value;
request.FORMS_NAME = this.formData.get('FORMS_NAME').value;
request.CAT = this.formData.get('CAT').value;
request.ADD_ENTRY = this.formData.get('ADD_ENTRY').value;
request.EDIT_ENTRY = this.formData.get('EDIT_ENTRY').value;
request.DELETE_ENTRY = this.formData.get('DELETE_ENTRY').value;
request.VIEW_DATA = this.formData.get('VIEW_DATA').value;
request.VIEW_FORM = this.formData.get('VIEW_FORM').value;
request.FROM_DATE = this.formData.get('FROM_DATE').value;
request.TO_DATE = this.formData.get('TO_DATE').value;
request.ADD_DAYS_BEFORE = this.formData.get('ADD_DAYS_BEFORE').value;
request.ADD_DAYS_AFTER = this.formData.get('ADD_DAYS_AFTER').value;
request.EDIT_DAYS_BEFORE = this.formData.get('EDIT_DAYS_BEFORE').value;
request.EDIT_DAYS_AFTER = this.formData.get('EDIT_DAYS_AFTER').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_MODULE_DETAILS_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_MODULE_DETAILS_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_MODULE_DETAILS_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['USER_CODE'].setValue(data['USER_CODE']);
this.formData.controls['USER_NAME'].setValue(data['USER_NAME']);
this.formData.controls['MODULE_NAME'].setValue(data['MODULE_NAME']);
this.formData.controls['FORMS_NAME'].setValue(data['FORMS_NAME']);
this.formData.controls['CAT'].setValue(data['CAT']);
this.formData.controls['ADD_ENTRY'].setValue(data['ADD_ENTRY']);
this.formData.controls['EDIT_ENTRY'].setValue(data['EDIT_ENTRY']);
this.formData.controls['DELETE_ENTRY'].setValue(data['DELETE_ENTRY']);
this.formData.controls['VIEW_DATA'].setValue(data['VIEW_DATA']);
this.formData.controls['VIEW_FORM'].setValue(data['VIEW_FORM']);
this.formData.controls['FROM_DATE'].setValue(data['FROM_DATE']);
this.formData.controls['TO_DATE'].setValue(data['TO_DATE']);
this.formData.controls['ADD_DAYS_BEFORE'].setValue(data['ADD_DAYS_BEFORE']);
this.formData.controls['ADD_DAYS_AFTER'].setValue(data['ADD_DAYS_AFTER']);
this.formData.controls['EDIT_DAYS_BEFORE'].setValue(data['EDIT_DAYS_BEFORE']);
this.formData.controls['EDIT_DAYS_AFTER'].setValue(data['EDIT_DAYS_AFTER']);

 
 
   
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
