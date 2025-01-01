

 import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { TBL_STATION_MASTERModel } from '../TBL_STATION_MASTER/TBL_STATION_MASTER.model';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
@Component({
  selector: 'app-insert-TBL_STATION_MASTER',
  templateUrl: './insert-TBL_STATION_MASTER.component.html',
  styleUrls: ['./insert-TBL_STATION_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_STATION_MASTERComponent implements OnInit ,AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_STATION_MASTERModel>,
    private toastr: ToastrService,private router: Router,
    private validservice:ResourceService<any>,
   private route: ActivatedRoute,public datepipe: DatePipe, private stateservice:ResourceService<StateModel>) { }
   
  requestModel :RequestModel = <RequestModel>{};
  stateData: StateModel[];
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'STATION MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      //ID: ['', [Validators.required]],
STATION_CODE: ['', [Validators.required]],
STATION_NAME: ['', [Validators.required]],
//CONTROL_BRANCH_CODE: ['', [Validators.required]],
CONTROL_BRANCH_NAME: ['', [Validators.required]],
STATION_TYPE: ['', [Validators.required]],
STATE_CODE: [null, [Validators.required]],
//IN_WHICH_STATE: ['', [Validators.required]],
//DISTANCE: ['', [Validators.required]],
//PARALLEL_CODE: ['', [Validators.required]],
//PARALLEL_NAME: ['', [Validators.required]],
//ENTRY_DATE: ['', [Validators.required]],
//ENTRY_BY: ['', [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
    this._fetchState();
    this.formData.get("STATION_CODE").valueChanges.pipe(distinctUntilChanged()).
    subscribe(selectedValue => {  
      let value=this.formData.get('STATION_CODE').value;
      if(this.id>0){}
      else{
      if(value.length ==3){
        let request={
          "table_name": "TBL_STATION_MASTER",
          "column_name": "STATION_CODE",
          "column_value": value
        }
        this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
       
          console.log("response",response);
          if(response.statusMessage=="failed"){
         
            this.formData.controls['STATION_CODE'].setErrors({ invalid: 'STATION CODE Already Exist' });
          }
          else{
         
           
          }
         
         
        });
       
      }
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
      let request :TBL_STATION_MASTERModel = <TBL_STATION_MASTERModel>{};
//request.ID = this.formData.get('ID').value;
request.STATION_CODE = this.formData.get('STATION_CODE').value;
request.STATION_NAME = this.formData.get('STATION_NAME').value;
//request.CONTROL_BRANCH_CODE = this.formData.get('CONTROL_BRANCH_CODE').value;
request.CONTROL_BRANCH_NAME = this.formData.get('CONTROL_BRANCH_NAME').value;
request.STATION_TYPE = this.formData.get('STATION_TYPE').value;
request.STATE_CODE = this.formData.get('STATE_CODE').value;
//request.IN_WHICH_STATE = this.formData.get('IN_WHICH_STATE').value;
//request.DISTANCE = this.formData.get('DISTANCE').value;
//request.PARALLEL_CODE = this.formData.get('PARALLEL_CODE').value;
//request.PARALLEL_NAME = this.formData.get('PARALLEL_NAME').value;
request.ENTRY_DATE =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
request.ENTRY_BY ="1";
request.ID=this.id.toString();
     // formData.append('id', this.id.toString());
  
     
     if(this.id>0){
      this.service.update(request,"TBL_STATION_MASTER/ID?ID="+this.id).subscribe(response => {
         
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/station-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    else{
      this.service.add(request,"TBL_STATION_MASTER").subscribe(response => {
         
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/station-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    
    
  }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_STATION_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  //  this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['STATION_CODE'].setValue(data['statioN_CODE']);
this.formData.controls['STATION_NAME'].setValue(data['statioN_NAME']);
// this.formData.controls['CONTROL_BRANCH_CODE'].setValue(data['CONTROL_BRANCH_CODE']);
this.formData.controls['CONTROL_BRANCH_NAME'].setValue(data['controL_BRANCH_NAME']);
this.formData.controls['STATION_TYPE'].setValue(data['statioN_TYPE']);
this.formData.controls['STATE_CODE'].setValue(data['statE_CODE']);
// this.formData.controls['IN_WHICH_STATE'].setValue(data['IN_WHICH_STATE']);
// this.formData.controls['DISTANCE'].setValue(data['DISTANCE']);
// this.formData.controls['PARALLEL_CODE'].setValue(data['PARALLEL_CODE']);
// this.formData.controls['PARALLEL_NAME'].setValue(data['PARALLEL_NAME']);
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


private _fetchState() {
  this.requestModel.url="SP/sp_app_get_state";
  this.stateservice.postStoreList(this.requestModel).subscribe(response => {
   this.stateData=response.document;
   console.log("this.stateData", this.stateData);
  });
}
ngAfterViewInit() {
  this.myInputField.nativeElement.focus();
  }
}
