

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
import { TBL_MISC_GARDEN_MASTERModel } from '../TBL_MISC_GARDEN_MASTER/TBL_MISC_GARDEN_MASTER.model';
@Component({
  selector: 'app-insert-TBL_MISC_GARDEN_MASTER',
  templateUrl: './insert-TBL_MISC_GARDEN_MASTER.component.html',
  styleUrls: ['./insert-TBL_MISC_GARDEN_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_MISC_GARDEN_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_MISC_GARDEN_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_MISC_GARDEN_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
GARDEN_CODE: ['', [Validators.required]],
GARDEN_NAME: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
AGENT_BRANCH: ['', [Validators.required]],
GARDEN: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
ENTRY_BY: ['', [Validators.required]],

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
      let request :TBL_MISC_GARDEN_MASTERModel = <TBL_MISC_GARDEN_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.GARDEN_CODE = this.formData.get('GARDEN_CODE').value;
request.GARDEN_NAME = this.formData.get('GARDEN_NAME').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.AGENT_BRANCH = this.formData.get('AGENT_BRANCH').value;
request.GARDEN = this.formData.get('GARDEN').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.ENTRY_BY = this.formData.get('ENTRY_BY').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_MISC_GARDEN_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_MISC_GARDEN_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_MISC_GARDEN_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['GARDEN_CODE'].setValue(data['GARDEN_CODE']);
this.formData.controls['GARDEN_NAME'].setValue(data['GARDEN_NAME']);
this.formData.controls['ADDRESS'].setValue(data['ADDRESS']);
this.formData.controls['AGENT_BRANCH'].setValue(data['AGENT_BRANCH']);
this.formData.controls['GARDEN'].setValue(data['GARDEN']);
this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
this.formData.controls['ENTRY_BY'].setValue(data['ENTRY_BY']);

 
 
   
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
