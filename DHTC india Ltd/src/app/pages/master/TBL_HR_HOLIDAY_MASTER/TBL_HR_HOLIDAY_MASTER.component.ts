import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_HR_HOLIDAY_MASTERModel } from './TBL_HR_HOLIDAY_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_HR_HOLIDAY_MASTER',
  templateUrl: './TBL_HR_HOLIDAY_MASTER.component.html',
  styleUrls: ['./TBL_HR_HOLIDAY_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_HR_HOLIDAY_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_HR_HOLIDAY_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_HR_HOLIDAY_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_HR_HOLIDAY_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
YEARS: ['', [Validators.required]],
HOLIDAY_NAME: ['', [Validators.required]],
HOLI_DATE: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_HR_HOLIDAY_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_HR_HOLIDAY_MASTER";
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
    this.router.navigate(['/master/insert_TBL_HR_HOLIDAY_MASTER']);
  }
  edit(data:TBL_HR_HOLIDAY_MASTERModel,content: any){
     this.formData.controls['ID'].setValue(data.ID);
this.formData.controls['BRANCH_CODE'].setValue(data.BRANCH_CODE);
this.formData.controls['BRANCH_NAME'].setValue(data.BRANCH_NAME);
this.formData.controls['YEARS'].setValue(data.YEARS);
this.formData.controls['HOLIDAY_NAME'].setValue(data.HOLIDAY_NAME);
this.formData.controls['HOLI_DATE'].setValue(data.HOLI_DATE);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_HR_HOLIDAY_MASTERModel = <TBL_HR_HOLIDAY_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.YEARS = this.formData.get('YEARS').value;
request.HOLIDAY_NAME = this.formData.get('HOLIDAY_NAME').value;
request.HOLI_DATE = this.formData.get('HOLI_DATE').value;

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
        this.service.delete(id,"TBL_HR_HOLIDAY_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
