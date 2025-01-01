import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_LORRY_HIRE_STATEMENTModel } from './TBL_LORRY_HIRE_STATEMENT.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_LORRY_HIRE_STATEMENT',
  templateUrl: './TBL_LORRY_HIRE_STATEMENT.component.html',
  styleUrls: ['./TBL_LORRY_HIRE_STATEMENT.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_LORRY_HIRE_STATEMENTComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_LORRY_HIRE_STATEMENTModel[];
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
  constructor(private modalService: NgbModal,private router:Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_LORRY_HIRE_STATEMENTModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'LORRY HIRE STATEMENT', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
STATEMENT_NO: ['', [Validators.required]],
STATEMENT_DATE: ['', [Validators.required]],
POSTING_DATE: ['', [Validators.required]],
STATEMENT_TOTAL: ['', [Validators.required]],
CASH_TOTAL: ['', [Validators.required]],
CHQ_TOTAL: ['', [Validators.required]],
IS_CANCEL: ['', [Validators.required]],
ENTRY_BY: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
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
    this.requestModel.url = "SP/sp_get_list_TBL_LORRY_HIRE_STATEMENT?PageNo="+this.page+"&PageSize="+this.pageSize;
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
   // this.requestModel.url = "TBL_LORRY_HIRE_STATEMENT";
    this.requestModel.url = "TBL_LORRY_HIRE_STATEMENT?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    this.router.navigate(['/master/insert_TBL_LORRY_HIRE_STATEMENT']);
  }
  edit(data:number){
    this.router.navigate(['/master/insert_TBL_LORRY_HIRE_STATEMENT', { id: data }]);

//     

   
//     this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_LORRY_HIRE_STATEMENTModel = <TBL_LORRY_HIRE_STATEMENTModel>{};
request.ID = this.formData.get('ID').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.STATEMENT_NO = this.formData.get('STATEMENT_NO').value;
request.STATEMENT_DATE = this.formData.get('STATEMENT_DATE').value;
request.POSTING_DATE = this.formData.get('POSTING_DATE').value;
request.STATEMENT_TOTAL = this.formData.get('STATEMENT_TOTAL').value;
request.CASH_TOTAL = this.formData.get('CASH_TOTAL').value;
request.CHQ_TOTAL = this.formData.get('CHQ_TOTAL').value;
request.IS_CANCEL = this.formData.get('IS_CANCEL').value;
request.ENTRY_BY = this.formData.get('ENTRY_BY').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
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
        this.service.delete(id,"TBL_LORRY_HIRE_STATEMENT/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
