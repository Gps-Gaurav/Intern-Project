import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { TabService } from 'src/app/core/helpers/TabService';
import { LocationModel } from 'src/app/core/models/location.model';
import { throttleTime } from 'rxjs/internal/operators/throttleTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { StateModel } from 'src/app/core/models/state.model';
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
  selectedValues: string[] = ['val1', 'val2'];

  @ViewChild("myinput") myInputField: ElementRef;
  cities: { name: string; code: string; }[];
  states: any[];
  LocationData: any[];
  StateId = 0;
  CountryId = 0;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
  seriesData: LocationModel[] = [];
  cityData: any[] = [];
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
      Location: ['', [Validators.required]],
      Description: [''],
      City: ['', [Validators.required]],
      LocationType: ['', [Validators.required]],
      Address: [''],
      Country: [''],
      Zip: [''],
      State: [''],
      Email: [''],
      Telephone: [''],
      Contact: ['']
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    })

    this.formData.get("Location").valueChanges.pipe(distinctUntilChanged(),
      throttleTime(50)).
      subscribe(selectedValue => {
        let value = this.formData.get('Location').value;
        console.log("Location", value)
        if (this.id > 0) {

        } else {

          if (value > 0) {
            let request = {
              "table_name": "LocationMast",
              "column_name": "Location",
              "column_value": value.toString()
            }
            this.validservice.CheckData(request).subscribe(response => {

              console.log("response", response);
              if (response.document.statusMessage === "failed") {

                this.formData.controls['Location'].setErrors({ invalid: 'Location Already Exist!' });

                this.toastr.error('Location Already Exist!', 'Error!');
                this.submit = true;
              }
              else {

                this.submit = false;
              }


            });

          }
        }
      });
    this.submit = false;
  }
  Close(){
    this.router.navigate(['/master/location']);
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
      request.SlNo=this.id;
      request.Location = this.formData.get('Location').value;//
      request.Description = this.formData.get('Description').value;//
      request.CityID = this.formData.get('City').value.SlNo;//
      request.LocationType = this.formData.get('LocationType').value.name;//
      request.Address = this.formData.get('Address').value;//
      request.Zip = this.formData.get('Zip').value;//
      request.State = this.StateId.toString();
      request.Country = this.CountryId.toString();
      request.Email = this.formData.get('Email').value;//
      request.Contact = this.formData.get('Contact').value;//
      request.Telephone = this.formData.get('Telephone').value;//



      let jsonData: LocationModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_LocationMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.code == 1) {
          this.toastr.success('Location Inserted Successfully!', 'Success!');
          this.router.navigate(['/master/location']);
        }
        else {
          this.toastr.error('Location not Added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetLocationMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData = JSON.parse(response.items);
      if (this.seriesData.length) {
        let data = this.seriesData[0];

        this.formData.controls['Location'].setValue(data['Location']);
        this.formData.controls['Description'].setValue(data['Description']);
       // this.formData.controls['City'].setValue(data['City']);
        this.formData.controls['City'].setValue( {SlNo: data['CityID'], CityName: data['CityName']});
        this.formData.controls['LocationType'].setValue(data['LocationType']);
        this.formData.controls['LocationType'].setValue( {name: data['LocationType'], code: data['LocationType']});
        this.formData.controls['Address'].setValue(data['Address'])
        this.formData.controls['Zip'].setValue(data['Zip']);
        this.formData.controls['State'].setValue(data['StateName']);
        this.formData.controls['Country'].setValue(data['CountryName']);
        this.formData.controls['Email '].setValue(data['Email ']);
        this.formData.controls['Contact'].setValue(data['Contact']);
        this.formData.controls['Telephone'].setValue(data['Telephone']);
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
  public _fetchLocation(event) {
    this.LocationData = [];
    this.LocationData = [
      { name: 'Shop', code: 'S' },
      { name: 'Godown', code: 'G' },
      { name: 'OTHER', code: 'O' }

    ];

  }
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  public _fetchCity(event) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetCityMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.cityData = JSON.parse(response.items);

    });
  }

  onSelectCity(event: any) {
    console.log(event.DocType);
    this.StateId = event.StateId;
    this.CountryId = event.CountryId;
    this.formData.patchValue({
      State: event.StateName,
      Country: event.CountryName
    });
  }

}

