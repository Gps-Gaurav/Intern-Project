

 import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
 import { FormBuilder, Validators, FormGroup } from '@angular/forms';
 import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 import { RequestModel } from 'src/app/core/models/request.model';
 import { ResourceService } from 'src/app/core/services/resource.service';
 import { BehaviorSubject, Observable } from 'rxjs';
 import { distinctUntilChanged,throttleTime,takeUntil } from 'rxjs/operators';
 import Swal from 'sweetalert2';
 import { ToastrService } from 'ngx-toastr';
 import { ActivatedRoute, ParamMap, Router } from '@angular/router';
 import { TBL_BRANCH_MASTERModel } from '../TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
 import { DatePipe } from '@angular/common';
 import { StateModel } from 'src/app/core/models/state.model';
 @Component({
   selector: 'app-insert-TBL_BRANCH_MASTER',
   templateUrl: './insert-TBL_BRANCH_MASTER.component.html',
   styleUrls: ['./insert-TBL_BRANCH_MASTER.component.scss']
 })
 
 /**
  * Ecomerce Customers component
  */
 export class InsertTBL_BRANCH_MASTERComponent implements OnInit,AfterViewInit {
   @ViewChild("myinput") myInputField: ElementRef;
    constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_BRANCH_MASTERModel>,
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
 
 
   @HostListener('window:keyup', ['$event'])
   keyEvent(event: KeyboardEvent) {
     console.log(event);
     if (event.key === "Tab") {
       let value=this.formData.get('BRANCH_CODE').value;
       console.log("BRANCH_CODE",value)
       if(value.length ==3){
         let request={
           "table_name": "TBL_BRANCH_MASTER",
           "column_name": "BRANCH_CODE",
           "column_value": value
         }
         this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
        
           console.log("response",response);
           if(response.statusMessage=="failed"){
          
             this.formData.controls['BRANCH_CODE'].setErrors({ invalid: 'Branch Code ALREADY Exist' });
             this.myInputField.nativeElement.focus();
             
           }
           else{
          
            
           }
          
          
         });
        
       }
 
       else{
         this.myInputField.nativeElement.focus();
       }
     }
     else if(event.key==="Enter"){
       let value=this.formData.get('BILTYNO').value;
       console.log("BILTYNO",value)
       if(this.id>0){
 
       }else{
       if(value.length ==7){
         let request={
           "table_name": "TBL_BILTY_ENTRY",
           "column_name": "BILTYNO",
           "column_value": value
         }
         this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
        
           console.log("response",response);
           if(response.statusMessage=="failed"){
          
             this.formData.controls['BILTYNO'].setErrors({ invalid: 'BILTY NO ALREADY Exist' });
             this.myInputField.nativeElement.focus();
             
           }
           else{
          
           }
        
         });
        
       }
 
       else{
         this.myInputField.nativeElement.focus();
       }
     }
     }
    
   }
 
 
   ngOnInit() {
     this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BRANCH MASTER', active: true }];
  
    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
 BRANCH_CODE: ['', [Validators.required]],
 BRANCH_NAME: ['', [Validators.required]],
 STATE_CODE: [null, [Validators.required]],
 //STATE_NAME: ['', [Validators.required]],
 MANAGER_NAME: ['', [Validators.required]],
 ADDRESS: ['', [Validators.required]],
 //CITY: ['', [Validators.required]],
 //PIN: ['', [Validators.required]],
 //STD_CODE: ['', [Validators.required]],
 //FAX_NO: ['', [Validators.required]],
 //PHONE_OFFICE: ['', [Validators.required]],
 //PHONE_RESI: ['', [Validators.required]],
 MOBILE: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
 //PAGER: ['', [Validators.required]],
 EMAIL: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
 AGENT_BRANCH: [null, [Validators.required]],
 REGIONAL_BRANCH: ['', [Validators.required]],
 ZONE: [null, [Validators.required]],
 //ADDRESS_OF_REGIONAL_BRANCK: ['', [Validators.required]],
 //CASH_LIMIT: ['', [Validators.required]],
 BANK_LIMIT: ['', [Validators.required]],
 //OPENING_DATE: ['', [Validators.required]],
 //CLOSING_DATE: ['', [Validators.required]],
 //STATION_CODE: ['', [Validators.required]],
 //STATION_NAME: ['', [Validators.required]],
 ESI_DEDUCT: [null, [Validators.required]],
 //SALARY_QUIT: ['', [Validators.required]],
 //SHORTING_GROUP_CODE: ['', [Validators.required]],
 //ENTERBY: ['', [Validators.required]],
 //ENTERDATE: ['', [Validators.required]],
 //ADDRESS2: ['', [Validators.required]],
 
     });
 
     this.route.paramMap.subscribe((params: ParamMap) => {
       this.id = +params.get('id');
       console.log(" this.id", this.id);
       if(this.id>0){
         this._fetchData()
       }
     })
     this.submit = false;
 
     if(this.id==0){
     this.formData.get("BRANCH_CODE").valueChanges.pipe(distinctUntilChanged(),
     throttleTime(50)).
     subscribe(selectedValue => {  
       let value=this.formData.get('BRANCH_CODE').value;
       if(this.id>0){
 
       }else{
       if(value.length ==3){
         let request={
           "table_name": "TBL_BRANCH_MASTER",
           "column_name": "BRANCH_CODE",
           "column_value": selectedValue
         }
         this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
        
           console.log("response",response);
           if(response.statusMessage=="failed"){
          
             this.formData.controls['BRANCH_CODE'].setErrors({ invalid: 'Branch Code Exist' });
           }
           else{
          
            
           }
          
          
         });
        
       }
       }
     })
   
   }
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
       let request :TBL_BRANCH_MASTERModel = <TBL_BRANCH_MASTERModel>{};
 
 request.brancH_CODE = this.formData.get('BRANCH_CODE').value;//
 request.brancH_NAME = this.formData.get('BRANCH_NAME').value;//
 request.STATE_CODE = this.formData.get('STATE_CODE').value;//
 //request.STATE_NAME = this.formData.get('STATE_NAME').value;
 request.MANAGER_NAME = this.formData.get('MANAGER_NAME').value;//
 request.ADDRESS = this.formData.get('ADDRESS').value;//
 //request.CITY = this.formData.get('CITY').value;
 //request.PIN = this.formData.get('PIN').value;
 //request.STD_CODE = this.formData.get('STD_CODE').value;
 //request.FAX_NO = this.formData.get('FAX_NO').value;
 //request.PHONE_OFFICE = this.formData.get('PHONE_OFFICE').value;
 //request.PHONE_RESI = this.formData.get('PHONE_RESI').value;
 request.MOBILE = this.formData.get('MOBILE').value;//
 //request.PAGER = this.formData.get('PAGER').value;
 request.EMAIL = this.formData.get('EMAIL').value;//
 request.AGENT_BRANCH = this.formData.get('AGENT_BRANCH').value;//
 request.REGIONAL_BRANCH = this.formData.get('REGIONAL_BRANCH').value;//
 request.ZONE = this.formData.get('ZONE').value;//
 //request.ADDRESS_OF_REGIONAL_BRANCK = this.formData.get('ADDRESS_OF_REGIONAL_BRANCK').value;
 //request.CASH_LIMIT = this.formData.get('CASH_LIMIT').value;
 request.BANK_LIMIT = Number(this.formData.get('BANK_LIMIT').value);//
 // request.OPENING_DATE = this.formData.get('OPENING_DATE').value;
 // request.CLOSING_DATE = this.formData.get('CLOSING_DATE').value;
 // request.STATION_CODE = this.formData.get('STATION_CODE').value;
 // request.STATION_NAME = this.formData.get('STATION_NAME').value;
 request.ESI_DEDUCT = this.formData.get('ESI_DEDUCT').value;//
 // request.SALARY_QUIT = this.formData.get('SALARY_QUIT').value;
 // request.SHORTING_GROUP_CODE = this.formData.get('SHORTING_GROUP_CODE').value;
 // request.ENTERBY = this.formData.get('ENTERBY').value;
  request.ENTERDATE = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
 // request.ADDRESS2 = this.formData.get('ADDRESS2').value;
 
// request.id=this.id;
 
   if(this.id>0){
     this.service.update(request,"TBL_BRANCH_MASTER/ID?ID="+this.id).subscribe(response => {
        
       console.log("response",response);
       if(response.document>0){
         this.toastr.success( 'Product Inserted Successfully!','Success!');
         this.router.navigate(['/master/branch-master']);
         
       }
       else{
         this.toastr.error( 'Something went wrong!','Error!');
        
       }    
      
     });
   }
   else{
     this.service.add(request,"TBL_BRANCH_MASTER").subscribe(response => {
        
       console.log("response",response);
       if(response.document>0){
         this.toastr.success( 'Product Inserted Successfully!','Success!');
         this.router.navigate(['/master/branch-master']);
         
       }
       else{
         this.toastr.error( 'Something went wrong!','Error!');
        
       }
      
      
     });
   }
      
 
 
  }
 
   
 }
  
  
  
  
  
  private _fetchData() {
    
   this.service.get("TBL_BRANCH_MASTER/id?id="+this.id).subscribe(response => {
    console.log("response",response.items)
    let data=response.items;
    //this.formData.controls['ID'].setValue(data['ID']);
 this.formData.controls['BRANCH_CODE'].setValue(data['brancH_CODE']);
 this.formData.controls['BRANCH_NAME'].setValue(data['brancH_NAME']);
 this.formData.controls['STATE_CODE'].setValue(data['statE_CODE']);
 // this.formData.controls['STATE_NAME'].setValue(data['STATE_NAME']);
  this.formData.controls['MANAGER_NAME'].setValue(data['manageR_NAME']);
  this.formData.controls['ADDRESS'].setValue(data['address']);
 // this.formData.controls['CITY'].setValue(data['CITY']);
 // this.formData.controls['PIN'].setValue(data['PIN']);
 // this.formData.controls['STD_CODE'].setValue(data['STD_CODE']);
 // this.formData.controls['FAX_NO'].setValue(data['FAX_NO']);
 // this.formData.controls['PHONE_OFFICE'].setValue(data['PHONE_OFFICE']);
 // this.formData.controls['PHONE_RESI'].setValue(data['PHONE_RESI']);
  this.formData.controls['MOBILE'].setValue(data['mobile']);
 // this.formData.controls['PAGER'].setValue(data['PAGER']);
 this.formData.controls['EMAIL'].setValue(data['email']);
 this.formData.controls['AGENT_BRANCH'].setValue(data['agenT_BRANCH']);
 this.formData.controls['REGIONAL_BRANCH'].setValue(data['regionaL_BRANCH']);
 this.formData.controls['ZONE'].setValue(data['zone']);
 // this.formData.controls['ADDRESS_OF_REGIONAL_BRANCK'].setValue(data['ADDRESS_OF_REGIONAL_BRANCK']);
 // this.formData.controls['CASH_LIMIT'].setValue(data['CASH_LIMIT']);
 this.formData.controls['BANK_LIMIT'].setValue(data['banK_LIMIT']);
 // this.formData.controls['OPENING_DATE'].setValue(data['OPENING_DATE']);
 // this.formData.controls['CLOSING_DATE'].setValue(data['CLOSING_DATE']);
 // this.formData.controls['STATION_CODE'].setValue(data['STATION_CODE']);
 // this.formData.controls['STATION_NAME'].setValue(data['STATION_NAME']);
 this.formData.controls['ESI_DEDUCT'].setValue(data['esI_DEDUCT']);
 // this.formData.controls['SALARY_QUIT'].setValue(data['SALARY_QUIT']);
 // this.formData.controls['SHORTING_GROUP_CODE'].setValue(data['SHORTING_GROUP_CODE']);
 // this.formData.controls['ENTERBY'].setValue(data['ENTERBY']);
 // this.formData.controls['ENTERDATE'].setValue(data['ENTERDATE']);
 // this.formData.controls['ADDRESS2'].setValue(data['ADDRESS2']);
 
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
    this.stateData=response.items;
    console.log("this.stateData", this.stateData);
   });
 }
 
 ngAfterViewInit() {
   this.myInputField.nativeElement.focus();
   }
 }
 
 