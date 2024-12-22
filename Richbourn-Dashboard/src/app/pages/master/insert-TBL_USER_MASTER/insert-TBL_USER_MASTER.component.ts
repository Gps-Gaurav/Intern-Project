

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
import { UserModel } from 'src/app/core/models/user.model';
import { PartyModel } from 'src/app/core/models/Party.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_USER_MASTER.component.html',
  styleUrls: ['./insert-TBL_USER_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_User_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  colorsData: { name: string; code: string; }[];
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,private auth:LoginService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  UserData: UserModel[]=[];
  RoleData: UserModel[]=[];
  PartyData: PartyModel[] = [];
  CompanyData: UserModel[]=[];

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


      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      company_id: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      role_id: ['', [Validators.required]]

    });

   
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });

    this.formData.get("username").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('username').value.toString();
      
      if(this.id>0){

      }else{
      console.log("Name",value)
      if(value.length >1){
        let request={
          "table_name": "TBL_USER",
          "column_name": "username",
          "column_value": selectedValue
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['username'].setErrors({ invalid: 'Duplicate user Name!' });
         
            this.toastr.error( 'Duplicate user Name!','Error!');
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
      let request: UserModel = <UserModel>{};
      // request.ID=this.id;
      request.username = this.formData.get('username').value;//
      request.password = this.formData.get('password').value;//
      request.company_id = this.formData.get('company_id').value;//
      request.Name = this.formData.get('Name').value;//
      request.role_id = this.formData.get('role_id').value;//

      request.UserID=this.auth.GetUserIdbyToken();
  
      let jsonData: UserModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_UserMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'user Inserted Successfully!','Success!');
          console.log("post product", request);//
          this.router.navigate(['/master/user']);
        }
        else{
         
          this.toastr.error( Response.document.statusMessage,'Error!');
        }
      })

   

    }

  }
  Close(){
    this.router.navigate(['/master/user']);
        
  }
  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetUserMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.UserData= JSON.parse(response.items);
      if(this.UserData.length){
      let data=this.UserData[0];
      this.formData.controls['username'].setValue(data['username']);
      this.formData.controls['password'].setValue(data['password']);
      this.formData.controls['company_id'].setValue(data['company_id']);
      this.formData.controls['Name'].setValue(data['Name']);
     this.formData.controls['role_id'].setValue(data['role_id']);
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
  public _fetchRole(event: any) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetRoleMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    requestModel.ColumnValue = "";

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.RoleData = JSON.parse(response.items);

    });
  }

  public _fetchCompany(event: any) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetCompany_DropdownMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    requestModel.ColumnValue = "";

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.CompanyData = JSON.parse(response.items);

    });
  }
  public _fetchParty(event: any) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetPartyMast_purchase";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    requestModel.ColumnValue = "";

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.PartyData = JSON.parse(response.items);

    });
  }
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
}

