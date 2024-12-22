
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { UnitModel } from 'src/app/core/models/unit.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_UNIT_MASTER.component.html',
  styleUrls: ['./insert-TBL_UNIT_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Unit_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  unitData: UnitModel[] = [];

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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'UNIT  MASTER', active: true }];

    this.formData = this.formBuilder.group({

      ShortName: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Decimal: ['', [Validators.required]],

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

    if (this.formData.valid) {
      let request: UnitModel = <UnitModel>{};

      request.UnitID=this.id;
      request.ShortName = this.formData.get('ShortName').value.toUpperCase();//
      request.Description = this.formData.get('Description').value.toUpperCase();//
      request.Decimal = this.formData.get('Decimal').value;//




      let jsonData: UnitModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_UnitMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.code == 1) {
          this.toastr.success('unit Inserted Successfully!', 'Success!');
          this.router.navigate(['/master/unit']);
        }
        else {
          this.toastr.error('unit not Added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetUnitMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.unitData= JSON.parse(response.items);
      if(this.unitData.length){
      let data=this.unitData[0];

      this.formData.controls['ShortName'].setValue(data['ShortName']);
      this.formData.controls['Description'].setValue(data['Description']);
      this.formData.controls['Decimal'].setValue(data['Decimal']);
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

