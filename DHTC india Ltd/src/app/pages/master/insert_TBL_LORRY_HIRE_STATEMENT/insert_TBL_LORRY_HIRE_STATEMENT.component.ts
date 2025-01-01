

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
import { TBL_LORRY_HIRE_STATEMENTModel } from '../TBL_LORRY_HIRE_STATEMENT/TBL_LORRY_HIRE_STATEMENT.model';
import { AuthenticationService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-insert-TBL_LORRY_HIRE_STATEMENT',
  templateUrl: './insert-TBL_LORRY_HIRE_STATEMENT.component.html',
  styleUrls: ['./insert-TBL_LORRY_HIRE_STATEMENT.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_LORRY_HIRE_STATEMENTComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_LORRY_HIRE_STATEMENTModel>,
    private toastr: ToastrService,private router: Router,
    private station_service:ResourceService<any>,
    private auth: AuthenticationService,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_LORRY_HIRE_STATEMENT', active: true }];
 
 this.formData = this.formBuilder.group({
    
BRANCH_CODE: ['', [Validators.required]],

STATEMENT_NO: ['', [Validators.required]],
STATEMENT_DATE: ['', [Validators.required]],

CHALLAN_NO: ['', [Validators.required]],

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
      let request :TBL_LORRY_HIRE_STATEMENTModel = <TBL_LORRY_HIRE_STATEMENTModel>{};

request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;

request.STATEMENT_NO = this.formData.get('STATEMENT_NO').value;
request.STATEMENT_DATE = this.formData.get('STATEMENT_DATE').value;
//console.log("this.auth.currentUser()",this.auth.currentUser())
request.ENTRY_BY = "admin";
request.CHALLAN_NO = this.formData.get('CHALLAN_NO').value;


     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_LORRY_HIRE_STATEMENT").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/lorry-hire-statement']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_LORRY_HIRE_STATEMENT/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['BRANCH_CODE'].setValue(data['BRANCH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['STATEMENT_NO'].setValue(data['STATEMENT_NO']);
this.formData.controls['STATEMENT_DATE'].setValue(data['STATEMENT_DATE']);
this.formData.controls['POSTING_DATE'].setValue(data['POSTING_DATE']);
this.formData.controls['STATEMENT_TOTAL'].setValue(data['STATEMENT_TOTAL']);
this.formData.controls['CASH_TOTAL'].setValue(data['CASH_TOTAL']);
this.formData.controls['CHQ_TOTAL'].setValue(data['CHQ_TOTAL']);
this.formData.controls['IS_CANCEL'].setValue(data['IS_CANCEL']);
this.formData.controls['ENTRY_BY'].setValue(data['ENTRY_BY']);
this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
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

private _fetchBranchData() {  
  this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search=";
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.branchData = response.document; 
  });
}
}
