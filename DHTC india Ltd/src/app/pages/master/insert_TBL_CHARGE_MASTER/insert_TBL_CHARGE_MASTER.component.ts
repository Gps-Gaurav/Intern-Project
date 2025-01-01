

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
import { TBL_CHARGE_MASTERModel } from '../TBL_CHARGE_MASTER/TBL_CHARGE_MASTER.model';
@Component({
  selector: 'app-insert-TBL_CHARGE_MASTER',
  templateUrl: './insert-TBL_CHARGE_MASTER.component.html',
  styleUrls: ['./insert-TBL_CHARGE_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_CHARGE_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_CHARGE_MASTERModel>,
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_CHARGE_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      CODE: ['', [Validators.required]],
ITEMCODE: ['', [Validators.required]],
ITEMNAME: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
mode: ['', [Validators.required]],
loadcharge: ['', [Validators.required]],
unloadcharge: ['', [Validators.required]],
L_PKG_CHARGE: ['', [Validators.required]],
U_PKG_CHARGE: ['', [Validators.required]],
L_WT_CHARGE: ['', [Validators.required]],
U_WT_CHARGE: ['', [Validators.required]],
L_TON_CHARGE: ['', [Validators.required]],
U_TON_CHARGE: ['', [Validators.required]],
L_TRUCK_CH_WT: ['', [Validators.required]],
U_TRUCK_CH_WT: ['', [Validators.required]],
L_TRUCK_LT_WT: ['', [Validators.required]],
U_TRUCK_LT_WT: ['', [Validators.required]],
L_TRUCK_LT_PK: ['', [Validators.required]],
U_TRUCK_LT_PK: ['', [Validators.required]],
L_TRUCK_CH_PK: ['', [Validators.required]],
U_TRUCK_CH_PK: ['', [Validators.required]],
L_MIM_CH: ['', [Validators.required]],
U_MIM_CH: ['', [Validators.required]],
L_TYPE: ['', [Validators.required]],
U_TYPE: ['', [Validators.required]],
L_QTY: ['', [Validators.required]],
U_QTY: ['', [Validators.required]],
ENTER_DATE: ['', [Validators.required]],
ENTER_BY: ['', [Validators.required]],
COVER: ['', [Validators.required]],

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
      let request :TBL_CHARGE_MASTERModel = <TBL_CHARGE_MASTERModel>{};
request.CODE = this.formData.get('CODE').value;
request.ITEMCODE = this.formData.get('ITEMCODE').value;
request.ITEMNAME = this.formData.get('ITEMNAME').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.mode = this.formData.get('mode').value;
request.loadcharge = this.formData.get('loadcharge').value;
request.unloadcharge = this.formData.get('unloadcharge').value;
request.L_PKG_CHARGE = this.formData.get('L_PKG_CHARGE').value;
request.U_PKG_CHARGE = this.formData.get('U_PKG_CHARGE').value;
request.L_WT_CHARGE = this.formData.get('L_WT_CHARGE').value;
request.U_WT_CHARGE = this.formData.get('U_WT_CHARGE').value;
request.L_TON_CHARGE = this.formData.get('L_TON_CHARGE').value;
request.U_TON_CHARGE = this.formData.get('U_TON_CHARGE').value;
request.L_TRUCK_CH_WT = this.formData.get('L_TRUCK_CH_WT').value;
request.U_TRUCK_CH_WT = this.formData.get('U_TRUCK_CH_WT').value;
request.L_TRUCK_LT_WT = this.formData.get('L_TRUCK_LT_WT').value;
request.U_TRUCK_LT_WT = this.formData.get('U_TRUCK_LT_WT').value;
request.L_TRUCK_LT_PK = this.formData.get('L_TRUCK_LT_PK').value;
request.U_TRUCK_LT_PK = this.formData.get('U_TRUCK_LT_PK').value;
request.L_TRUCK_CH_PK = this.formData.get('L_TRUCK_CH_PK').value;
request.U_TRUCK_CH_PK = this.formData.get('U_TRUCK_CH_PK').value;
request.L_MIM_CH = this.formData.get('L_MIM_CH').value;
request.U_MIM_CH = this.formData.get('U_MIM_CH').value;
request.L_TYPE = this.formData.get('L_TYPE').value;
request.U_TYPE = this.formData.get('U_TYPE').value;
request.L_QTY = this.formData.get('L_QTY').value;
request.U_QTY = this.formData.get('U_QTY').value;
request.ENTER_DATE = this.formData.get('ENTER_DATE').value;
request.ENTER_BY = this.formData.get('ENTER_BY').value;
request.COVER = this.formData.get('COVER').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_CHARGE_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_CHARGE_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_CHARGE_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['CODE'].setValue(data['CODE']);
this.formData.controls['ITEMCODE'].setValue(data['ITEMCODE']);
this.formData.controls['ITEMNAME'].setValue(data['ITEMNAME']);
this.formData.controls['BRANCH_CODE'].setValue(data['BRANCH_CODE']);
this.formData.controls['BRANCH_NAME'].setValue(data['BRANCH_NAME']);
this.formData.controls['mode'].setValue(data['mode']);
this.formData.controls['loadcharge'].setValue(data['loadcharge']);
this.formData.controls['unloadcharge'].setValue(data['unloadcharge']);
this.formData.controls['L_PKG_CHARGE'].setValue(data['L_PKG_CHARGE']);
this.formData.controls['U_PKG_CHARGE'].setValue(data['U_PKG_CHARGE']);
this.formData.controls['L_WT_CHARGE'].setValue(data['L_WT_CHARGE']);
this.formData.controls['U_WT_CHARGE'].setValue(data['U_WT_CHARGE']);
this.formData.controls['L_TON_CHARGE'].setValue(data['L_TON_CHARGE']);
this.formData.controls['U_TON_CHARGE'].setValue(data['U_TON_CHARGE']);
this.formData.controls['L_TRUCK_CH_WT'].setValue(data['L_TRUCK_CH_WT']);
this.formData.controls['U_TRUCK_CH_WT'].setValue(data['U_TRUCK_CH_WT']);
this.formData.controls['L_TRUCK_LT_WT'].setValue(data['L_TRUCK_LT_WT']);
this.formData.controls['U_TRUCK_LT_WT'].setValue(data['U_TRUCK_LT_WT']);
this.formData.controls['L_TRUCK_LT_PK'].setValue(data['L_TRUCK_LT_PK']);
this.formData.controls['U_TRUCK_LT_PK'].setValue(data['U_TRUCK_LT_PK']);
this.formData.controls['L_TRUCK_CH_PK'].setValue(data['L_TRUCK_CH_PK']);
this.formData.controls['U_TRUCK_CH_PK'].setValue(data['U_TRUCK_CH_PK']);
this.formData.controls['L_MIM_CH'].setValue(data['L_MIM_CH']);
this.formData.controls['U_MIM_CH'].setValue(data['U_MIM_CH']);
this.formData.controls['L_TYPE'].setValue(data['L_TYPE']);
this.formData.controls['U_TYPE'].setValue(data['U_TYPE']);
this.formData.controls['L_QTY'].setValue(data['L_QTY']);
this.formData.controls['U_QTY'].setValue(data['U_QTY']);
this.formData.controls['ENTER_DATE'].setValue(data['ENTER_DATE']);
this.formData.controls['ENTER_BY'].setValue(data['ENTER_BY']);
this.formData.controls['COVER'].setValue(data['COVER']);

 
 
   
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
