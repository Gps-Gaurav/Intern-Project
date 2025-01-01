

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
import { TBL_MISC_WARE_HOUSE_MASTERModel } from '../TBL_MISC_WARE_HOUSE_MASTER/TBL_MISC_WARE_HOUSE_MASTER.model';
@Component({
  selector: 'app-insert-TBL_MISC_WARE_HOUSE_MASTER',
  templateUrl: './insert-TBL_MISC_WARE_HOUSE_MASTER.component.html',
  styleUrls: ['./insert-TBL_MISC_WARE_HOUSE_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_MISC_WARE_HOUSE_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_MISC_WARE_HOUSE_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_MISC_WARE_HOUSE_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
WARE_HOUSE_CODE: ['', [Validators.required]],
WARE_HOUSE_NAME: ['', [Validators.required]],
LOCATION_ADDRESS: ['', [Validators.required]],
DISTANCE: ['', [Validators.required]],
AGENT_BRANCH: ['', [Validators.required]],
ENTRY_AREA: ['', [Validators.required]],
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
      let request :TBL_MISC_WARE_HOUSE_MASTERModel = <TBL_MISC_WARE_HOUSE_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.WARE_HOUSE_CODE = this.formData.get('WARE_HOUSE_CODE').value;
request.WARE_HOUSE_NAME = this.formData.get('WARE_HOUSE_NAME').value;
request.LOCATION_ADDRESS = this.formData.get('LOCATION_ADDRESS').value;
request.DISTANCE = this.formData.get('DISTANCE').value;
request.AGENT_BRANCH = this.formData.get('AGENT_BRANCH').value;
request.ENTRY_AREA = this.formData.get('ENTRY_AREA').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.ENTRY_BY = this.formData.get('ENTRY_BY').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_MISC_WARE_HOUSE_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_MISC_WARE_HOUSE_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_MISC_WARE_HOUSE_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['WARE_HOUSE_CODE'].setValue(data['WARE_HOUSE_CODE']);
this.formData.controls['WARE_HOUSE_NAME'].setValue(data['WARE_HOUSE_NAME']);
this.formData.controls['LOCATION_ADDRESS'].setValue(data['LOCATION_ADDRESS']);
this.formData.controls['DISTANCE'].setValue(data['DISTANCE']);
this.formData.controls['AGENT_BRANCH'].setValue(data['AGENT_BRANCH']);
this.formData.controls['ENTRY_AREA'].setValue(data['ENTRY_AREA']);
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
