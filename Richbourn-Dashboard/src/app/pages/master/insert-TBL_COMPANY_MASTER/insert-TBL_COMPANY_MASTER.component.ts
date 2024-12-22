import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { TabService } from 'src/app/core/helpers/TabService';

import { throttleTime } from 'rxjs/internal/operators/throttleTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { StateModel } from 'src/app/core/models/state.model';
import { companyModel } from 'src/app/core/models/company.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_COMPANY_MASTER.component.html',
  styleUrls: ['./insert-TBL_COMPANY_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */

export class InsertTBL_Company_MASTERComponent implements OnInit, AfterViewInit {
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
  companyData: companyModel[] = [];
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

    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'COMPANY MASTER', active: true }];

    this.formData = this.formBuilder.group({

      Name: ['', [Validators.required]],
      Logo: ['', [Validators.required]],
      Currency: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Pincode: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Fax: ['', [Validators.required]],
      Website: ['', [Validators.required]],
      CreatedDate: ['', [Validators.required]],
      ModifiedDate: ['', [Validators.required]],
      CreatedBy: ['', [Validators.required]],
      ModifiedBy: ['', [Validators.required]],
      Cancelled: ['', [Validators.required]],
      GSTNo: ['', [Validators.required]],
      PANNo: ['', [Validators.required]],
      HSNCode: ['', [Validators.required]],
      CreatedOn: ['', [Validators.required]],


    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    })

    // this.formData.get("Name").valueChanges.pipe(distinctUntilChanged(),
    //   throttleTime(50)).
    //   subscribe(selectedValue => {
    //     let value = this.formData.get('Name').value;
    //     console.log("Name", value)
    //     if (this.id > 0) {

    //     } else {

    //       if (value > 0) {
    //         let request = {
    //           "table_name": "tbl_company",
    //           "column_name": "Name",
    //           "column_value": value.toString()
    //         }
    //         this.validservice.CheckData(request).subscribe(response => {

    //           console.log("response", response);
    //           if (response.document.statusMessage === "failed") {

    //             this.formData.controls['Name'].setErrors({ invalid: 'Name Already Exist!' });

    //             this.toastr.error('Name Already Exist!', 'Error!');
    //             this.submit = true;
    //           }
    //           else {

    //             this.submit = false;
    //           }


    //         });

    //       }
    //     }
    //   });
    this.submit = false;
  }
  Close() {
    this.router.navigate(['/master/company']);
  }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;
console.log("debug")
    if (this.formData.valid) {
      let request: companyModel = <companyModel>{};
      request.SlNo = this.id;

      request.Name = this.formData.get('Name').value;//
      request.Logo = this.formData.get('Logo').value;//
      request.Currency = this.formData.get('Currency').value;//
      request.Address = this.formData.get('Address').value;//
      request.Pincode = this.formData.get('Pincode').value;//
      request.City = this.formData.get('City').value;//
      request.Country = this.formData.get('Country').value;//
      request.Phone = this.formData.get('Phone').value;//
      request.Email = this.formData.get('Email').value;//
      request.Fax = this.formData.get('Fax').value;//
      request.Website = this.formData.get('Website').value;//
      request.CreatedDate = this.formData.get('CreatedDate').value;//
      request.ModifiedDate = this.formData.get('ModifiedDate').value;//
      request.CreatedBy = this.formData.get('CreatedBy').value;//
      request.ModifiedBy = this.formData.get('ModifiedBy').value;//
      request.Cancelled = this.formData.get('Cancelled').value;//
      request.GSTNo = this.formData.get('GSTNo').value;//
      request.PANNo = this.formData.get('PANNo').value;//
      request.HSNCode = this.formData.get('HSNCode').value;//
      request.CreatedOn = this.formData.get('CreatedOn').value;//
      request.Address = this.formData.get('Address').value;//


      let jsonData: companyModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};
     
      postrequest.spName = "sp_ui_admin_add_CompanyMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.code == 1) {
          this.toastr.success('Company Detail Inserted Successfully!', 'Success!');
          this.router.navigate(['/master/company']);
        }
        else {
          this.toastr.error('Company Detail not Added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetCompanyMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.companyData = JSON.parse(response.items);
      if (this.companyData.length) {
        let data = this.companyData[0];

        this.formData.controls['Name'].setValue(data['Name']);
        this.formData.controls['Logo'].setValue(data['Logo']);
        this.formData.controls['Currency'].setValue(data['Currency']);
        this.formData.controls['Address'].setValue(data['Address']);
        this.formData.controls['City'].setValue(data['City']);
        this.formData.controls['Country'].setValue(data['Country']);
        this.formData.controls['Phone'].setValue(data['Phone']);
        this.formData.controls['Email'].setValue(data['Email']);
        this.formData.controls['Fax'].setValue(data['Fax']);
        this.formData.controls['Website'].setValue(data['Website']);
        this.formData.controls['CreatedDate'].setValue(data['CreatedDate']);
        this.formData.controls['ModifiedDate'].setValue(data['ModifiedDate']);
        this.formData.controls['CreatedBy'].setValue(data['CreatedBy']);
        this.formData.controls['ModifiedBy'].setValue(data['ModifiedBy']);
        this.formData.controls['Cancelled'].setValue(data['Cancelled']);
        this.formData.controls['GSTNo'].setValue(data['GSTNo']);
        this.formData.controls['PANNo'].setValue(data['PANNo']);
        this.formData.controls['HSNCode'].setValue(data['HSNCode']);
        this.formData.controls['CreatedOn'].setValue(data['CreatedOn']);
        this.formData.controls['Address'].setValue(data['Address']);


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

