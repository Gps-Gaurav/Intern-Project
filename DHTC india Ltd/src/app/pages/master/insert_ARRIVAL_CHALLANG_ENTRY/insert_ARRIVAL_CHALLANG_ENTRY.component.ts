

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
import { TBL_ARRIVAL_CHALLAN_ENTRYModel } from '../ARRIVAL_CHALLAN_ENTRY/TBL_ARRIVAL_CHALLAN_ENTRY.model';
import { TBL_STATION_MASTERModel } from '../TBL_STATION_MASTER/TBL_STATION_MASTER.model';
@Component({
  selector: 'app-insert-ARRIVAL_CHALLANG_ENTRY',
  templateUrl: './insert-ARRIVAL_CHALLANG_ENTRY.component.html',
  styleUrls: ['./insert-ARRIVAL_CHALLANG_ENTRY.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertARRIVAL_CHALLANG_ENTRYComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_ARRIVAL_CHALLAN_ENTRYModel>,
    private toastr: ToastrService,private router: Router,
    private helper:ResourceService<any>,
   private route: ActivatedRoute) { }
   branchData: TBL_BRANCH_MASTERModel[];
   search: string = "";
   stationData: TBL_STATION_MASTERModel[];
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'ARRIVAL_CHALLANG_ENTRY', active: true }];
 
 this.formData = this.formBuilder.group({
CHALLAN_NO: ['', [Validators.required]],
UNLOAD_TERM: [null, [Validators.required]],
DATE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
OTHER: ['', [Validators.required]],

UNLOADING_REMARKS: ['', [Validators.required]],
DETENTION: ['', [Validators.required]],
FFROM: [null, [Validators.required]],
TTO: [null, [Validators.required]],

LESS_ADVANCE: ['', [Validators.required]],




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
  this._fetchStationData();
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_ARRIVAL_CHALLAN_ENTRYModel = <TBL_ARRIVAL_CHALLAN_ENTRYModel>{};

request.CHALLAN_NO = this.formData.get('CHALLAN_NO').value;
request.UNLOAD_TERM = this.formData.get('UNLOAD_TERM').value;
request.DATE = this.formData.get('DATE').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.OTHER = this.formData.get('OTHER').value;


request.FFROM = this.formData.get('FFROM').value;
request.TTO = this.formData.get('TTO').value;
request.UNLOADING_REMARKS = this.formData.get('UNLOADING_REMARKS').value;
request.DETENTION = this.formData.get('DETENTION').value;
request.LESS_ADVANCE = this.formData.get('LESS_ADVANCE').value;


     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"ARRIVAL_CHALLANG_ENTRY").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/arrival-challan']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("ARRIVAL_CHALLANG_ENTRY/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['CHALLAN_NO'].setValue(data['CHALLAN_NO']);
this.formData.controls['DATE'].setValue(data['DATE']);
this.formData.controls['BILTY'].setValue(data['BILTY']);
this.formData.controls['FFROM'].setValue(data['FFROM']);
this.formData.controls['TTO'].setValue(data['TTO']);
this.formData.controls['LOADED_PKG'].setValue(data['LOADED_PKG']);
this.formData.controls['LOADED_PKG_SHT'].setValue(data['LOADED_PKG_SHT']);
this.formData.controls['ARR_PKG_WT'].setValue(data['ARR_PKG_WT']);
this.formData.controls['LOADED_WT'].setValue(data['LOADED_WT']);
this.formData.controls['LOADED_WT_SHT'].setValue(data['LOADED_WT_SHT']);
this.formData.controls['ARR_WT_SHEET'].setValue(data['ARR_WT_SHEET']);
this.formData.controls['UNLOAD_BY_PRTY_GODWN'].setValue(data['UNLOAD_BY_PRTY_GODWN']);
this.formData.controls['REMARKS'].setValue(data['REMARKS']);
this.formData.controls['UNLOAD_TERM'].setValue(data['UNLOAD_TERM']);
this.formData.controls['SWEEPING_SHORTAGE_PKG'].setValue(data['SWEEPING_SHORTAGE_PKG']);
this.formData.controls['SWEEPING_SHORTAGE_WT'].setValue(data['SWEEPING_SHORTAGE_WT']);

 
 
   
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
  this.helper.getStoreList(this.requestModel).subscribe(response => {
    this.branchData = response.document;
   
  });



}

private _fetchStationData() {
   
  this.requestModel.url = "TBL_STATION_MASTER?PageNo=" + 1 + "&PageSize=" + 999999 + "&Search=" + this.search;
  this.helper.getStoreList(this.requestModel).subscribe(response => {
    this.stationData = response.document;
   
  });

}


}
