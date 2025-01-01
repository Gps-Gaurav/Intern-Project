import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_CHALLANModel } from './TBL_CHALLAN.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_CHALLAN',
  templateUrl: './TBL_CHALLAN.component.html',
  styleUrls: ['./TBL_CHALLAN.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_CHALLANComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_CHALLANModel[];
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
  search:String="";
  constructor(private modalService: NgbModal,private router:Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_CHALLANModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'CHALLAN', active: true }];

    this.formData = this.formBuilder.group({
      CHID: ['', [Validators.required]],
CHNO: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
DATE: ['', [Validators.required]],
LNO1: ['', [Validators.required]],
LNO2: ['', [Validators.required]],
LNO3: ['', [Validators.required]],
LORRYID: ['', [Validators.required]],
LORRYTYPE: ['', [Validators.required]],
DRIVERID: ['', [Validators.required]],
FROMSTATION: ['', [Validators.required]],
TOSTATION: ['', [Validators.required]],
LOADFROM: ['', [Validators.required]],
UNLOADAT: ['', [Validators.required]],
TRANSITDAY: ['', [Validators.required]],
PENALITYDAY: ['', [Validators.required]],
DEPT_DATE: ['', [Validators.required]],
CHALLANWT: ['', [Validators.required]],
CHALLAN_PKG: ['', [Validators.required]],
RATE_SETTED: ['', [Validators.required]],
RATE_TYPE: ['', [Validators.required]],
GAURANTEE_WT: ['', [Validators.required]],
BAL_BRANCHID: ['', [Validators.required]],
ADV_BRANCHID: ['', [Validators.required]],
BROKERID: ['', [Validators.required]],
HIRE: ['', [Validators.required]],
LABOUR_CHARGES: ['', [Validators.required]],
DETENTION: ['', [Validators.required]],
OTHER: ['', [Validators.required]],
TOTAL_HIRE: ['', [Validators.required]],
LESS_ADVANCE: ['', [Validators.required]],
BALANCE_HIRE: ['', [Validators.required]],
TP: ['', [Validators.required]],
TP_NO: ['', [Validators.required]],
NO_OF_TIRPAL: ['', [Validators.required]],
CHAL: ['', [Validators.required]],
OE: ['', [Validators.required]],
DRIVERMOB: ['', [Validators.required]],
REMARKS1: ['', [Validators.required]],
REMARKS2: ['', [Validators.required]],
ENTRYBY: ['', [Validators.required]],
ENTERYDATE: ['', [Validators.required]],
FINYR: ['', [Validators.required]],
PAYMENT_BY_OTHER_BRANCH: ['', [Validators.required]],
STOP_PAYMENT: ['', [Validators.required]],
PAYMENT_BY_OTHERBRANCH_CODE: ['', [Validators.required]],
STOP_PAYMENT_CLAIM_RATE: ['', [Validators.required]],
STOP_PAYMENT_OTHER_RATE: ['', [Validators.required]],
SEAL_NO: ['', [Validators.required]],
DRIVERMOBILE2: ['', [Validators.required]],
CARD_NO: ['', [Validators.required]],
ConEWaybill: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_CHALLAN?PageNo="+this.page+"&PageSize="+this.pageSize;
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

    this.requestModel.url = "TBL_CHALLAN?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
    this.service.getStoreList(this.requestModel).subscribe(response => {
          this.tableData = response.document;
          this.totalRecords = response.totalCount;
          this.startIndex = (this.page - 1) * this.pageSize + 1;
          this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
          if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
          }
          this.total$ = new BehaviorSubject<number>(this.totalRecords)
        });
    // this.requestModel.url = "TBL_CHALLAN";
    // this.service.getList(this.page,this.pageSize,this.requestModel.url).subscribe(response => {
    //    this.tableData = response.document.records;
    //   this.totalRecords = response.totalCount;
    //   this.startIndex = (this.page - 1) * this.pageSize + 1;
    //   this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    //   if (this.endIndex > this.totalRecords) {
    //       this.endIndex = this.totalRecords;
    //   }
    //   this.total$=new BehaviorSubject<number>(this.totalRecords)
    // });
  }

  loadPage(page: number) {
    console.log("pagechange",page)
    this.page=page;
    this._fetchData();
  }
  get form() {
    return this.formData.controls;
  }

  openModal() {
    this.router.navigate(['/master/insert_TBL_CHALLAN']);
  }
  edit(data:number){
    this.router.navigate(['/master/insert_TBL_CHALLAN', { id: data }]);

//     

   
//     this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_CHALLANModel = <TBL_CHALLANModel>{};
request.CHID = this.formData.get('CHID').value;
request.CHNO = this.formData.get('CHNO').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.DATE = this.formData.get('DATE').value;
request.LNO1 = this.formData.get('LNO1').value;
request.LNO2 = this.formData.get('LNO2').value;
request.LNO3 = this.formData.get('LNO3').value;
request.LORRYID = this.formData.get('LORRYID').value;
request.LORRYTYPE = this.formData.get('LORRYTYPE').value;
request.DRIVERID = this.formData.get('DRIVERID').value;
request.FROMSTATION = this.formData.get('FROMSTATION').value;
request.TOSTATION = this.formData.get('TOSTATION').value;
request.LOADFROM = this.formData.get('LOADFROM').value;
request.UNLOADAT = this.formData.get('UNLOADAT').value;
request.TRANSITDAY = this.formData.get('TRANSITDAY').value;
request.PENALITYDAY = this.formData.get('PENALITYDAY').value;
request.DEPT_DATE = this.formData.get('DEPT_DATE').value;
request.CHALLANWT = this.formData.get('CHALLANWT').value;
request.CHALLAN_PKG = this.formData.get('CHALLAN_PKG').value;
request.RATE_SETTED = this.formData.get('RATE_SETTED').value;
request.RATE_TYPE = this.formData.get('RATE_TYPE').value;
request.GAURANTEE_WT = this.formData.get('GAURANTEE_WT').value;
request.BAL_BRANCHID = this.formData.get('BAL_BRANCHID').value;
request.ADV_BRANCHID = this.formData.get('ADV_BRANCHID').value;
request.BROKERID = this.formData.get('BROKERID').value;
request.HIRE = this.formData.get('HIRE').value;
request.LABOUR_CHARGES = this.formData.get('LABOUR_CHARGES').value;
request.DETENTION = this.formData.get('DETENTION').value;
request.OTHER = this.formData.get('OTHER').value;
request.TOTAL_HIRE = this.formData.get('TOTAL_HIRE').value;
request.LESS_ADVANCE = this.formData.get('LESS_ADVANCE').value;
request.BALANCE_HIRE = this.formData.get('BALANCE_HIRE').value;
request.TP = this.formData.get('TP').value;
request.TP_NO = this.formData.get('TP_NO').value;
request.NO_OF_TIRPAL = this.formData.get('NO_OF_TIRPAL').value;
request.CHAL = this.formData.get('CHAL').value;
request.OE = this.formData.get('OE').value;
request.DRIVERMOB = this.formData.get('DRIVERMOB').value;
request.REMARKS1 = this.formData.get('REMARKS1').value;
request.REMARKS2 = this.formData.get('REMARKS2').value;
request.ENTRYBY = this.formData.get('ENTRYBY').value;
request.ENTERYDATE = this.formData.get('ENTERYDATE').value;
request.FINYR = this.formData.get('FINYR').value;
request.PAYMENT_BY_OTHER_BRANCH = this.formData.get('PAYMENT_BY_OTHER_BRANCH').value;
request.STOP_PAYMENT = this.formData.get('STOP_PAYMENT').value;
request.PAYMENT_BY_OTHERBRANCH_CODE = this.formData.get('PAYMENT_BY_OTHERBRANCH_CODE').value;
request.STOP_PAYMENT_CLAIM_RATE = this.formData.get('STOP_PAYMENT_CLAIM_RATE').value;
request.STOP_PAYMENT_OTHER_RATE = this.formData.get('STOP_PAYMENT_OTHER_RATE').value;
request.SEAL_NO = this.formData.get('SEAL_NO').value;
request.DRIVERMOBILE2 = this.formData.get('DRIVERMOBILE2').value;
request.CARD_NO = this.formData.get('CARD_NO').value;
request.ConEWaybill = this.formData.get('ConEWaybill').value;

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
        this.service.delete(id,"TBL_CHALLAN/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
