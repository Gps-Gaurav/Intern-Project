

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
import { TBL_PARTY_MASTERModel } from '../TBL_PARTY_MASTER/TBL_PARTY_MASTER.model';
import { StateModel } from '../../common/state.model';

@Component({
  selector: 'app-insert-TBL_PARTY_MASTER',
  templateUrl: './insert-TBL_PARTY_MASTER.component.html',
  styleUrls: ['./insert-TBL_PARTY_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_PARTY_MASTERComponent implements OnInit,AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_PARTY_MASTERModel>,
    private toastr: ToastrService,private router: Router,
    private station_service:ResourceService<any>,
    private validservice:ResourceService<any>,
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

  branchData: TBL_BRANCH_MASTERModel[];
  image = '';
  file = '';


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'PARTY MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      //ID: ['', [Validators.required]],
BRANCH_AGENT_CODE: [null, [Validators.required]],
//BRANCH_AGENT_NAME: ['', [Validators.required]],
PARTY_CODE: ['', [Validators.required]],
PARTY_NAME: [''],
//GROUP_CODE: ['', [Validators.required]],
GROUP_NAME: [''],
ADDRESS: [''],
CITY: ['', [Validators.required]],
PIN: ['', [Validators.required]],
//STATE: ['', [Validators.required]],
CONTACT_PERSON: [''],
//PHONE_OFFICE: ['', [Validators.required]],
//PHONE_RESIDENCE: ['', [Validators.required]],
MOBILE: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
//FAX: ['', [Validators.required]],
EMAIL: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
PARTY_TYPE: [''],
//OPERATOR: ['', [Validators.required]],
//ENTRY_DATE: ['', [Validators.required]],
PAYMENT_DAY: [''],
//INSURANCE: ['', [Validators.required]],
//INS_FROM_DATE: ['', [Validators.required]],
//INS_TO_DATE: ['', [Validators.required]],
//CST_NO: ['', [Validators.required]],
//DATE: ['', [Validators.required]],
//VAT: ['', [Validators.required]],
RISK: [null],
//SERVICE_TAX: ['', [Validators.required]],
SERVICE_TAX_BY: [null],
//PARTY_REG_NO: ['', [Validators.required]],
//PAYMODE: ['', [Validators.required]],
//BILLEDAT: ['', [Validators.required]],
ADDRESS2: [''],
PANNO: ['', [Validators.required, Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')]],
//GST1: ['', [Validators.required]],
//GST2: ['', [Validators.required]],
//GST3: ['', [Validators.required]],
GSTNO: ['', [Validators.required,Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]],
//TANNO: ['', [Validators.required]],
STATE_CODE: [null, [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
    this.formData.get("PANNO").valueChanges.pipe(distinctUntilChanged()).
    subscribe(selectedValue => {  

      let value=this.formData.get('PANNO').value;
      if(this.id>0){

      }else{
      if(value.length ==10){
        let request={
          "table_name": "TBL_PARTY_MASTER",
          "column_name": "PANNO",
          "column_value": value
        }
        this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
       
          console.log("response",response);
          if(response.statusMessage=="failed"){
         
            this.formData.controls['PANNO'].setErrors({ invalid: 'PANNO Already Exist' });
          }
          else{
         
           
          }
         
         
        });
       
      }
      }
    });
    this.formData.get("PARTY_CODE").valueChanges.pipe(distinctUntilChanged()).
    subscribe(selectedValue => {  

      let value=this.formData.get('PARTY_CODE').value;
      if(this.id>0){

      }else{
      if(value.length ==6){
        let request={
          "table_name": "TBL_PARTY_MASTER",
          "column_name": "PARTY_CODE",
          "column_value": value
        }
        this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
       
          console.log("response",response);
          if(response.statusMessage=="failed"){
         
            this.formData.controls['PARTY_CODE'].setErrors({ invalid: 'PARTY CODE Already Exist' });
          }
          else{
         
           
          }
         
         
        });
       
      }
      }
    })
    this._fetchState();
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
      let request :TBL_PARTY_MASTERModel = <TBL_PARTY_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
 request.BRANCH_AGENT_CODE = this.formData.get('BRANCH_AGENT_CODE').value;
// request.BRANCH_AGENT_NAME = this.formData.get('BRANCH_AGENT_NAME').value;
 request.PARTY_CODE = this.formData.get('PARTY_CODE').value;
 request.PARTY_NAME = this.formData.get('PARTY_NAME').value;
// request.GROUP_CODE = this.formData.get('GROUP_CODE').value;
request.GROUP_NAME = this.formData.get('GROUP_NAME').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.CITY = this.formData.get('CITY').value;
request.PIN = this.formData.get('PIN').value;
//request.STATE = this.formData.get('STATE').value;
request.CONTACT_PERSON = this.formData.get('CONTACT_PERSON').value;
// request.PHONE_OFFICE = this.formData.get('PHONE_OFFICE').value;
// request.PHONE_RESIDENCE = this.formData.get('PHONE_RESIDENCE').value;
request.MOBILE = this.formData.get('MOBILE').value;
// request.FAX = this.formData.get('FAX').value;
 request.EMAIL = this.formData.get('EMAIL').value;
request.PARTY_TYPE = this.formData.get('PARTY_TYPE').value;
// request.OPERATOR = this.formData.get('OPERATOR').value;
// request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
 request.PAYMENT_DAY = this.formData.get('PAYMENT_DAY').value;
// request.INSURANCE = this.formData.get('INSURANCE').value;
// request.INS_FROM_DATE = this.formData.get('INS_FROM_DATE').value;
// request.INS_TO_DATE = this.formData.get('INS_TO_DATE').value;
// request.CST_NO = this.formData.get('CST_NO').value;
// request.DATE = this.formData.get('DATE').value;
// request.VAT = this.formData.get('VAT').value;
request.RISK = this.formData.get('RISK').value;
// request.SERVICE_TAX = this.formData.get('SERVICE_TAX').value;
request.SERVICE_TAX_BY = this.formData.get('SERVICE_TAX_BY').value;
// request.PARTY_REG_NO = this.formData.get('PARTY_REG_NO').value;
// request.PAYMODE = this.formData.get('PAYMODE').value;
// request.BILLEDAT = this.formData.get('BILLEDAT').value;
 request.ADDRESS2 = this.formData.get('ADDRESS2').value;
 request.PANNO = this.formData.get('PANNO').value;
// request.GST1 = this.formData.get('GST1').value;
// request.GST2 = this.formData.get('GST2').value;
// request.GST3 = this.formData.get('GST3').value;
request.GSTNO = this.formData.get('GSTNO').value;
// request.TANNO = this.formData.get('TANNO').value;
request.STATE_CODE = this.formData.get('STATE_CODE').value;


request.ID=this.id.toString();
     // formData.append('id', this.id.toString()); 
     
     if(this.id>0){
      this.service.update(request,"TBL_PARTY_MASTER/ID?ID="+this.id).subscribe(response => {
         
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/party-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    else{
      this.service.add(request,"TBL_PARTY_MASTER").subscribe(response => {
         
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/party-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }

    
  }

}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_PARTY_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   //this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['BRANCH_AGENT_CODE'].setValue(data['brancH_AGENT_CODE']);
//this.formData.controls['BRANCH_AGENT_NAME'].setValue(data['BRANCH_AGENT_NAME']);
this.formData.controls['PARTY_CODE'].setValue(data['partY_CODE']);
this.formData.controls['PARTY_NAME'].setValue(data['partY_NAME']);
//this.formData.controls['GROUP_CODE'].setValue(data['GROUP_CODE']);
this.formData.controls['GROUP_NAME'].setValue(data['grouP_NAME']);
this.formData.controls['ADDRESS'].setValue(data['address']);
this.formData.controls['CITY'].setValue(data['city']);
this.formData.controls['PIN'].setValue(data['pin']);
//this.formData.controls['STATE'].setValue(data['STATE']);
this.formData.controls['CONTACT_PERSON'].setValue(data['contacT_PERSON']);
//this.formData.controls['PHONE_OFFICE'].setValue(data['PHONE_OFFICE']);
//this.formData.controls['PHONE_RESIDENCE'].setValue(data['PHONE_RESIDENCE']);
this.formData.controls['MOBILE'].setValue(data['mobile']);
//this.formData.controls['FAX'].setValue(data['FAX']);
this.formData.controls['EMAIL'].setValue(data['email']);
this.formData.controls['PARTY_TYPE'].setValue(data['partY_TYPE']);
//this.formData.controls['OPERATOR'].setValue(data['OPERATOR']);
//this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
this.formData.controls['PAYMENT_DAY'].setValue(data['paymenT_DAY']);
// this.formData.controls['INSURANCE'].setValue(data['INSURANCE']);
// this.formData.controls['INS_FROM_DATE'].setValue(data['INS_FROM_DATE']);
// this.formData.controls['INS_TO_DATE'].setValue(data['INS_TO_DATE']);
// this.formData.controls['CST_NO'].setValue(data['CST_NO']);
// this.formData.controls['DATE'].setValue(data['DATE']);
// this.formData.controls['VAT'].setValue(data['VAT']);
this.formData.controls['RISK'].setValue(data['risk']);
//this.formData.controls['SERVICE_TAX'].setValue(data['SERVICE_TAX']);
this.formData.controls['SERVICE_TAX_BY'].setValue(data['servicE_TAX_BY']);
// this.formData.controls['PARTY_REG_NO'].setValue(data['PARTY_REG_NO']);
// this.formData.controls['PAYMODE'].setValue(data['PAYMODE']);
// this.formData.controls['BILLEDAT'].setValue(data['BILLEDAT']);
this.formData.controls['ADDRESS2'].setValue(data['address2']);
this.formData.controls['PANNO'].setValue(data['panno']);
// this.formData.controls['GST1'].setValue(data['GST1']);
// this.formData.controls['GST2'].setValue(data['GST2']);
// this.formData.controls['GST3'].setValue(data['GST3']);
this.formData.controls['GSTNO'].setValue(data['gstno']);
//this.formData.controls['TANNO'].setValue(data['TANNO']);
this.formData.controls['STATE_CODE'].setValue(data['statE_CODE']);

 
 
   
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
private _fetchBranchData() {
    
     
  this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search=";
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.branchData = response.document;
   
  });
}
ngAfterViewInit() {
  this.myInputField.nativeElement.focus();
  }
}
