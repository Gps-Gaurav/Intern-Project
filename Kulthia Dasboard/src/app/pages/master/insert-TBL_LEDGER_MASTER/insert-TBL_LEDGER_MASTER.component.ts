import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { LedgerModel } from 'src/app/core/models/ledger.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_LEDGER_MASTER.component.html',
  styleUrls: ['./insert-TBL_LEDGER_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */

export class InsertTBL_Ledger_MASTERComponent implements OnInit, AfterViewInit {
 selectedValues: string[] = ['val1','val2'];

  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
 seriesData: LedgerModel[]=[];

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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'LEDGER MASTER', active: true }];

    this.formData = this.formBuilder.group({
      LedgerDescription: ['', [Validators.required]],
      Alias: ['', [Validators.required]],
      City: ['', [Validators.required]],
      GroupDescription: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      ZipCode: ['', [Validators.required]],
      State: ['', [Validators.required]],
      SubGroup: ['', [Validators.required]],
      LedgerType: ['', [Validators.required]],
      AcHolder: ['', [Validators.required]],
      AcType: ['', [Validators.required]],
      AcNO: ['', [Validators.required]],
      IfscCode: ['', [Validators.required]],
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
      let request: LedgerModel = <LedgerModel>{};

      request.LedgerDescription = this.formData.get('LedgerDescription').value;//
      request.Alias = this.formData.get('Alias').value;//
      request.City = this.formData.get('City').value;//
      request.GroupDescription = this.formData.get('GroupDescription').value;//
      request.Address = this.formData.get('Address').value;//
      request.ZipCode = this.formData.get('ZipCode').value;//
    
      request.SubGroup = this.formData.get('SubGroup').value;//
      request.LedgerType = this.formData.get('LedgerType').value;//
      request.AcHolder = this.formData.get('AcHolder').value;//
      request.AcType = this.formData.get('AcType').value;//
      request.AcNO = this.formData.get('AcNO').value;//
      request.IfscCode = this.formData.get('IfscCode').value;//

      let jsonData: LedgerModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_Ledger_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.code==1){
          this.toastr.success( 'Data Inserted Successfully!','Success!');
          this.router.navigate(['/master/ledger']);
        }
        else{
          this.toastr.error( 'Ledger not Added!','Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetLedgerMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];

      this.formData.controls['LedgerDescription'].setValue(data['LedgerDescription']);
      this.formData.controls['Alias'].setValue(data['Alias']);
      this.formData.controls['City'].setValue(data['City']);
      this.formData.controls['GroupDescription'].setValue(data['GroupDescription']);
      this.formData.controls['Address'].setValue(data['Address'])
      this.formData.controls['ZipCode'].setValue(data['ZipCode']);
      this.formData.controls['State'].setValue(data['State']);
      this.formData.controls['SubGroup'].setValue(data['SubGroup']);
      this.formData.controls['LedgerType'].setValue(data['LedgerType']);
      this.formData.controls['AcHolder'].setValue(data['AcHolder']);
      this.formData.controls['AcType'].setValue(data['AcType']);
      this.formData.controls['AcNO'].setValue(data['AcNO']);
      this.formData.controls['IfscCode'].setValue(data['IfscCode']);
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

