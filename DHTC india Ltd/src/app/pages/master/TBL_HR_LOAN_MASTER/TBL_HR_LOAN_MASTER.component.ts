import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_HR_LOAN_MASTERModel } from './TBL_HR_LOAN_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_HR_LOAN_MASTER',
  templateUrl: './TBL_HR_LOAN_MASTER.component.html',
  styleUrls: ['./TBL_HR_LOAN_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_HR_LOAN_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_HR_LOAN_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_HR_LOAN_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_HR_LOAN_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      RNo: ['', [Validators.required]],
ID: ['', [Validators.required]],
TRANS_NO: ['', [Validators.required]],
TRANS_DATE: ['', [Validators.required]],
USER_CODE: ['', [Validators.required]],
USER_NAME: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
LOAN_ISSUE_DATE: ['', [Validators.required]],
LOAN_AMOUNT: ['', [Validators.required]],
NO_OF_MONTHS: ['', [Validators.required]],
MONTHS: ['', [Validators.required]],
YEAR: ['', [Validators.required]],
AMOUNT: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_HR_LOAN_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_HR_LOAN_MASTER";
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
    this.router.navigate(['/master/insert_TBL_HR_LOAN_MASTER']);
  }
  edit(data:TBL_HR_LOAN_MASTERModel,content: any){
     this.formData.controls['RNo'].setValue(data.RNo);
this.formData.controls['ID'].setValue(data.ID);
this.formData.controls['TRANS_NO'].setValue(data.TRANS_NO);
this.formData.controls['TRANS_DATE'].setValue(data.TRANS_DATE);
this.formData.controls['USER_CODE'].setValue(data.USER_CODE);
this.formData.controls['USER_NAME'].setValue(data.USER_NAME);
this.formData.controls['BRANCH_CODE'].setValue(data.BRANCH_CODE);
this.formData.controls['BRANCH_NAME'].setValue(data.BRANCH_NAME);
this.formData.controls['LOAN_ISSUE_DATE'].setValue(data.LOAN_ISSUE_DATE);
this.formData.controls['LOAN_AMOUNT'].setValue(data.LOAN_AMOUNT);
this.formData.controls['NO_OF_MONTHS'].setValue(data.NO_OF_MONTHS);
this.formData.controls['MONTHS'].setValue(data.MONTHS);
this.formData.controls['YEAR'].setValue(data.YEAR);
this.formData.controls['AMOUNT'].setValue(data.AMOUNT);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_HR_LOAN_MASTERModel = <TBL_HR_LOAN_MASTERModel>{};
request.RNo = this.formData.get('RNo').value;
request.ID = this.formData.get('ID').value;
request.TRANS_NO = this.formData.get('TRANS_NO').value;
request.TRANS_DATE = this.formData.get('TRANS_DATE').value;
request.USER_CODE = this.formData.get('USER_CODE').value;
request.USER_NAME = this.formData.get('USER_NAME').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.LOAN_ISSUE_DATE = this.formData.get('LOAN_ISSUE_DATE').value;
request.LOAN_AMOUNT = this.formData.get('LOAN_AMOUNT').value;
request.NO_OF_MONTHS = this.formData.get('NO_OF_MONTHS').value;
request.MONTHS = this.formData.get('MONTHS').value;
request.YEAR = this.formData.get('YEAR').value;
request.AMOUNT = this.formData.get('AMOUNT').value;

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
        this.service.delete(id,"TBL_HR_LOAN_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
