
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { OpBill_EntryModel } from 'src/app/core/models/OpBill_Entry.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_OpBILL_ENTRY_MASTER.component.html',
  styleUrls: ['./insert-TBL_OpBILL_ENTRY_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_OpBILL_ENTRY_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  billtype: { name: string; code: string; }[];
  date3: Date;
  minDate: Date;
  maxDate: Date;
  invalidDates: Date[];
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
 seriesData: OpBill_EntryModel[]=[];

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
    this.billtype= [
      {name: 'Purchase', code: 'Pr'},
      {name: 'Ordered', code: 'Or'},
      {name: 'Other', code: 'Ot'}
  ];

    this.breadCrumbItems = [{ label: 'MASTER' }, { label: ' OPENING BILL ENTRY MASTER', active: true }];

    this.formData = this.formBuilder.group({
      BillType: ['', [Validators.required]],
      BillDate: ['', [Validators.required]],
      BillNo: ['', [Validators.required]],
      GeneralLedger: ['', [Validators.required]],
      Party: ['', [Validators.required]],
      GrossWt: ['', [Validators.required]],
      StnWt: ['', [Validators.required]],
      DmdWt: ['', [Validators.required]],
      NettWt: ['', [Validators.required]],
      DueAmount: ['', [Validators.required]],
      BillAmount: ['', [Validators.required]],
     
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
      let request: OpBill_EntryModel = <OpBill_EntryModel>{};

      request.BillType = this.formData.get('BillType').value;//
      request.BillDate = this.formData.get('BillDate').value;//
      
      request.BillNo = this.formData.get('BillNo').value;//
      request.GeneralLedger = this.formData.get('GeneralLedger').value;//
      request.Party = this.formData.get('Party').value;//
      request.GrossWt = this.formData.get('GrossWt').value;//
      request.StnWt = this.formData.get('StnWt').value;//
      request.DmdWt = this.formData.get('DmdWt').value;//
      request.NettWt = this.formData.get('NettWt').value;//
      request.DueAmount = this.formData.get('DueAmount').value;//
      request.BillAmount = this.formData.get('BillAmount').value;//
    

      let jsonData: OpBill_EntryModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_OpBillEntryMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.code==1){
          this.toastr.success( 'OpBill_Entry Inserted Successfully!','Success!');
          this.router.navigate(['/master/OpBill_Entry']);
        }
        else{
          this.toastr.error( 'OpBill_Entry not Added!','Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetOpBILL_ENTRYMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];

      this.formData.controls['BillType'].setValue(data['BillType']);
      this.formData.controls['BillDate'].setValue(data['BillDate']);
      this.formData.controls['BillNo'].setValue(data['BillNo']);
      this.formData.controls['GeneralLedger'].setValue(data['RGeneralLedger'])
      this.formData.controls['Party'].setValue(data['Party']);
      this.formData.controls['GrossWt'].setValue(data['GrossWt']);
      this.formData.controls['StnWt'].setValue(data['StnWt']);
      this.formData.controls['DmdWt'].setValue(data['DmdWt']);
      this.formData.controls['NettWt'].setValue(data['NettWt']);
      this.formData.controls['DueAmount'].setValue(data['DueAmount']);
      this.formData.controls['BillAmount'].setValue(data['BillAmount']);
     
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

