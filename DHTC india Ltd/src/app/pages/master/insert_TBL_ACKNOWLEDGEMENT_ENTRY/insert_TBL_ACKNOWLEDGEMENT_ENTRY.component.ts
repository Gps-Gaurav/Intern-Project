

 import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { TBL_ACKNOWLEDGEMENT_ENTRYModel } from '../TBL_ACKNOWLEDGEMENT_ENTRY/TBL_ACKNOWLEDGEMENT_ENTRY.model';
import { TBL_BRANCH_MASTERModel } from '../TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
@Component({
  selector: 'app-insert-TBL_ACKNOWLEDGEMENT_ENTRY',
  templateUrl: './insert-TBL_ACKNOWLEDGEMENT_ENTRY.component.html',
  styleUrls: ['./insert-TBL_ACKNOWLEDGEMENT_ENTRY.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_ACKNOWLEDGEMENT_ENTRYComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_ACKNOWLEDGEMENT_ENTRYModel>,
    private toastr: ToastrService,private router: Router,
    private station_service:ResourceService<any>,
   private route: ActivatedRoute) { }
   getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
  requestModel :RequestModel = <RequestModel>{};
  branchData: TBL_BRANCH_MASTERModel[];
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ACKNOWLEDGEMENT ENTRY', active: true }];
 
 this.formData = this.formBuilder.group({
     
LETTER_NO: ['', [Validators.required]],
FROM_BRANCH_CODE: [null, [Validators.required]],

TO_BRANCH_CODE: [null, [Validators.required]],

LETTER_Date: ['', [Validators.required]],
  RECD_Date: ['', [Validators.required]]


    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
  this._fetchBranchData();
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_ACKNOWLEDGEMENT_ENTRYModel = <TBL_ACKNOWLEDGEMENT_ENTRYModel>{};

request.LETTER_NO = this.formData.get('LETTER_NO').value;
request.FROM_BRANCH_CODE = this.formData.get('FROM_BRANCH_CODE').value;

request.TO_BRANCH_CODE = this.formData.get('TO_BRANCH_CODE').value;

request.LETTER_Date = this.formData.get('LETTER_Date').value;
request.RECD_Date = this.formData.get('RECD_Date').value;



     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_ACKNOWLEDGEMENT_ENTRY").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/acknowledgement-entry']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_ACKNOWLEDGEMENT_ENTRY/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['CODE'].setValue(data['CODE']);
this.formData.controls['LETTER_NO'].setValue(data['LETTER_NO']);
this.formData.controls['FROM_BRANCH_CODE'].setValue(data['FROM_BRANCH_CODE']);
this.formData.controls['FROM_BRANCH_NAME'].setValue(data['FROM_BRANCH_NAME']);
this.formData.controls['TO_BRANCH_CODE'].setValue(data['TO_BRANCH_CODE']);
this.formData.controls['TO_BRANCH_NAME'].setValue(data['TO_BRANCH_NAME']);
this.formData.controls['LETTER_Date'].setValue(data['LETTER_Date']);
this.formData.controls['RECD_Date'].setValue(data['RECD_Date']);
this.formData.controls['ENTRY_BY'].setValue(data['ENTRY_BY']);
this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
this.formData.controls['BILTYNO'].setValue(data['BILTYNO']);
this.formData.controls['BILTY_DATE'].setValue(data['BILTY_DATE']);
this.formData.controls['FROM_STATION_CODE'].setValue(data['FROM_STATION_CODE']);
this.formData.controls['FROM_STATION_NAME'].setValue(data['FROM_STATION_NAME']);
this.formData.controls['TO_STATION_CODE'].setValue(data['TO_STATION_CODE']);
this.formData.controls['TO_STATION_NAME'].setValue(data['TO_STATION_NAME']);
this.formData.controls['PKG'].setValue(data['PKG']);
this.formData.controls['CODES'].setValue(data['CODES']);
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

private _fetchBranchData() {  
  this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search=";
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.branchData = response.document; 
  });
}



}
