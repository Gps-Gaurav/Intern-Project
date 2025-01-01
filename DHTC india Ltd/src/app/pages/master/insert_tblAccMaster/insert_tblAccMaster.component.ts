

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
import { TblAccMasterModel } from '../TblAccMaster/tblAccMaster.model';
@Component({
  selector: 'app-insert-tblAccMaster',
  templateUrl: './insert-tblAccMaster.component.html',
  styleUrls: ['./insert-tblAccMaster.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTblAccMasterComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TblAccMasterModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TblAccMaster', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
VDATE: ['', [Validators.required]],
VOUCHER_NO: ['', [Validators.required]],
VTYPE: ['', [Validators.required]],

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
      let request :TblAccMasterModel = <TblAccMasterModel>{};
request.ID = this.formData.get('ID').value;
request.VDATE = this.formData.get('VDATE').value;
request.VOUCHER_NO = this.formData.get('VOUCHER_NO').value;
request.VTYPE = this.formData.get('VTYPE').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TblAccMaster").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TblAccMaster']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TblAccMaster/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['VDATE'].setValue(data['VDATE']);
this.formData.controls['VOUCHER_NO'].setValue(data['VOUCHER_NO']);
this.formData.controls['VTYPE'].setValue(data['VTYPE']);

 
 
   
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
