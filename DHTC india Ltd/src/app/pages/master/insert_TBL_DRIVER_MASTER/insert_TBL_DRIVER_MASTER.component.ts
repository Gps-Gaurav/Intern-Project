

 import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BRANCH_MASTERModel } from '../../master/TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { TBL_DRIVER_MASTERModel } from '../TBL_DRIVER_MASTER/TBL_DRIVER_MASTER.model';
@Component({
  selector: 'app-insert-TBL_DRIVER_MASTER',
  templateUrl: './insert-TBL_DRIVER_MASTER.component.html',
  styleUrls: ['./insert-TBL_DRIVER_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_DRIVER_MASTERComponent implements OnInit ,AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_DRIVER_MASTERModel>,
    private toastr: ToastrService,private router: Router,
   private route: ActivatedRoute) { }
   
  requestModel :RequestModel = <RequestModel>{};
 
  get form() {
    return this.formData.controls;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'DRIVER MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
CODE: ['', [Validators.required]],
NAME: ['', [Validators.required]],
F_NAME: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
LICENCE_NO: ['', [Validators.required]],
LIC_VALID: ['', [Validators.required]],
LIC_ISSUE: ['', [Validators.required]],
PHONE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
OPERATOR: ['', [Validators.required]],
// ENTRY_DATE: ['', [Validators.required]],

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
      let request :TBL_DRIVER_MASTERModel = <TBL_DRIVER_MASTERModel>{};
 request.ID =this.id.toString();
request.CODE = this.formData.get('CODE').value;
request.NAME = this.formData.get('NAME').value;
request.F_NAME = this.formData.get('F_NAME').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.LICENCE_NO = this.formData.get('LICENCE_NO').value;
request.LIC_VALID = this.formData.get('LIC_VALID').value;
request.LIC_ISSUE = this.formData.get('LIC_ISSUE').value;
request.PHONE = this.formData.get('PHONE').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.OPERATOR = this.formData.get('OPERATOR').value;
// request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;

request.ID=this.id.toString();
  
     if(this.id>0){
      this.service.update(request,"TBL_DRIVER_MASTER/ID?ID="+this.id).subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/driver-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
     }
     else{
      this.service.add(request,"TBL_DRIVER_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/driver-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_DRIVER_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  // this.formData.controls['ID'].setValue(data['primary_Id']);
this.formData.controls['CODE'].setValue(data['code']);
this.formData.controls['NAME'].setValue(data['name']);
this.formData.controls['F_NAME'].setValue(data['f_NAME']);
this.formData.controls['ADDRESS'].setValue(data['address']);
this.formData.controls['LICENCE_NO'].setValue(data['licencE_NO']);
this.formData.controls['LIC_VALID'].setValue(data['liC_VALID']);
this.formData.controls['LIC_ISSUE'].setValue(data['liC_ISSUE']);
this.formData.controls['PHONE'].setValue(data['phone']);
this.formData.controls['REMARKS'].setValue(data['remarks']);
this.formData.controls['OPERATOR'].setValue(data['operator']);
this.formData.controls['ENTRY_DATE'].setValue(data['entrY_DATE']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
ngAfterViewInit() {
  this.myInputField.nativeElement.focus();
  }
}
