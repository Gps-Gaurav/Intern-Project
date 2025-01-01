

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
import { TBL_SHORT_CERTIFICATE_ENTRYModel } from '../TBL_SHORT_CERTIFICATE_ENTRY/TBL_SHORT_CERTIFICATE_ENTRY.model';
@Component({
  selector: 'app-insert-TBL_SHORT_CERTIFICATE_ENTRY',
  templateUrl: './insert-TBL_SHORT_CERTIFICATE_ENTRY.component.html',
  styleUrls: ['./insert-TBL_SHORT_CERTIFICATE_ENTRY.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_SHORT_CERTIFICATE_ENTRYComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_SHORT_CERTIFICATE_ENTRYModel>,
    private toastr: ToastrService,private router: Router,
    private station_service:ResourceService<any>,
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
  branchData: TBL_BRANCH_MASTERModel[];
 
  image = '';
  file = '';


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_SHORT_CERTIFICATE_ENTRY', active: true }];
 
 this.formData = this.formBuilder.group({
      CODE: ['', [Validators.required]],
CERTIFICATE_NO: ['', [Validators.required]],

D_Date: ['', [Validators.required]],

ENTRY_DATE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
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
      let request :TBL_SHORT_CERTIFICATE_ENTRYModel = <TBL_SHORT_CERTIFICATE_ENTRYModel>{};
request.CODE = this.formData.get('CODE').value;
request.CERTIFICATE_NO = this.formData.get('CERTIFICATE_NO').value;
//request.FROM_BRANCH_CODE = this.formData.get('FROM_BRANCH_CODE').value;
//request.FROM_BRANCH_NAME = this.formData.get('FROM_BRANCH_NAME').value;
request.D_Date = this.formData.get('D_Date').value;
//request.ENTRY_BY = this.formData.get('ENTRY_BY').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.BILTYNO = this.formData.get('BILTYNO').value;
//request.BILTY_DATE = this.formData.get('BILTY_DATE').value;
// request.FROM_STATION_CODE = this.formData.get('FROM_STATION_CODE').value;
// request.FROM_STATION_NAME = this.formData.get('FROM_STATION_NAME').value;
// request.TO_STATION_CODE = this.formData.get('TO_STATION_CODE').value;
// request.TO_STATION_NAME = this.formData.get('TO_STATION_NAME').value;
// request.PKG = this.formData.get('PKG').value;
// request.BILTY_WT = this.formData.get('BILTY_WT').value;
// request.CODES = this.formData.get('CODES').value;
// request.PARTY_NAME = this.formData.get('PARTY_NAME').value;
// request.PKG_BOOKED = this.formData.get('PKG_BOOKED').value;
// request.DLY_PKG = this.formData.get('DLY_PKG').value;
// request.PKG_SHORT = this.formData.get('PKG_SHORT').value;
// request.PKG_DAMAGE = this.formData.get('PKG_DAMAGE').value;
// request.WT_BOOKED = this.formData.get('WT_BOOKED').value;
// request.DELIVERED_WT = this.formData.get('DELIVERED_WT').value;
// request.WT_SHORT = this.formData.get('WT_SHORT').value;
// request.WT_DAMAGE = this.formData.get('WT_DAMAGE').value;
// request.AMOUNT = this.formData.get('AMOUNT').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_SHORT_CERTIFICATE_ENTRY").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/short-certificate-entry']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_SHORT_CERTIFICATE_ENTRY/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['CODE'].setValue(data['CODE']);
this.formData.controls['CERTIFICATE_NO'].setValue(data['CERTIFICATE_NO']);
this.formData.controls['FROM_BRANCH_CODE'].setValue(data['FROM_BRANCH_CODE']);
this.formData.controls['FROM_BRANCH_NAME'].setValue(data['FROM_BRANCH_NAME']);
this.formData.controls['D_Date'].setValue(data['D_Date']);
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
this.formData.controls['PKG_BOOKED'].setValue(data['PKG_BOOKED']);
this.formData.controls['DLY_PKG'].setValue(data['DLY_PKG']);
this.formData.controls['PKG_SHORT'].setValue(data['PKG_SHORT']);
this.formData.controls['PKG_DAMAGE'].setValue(data['PKG_DAMAGE']);
this.formData.controls['WT_BOOKED'].setValue(data['WT_BOOKED']);
this.formData.controls['DELIVERED_WT'].setValue(data['DELIVERED_WT']);
this.formData.controls['WT_SHORT'].setValue(data['WT_SHORT']);
this.formData.controls['WT_DAMAGE'].setValue(data['WT_DAMAGE']);
this.formData.controls['AMOUNT'].setValue(data['AMOUNT']);

 
 
   
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
