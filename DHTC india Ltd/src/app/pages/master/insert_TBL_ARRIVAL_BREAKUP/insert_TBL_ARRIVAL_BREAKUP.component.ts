

 import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { TBL_ARRIVAL_BREAKUPModel } from '../TBL_ARRIVAL_BREAKUP/TBL_ARRIVAL_BREAKUP.model';
@Component({
  selector: 'app-insert-TBL_ARRIVAL_BREAKUP',
  templateUrl: './insert-TBL_ARRIVAL_BREAKUP.component.html',
  styleUrls: ['./insert-TBL_ARRIVAL_BREAKUP.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_ARRIVAL_BREAKUPComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_ARRIVAL_BREAKUPModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_ARRIVAL_BREAKUP', active: true }];
 
 this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
CHALLAN_ID: ['', [Validators.required]],
LOT_NO_BILL: ['', [Validators.required]],
GARDEN_NAME: ['', [Validators.required]],
INVOICE_NO: ['', [Validators.required]],
DELIEVERY_PKG: ['', [Validators.required]],
FRESH_SHORTAGE: ['', [Validators.required]],
BROKEN_SHORTAGE: ['', [Validators.required]],
RETURNSS: ['', [Validators.required]],
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
      let request :TBL_ARRIVAL_BREAKUPModel = <TBL_ARRIVAL_BREAKUPModel>{};
request.ID = this.formData.get('ID').value;
request.CHALLAN_ID = this.formData.get('CHALLAN_ID').value;
request.LOT_NO_BILL = this.formData.get('LOT_NO_BILL').value;
request.GARDEN_NAME = this.formData.get('GARDEN_NAME').value;
request.INVOICE_NO = this.formData.get('INVOICE_NO').value;
request.DELIEVERY_PKG = this.formData.get('DELIEVERY_PKG').value;
request.FRESH_SHORTAGE = this.formData.get('FRESH_SHORTAGE').value;
request.BROKEN_SHORTAGE = this.formData.get('BROKEN_SHORTAGE').value;
request.RETURNSS = this.formData.get('RETURNSS').value;
request.REMARKS = this.formData.get('REMARKS').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_ARRIVAL_BREAKUP").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_ARRIVAL_BREAKUP']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_ARRIVAL_BREAKUP/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['CHALLAN_ID'].setValue(data['CHALLAN_ID']);
this.formData.controls['LOT_NO_BILL'].setValue(data['LOT_NO_BILL']);
this.formData.controls['GARDEN_NAME'].setValue(data['GARDEN_NAME']);
this.formData.controls['INVOICE_NO'].setValue(data['INVOICE_NO']);
this.formData.controls['DELIEVERY_PKG'].setValue(data['DELIEVERY_PKG']);
this.formData.controls['FRESH_SHORTAGE'].setValue(data['FRESH_SHORTAGE']);
this.formData.controls['BROKEN_SHORTAGE'].setValue(data['BROKEN_SHORTAGE']);
this.formData.controls['RETURNSS'].setValue(data['RETURNSS']);
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
