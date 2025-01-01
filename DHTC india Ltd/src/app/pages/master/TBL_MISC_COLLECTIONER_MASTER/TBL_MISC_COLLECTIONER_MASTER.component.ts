import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_MISC_COLLECTIONER_MASTERModel } from './TBL_MISC_COLLECTIONER_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_MISC_COLLECTIONER_MASTER',
  templateUrl: './TBL_MISC_COLLECTIONER_MASTER.component.html',
  styleUrls: ['./TBL_MISC_COLLECTIONER_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_MISC_COLLECTIONER_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_MISC_COLLECTIONER_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_MISC_COLLECTIONER_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_MISC_COLLECTIONER_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
COLLECTIONER_CODE: ['', [Validators.required]],
COLLECTIONER_NAME: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
ADDRESS1: ['', [Validators.required]],
ADDRESS2: ['', [Validators.required]],
CITY: ['', [Validators.required]],
STATE: ['', [Validators.required]],
PIN_CODE: ['', [Validators.required]],
MOBILE_NO: ['', [Validators.required]],
ACC_CODE: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_MISC_COLLECTIONER_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_MISC_COLLECTIONER_MASTER";
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
    this.router.navigate(['/master/insert_TBL_MISC_COLLECTIONER_MASTER']);
  }
  edit(data:TBL_MISC_COLLECTIONER_MASTERModel,content: any){
     this.formData.controls['ID'].setValue(data.ID);
this.formData.controls['COLLECTIONER_CODE'].setValue(data.COLLECTIONER_CODE);
this.formData.controls['COLLECTIONER_NAME'].setValue(data.COLLECTIONER_NAME);
this.formData.controls['BRANCH_CODE'].setValue(data.BRANCH_CODE);
this.formData.controls['BRANCH_NAME'].setValue(data.BRANCH_NAME);
this.formData.controls['ADDRESS1'].setValue(data.ADDRESS1);
this.formData.controls['ADDRESS2'].setValue(data.ADDRESS2);
this.formData.controls['CITY'].setValue(data.CITY);
this.formData.controls['STATE'].setValue(data.STATE);
this.formData.controls['PIN_CODE'].setValue(data.PIN_CODE);
this.formData.controls['MOBILE_NO'].setValue(data.MOBILE_NO);
this.formData.controls['ACC_CODE'].setValue(data.ACC_CODE);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_MISC_COLLECTIONER_MASTERModel = <TBL_MISC_COLLECTIONER_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.COLLECTIONER_CODE = this.formData.get('COLLECTIONER_CODE').value;
request.COLLECTIONER_NAME = this.formData.get('COLLECTIONER_NAME').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.ADDRESS1 = this.formData.get('ADDRESS1').value;
request.ADDRESS2 = this.formData.get('ADDRESS2').value;
request.CITY = this.formData.get('CITY').value;
request.STATE = this.formData.get('STATE').value;
request.PIN_CODE = this.formData.get('PIN_CODE').value;
request.MOBILE_NO = this.formData.get('MOBILE_NO').value;
request.ACC_CODE = this.formData.get('ACC_CODE').value;

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
        this.service.delete(id,"TBL_MISC_COLLECTIONER_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
