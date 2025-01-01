import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_USER_MASTERModel } from './TBL_USER_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_USER_MASTER',
  templateUrl: './TBL_USER_MASTER.component.html',
  styleUrls: ['./TBL_USER_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_USER_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_USER_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_USER_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_USER_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      USER_ID: ['', [Validators.required]],
USER_NAME: ['', [Validators.required]],
NAME: ['', [Validators.required]],
PASSWORD: ['', [Validators.required]],
ISACTIVE: ['', [Validators.required]],
LAST_LOGIN_DD_TT: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
USER_TYPE: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_USER_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_USER_MASTER";
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
    this.router.navigate(['/master/insert_TBL_USER_MASTER']);
  }
  edit(data:TBL_USER_MASTERModel,content: any){
     this.formData.controls['USER_ID'].setValue(data.USER_ID);
this.formData.controls['USER_NAME'].setValue(data.USER_NAME);
this.formData.controls['NAME'].setValue(data.NAME);
this.formData.controls['PASSWORD'].setValue(data.PASSWORD);
this.formData.controls['ISACTIVE'].setValue(data.ISACTIVE);
this.formData.controls['LAST_LOGIN_DD_TT'].setValue(data.LAST_LOGIN_DD_TT);
this.formData.controls['ENTRY_DATE'].setValue(data.ENTRY_DATE);
this.formData.controls['USER_TYPE'].setValue(data.USER_TYPE);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_USER_MASTERModel = <TBL_USER_MASTERModel>{};
request.USER_ID = this.formData.get('USER_ID').value;
request.USER_NAME = this.formData.get('USER_NAME').value;
request.NAME = this.formData.get('NAME').value;
request.PASSWORD = this.formData.get('PASSWORD').value;
request.ISACTIVE = this.formData.get('ISACTIVE').value;
request.LAST_LOGIN_DD_TT = this.formData.get('LAST_LOGIN_DD_TT').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.USER_TYPE = this.formData.get('USER_TYPE').value;

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
        this.service.delete(id,"TBL_USER_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
