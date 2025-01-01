

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
import { TBL_USER_MASTERModel } from '../TBL_USER_MASTER/TBL_USER_MASTER.model';
@Component({
  selector: 'app-insert-TBL_USER_MASTER',
  templateUrl: './insert-TBL_USER_MASTER.component.html',
  styleUrls: ['./insert-TBL_USER_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_USER_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_USER_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_USER_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      USER_ID: ['', [Validators.required]],
USER_NAME: ['', [Validators.required]],
NAME: ['', [Validators.required]],
PASSWORD: ['', [Validators.required]],
ISACTIVE: ['', [Validators.required]],
LAST_LOGIN_DD_TT: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
USER_TYPE: ['', [Validators.required]],

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
      let request :TBL_USER_MASTERModel = <TBL_USER_MASTERModel>{};
request.USER_ID = this.formData.get('USER_ID').value;
request.USER_NAME = this.formData.get('USER_NAME').value;
request.NAME = this.formData.get('NAME').value;
request.PASSWORD = this.formData.get('PASSWORD').value;
request.ISACTIVE = this.formData.get('ISACTIVE').value;
request.LAST_LOGIN_DD_TT = this.formData.get('LAST_LOGIN_DD_TT').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.USER_TYPE = this.formData.get('USER_TYPE').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_USER_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_USER_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_USER_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['USER_ID'].setValue(data['USER_ID']);
this.formData.controls['USER_NAME'].setValue(data['USER_NAME']);
this.formData.controls['NAME'].setValue(data['NAME']);
this.formData.controls['PASSWORD'].setValue(data['PASSWORD']);
this.formData.controls['ISACTIVE'].setValue(data['ISACTIVE']);
this.formData.controls['LAST_LOGIN_DD_TT'].setValue(data['LAST_LOGIN_DD_TT']);
this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
this.formData.controls['USER_TYPE'].setValue(data['USER_TYPE']);

 
 
   
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
