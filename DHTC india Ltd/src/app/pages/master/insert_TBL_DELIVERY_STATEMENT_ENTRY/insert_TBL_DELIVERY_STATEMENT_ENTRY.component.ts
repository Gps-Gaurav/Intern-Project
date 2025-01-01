

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
import { TBL_DELIVERY_STATEMENT_ENTRYModel } from '../TBL_DELIVERY_STATEMENT_ENTRY/TBL_DELIVERY_STATEMENT_ENTRY.model';
@Component({
  selector: 'app-insert-TBL_DELIVERY_STATEMENT_ENTRY',
  templateUrl: './insert-TBL_DELIVERY_STATEMENT_ENTRY.component.html',
  styleUrls: ['./insert-TBL_DELIVERY_STATEMENT_ENTRY.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_DELIVERY_STATEMENT_ENTRYComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_DELIVERY_STATEMENT_ENTRYModel>,
    private toastr: ToastrService,private router: Router,
    private station_service:ResourceService<any>,
   private route: ActivatedRoute) { }
   
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_DELIVERY_STATEMENT_ENTRY', active: true }];
 
 this.formData = this.formBuilder.group({
      CODE: ['', [Validators.required]],
    DELIVERY_NO: ['', [Validators.required]],
    D_Date: ['', [Validators.required]],
    REMARKS: ['', [Validators.required]],
    CNCL: ['', [Validators.required]],
    ENTRY_DATE: ['', [Validators.required]],
    BILTYNO: ['', [Validators.required]],



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
      let request :TBL_DELIVERY_STATEMENT_ENTRYModel = <TBL_DELIVERY_STATEMENT_ENTRYModel>{};
request.CODE = this.formData.get('CODE').value;
request.DELIVERY_NO = this.formData.get('DELIVERY_NO').value;

request.D_Date = this.formData.get('D_Date').value;
request.CNCL = this.formData.get('CNCL').value;

request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.BILTYNO = this.formData.get('BILTYNO').value;


     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_DELIVERY_STATEMENT_ENTRY").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/delivery-statement-entry']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_DELIVERY_STATEMENT_ENTRY/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['CODE'].setValue(data['CODE']);
this.formData.controls['DELIVERY_NO'].setValue(data['DELIVERY_NO']);
this.formData.controls['FROM_BRANCH_CODE'].setValue(data['FROM_BRANCH_CODE']);
this.formData.controls['FROM_BRANCH_NAME'].setValue(data['FROM_BRANCH_NAME']);
this.formData.controls['D_Date'].setValue(data['D_Date']);
this.formData.controls['CNCL'].setValue(data['CNCL']);
this.formData.controls['ENTRY_BY'].setValue(data['ENTRY_BY']);
this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
this.formData.controls['REMARKS'].setValue(data['REMARKS']);
this.formData.controls['BILTYNO'].setValue(data['BILTYNO']);
this.formData.controls['BILTY_DATE'].setValue(data['BILTY_DATE']);
this.formData.controls['FROM_STATION_CODE'].setValue(data['FROM_STATION_CODE']);
this.formData.controls['FROM_STATION_NAME'].setValue(data['FROM_STATION_NAME']);
this.formData.controls['TO_STATION_CODE'].setValue(data['TO_STATION_CODE']);
this.formData.controls['TO_STATION_NAME'].setValue(data['TO_STATION_NAME']);
this.formData.controls['PKG'].setValue(data['PKG']);
this.formData.controls['BILTY_WT'].setValue(data['BILTY_WT']);
this.formData.controls['CODES'].setValue(data['CODES']);
this.formData.controls['PARTY_NAME'].setValue(data['PARTY_NAME']);
this.formData.controls['SHORT_PKG'].setValue(data['SHORT_PKG']);
this.formData.controls['DLY_PKG'].setValue(data['DLY_PKG']);
this.formData.controls['SHORT_WT'].setValue(data['SHORT_WT']);
this.formData.controls['BROKEN_WT'].setValue(data['BROKEN_WT']);
this.formData.controls['FRESH_WT'].setValue(data['FRESH_WT']);
this.formData.controls['RETURN_PKG'].setValue(data['RETURN_PKG']);
this.formData.controls['RETURN_WT'].setValue(data['RETURN_WT']);
this.formData.controls['REJECT_WT'].setValue(data['REJECT_WT']);
this.formData.controls['FRESH_PKG'].setValue(data['FRESH_PKG']);

 
 
   
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
