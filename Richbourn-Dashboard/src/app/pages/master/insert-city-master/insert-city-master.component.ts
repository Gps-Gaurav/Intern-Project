

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

import { TabService } from 'src/app/core/helpers/TabService';
import { ColorsModel } from 'src/app/core/models/colors.model';
import { LoginService } from 'src/app/core/services/authfake.service';
import { StateModel } from 'src/app/core/models/state.model';
import { CityModel } from 'src/app/core/models/city.model';
@Component({
  selector: 'app-insert-city-master',
  templateUrl: './insert-city-master.component.html',
  styleUrls: ['./insert-city-master.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertCityMasterComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  colorsData: { name: string; code: string; }[];
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,private auth:LoginService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];

  statefilterData: any[];
  colorData: ColorsModel[]=[];
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

    
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'CITY MASTER', active: true }];

    this.formData = this.formBuilder.group({
      CityName: ['', [Validators.required]],
      StateID: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });

    this.formData.get("CityName").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('CityName').value.toString();
      
      if(this.id>0){

      }else{
      console.log("Name",value)
      if(value.length >1){
        let request={
          "table_name": "CityMaster",
          "column_name": "CityName",
          "column_value": selectedValue
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['CityName'].setErrors({ invalid: 'Duplicate Color Name!' });
         
            this.toastr.error( 'Duplicate Color Name!','Error!');
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
      let request: CityModel = <CityModel>{};
      request.SlNo=this.id;
      request.CityName = this.formData.get('CityName').value;//
      request.StateId = this.formData.get('StateID').value.SlNo;//
     // request.IdxOrd = "0";//
      request.UserID=this.auth.GetUserIdbyToken();
      request.CompName=this.auth.GetCompanybyToken()
      let jsonData: CityModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_CityMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'City Inserted Successfully!','Success!');
          console.log("post product", request);//
          this.router.navigate(['/master/city']);
        }
        else{
         
          this.toastr.error( Response.document.statusMessage,'Error!');
        }
      })

   

    }

  }
  Close(){
    this.router.navigate(['/master/city']);
        
  }
  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetCityMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.colorData= JSON.parse(response.items);
      if(this.colorData.length){
      let data=this.colorData[0];
      this.formData.controls['CityName'].setValue(data['CityName']);
     // this.formData.controls['StateCode'].setValue(data['StateCode']);
      this.formData.controls['StateID'].setValue( {SlNo: data['StateId'], StateName: data['StateName']});
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
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetSateMast_dropdown";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.stateData= JSON.parse(response.items);
   
      
    });
  }
  _fetchStateData(event){
    this.statefilterData=[];
    this.stateData.forEach(element => {
      this.statefilterData.push(element)
    });
  }
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
}

