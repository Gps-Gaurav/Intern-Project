

import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, throttleTime, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BRANCH_MASTERModel } from '../TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { LoginService } from 'src/app/core/services/authfake.service';
import { SizeModel } from 'src/app/core/models/Size.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_SIZE_MASTER.component.html',
  styleUrls: ['./insert-TBL_SIZE_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Size_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  colorsData: { name: string; code: string; }[];
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,private auth:LoginService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  SizeData: SizeModel[]=[];
  get form() {
    return this.formData.controls;
  }

  formData: FormGroup;
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

  image = '';
  file = '';

  ngOnInit() {

    
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'COLOR MASTER', active: true }];

    this.formData = this.formBuilder.group({
      SizeName: ['', [Validators.required]]
  
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });

    this.formData.get("SizeName").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('SizeName').value.toString();
      
      if(this.id>0){

      }else{
      console.log("Name",value)
      if(value.length >1){
        let request={
          "table_name": "SizeMast",
          "column_name": "SizeName",
          "column_value": selectedValue
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['SizeName'].setErrors({ invalid: 'Duplicate Size Name!' });
         
            this.toastr.error( 'Duplicate Size Name!','Error!');
            // this.submit = true;
          }
          else{
         
           // this.submit = false;
          }
         
         
        });
       
      }
    }
    });
   // this.submit = false;
  
  }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    if (this.formData.valid) {
      let request: SizeModel = <SizeModel>{};
      request.SlNo=this.id;
      request.SizeName = this.formData.get('SizeName').value.toUpperCase();//
     // request.SizeCode = this.formData.get('SizeCode').value.toUpperCase();//
      request.IdxOrd = "0";//
      request.UserID=this.auth.GetUserIdbyToken();
      request.CompName=this.auth.GetCompanybyToken()
      let jsonData: SizeModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_SizeMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'Color Inserted Successfully!','Success!');
          console.log("post product", request);//
          this.router.navigate(['/master/Size']);
        }
        else{
         
          this.toastr.error( Response.document.statusMessage,'Error!');
        }
      })

   

    }

  }
  Close(){
    this.router.navigate(['/master/Size']);
        
  }
  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetSizeMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.SizeData= JSON.parse(response.items);
      if(this.SizeData.length){
      let data=this.SizeData[0];
      this.formData.controls['SizeName'].setValue(data['SizeName']);
      //this.formData.controls['SizeCode'].setValue(data['SizeCode']);
     // this.formData.controls['IdxOrd'].setValue(data['IdxOrd']);
      }
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
    this.requestModel.url = "SP/sp_app_get_state";
    this.stateservice.postStoreList(this.requestModel).subscribe(response => {
      this.stateData = response.items;
      console.log("this.stateData", this.stateData);
    });
  }

  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
}

