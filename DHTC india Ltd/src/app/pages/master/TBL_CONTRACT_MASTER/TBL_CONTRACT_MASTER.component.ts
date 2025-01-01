import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_CONTRACT_MASTERModel } from './TBL_CONTRACT_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_CONTRACT_MASTER',
  templateUrl: './TBL_CONTRACT_MASTER.component.html',
  styleUrls: ['./TBL_CONTRACT_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_CONTRACT_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_CONTRACT_MASTERModel[];
  requestModel :RequestModel = <RequestModel>{};
  term: any;
  startIndex:number=0;
  endIndex:number=0;
  totalRecords:number=0;
  page:number=1;
  pageSize:number=10;
  total$: Observable<number>;
  // page
  currentpage: number;

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_CONTRACT_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_CONTRACT_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
CONTRACT_CODE: ['', [Validators.required]],
CONTRACT_NAME: ['', [Validators.required]],
CONTRACT_NO: ['', [Validators.required]],
ITEMCODE: ['', [Validators.required]],
ITEMNAME: ['', [Validators.required]],
F_STATION_CODE: ['', [Validators.required]],
F_STATION_NAME: ['', [Validators.required]],
T_STATION_CODE: ['', [Validators.required]],
T_STATION_NAME: ['', [Validators.required]],
CONSINOR_CODE: ['', [Validators.required]],
CONSINOR_NAME: ['', [Validators.required]],
CONSIGNEE_CODE: ['', [Validators.required]],
CONSIGNEE_NAME: ['', [Validators.required]],
RATE: ['', [Validators.required]],
TYPE: ['', [Validators.required]],
OLD_RATE_LIMIT: ['', [Validators.required]],
BILL_PARTY_CODE1: ['', [Validators.required]],
BILL_PARTY_CODE2: ['', [Validators.required]],
BILL_PARTY_NAME: ['', [Validators.required]],
FROM_DATE: ['', [Validators.required]],
TO_DATE: ['', [Validators.required]],
BILL_BRANCH: ['', [Validators.required]],
BIIL_2_RATE: ['', [Validators.required]],
INCENTIVE: ['', [Validators.required]],
PAYMENT_DAY: ['', [Validators.required]],
ENTRY_BY: ['', [Validators.required]],
ENTER_DATE: ['', [Validators.required]],
LOADING_BY: ['', [Validators.required]],
UNLODING_BY: ['', [Validators.required]],
RISK: ['', [Validators.required]],
RISK_LIMIT: ['', [Validators.required]],
KILOMETER: ['', [Validators.required]],
LOAD_LIMIT_FROM: ['', [Validators.required]],
LOAD_LIMIT_TO: ['', [Validators.required]],
LIMIT_TYPE: ['', [Validators.required]],
SUR_CHARGES: ['', [Validators.required]],
COVER_CHARGES: ['', [Validators.required]],
HANDLE_CHARGES: ['', [Validators.required]],
CPC_CHARGES: ['', [Validators.required]],
STAT_CHARGES: ['', [Validators.required]],
OTH_CHARGES: ['', [Validators.required]],
OTH_TYPE: ['', [Validators.required]],
WEREHOUSE: ['', [Validators.required]],
WAREHOUSE_TYPE: ['', [Validators.required]],
HAMIL: ['', [Validators.required]],
HAMIL_TYPE: ['', [Validators.required]],
TRANSIT_PERIOD: ['', [Validators.required]],
PAYMENT_BASE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],

    });

    this.currentpage = 1;

    /**
     * Fetches the data
     */
    this._fetchData();
  }

  /**
   * Customers data fetches
   */
    /*
   private _fetchData() {
    this.requestModel.url = "SP/sp_get_list_TBL_CONTRACT_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
    this.service.getList(this.requestModel).subscribe(response => {
       this.tableData = response.document.records;
      this.totalRecords = response.totalCount;
      this.startIndex = (this.page - 1) * this.pageSize + 1;
      this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
      if (this.endIndex > this.totalRecords) {
          this.endIndex = this.totalRecords;
      }
      this.total$=new BehaviorSubject<number>(this.totalRecords)
    });
  }
    */
   private _fetchData() {
    this.requestModel.url = "TBL_CONTRACT_MASTER";
    this.service.getList(this.page,this.pageSize,this.requestModel.url).subscribe(response => {
       this.tableData = response.document.records;
      this.totalRecords = response.document.totalRecords;
      this.startIndex = (this.page - 1) * this.pageSize + 1;
      this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
      if (this.endIndex > this.totalRecords) {
          this.endIndex = this.totalRecords;
      }
      this.total$=new BehaviorSubject<number>(this.totalRecords)
    });
  }

  loadPage(page: number) {
    console.log("pagechange",page)
    this.page=page;
    this._fetchData();
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.router.navigate(['/master/insert_TBL_CONTRACT_MASTER']);
  }
  edit(data:TBL_CONTRACT_MASTERModel,content: any){
     this.formData.controls['ID'].setValue(data.ID);
this.formData.controls['CONTRACT_CODE'].setValue(data.CONTRACT_CODE);
this.formData.controls['CONTRACT_NAME'].setValue(data.CONTRACT_NAME);
this.formData.controls['CONTRACT_NO'].setValue(data.CONTRACT_NO);
this.formData.controls['ITEMCODE'].setValue(data.ITEMCODE);
this.formData.controls['ITEMNAME'].setValue(data.ITEMNAME);
this.formData.controls['F_STATION_CODE'].setValue(data.F_STATION_CODE);
this.formData.controls['F_STATION_NAME'].setValue(data.F_STATION_NAME);
this.formData.controls['T_STATION_CODE'].setValue(data.T_STATION_CODE);
this.formData.controls['T_STATION_NAME'].setValue(data.T_STATION_NAME);
this.formData.controls['CONSINOR_CODE'].setValue(data.CONSINOR_CODE);
this.formData.controls['CONSINOR_NAME'].setValue(data.CONSINOR_NAME);
this.formData.controls['CONSIGNEE_CODE'].setValue(data.CONSIGNEE_CODE);
this.formData.controls['CONSIGNEE_NAME'].setValue(data.CONSIGNEE_NAME);
this.formData.controls['RATE'].setValue(data.RATE);
this.formData.controls['TYPE'].setValue(data.TYPE);
this.formData.controls['OLD_RATE_LIMIT'].setValue(data.OLD_RATE_LIMIT);
this.formData.controls['BILL_PARTY_CODE1'].setValue(data.BILL_PARTY_CODE1);
this.formData.controls['BILL_PARTY_CODE2'].setValue(data.BILL_PARTY_CODE2);
this.formData.controls['BILL_PARTY_NAME'].setValue(data.BILL_PARTY_NAME);
this.formData.controls['FROM_DATE'].setValue(data.FROM_DATE);
this.formData.controls['TO_DATE'].setValue(data.TO_DATE);
this.formData.controls['BILL_BRANCH'].setValue(data.BILL_BRANCH);
this.formData.controls['BIIL_2_RATE'].setValue(data.BIIL_2_RATE);
this.formData.controls['INCENTIVE'].setValue(data.INCENTIVE);
this.formData.controls['PAYMENT_DAY'].setValue(data.PAYMENT_DAY);
this.formData.controls['ENTRY_BY'].setValue(data.ENTRY_BY);
this.formData.controls['ENTER_DATE'].setValue(data.ENTER_DATE);
this.formData.controls['LOADING_BY'].setValue(data.LOADING_BY);
this.formData.controls['UNLODING_BY'].setValue(data.UNLODING_BY);
this.formData.controls['RISK'].setValue(data.RISK);
this.formData.controls['RISK_LIMIT'].setValue(data.RISK_LIMIT);
this.formData.controls['KILOMETER'].setValue(data.KILOMETER);
this.formData.controls['LOAD_LIMIT_FROM'].setValue(data.LOAD_LIMIT_FROM);
this.formData.controls['LOAD_LIMIT_TO'].setValue(data.LOAD_LIMIT_TO);
this.formData.controls['LIMIT_TYPE'].setValue(data.LIMIT_TYPE);
this.formData.controls['SUR_CHARGES'].setValue(data.SUR_CHARGES);
this.formData.controls['COVER_CHARGES'].setValue(data.COVER_CHARGES);
this.formData.controls['HANDLE_CHARGES'].setValue(data.HANDLE_CHARGES);
this.formData.controls['CPC_CHARGES'].setValue(data.CPC_CHARGES);
this.formData.controls['STAT_CHARGES'].setValue(data.STAT_CHARGES);
this.formData.controls['OTH_CHARGES'].setValue(data.OTH_CHARGES);
this.formData.controls['OTH_TYPE'].setValue(data.OTH_TYPE);
this.formData.controls['WEREHOUSE'].setValue(data.WEREHOUSE);
this.formData.controls['WAREHOUSE_TYPE'].setValue(data.WAREHOUSE_TYPE);
this.formData.controls['HAMIL'].setValue(data.HAMIL);
this.formData.controls['HAMIL_TYPE'].setValue(data.HAMIL_TYPE);
this.formData.controls['TRANSIT_PERIOD'].setValue(data.TRANSIT_PERIOD);
this.formData.controls['PAYMENT_BASE'].setValue(data.PAYMENT_BASE);
this.formData.controls['REMARKS'].setValue(data.REMARKS);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_CONTRACT_MASTERModel = <TBL_CONTRACT_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.CONTRACT_CODE = this.formData.get('CONTRACT_CODE').value;
request.CONTRACT_NAME = this.formData.get('CONTRACT_NAME').value;
request.CONTRACT_NO = this.formData.get('CONTRACT_NO').value;
request.ITEMCODE = this.formData.get('ITEMCODE').value;
request.ITEMNAME = this.formData.get('ITEMNAME').value;
request.F_STATION_CODE = this.formData.get('F_STATION_CODE').value;
request.F_STATION_NAME = this.formData.get('F_STATION_NAME').value;
request.T_STATION_CODE = this.formData.get('T_STATION_CODE').value;
request.T_STATION_NAME = this.formData.get('T_STATION_NAME').value;
request.CONSINOR_CODE = this.formData.get('CONSINOR_CODE').value;
request.CONSINOR_NAME = this.formData.get('CONSINOR_NAME').value;
request.CONSIGNEE_CODE = this.formData.get('CONSIGNEE_CODE').value;
request.CONSIGNEE_NAME = this.formData.get('CONSIGNEE_NAME').value;
request.RATE = this.formData.get('RATE').value;
request.TYPE = this.formData.get('TYPE').value;
request.OLD_RATE_LIMIT = this.formData.get('OLD_RATE_LIMIT').value;
request.BILL_PARTY_CODE1 = this.formData.get('BILL_PARTY_CODE1').value;
request.BILL_PARTY_CODE2 = this.formData.get('BILL_PARTY_CODE2').value;
request.BILL_PARTY_NAME = this.formData.get('BILL_PARTY_NAME').value;
request.FROM_DATE = this.formData.get('FROM_DATE').value;
request.TO_DATE = this.formData.get('TO_DATE').value;
request.BILL_BRANCH = this.formData.get('BILL_BRANCH').value;
request.BIIL_2_RATE = this.formData.get('BIIL_2_RATE').value;
request.INCENTIVE = this.formData.get('INCENTIVE').value;
request.PAYMENT_DAY = this.formData.get('PAYMENT_DAY').value;
request.ENTRY_BY = this.formData.get('ENTRY_BY').value;
request.ENTER_DATE = this.formData.get('ENTER_DATE').value;
request.LOADING_BY = this.formData.get('LOADING_BY').value;
request.UNLODING_BY = this.formData.get('UNLODING_BY').value;
request.RISK = this.formData.get('RISK').value;
request.RISK_LIMIT = this.formData.get('RISK_LIMIT').value;
request.KILOMETER = this.formData.get('KILOMETER').value;
request.LOAD_LIMIT_FROM = this.formData.get('LOAD_LIMIT_FROM').value;
request.LOAD_LIMIT_TO = this.formData.get('LOAD_LIMIT_TO').value;
request.LIMIT_TYPE = this.formData.get('LIMIT_TYPE').value;
request.SUR_CHARGES = this.formData.get('SUR_CHARGES').value;
request.COVER_CHARGES = this.formData.get('COVER_CHARGES').value;
request.HANDLE_CHARGES = this.formData.get('HANDLE_CHARGES').value;
request.CPC_CHARGES = this.formData.get('CPC_CHARGES').value;
request.STAT_CHARGES = this.formData.get('STAT_CHARGES').value;
request.OTH_CHARGES = this.formData.get('OTH_CHARGES').value;
request.OTH_TYPE = this.formData.get('OTH_TYPE').value;
request.WEREHOUSE = this.formData.get('WEREHOUSE').value;
request.WAREHOUSE_TYPE = this.formData.get('WAREHOUSE_TYPE').value;
request.HAMIL = this.formData.get('HAMIL').value;
request.HAMIL_TYPE = this.formData.get('HAMIL_TYPE').value;
request.TRANSIT_PERIOD = this.formData.get('TRANSIT_PERIOD').value;
request.PAYMENT_BASE = this.formData.get('PAYMENT_BASE').value;
request.REMARKS = this.formData.get('REMARKS').value;

      this.modalService.dismissAll()
    }
    this.submitted = true
  }

  confirm(id) {
    console.log("confirm")
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      position: 'top',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.service.delete(id,"TBL_CONTRACT_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
