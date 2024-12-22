

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
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { ColorsModel } from 'src/app/core/models/colors.model';
import { LoginService } from 'src/app/core/services/authfake.service';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_COLOR_MASTER.component.html',
  styleUrls: ['./insert-TBL_COLOR_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Color_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  colorsData: { name: string; code: string; }[];
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,private auth:LoginService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
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

    this.colorsData = [
      {name: 'Red', code: 'R'},
      {name: 'Green', code: 'G'},
      {name: 'Blue', code: 'BL'},
      {name: 'Black', code: 'BK'},
      {name: 'Yellow', code: 'Y'}
  ];
    
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'COLOR MASTER', active: true }];

    this.formData = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Code: ['', [Validators.required]],
      Color: [''],
      IndexOrder: [''],
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });
    this.formData.get("Color").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(500)).
    subscribe(selectedValue => {  
      let value=this.formData.get('Color').value;
      this.formData.controls['Code'].setValue(value);
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
      let request: ColorsModel = <ColorsModel>{};

      request.ColorName = this.formData.get('Name').value;//
      request.ColorCode = this.formData.get('Code').value;//
      request.IdxOrd = this.formData.get('IndexOrder').value;//
      request.UserID=this.auth.GetUserIdbyToken();
      request.CompName=this.auth.GetCompanybyToken()
      let jsonData: ColorsModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_ColorMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.code==1){
          this.toastr.success( 'Color Inserted Successfully!','Success!');
          console.log("post product", request);//
          this.router.navigate(['/master/color']);
        }
        else{
          this.toastr.error( 'Color not Added!','Error!');
        }
      })

   

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetColorMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.colorData= JSON.parse(response.items);
      if(this.colorData.length){
      let data=this.colorData[0];
      this.formData.controls['Name'].setValue(data['Name']);
      this.formData.controls['Code'].setValue(data['Code']);
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

