import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_STATIONARY_ISSUE_MASTERModel } from './TBL_STATIONARY_ISSUE_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_STATIONARY_ISSUE_MASTER',
  templateUrl: './TBL_STATIONARY_ISSUE_MASTER.component.html',
  styleUrls: ['./TBL_STATIONARY_ISSUE_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_STATIONARY_ISSUE_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_STATIONARY_ISSUE_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_STATIONARY_ISSUE_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_STATIONARY_ISSUE_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
SLNO: ['', [Validators.required]],
STATIONARY_ID: ['', [Validators.required]],
TYPE: ['', [Validators.required]],
ISSUE_BRANCH_NAME: ['', [Validators.required]],
ISSUE_BRANCH_CODE: ['', [Validators.required]],
ISSUE_DATE: ['', [Validators.required]],
AUTO_MANUAL: ['', [Validators.required]],
FROM_RANGE: ['', [Validators.required]],
TO_RANGE: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_STATIONARY_ISSUE_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_STATIONARY_ISSUE_MASTER";
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
    this.router.navigate(['/master/insert_TBL_STATIONARY_ISSUE_MASTER']);
  }
  edit(data:TBL_STATIONARY_ISSUE_MASTERModel,content: any){
     this.formData.controls['ID'].setValue(data.ID);
this.formData.controls['SLNO'].setValue(data.SLNO);
this.formData.controls['STATIONARY_ID'].setValue(data.STATIONARY_ID);
this.formData.controls['TYPE'].setValue(data.TYPE);
this.formData.controls['ISSUE_BRANCH_NAME'].setValue(data.ISSUE_BRANCH_NAME);
this.formData.controls['ISSUE_BRANCH_CODE'].setValue(data.ISSUE_BRANCH_CODE);
this.formData.controls['ISSUE_DATE'].setValue(data.ISSUE_DATE);
this.formData.controls['AUTO_MANUAL'].setValue(data.AUTO_MANUAL);
this.formData.controls['FROM_RANGE'].setValue(data.FROM_RANGE);
this.formData.controls['TO_RANGE'].setValue(data.TO_RANGE);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_STATIONARY_ISSUE_MASTERModel = <TBL_STATIONARY_ISSUE_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.SLNO = this.formData.get('SLNO').value;
request.STATIONARY_ID = this.formData.get('STATIONARY_ID').value;
request.TYPE = this.formData.get('TYPE').value;
request.ISSUE_BRANCH_NAME = this.formData.get('ISSUE_BRANCH_NAME').value;
request.ISSUE_BRANCH_CODE = this.formData.get('ISSUE_BRANCH_CODE').value;
request.ISSUE_DATE = this.formData.get('ISSUE_DATE').value;
request.AUTO_MANUAL = this.formData.get('AUTO_MANUAL').value;
request.FROM_RANGE = this.formData.get('FROM_RANGE').value;
request.TO_RANGE = this.formData.get('TO_RANGE').value;

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
        this.service.delete(id,"TBL_STATIONARY_ISSUE_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
