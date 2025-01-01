

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
import { TBL_STATE_MASTERModel } from '../TBL_STATE_MASTER/TBL_STATE_MASTER.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-insert-TBL_STATE_MASTER',
  templateUrl: './insert-TBL_STATE_MASTER.component.html',
  styleUrls: ['./insert-TBL_STATE_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_STATE_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_STATE_MASTERModel>,
    private toastr: ToastrService,private router: Router,
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

 
  image = '';
  file = '';


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_STATE_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
CODE: ['', [Validators.required]],
NAME: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],

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
debugger;
  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_STATE_MASTERModel = <TBL_STATE_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.CODE = this.formData.get('CODE').value;
request.NAME = this.formData.get('NAME').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.ENTRY_DATE = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_STATE_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_STATE_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_STATE_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['CODE'].setValue(data['CODE']);
this.formData.controls['NAME'].setValue(data['NAME']);
this.formData.controls['REMARKS'].setValue(data['REMARKS']);

 
 
   
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
