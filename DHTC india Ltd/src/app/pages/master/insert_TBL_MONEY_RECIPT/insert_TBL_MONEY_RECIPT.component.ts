

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
import { TBL_MONEY_RECIPTModel } from '../TBL_MONEY_RECIPT/TBL_MONEY_RECIPT.model';
@Component({
  selector: 'app-insert-TBL_MONEY_RECIPT',
  templateUrl: './insert-TBL_MONEY_RECIPT.component.html',
  styleUrls: ['./insert-TBL_MONEY_RECIPT.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_MONEY_RECIPTComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_MONEY_RECIPTModel>,
    private toastr: ToastrService,private router: Router,
    private station_service:ResourceService<any>,
   private route: ActivatedRoute) { }
   
  requestModel :RequestModel = <RequestModel>{};
 
  get form() {
    return this.formData.controls;
  }
  branchData: TBL_BRANCH_MASTERModel[];
 formData: FormGroup;
 id:Number=0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

 
  image = '';
  file = '';


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_MONEY_RECIPT', active: true }];
 
 this.formData = this.formBuilder.group({
    
BRANCH_CODE: ['', [Validators.required]],

MR_DATE: ['', [Validators.required]],
RECD_FROM: ['', [Validators.required]],
AC_CODE: ['', [Validators.required]],
ON_AC_ADJUST: ['', [Validators.required]],
CASH_AMT: ['', [Validators.required]],
BANK_NAME: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
TDS: ['', [Validators.required]],
TDS_PER: ['', [Validators.required]],
TDS_DEDUCT: ['', [Validators.required]],





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

  this.formData.get("TDS_PER").valueChanges.subscribe(selectedValue => {

    console.log('address changed')
    console.log(selectedValue)
    let TDS_DEDUCT=Number(this.formData.get('TDS_DEDUCT').value);
    if(TDS_DEDUCT>0){

      this.formData.controls['TDS'].setValue(selectedValue*TDS_DEDUCT/100);
    }
  
  })
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_MONEY_RECIPTModel = <TBL_MONEY_RECIPTModel>{};

request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.RECD_FROM = this.formData.get('RECD_FROM').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.MR_DATE = this.formData.get('MR_DATE').value;
request.TDS =this.formData.get('TDS').value.toString();
request.TDS_PER = Number(this.formData.get('TDS_PER').value);
request.TDS_DEDUCT = this.formData.get('TDS_DEDUCT').value;
request.AC_CODE = this.formData.get('AC_CODE').value;
request.ON_AC_ADJUST = this.formData.get('ON_AC_ADJUST').value;
request.CASH_AMT = Number(this.formData.get('CASH_AMT').value);
request.BANK_NAME = this.formData.get('BANK_NAME').value;






     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_MONEY_RECIPT").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/money-recipt']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_MONEY_RECIPT/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['BRANCH_CODE'].setValue(data['BRANCH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['MR_NO'].setValue(data['MR_NO']);
this.formData.controls['MR_DATE'].setValue(data['MR_DATE']);
this.formData.controls['POSTING_DATE'].setValue(data['POSTING_DATE']);
this.formData.controls['STATEMENT_NO'].setValue(data['STATEMENT_NO']);
this.formData.controls['CLIAM'].setValue(data['CLIAM']);
this.formData.controls['TOTAL'].setValue(data['TOTAL']);
this.formData.controls['BANK_CODE'].setValue(data['BANK_CODE']);
this.formData.controls['CASH_AMT'].setValue(data['CASH_AMT']);
this.formData.controls['ON_AC_ADJUST'].setValue(data['ON_AC_ADJUST']);
this.formData.controls['CHQ_AMT'].setValue(data['CHQ_AMT']);
this.formData.controls['MR_TOTAL'].setValue(data['MR_TOTAL']);
this.formData.controls['CHQ_NO'].setValue(data['CHQ_NO']);
this.formData.controls['RECD_FROM'].setValue(data['RECD_FROM']);
this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
this.formData.controls['SHORT_EXCESS'].setValue(data['SHORT_EXCESS']);
this.formData.controls['TDS'].setValue(data['TDS']);
this.formData.controls['TDS_PER'].setValue(data['TDS_PER']);
this.formData.controls['TDS_DEDUCT'].setValue(data['TDS_DEDUCT']);
this.formData.controls['LATE_DELIVERY'].setValue(data['LATE_DELIVERY']);
this.formData.controls['BANK_NAME'].setValue(data['BANK_NAME']);
this.formData.controls['AC_CODE'].setValue(data['AC_CODE']);
this.formData.controls['TV_NO'].setValue(data['TV_NO']);
this.formData.controls['FINYR'].setValue(data['FINYR']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
calculate(event): boolean {
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
