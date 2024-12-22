
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { UnitRelationModel } from 'src/app/core/models/unitrelation.model';
@Component({
  selector: 'app-insert-TBL_UNIT_RELATION_MASTER',
  templateUrl: './insert-TBL_UNIT_RELATION_MASTER.component.html',
  styleUrls: ['./insert-TBL_UNIT_RELATION_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Unit_Relation_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  unitData: UnitRelationModel[] = [];

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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'UNIT RELATION MASTER', active: true }];

    this.formData = this.formBuilder.group({
      FromUnit: ['', [Validators.required]],
      ToUnit: ['', [Validators.required]],
      ConvFactor: ['', [Validators.required]],


    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
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
    console.log('RAJ')
    if (this.formData.valid) {
      let request: UnitRelationModel = <UnitRelationModel>{};
      request.FromUnitID = this.id;
      request.FromUnit = this.formData.get('FromUnit').value;//
      request.ToUnit = this.formData.get('ToUnit').value;//
      request.ConvFactor = this.formData.get('ConvFactor').value;//
      




      let jsonData: UnitRelationModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_UnitRelMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.code == 1) {
          this.toastr.success('unit Inserted Successfully!', 'Success!');
          this.router.navigate(['/master/unit_relation']);
        }
        else {
          this.toastr.error('unit not Added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }

  }
  public _fetchUnit(event) {
    let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_Get_UnitMast";
  requestModel.pageNo=1;
  requestModel.pageSize=10;
  requestModel.search=event.query;
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.unitData= JSON.parse(response.items);
    
  });   
  }
  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetUnitRelMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.unitData= JSON.parse(response.items);
      if(this.unitData.length){
      let data=this.unitData[0];
      this.formData.controls['FromUnit'].setValue(data['FromUnit']);
      this.formData.controls['ToUnit'].setValue(data['ToUnit']);
      this.formData.controls['ConvFactor'].setValue(data['ConvFactor']);

    }});
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
    // this.myInputField.nativeElement.focus();
  }
}

