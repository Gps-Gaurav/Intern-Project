

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
import { TBL_GROUP_MASTERModel } from '../TBL_GROUP_MASTER/TBL_GROUP_MASTER.model';
import { StateModel } from '../../common/state.model';
@Component({
  selector: 'app-insert-TBL_GROUP_MASTER',
  templateUrl: './insert-TBL_GROUP_MASTER.component.html',
  styleUrls: ['./insert-TBL_GROUP_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_GROUP_MASTERComponent implements OnInit ,AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_GROUP_MASTERModel>,
    private toastr: ToastrService,private router: Router,
   private route: ActivatedRoute, private stateservice:ResourceService<StateModel>) { }
   
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'GROUP MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
GROUP_CODE: ['', [Validators.required]],
GROUP_NAME: ['', [Validators.required]],
CONTACT_PERSON: [''],
ADDRESS: [''],
CITY: [''],
// PIN: ['', [Validators.required]],
STATE: [null],
// PHONE_OFFICE: ['', [Validators.required]],
// PHONE_RESIDENCE: ['', [Validators.required]],
MOBILE: ['',[Validators.pattern('[0-9]{10}')]],
// FAX: ['', [Validators.required]],
EMAIL: ['',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
GROUP_TYPE: ['', [Validators.required]],
// IS_CONTACT_GROUP: ['', [Validators.required]],
// HAMAIL_TERM: ['', [Validators.required]],
// HAMAIL_REMARKS: ['', [Validators.required]],
// UNLOAD_TERM: ['', [Validators.required]],
// UNLOAD_REMARKS: ['', [Validators.required]],
// ENTRY_DATE: ['', [Validators.required]],
// ENTER_BY: ['', [Validators.required]],

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
  
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_GROUP_MASTERModel = <TBL_GROUP_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
request.GROUP_CODE = this.formData.get('GROUP_CODE').value;
request.GROUP_NAME = this.formData.get('GROUP_NAME').value;
request.CONTACT_PERSON = this.formData.get('CONTACT_PERSON').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.CITY = this.formData.get('CITY').value;
// request.PIN = this.formData.get('PIN').value;
request.STATE = this.formData.get('STATE').value;
// request.PHONE_OFFICE = this.formData.get('PHONE_OFFICE').value;
// request.PHONE_RESIDENCE = this.formData.get('PHONE_RESIDENCE').value;
request.MOBILE = this.formData.get('MOBILE').value;
// request.FAX = this.formData.get('FAX').value;
request.EMAIL = this.formData.get('EMAIL').value;
request.GROUP_TYPE = this.formData.get('GROUP_TYPE').value;
// request.IS_CONTACT_GROUP = this.formData.get('IS_CONTACT_GROUP').value;
// request.HAMAIL_TERM = this.formData.get('HAMAIL_TERM').value;
// request.HAMAIL_REMARKS = this.formData.get('HAMAIL_REMARKS').value;
// request.UNLOAD_TERM = this.formData.get('UNLOAD_TERM').value;
// request.UNLOAD_REMARKS = this.formData.get('UNLOAD_REMARKS').value;
// request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
// request.ENTER_BY = this.formData.get('ENTER_BY').value;

     // formData.append('id', this.id.toString());
  

     request.ID=this.id.toString();

     if(this.id>0){
       this.service.update(request,"TBL_GROUP_MASTER/ID?ID="+this.id).subscribe(response => {
          
         console.log("response",response);
         if(response.document>0){
           this.toastr.success( 'Product Inserted Successfully!','Success!');
           this.router.navigate(['/master/group-master']);
           
         }
         else{
           this.toastr.error( 'Something went wrong!','Error!');
          
         }
        
        
       });
     }
     else{
       this.service.add(request,"TBL_GROUP_MASTER").subscribe(response => {
          
         console.log("response",response);
         if(response.document>0){
           this.toastr.success( 'Product Inserted Successfully!','Success!');
           this.router.navigate(['/master/group-master']);
           
         }
         else{
           this.toastr.error( 'Something went wrong!','Error!');
          
         }
        
        
       });
     }
        


     
      // this.service.add(request,"TBL_GROUP_MASTER").subscribe(response => {
       
      //   console.log("response",response);
      //   if(response.document>0){
      //     this.toastr.success( 'Product Inserted Successfully!','Success!');
      //     this.router.navigate(['/admin/TBL_GROUP_MASTER']);
          
      //   }
      //   else{
      //     this.toastr.error( 'Something went wrong!','Error!');
         
      //   }
       
       
      // });





    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_GROUP_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  //  this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['GROUP_CODE'].setValue(data['grouP_CODE']);
this.formData.controls['GROUP_NAME'].setValue(data['grouP_NAME']);
this.formData.controls['CONTACT_PERSON'].setValue(data['contacT_PERSON']);
this.formData.controls['ADDRESS'].setValue(data['address']);
this.formData.controls['CITY'].setValue(data['city']);
// this.formData.controls['PIN'].setValue(data['PIN']);
this.formData.controls['STATE'].setValue(data['state']);
// this.formData.controls['PHONE_OFFICE'].setValue(data['PHONE_OFFICE']);
// this.formData.controls['PHONE_RESIDENCE'].setValue(data['PHONE_RESIDENCE']);
this.formData.controls['MOBILE'].setValue(data['mobile']);
// this.formData.controls['FAX'].setValue(data['FAX']);
this.formData.controls['EMAIL'].setValue(data['email']);
this.formData.controls['GROUP_TYPE'].setValue(data['grouP_TYPE']);
// this.formData.controls['IS_CONTACT_GROUP'].setValue(data['IS_CONTACT_GROUP']);
// this.formData.controls['HAMAIL_TERM'].setValue(data['HAMAIL_TERM']);
// this.formData.controls['HAMAIL_REMARKS'].setValue(data['HAMAIL_REMARKS']);
// this.formData.controls['UNLOAD_TERM'].setValue(data['UNLOAD_TERM']);
// this.formData.controls['UNLOAD_REMARKS'].setValue(data['UNLOAD_REMARKS']);
// this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
// this.formData.controls['ENTER_BY'].setValue(data['ENTER_BY']);

 
 
   
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
