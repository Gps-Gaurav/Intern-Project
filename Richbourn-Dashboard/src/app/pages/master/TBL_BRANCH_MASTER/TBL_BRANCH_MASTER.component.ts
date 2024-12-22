import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TBL_BRANCH_MASTERModel } from './TBL_BRANCH_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-TBL_BRANCH_MASTER',
  templateUrl: './TBL_BRANCH_MASTER.component.html',
  styleUrls: ['./TBL_BRANCH_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */

export class TBL_BRANCH_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_BRANCH_MASTERModel[];
  requestModel :RequestModel = <RequestModel>{};
  term: any;
  startIndex:number=0;
  endIndex:number=0;
  totalRecords:number=0;
  page:number=1;
  pageSize:number=10;
  total$: Observable<number>;
  SelectedId:number=0;
  IsChecked:boolean;

  searchChanged: Subject<string> = new Subject<string>();
  // page
  currentpage: number;
  search: string = "";

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_BRANCH_MASTERModel>,private toastr: ToastrService) { 

    this.searchChanged
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(newText => {
      this.search = newText;
     this._fetchData();;
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BRANCH MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
STATE_CODE: ['', [Validators.required]],
STATE_NAME: ['', [Validators.required]],
MANAGER_NAME: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
CITY: ['', [Validators.required]],
PIN: ['', [Validators.required]],
STD_CODE: ['', [Validators.required]],
FAX_NO: ['', [Validators.required]],
PHONE_OFFICE: ['', [Validators.required]],
PHONE_RESI: ['', [Validators.required]],
MOBILE: ['', [Validators.required]],
PAGER: ['', [Validators.required]],
EMAIL: ['', [Validators.required]],
AGENT_BRANCH: ['', [Validators.required]],
REGIONAL_BRANCH: ['', [Validators.required]],
ZONE: ['', [Validators.required]],
ADDRESS_OF_REGIONAL_BRANCK: ['', [Validators.required]],
CASH_LIMIT: ['', [Validators.required]],
BANK_LIMIT: ['', [Validators.required]],
OPENING_DATE: ['', [Validators.required]],
CLOSING_DATE: ['', [Validators.required]],
STATION_CODE: ['', [Validators.required]],
STATION_NAME: ['', [Validators.required]],
ESI_DEDUCT: ['', [Validators.required]],
SALARY_QUIT: ['', [Validators.required]],
SHORTING_GROUP_CODE: ['', [Validators.required]],
ENTERBY: ['', [Validators.required]],
ENTERDATE: ['', [Validators.required]],
ADDRESS2: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_BRANCH_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
    this.service.getStoreList(this.requestModel).subscribe(response => {
      this.tableData = response.items;
      this.totalRecords = response.totalCount;
      this.startIndex = (this.page - 1) * this.pageSize + 1;
      this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
      if (this.endIndex > this.totalRecords) {
        this.endIndex = this.totalRecords;
      }
      this.total$ = new BehaviorSubject<number>(this.totalRecords)
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
    this.router.navigate(['/master/CREATE_BRANCH_MASTER']);
  }
  edit(data:number){
    this.router.navigate(['/master/CREATE_BRANCH_MASTER', { id: data }]);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_BRANCH_MASTERModel = <TBL_BRANCH_MASTERModel>{};
request.id = this.formData.get('ID').value;
request.brancH_CODE = this.formData.get('BRANCH_CODE').value;
request.brancH_NAME = this.formData.get('BRANCH_NAME').value;
request.STATE_CODE = this.formData.get('STATE_CODE').value;
request.STATE_NAME = this.formData.get('STATE_NAME').value;
request.MANAGER_NAME = this.formData.get('MANAGER_NAME').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.CITY = this.formData.get('CITY').value;
request.PIN = this.formData.get('PIN').value;
request.STD_CODE = this.formData.get('STD_CODE').value;
request.FAX_NO = this.formData.get('FAX_NO').value;
request.PHONE_OFFICE = this.formData.get('PHONE_OFFICE').value;
request.PHONE_RESI = this.formData.get('PHONE_RESI').value;
request.MOBILE = this.formData.get('MOBILE').value;
request.PAGER = this.formData.get('PAGER').value;
request.EMAIL = this.formData.get('EMAIL').value;
request.AGENT_BRANCH = this.formData.get('AGENT_BRANCH').value;
request.REGIONAL_BRANCH = this.formData.get('REGIONAL_BRANCH').value;
request.ZONE = this.formData.get('ZONE').value;
request.ADDRESS_OF_REGIONAL_BRANCK = this.formData.get('ADDRESS_OF_REGIONAL_BRANCK').value;
request.CASH_LIMIT = this.formData.get('CASH_LIMIT').value;
request.BANK_LIMIT = this.formData.get('BANK_LIMIT').value;
request.OPENING_DATE = this.formData.get('OPENING_DATE').value;
request.CLOSING_DATE = this.formData.get('CLOSING_DATE').value;
request.STATION_CODE = this.formData.get('STATION_CODE').value;
request.STATION_NAME = this.formData.get('STATION_NAME').value;
request.ESI_DEDUCT = this.formData.get('ESI_DEDUCT').value;
request.SALARY_QUIT = this.formData.get('SALARY_QUIT').value;
request.SHORTING_GROUP_CODE = this.formData.get('SHORTING_GROUP_CODE').value;
request.ENTERBY = this.formData.get('ENTERBY').value;
request.ENTERDATE = this.formData.get('ENTERDATE').value;
request.ADDRESS2 = this.formData.get('ADDRESS2').value;

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
        this.service.delete(id,"TBL_BRANCH_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }

  updateCheckBoxVal(item, eve) {
    this.IsChecked=false;
    this.SelectedId=0;
    this.tableData.map((m, i) => {
      if (m.primary_Id == item.primary_Id){
         this.tableData[i].IsChecked = eve.checked;
         this.IsChecked=eve.checked;
         this.SelectedId=item.primary_Id;
       }
       else{
        this.tableData[i].IsChecked=false;
       }
     });
   
  }
}
