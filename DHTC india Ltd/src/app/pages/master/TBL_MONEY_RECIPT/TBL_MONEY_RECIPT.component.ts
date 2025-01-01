import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_MONEY_RECIPTModel } from './TBL_MONEY_RECIPT.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_MONEY_RECIPT',
  templateUrl: './TBL_MONEY_RECIPT.component.html',
  styleUrls: ['./TBL_MONEY_RECIPT.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_MONEY_RECIPTComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_MONEY_RECIPTModel[];
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
  constructor(private modalService: NgbModal,private router:Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_MONEY_RECIPTModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'MONEY RECIPT', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
MR_NO: ['', [Validators.required]],
MR_DATE: ['', [Validators.required]],
POSTING_DATE: ['', [Validators.required]],
STATEMENT_NO: ['', [Validators.required]],
CLIAM: ['', [Validators.required]],
TOTAL: ['', [Validators.required]],
BANK_CODE: ['', [Validators.required]],
CASH_AMT: ['', [Validators.required]],
ON_AC_ADJUST: ['', [Validators.required]],
CHQ_AMT: ['', [Validators.required]],
MR_TOTAL: ['', [Validators.required]],
CHQ_NO: ['', [Validators.required]],
RECD_FROM: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
SHORT_EXCESS: ['', [Validators.required]],
TDS: ['', [Validators.required]],
TDS_PER: ['', [Validators.required]],
TDS_DEDUCT: ['', [Validators.required]],
LATE_DELIVERY: ['', [Validators.required]],
BANK_NAME: ['', [Validators.required]],
AC_CODE: ['', [Validators.required]],
TV_NO: ['', [Validators.required]],
FINYR: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_MONEY_RECIPT?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    //this.requestModel.url = "TBL_MONEY_RECIPT";
    this.requestModel.url = "TBL_MONEY_RECIPT?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    this.router.navigate(['/master/insert_TBL_MONEY_RECIPT']);
  }
  edit(data:number){
    this.router.navigate(['/master/insert_TBL_MONEY_RECIPT', { id: data }]);

//     

   
//     this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_MONEY_RECIPTModel = <TBL_MONEY_RECIPTModel>{};
request.ID = this.formData.get('ID').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.MR_NO = this.formData.get('MR_NO').value;
request.MR_DATE = this.formData.get('MR_DATE').value;
request.POSTING_DATE = this.formData.get('POSTING_DATE').value;
request.STATEMENT_NO = this.formData.get('STATEMENT_NO').value;
request.CLIAM = this.formData.get('CLIAM').value;
request.TOTAL = this.formData.get('TOTAL').value;
request.BANK_CODE = this.formData.get('BANK_CODE').value;
request.CASH_AMT = this.formData.get('CASH_AMT').value;
request.ON_AC_ADJUST = this.formData.get('ON_AC_ADJUST').value;
request.CHQ_AMT = this.formData.get('CHQ_AMT').value;
request.MR_TOTAL = this.formData.get('MR_TOTAL').value;
request.CHQ_NO = this.formData.get('CHQ_NO').value;
request.RECD_FROM = this.formData.get('RECD_FROM').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.SHORT_EXCESS = this.formData.get('SHORT_EXCESS').value;
request.TDS = this.formData.get('TDS').value;
request.TDS_PER = this.formData.get('TDS_PER').value;
request.TDS_DEDUCT = this.formData.get('TDS_DEDUCT').value;
request.LATE_DELIVERY = this.formData.get('LATE_DELIVERY').value;
request.BANK_NAME = this.formData.get('BANK_NAME').value;
request.AC_CODE = this.formData.get('AC_CODE').value;
request.TV_NO = this.formData.get('TV_NO').value;
request.FINYR = this.formData.get('FINYR').value;

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
        this.service.delete(id,"TBL_MONEY_RECIPT/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
