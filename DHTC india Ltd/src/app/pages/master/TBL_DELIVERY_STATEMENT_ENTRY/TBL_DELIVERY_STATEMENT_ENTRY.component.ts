import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_DELIVERY_STATEMENT_ENTRYModel } from './TBL_DELIVERY_STATEMENT_ENTRY.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_DELIVERY_STATEMENT_ENTRY',
  templateUrl: './TBL_DELIVERY_STATEMENT_ENTRY.component.html',
  styleUrls: ['./TBL_DELIVERY_STATEMENT_ENTRY.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_DELIVERY_STATEMENT_ENTRYComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_DELIVERY_STATEMENT_ENTRYModel[];
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
  constructor(private modalService: NgbModal,private router:Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_DELIVERY_STATEMENT_ENTRYModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'DELIVERY STATEMENT ENTRY', active: true }];

    this.formData = this.formBuilder.group({
      CODE: ['', [Validators.required]],
DELIVERY_NO: ['', [Validators.required]],
FROM_BRANCH_CODE: ['', [Validators.required]],
FROM_BRANCH_NAME: ['', [Validators.required]],
D_Date: ['', [Validators.required]],
CNCL: ['', [Validators.required]],
ENTRY_BY: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
BILTYNO: ['', [Validators.required]],
BILTY_DATE: ['', [Validators.required]],
FROM_STATION_CODE: ['', [Validators.required]],
FROM_STATION_NAME: ['', [Validators.required]],
TO_STATION_CODE: ['', [Validators.required]],
TO_STATION_NAME: ['', [Validators.required]],
PKG: ['', [Validators.required]],
BILTY_WT: ['', [Validators.required]],
CODES: ['', [Validators.required]],
PARTY_NAME: ['', [Validators.required]],
SHORT_PKG: ['', [Validators.required]],
DLY_PKG: ['', [Validators.required]],
SHORT_WT: ['', [Validators.required]],
BROKEN_WT: ['', [Validators.required]],
FRESH_WT: ['', [Validators.required]],
RETURN_PKG: ['', [Validators.required]],
RETURN_WT: ['', [Validators.required]],
REJECT_WT: ['', [Validators.required]],
FRESH_PKG: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_DELIVERY_STATEMENT_ENTRY?PageNo="+this.page+"&PageSize="+this.pageSize;
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

    this.requestModel.url = "TBL_DELIVERY_STATEMENT_ENTRY?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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

    // this.requestModel.url = "TBL_DELIVERY_STATEMENT_ENTRY";
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
    this.router.navigate(['/master/insert_TBL_DELIVERY_STATEMENT_ENTRY']);
  }
  edit(data:number){
    this.router.navigate(['/master/insert_TBL_DELIVERY_STATEMENT_ENTRY', { id: data }]);

//     

   
//     this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_DELIVERY_STATEMENT_ENTRYModel = <TBL_DELIVERY_STATEMENT_ENTRYModel>{};
request.CODE = this.formData.get('CODE').value;
request.DELIVERY_NO = this.formData.get('DELIVERY_NO').value;
request.FROM_BRANCH_CODE = this.formData.get('FROM_BRANCH_CODE').value;
request.FROM_BRANCH_NAME = this.formData.get('FROM_BRANCH_NAME').value;
request.D_Date = this.formData.get('D_Date').value;
request.CNCL = this.formData.get('CNCL').value;
request.ENTRY_BY = this.formData.get('ENTRY_BY').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.BILTYNO = this.formData.get('BILTYNO').value;
request.BILTY_DATE = this.formData.get('BILTY_DATE').value;
request.FROM_STATION_CODE = this.formData.get('FROM_STATION_CODE').value;
request.FROM_STATION_NAME = this.formData.get('FROM_STATION_NAME').value;
request.TO_STATION_CODE = this.formData.get('TO_STATION_CODE').value;
request.TO_STATION_NAME = this.formData.get('TO_STATION_NAME').value;
request.PKG = this.formData.get('PKG').value;
request.BILTY_WT = this.formData.get('BILTY_WT').value;
request.CODES = this.formData.get('CODES').value;
request.PARTY_NAME = this.formData.get('PARTY_NAME').value;
request.SHORT_PKG = this.formData.get('SHORT_PKG').value;
request.DLY_PKG = this.formData.get('DLY_PKG').value;
request.SHORT_WT = this.formData.get('SHORT_WT').value;
request.BROKEN_WT = this.formData.get('BROKEN_WT').value;
request.FRESH_WT = this.formData.get('FRESH_WT').value;
request.RETURN_PKG = this.formData.get('RETURN_PKG').value;
request.RETURN_WT = this.formData.get('RETURN_WT').value;
request.REJECT_WT = this.formData.get('REJECT_WT').value;
request.FRESH_PKG = this.formData.get('FRESH_PKG').value;

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
        this.service.delete(id,"TBL_DELIVERY_STATEMENT_ENTRY/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
