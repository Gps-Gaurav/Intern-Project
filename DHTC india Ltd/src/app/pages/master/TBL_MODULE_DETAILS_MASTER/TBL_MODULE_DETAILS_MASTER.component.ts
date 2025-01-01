import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_MODULE_DETAILS_MASTERModel } from './TBL_MODULE_DETAILS_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_MODULE_DETAILS_MASTER',
  templateUrl: './TBL_MODULE_DETAILS_MASTER.component.html',
  styleUrls: ['./TBL_MODULE_DETAILS_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_MODULE_DETAILS_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_MODULE_DETAILS_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_MODULE_DETAILS_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_MODULE_DETAILS_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
USER_CODE: ['', [Validators.required]],
USER_NAME: ['', [Validators.required]],
MODULE_NAME: ['', [Validators.required]],
FORMS_NAME: ['', [Validators.required]],
CAT: ['', [Validators.required]],
ADD_ENTRY: ['', [Validators.required]],
EDIT_ENTRY: ['', [Validators.required]],
DELETE_ENTRY: ['', [Validators.required]],
VIEW_DATA: ['', [Validators.required]],
VIEW_FORM: ['', [Validators.required]],
FROM_DATE: ['', [Validators.required]],
TO_DATE: ['', [Validators.required]],
ADD_DAYS_BEFORE: ['', [Validators.required]],
ADD_DAYS_AFTER: ['', [Validators.required]],
EDIT_DAYS_BEFORE: ['', [Validators.required]],
EDIT_DAYS_AFTER: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_MODULE_DETAILS_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_MODULE_DETAILS_MASTER";
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
    this.router.navigate(['/master/insert_TBL_MODULE_DETAILS_MASTER']);
  }
  edit(data:TBL_MODULE_DETAILS_MASTERModel,content: any){
     this.formData.controls['ID'].setValue(data.ID);
this.formData.controls['USER_CODE'].setValue(data.USER_CODE);
this.formData.controls['USER_NAME'].setValue(data.USER_NAME);
this.formData.controls['MODULE_NAME'].setValue(data.MODULE_NAME);
this.formData.controls['FORMS_NAME'].setValue(data.FORMS_NAME);
this.formData.controls['CAT'].setValue(data.CAT);
this.formData.controls['ADD_ENTRY'].setValue(data.ADD_ENTRY);
this.formData.controls['EDIT_ENTRY'].setValue(data.EDIT_ENTRY);
this.formData.controls['DELETE_ENTRY'].setValue(data.DELETE_ENTRY);
this.formData.controls['VIEW_DATA'].setValue(data.VIEW_DATA);
this.formData.controls['VIEW_FORM'].setValue(data.VIEW_FORM);
this.formData.controls['FROM_DATE'].setValue(data.FROM_DATE);
this.formData.controls['TO_DATE'].setValue(data.TO_DATE);
this.formData.controls['ADD_DAYS_BEFORE'].setValue(data.ADD_DAYS_BEFORE);
this.formData.controls['ADD_DAYS_AFTER'].setValue(data.ADD_DAYS_AFTER);
this.formData.controls['EDIT_DAYS_BEFORE'].setValue(data.EDIT_DAYS_BEFORE);
this.formData.controls['EDIT_DAYS_AFTER'].setValue(data.EDIT_DAYS_AFTER);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_MODULE_DETAILS_MASTERModel = <TBL_MODULE_DETAILS_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.USER_CODE = this.formData.get('USER_CODE').value;
request.USER_NAME = this.formData.get('USER_NAME').value;
request.MODULE_NAME = this.formData.get('MODULE_NAME').value;
request.FORMS_NAME = this.formData.get('FORMS_NAME').value;
request.CAT = this.formData.get('CAT').value;
request.ADD_ENTRY = this.formData.get('ADD_ENTRY').value;
request.EDIT_ENTRY = this.formData.get('EDIT_ENTRY').value;
request.DELETE_ENTRY = this.formData.get('DELETE_ENTRY').value;
request.VIEW_DATA = this.formData.get('VIEW_DATA').value;
request.VIEW_FORM = this.formData.get('VIEW_FORM').value;
request.FROM_DATE = this.formData.get('FROM_DATE').value;
request.TO_DATE = this.formData.get('TO_DATE').value;
request.ADD_DAYS_BEFORE = this.formData.get('ADD_DAYS_BEFORE').value;
request.ADD_DAYS_AFTER = this.formData.get('ADD_DAYS_AFTER').value;
request.EDIT_DAYS_BEFORE = this.formData.get('EDIT_DAYS_BEFORE').value;
request.EDIT_DAYS_AFTER = this.formData.get('EDIT_DAYS_AFTER').value;

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
        this.service.delete(id,"TBL_MODULE_DETAILS_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
