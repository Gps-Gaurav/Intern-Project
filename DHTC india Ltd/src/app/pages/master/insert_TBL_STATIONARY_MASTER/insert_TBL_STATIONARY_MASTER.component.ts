

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
import { TBL_STATIONARY_MASTERModel } from '../TBL_STATIONARY_MASTER/TBL_STATIONARY_MASTER.model';
@Component({
  selector: 'app-insert-TBL_STATIONARY_MASTER',
  templateUrl: './insert-TBL_STATIONARY_MASTER.component.html',
  styleUrls: ['./insert-TBL_STATIONARY_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_STATIONARY_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_STATIONARY_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_STATIONARY_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
SLNO: ['', [Validators.required]],
TYPE: ['', [Validators.required]],
FROM_RANGE: ['', [Validators.required]],
TO_RANGE: ['', [Validators.required]],

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
      let request :TBL_STATIONARY_MASTERModel = <TBL_STATIONARY_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.SLNO = this.formData.get('SLNO').value;
request.TYPE = this.formData.get('TYPE').value;
request.FROM_RANGE = this.formData.get('FROM_RANGE').value;
request.TO_RANGE = this.formData.get('TO_RANGE').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_STATIONARY_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_STATIONARY_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_STATIONARY_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['SLNO'].setValue(data['SLNO']);
this.formData.controls['TYPE'].setValue(data['TYPE']);
this.formData.controls['FROM_RANGE'].setValue(data['FROM_RANGE']);
this.formData.controls['TO_RANGE'].setValue(data['TO_RANGE']);

 
 
   
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
