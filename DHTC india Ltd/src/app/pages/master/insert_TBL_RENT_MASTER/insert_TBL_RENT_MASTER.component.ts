

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
import { TBL_RENT_MASTERModel } from '../TBL_RENT_MASTER/TBL_RENT_MASTER.model';
@Component({
  selector: 'app-insert-TBL_RENT_MASTER',
  templateUrl: './insert-TBL_RENT_MASTER.component.html',
  styleUrls: ['./insert-TBL_RENT_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_RENT_MASTERComponent implements OnInit ,AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_RENT_MASTERModel>,
  private branch_service:ResourceService<TBL_BRANCH_MASTERModel>,
    private toastr: ToastrService,private router: Router,
   private route: ActivatedRoute) { }
   
  requestModel :RequestModel = <RequestModel>{};
  branchData:TBL_BRANCH_MASTERModel[];
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
  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'RENT MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
CODE: ['', [Validators.required]],
//BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: [null, [Validators.required]],
// TYPE: ['', [Validators.required]],
// AREA: ['', [Validators.required]],
NAME: ['', [Validators.required]],
LANDLORD_NAME: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
CITY: ['', [Validators.required]],
PIN: ['', [Validators.required]],
RENT: ['', [Validators.required]],
OCCUPIED_FROM: ['', [Validators.required]],
VACATE_DATE: ['', [Validators.required]],
// PRV_AMOUNT: ['', [Validators.required]],
FROM_DATE: ['', [Validators.required]],
// TO_DATE: ['', [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
  this._fetchBranch();
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_RENT_MASTERModel = <TBL_RENT_MASTERModel>{};
//request.ID = this.formData.get('ID').value;
request.CODE = this.formData.get('CODE').value;
//request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
//request.TYPE = this.formData.get('TYPE').value;
////request.AREA = this.formData.get('AREA').value;
request.NAME = this.formData.get('NAME').value;
request.LANDLORD_NAME = this.formData.get('LANDLORD_NAME').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.CITY = this.formData.get('CITY').value;
request.PIN = this.formData.get('PIN').value;
request.RENT = Number(this.formData.get('RENT').value);
request.OCCUPIED_FROM = this.formData.get('OCCUPIED_FROM').value;
request.VACATE_DATE = this.formData.get('VACATE_DATE').value;
//request.PRV_AMOUNT = this.formData.get('PRV_AMOUNT').value;
request.FROM_DATE = this.formData.get('FROM_DATE').value;
//request.TO_DATE = this.formData.get('TO_DATE').value;

     // formData.append('id', this.id.toString());
  
     if(this.id>0){
      this.service.update(request,"TBL_RENT_MASTER/ID?ID="+this.id).subscribe(response => {
         
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/rent-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    else{
      this.service.add(request,"TBL_RENT_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/rent-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    }

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_RENT_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  // this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['CODE'].setValue(data['code']);
//this.formData.controls['BRANCH_CODE'].setValue(data['BRANCH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['brancH_NAME']);
// this.formData.controls['TYPE'].setValue(data['TYPE']);
// this.formData.controls['AREA'].setValue(data['AREA']);
this.formData.controls['NAME'].setValue(data['name']);
this.formData.controls['LANDLORD_NAME'].setValue(data['landlorD_NAME']);
this.formData.controls['ADDRESS'].setValue(data['address']);
this.formData.controls['CITY'].setValue(data['city']);
this.formData.controls['PIN'].setValue(data['pin']);
this.formData.controls['RENT'].setValue(data['rent']);
this.formData.controls['OCCUPIED_FROM'].setValue(data['occupieD_FROM']);
this.formData.controls['VACATE_DATE'].setValue(data['vacatE_DATE']);
//this.formData.controls['PRV_AMOUNT'].setValue(data['PRV_AMOUNT']);
this.formData.controls['FROM_DATE'].setValue(data['froM_DATE']);
//this.formData.controls['TO_DATE'].setValue(data['TO_DATE']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}


private _fetchBranch() {
  this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search=" ;
  this.branch_service.getStoreList(this.requestModel).subscribe(response => {
    this.branchData = response.document;
  // this.requestModel.url="SP/sp_app_get_branch";
  // this.branch_service.postStoreList(this.requestModel).subscribe(response => {
  //  this.branchData=response.document;
  //  console.log("this.stateData", this.branchData);
   });
}
ngAfterViewInit() {
  this.myInputField.nativeElement.focus();
  }
}
