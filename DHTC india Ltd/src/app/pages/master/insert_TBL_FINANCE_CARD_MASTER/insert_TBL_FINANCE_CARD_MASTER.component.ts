

 import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged,throttleTime,takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BRANCH_MASTERModel } from '../../master/TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { TBL_FINANCE_CARD_MASTERModel } from '../TBL_FINANCE_CARD_MASTER/TBL_FINANCE_CARD_MASTER.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-insert-TBL_FINANCE_CARD_MASTER',
  templateUrl: './insert-TBL_FINANCE_CARD_MASTER.component.html',
  styleUrls: ['./insert-TBL_FINANCE_CARD_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_FINANCE_CARD_MASTERComponent implements OnInit {
  branchData: TBL_BRANCH_MASTERModel[];
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_FINANCE_CARD_MASTERModel>,
    private toastr: ToastrService,private router: Router,private station_service:ResourceService<any>,
    private validservice:ResourceService<any>,
   private route: ActivatedRoute,public datepipe: DatePipe,) { }
   
  requestModel :RequestModel = <RequestModel>{};
  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
  get form() {
    return this.formData.controls;
  }
 
 formData: FormGroup;
 id:Number=0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  search: string = "";
 
  image = '';
  file = '';


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'CARD MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
BRANCH_CODE: [null, [Validators.required]],
// BRANCH_NAME: ['', [Validators.required]],
CARD_TYPE: [null, [Validators.required]],
CARD_KEY: ['', [Validators.required]],
CARD_NO: ['', [Validators.required]],
VALID_FROM: ['', [Validators.required]],
VALID_TO: ['', [Validators.required]],
PIN: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
// ENTRY_DATE: ['', [Validators.required]],
// ENTRY_BY: ['', [Validators.required]],

    });
    this.formData.get("CARD_NO").valueChanges.pipe(distinctUntilChanged()).
    subscribe(selectedValue => {  
      let value=this.formData.get('CARD_NO').value;
      if(value.length ==16){
        let request={
          "table_name": "TBL_FINANCE_CARD_MASTER",
          "column_name": "CARD_NO",
          "column_value": value
        }
        this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
       
          console.log("response",response);
          if(response.statusMessage=="failed"){
         
            this.formData.controls['CARD_NO'].setErrors({ invalid: 'CARD NO Already Exist' });
          }
          else{
         
           
          }
         
         
        });
       
      }
    
    })
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
      let request :TBL_FINANCE_CARD_MASTERModel = <TBL_FINANCE_CARD_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
// request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.CARD_TYPE = this.formData.get('CARD_TYPE').value;
request.CARD_KEY = this.formData.get('CARD_KEY').value;
request.CARD_NO = this.formData.get('CARD_NO').value;
request.VALID_FROM = this.formData.get('VALID_FROM').value;
request.VALID_TO = this.formData.get('VALID_TO').value;
request.PIN = this.formData.get('PIN').value;
request.REMARKS = this.formData.get('REMARKS').value;
 request.ENTRY_DATE = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
// request.ENTRY_BY = this.formData.get('ENTRY_BY').value;

     // formData.append('id', this.id.toString());
     request.ID=this.id.toString();
     
     if(this.id>0){
      this.service.update(request,"TBL_FINANCE_CARD_MASTER/ID?ID="+this.id).subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/card-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }    
       
      });
     }
     else{

      this.service.add(request,"TBL_FINANCE_CARD_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/card-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
     }
     
 
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_FINANCE_CARD_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  //  this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['BRANCH_CODE'].setValue(data['brancH_CODE']);
// this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['CARD_TYPE'].setValue(data['carD_TYPE']);
this.formData.controls['CARD_KEY'].setValue(data['carD_KEY']);
this.formData.controls['CARD_NO'].setValue(data['carD_NO']);
this.formData.controls['VALID_FROM'].setValue(data['valiD_FROM']);
this.formData.controls['VALID_TO'].setValue(data['valiD_TO']);
this.formData.controls['PIN'].setValue(data['pin']);
this.formData.controls['REMARKS'].setValue(data['remarks']);
// this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
// this.formData.controls['ENTRY_BY'].setValue(data['ENTRY_BY']);

 
 
   
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
    
     
  this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search=" + this.search;
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.branchData = response.document;
   
  });



}

}
