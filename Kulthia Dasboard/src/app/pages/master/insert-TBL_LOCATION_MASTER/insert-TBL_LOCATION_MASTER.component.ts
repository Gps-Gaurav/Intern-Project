import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { LocationModel } from 'src/app/core/models/location.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_LOCATION_MASTER.component.html',
  styleUrls: ['./insert-TBL_LOCATION_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */

export class InsertTBL_Location_MASTERComponent implements OnInit, AfterViewInit {
 selectedValues: string[] = ['val1','val2'];

  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
 seriesData: LocationModel[]=[];

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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'LOCATION MASTER', active: true }];

    this.formData = this.formBuilder.group({
      LocationCode: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      City: ['', [Validators.required]],
      LocationType: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
      State: ['', [Validators.required]],
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
      let request: LocationModel = <LocationModel>{};

      request.LocationCode = this.formData.get('LocationCode').value;//
      request.Description = this.formData.get('Description').value;//
      request.City = this.formData.get('City').value;//
      request.LocationType = this.formData.get('LocationType').value;//
      request.Address = this.formData.get('Address').value;//
      request.ZipCode = this.formData.get('ZipCode').value;//
      request.State = this.formData.get('State').value;//



      let jsonData: LocationModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_Location_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.code==1){
          this.toastr.success( 'Series Inserted Successfully!','Success!');
          this.router.navigate(['/master/location']);
        }
        else{
          this.toastr.error( 'Series not Added!','Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetLocationMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];

      this.formData.controls['LocationCode'].setValue(data['LocationCode']);
      this.formData.controls['Description'].setValue(data['Description']);
      this.formData.controls['City'].setValue(data['City']);
      this.formData.controls['LocationType'].setValue(data['LocationType']);
      this.formData.controls['Address'].setValue(data['Address'])
      this.formData.controls['ZipCode'].setValue(data['ZipCode']);
      this.formData.controls['State'].setValue(data['State']);
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

