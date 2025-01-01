

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
import { TBL_HR_HOLIDAY_MASTERModel } from '../TBL_HR_HOLIDAY_MASTER/TBL_HR_HOLIDAY_MASTER.model';
@Component({
  selector: 'app-insert-TBL_HR_HOLIDAY_MASTER',
  templateUrl: './insert-TBL_HR_HOLIDAY_MASTER.component.html',
  styleUrls: ['./insert-TBL_HR_HOLIDAY_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_HR_HOLIDAY_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_HR_HOLIDAY_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_HR_HOLIDAY_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
YEARS: ['', [Validators.required]],
HOLIDAY_NAME: ['', [Validators.required]],
HOLI_DATE: ['', [Validators.required]],

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
      let request :TBL_HR_HOLIDAY_MASTERModel = <TBL_HR_HOLIDAY_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.YEARS = this.formData.get('YEARS').value;
request.HOLIDAY_NAME = this.formData.get('HOLIDAY_NAME').value;
request.HOLI_DATE = this.formData.get('HOLI_DATE').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_HR_HOLIDAY_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_HR_HOLIDAY_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_HR_HOLIDAY_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['BRANCH_CODE'].setValue(data['BRANCH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['YEARS'].setValue(data['YEARS']);
this.formData.controls['HOLIDAY_NAME'].setValue(data['HOLIDAY_NAME']);
this.formData.controls['HOLI_DATE'].setValue(data['HOLI_DATE']);

 
 
   
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
