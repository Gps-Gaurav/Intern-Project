

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
import { TBL_ACCOUNT_SUB_GROUP_MASTERModel } from '../TBL_ACCOUNT_SUB_GROUP_MASTER/TBL_ACCOUNT_SUB_GROUP_MASTER.model';
@Component({
  selector: 'app-insert-TBL_ACCOUNT_SUB_GROUP_MASTER',
  templateUrl: './insert-TBL_ACCOUNT_SUB_GROUP_MASTER.component.html',
  styleUrls: ['./insert-TBL_ACCOUNT_SUB_GROUP_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_ACCOUNT_SUB_GROUP_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_ACCOUNT_SUB_GROUP_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ACCOUNT SUB GROUP MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
// ACC_GRP_CODE: ['',],
// ACC_GRP_NAME: ['',],
ACC_SUB_GRP_CODE: ['', [Validators.required]],
ACC_SUB_GRP_NAME: ['', [Validators.required]],
// TYPE: ['',],

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
      let request :TBL_ACCOUNT_SUB_GROUP_MASTERModel = <TBL_ACCOUNT_SUB_GROUP_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
// request.ACC_GRP_CODE = this.formData.get('ACC_GRP_CODE').value;
// request.ACC_GRP_NAME = this.formData.get('ACC_GRP_NAME').value;
request.ACC_SUB_GRP_CODE = this.formData.get('ACC_SUB_GRP_CODE').value;
request.ACC_SUB_GRP_NAME = this.formData.get('ACC_SUB_GRP_NAME').value;
// request.TYPE = this.formData.get('TYPE').value;

     // formData.append('id', this.id.toString());
     request.ID=this.id.toString();
     
     if(this.id>0){
      this.service.update(request,"TBL_ACCOUNT_SUB_GROUP_MASTER/ID?ID="+this.id).subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/account-sub-group-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }    
       
      });
     }
     else
     {
      this.service.add(request,"TBL_ACCOUNT_SUB_GROUP_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/account-sub-group-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
     }


    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_ACCOUNT_SUB_GROUP_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  //  this.formData.controls['ID'].setValue(data['ID']);
// this.formData.controls['ACC_GRP_CODE'].setValue(data['ACC_GRP_CODE']);
// this.formData.controls['ACC_GRP_NAME'].setValue(data['ACC_GRP_NAME']);
this.formData.controls['ACC_SUB_GRP_CODE'].setValue(data['acC_SUB_GRP_CODE']);
this.formData.controls['ACC_SUB_GRP_NAME'].setValue(data['acC_SUB_GRP_NAME']);
// this.formData.controls['TYPE'].setValue(data['TYPE']);

 
 
   
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
