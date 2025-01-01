

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
import { TBL_TRUCK_GROUP_MASTERModel } from '../TBL_TRUCK_GROUP_MASTER/TBL_TRUCK_GROUP_MASTER.model';
@Component({
  selector: 'app-insert-TBL_TRUCK_GROUP_MASTER',
  templateUrl: './insert-TBL_TRUCK_GROUP_MASTER.component.html',
  styleUrls: ['./insert-TBL_TRUCK_GROUP_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_TRUCK_GROUP_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_TRUCK_GROUP_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_TRUCK_GROUP_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
TRUCKGROUPCODE: ['', [Validators.required]],
TRUCKGROUPNAME: ['', [Validators.required]],
OWNERNAME: ['', [Validators.required]],
OWNER_TYPE: ['', [Validators.required]],
OWNER_PHONE: ['', [Validators.required]],
PAN_NO: ['', [Validators.required]],
PAN_IMAGES: ['', [Validators.required]],
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

  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_TRUCK_GROUP_MASTERModel = <TBL_TRUCK_GROUP_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.TRUCKGROUPCODE = this.formData.get('TRUCKGROUPCODE').value;
request.TRUCKGROUPNAME = this.formData.get('TRUCKGROUPNAME').value;
request.OWNERNAME = this.formData.get('OWNERNAME').value;
request.OWNER_TYPE = this.formData.get('OWNER_TYPE').value;
request.OWNER_PHONE = this.formData.get('OWNER_PHONE').value;
request.PAN_NO = this.formData.get('PAN_NO').value;
request.PAN_IMAGES = this.formData.get('PAN_IMAGES').value;
request.REMARKS = this.formData.get('REMARKS').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_TRUCK_GROUP_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_TRUCK_GROUP_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_TRUCK_GROUP_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['TRUCKGROUPCODE'].setValue(data['TRUCKGROUPCODE']);
this.formData.controls['TRUCKGROUPNAME'].setValue(data['TRUCKGROUPNAME']);
this.formData.controls['OWNERNAME'].setValue(data['OWNERNAME']);
this.formData.controls['OWNER_TYPE'].setValue(data['OWNER_TYPE']);
this.formData.controls['OWNER_PHONE'].setValue(data['OWNER_PHONE']);
this.formData.controls['PAN_NO'].setValue(data['PAN_NO']);
this.formData.controls['PAN_IMAGES'].setValue(data['PAN_IMAGES']);
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
