

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
import { TBL_TRANSIT_TIME_MASTERModel } from '../TBL_TRANSIT_TIME_MASTER/TBL_TRANSIT_TIME_MASTER.model';
import { DatePipe } from '@angular/common';
import { TBL_STATION_MASTERModel } from '../TBL_STATION_MASTER/TBL_STATION_MASTER.model';
@Component({
  selector: 'app-insert-TBL_TRANSIT_TIME_MASTER',
  templateUrl: './insert-TBL_TRANSIT_TIME_MASTER.component.html',
  styleUrls: ['./insert-TBL_TRANSIT_TIME_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_TRANSIT_TIME_MASTERComponent implements OnInit,AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_TRANSIT_TIME_MASTERModel>,
  private station_service:ResourceService<TBL_STATION_MASTERModel>,
    private toastr: ToastrService,private router: Router,public datepipe: DatePipe,
   private route: ActivatedRoute) { }
   
  requestModel :RequestModel = <RequestModel>{};
  station :TBL_STATION_MASTERModel[];
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label:'TRANSIT TIME MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
//       // ID: ['', [Validators.required]],
// FROM_CODE: ['', [Validators.required]],
FROM_NAME: [null, [Validators.required]],
// TO_CODE: ['', [Validators.required]],
TO_NAME: [null, [Validators.required]],
TRANSIT_DAYS: ['', [Validators.required]],
DISTANCE: [''],
// ENTERBY: ['', [Validators.required]],
// ENTERDATE: ['', [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
  this._fetchStation();
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_TRANSIT_TIME_MASTERModel = <TBL_TRANSIT_TIME_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
// request.FROM_CODE = this.formData.get('FROM_CODE').value;
request.FROM_NAME = this.formData.get('FROM_NAME').value;
// request.TO_CODE = this.formData.get('TO_CODE').value;
request.TO_NAME = this.formData.get('TO_NAME').value;
request.TRANSIT_DAYS = Number(this.formData.get('TRANSIT_DAYS').value);
request.DISTANCE = Number(this.formData.get('DISTANCE').value);
// request.ENTERBY = this.formData.get('ENTERBY').value;
 request.ENTERDATE = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

     // formData.append('id', this.id.toString());
  
     if(this.id>0){
      this.service.update(request,"TBL_TRANSIT_TIME_MASTER/ID?ID="+this.id).subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/transit-item-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
     }
     else{
      this.service.add(request,"TBL_TRANSIT_TIME_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/transit-item-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_TRANSIT_TIME_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
//    this.formData.controls['ID'].setValue(data['ID']);
// this.formData.controls['FROM_CODE'].setValue(data['FROM_CODE']);
this.formData.controls['FROM_NAME'].setValue(data['froM_NAME']);
// this.formData.controls['TO_CODE'].setValue(data['TO_CODE']);
this.formData.controls['TO_NAME'].setValue(data['tO_NAME']);
this.formData.controls['TRANSIT_DAYS'].setValue(data['transiT_DAYS']);
this.formData.controls['DISTANCE'].setValue(data['distance']);
// this.formData.controls['ENTERBY'].setValue(data['ENTERBY']);
// this.formData.controls['ENTERDATE'].setValue(data['ENTERDATE']);

 
 
   
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

  private _fetchStation() {
    this.requestModel.url = "TBL_STATION_MASTER?PageNo=" + 1 + "&PageSize=" + 999999 + "&Search=";
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.station = response.document;
   
  });

    // this.requestModel.url="SP/sp_app_get_station";
    // this.station_service.postStoreList(this.requestModel).subscribe(response => {
    //  this.station=response.document;
    //  console.log("this.stateData", this.station);
    // });
  }
}
