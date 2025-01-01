import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_FINANCE_CARD_MASTERModel } from './TBL_FINANCE_CARD_MASTER.model';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_FINANCE_CARD_MASTER',
  templateUrl: './TBL_FINANCE_CARD_MASTER.component.html',
  styleUrls: ['./TBL_FINANCE_CARD_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_FINANCE_CARD_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_FINANCE_CARD_MASTERModel[];
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
  // page
  currentpage: number;

  constructor(private modalService: NgbModal,private router: Router,
    private validservice:ResourceService<any>,
     private formBuilder: FormBuilder,private service:ResourceService<TBL_FINANCE_CARD_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'CARD MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
// BRANCH_NAME: ['', [Validators.required]],
CARD_TYPE: ['', [Validators.required]],
CARD_KEY: ['', [Validators.required]],
CARD_NO: ['', [Validators.required]],
VALID_FROM: ['', [Validators.required]],
VALID_TO: ['', [Validators.required]],
PIN: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
// ENTRY_DATE: ['', [Validators.required]],
// ENTRY_BY: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_FINANCE_CARD_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_FINANCE_CARD_MASTER";
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
    this.router.navigate(['/master/insert_TBL_FINANCE_CARD_MASTER']);
  }
  edit(data:number){
    this.router.navigate(['/master/insert_TBL_FINANCE_CARD_MASTER', { id: data }]);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_FINANCE_CARD_MASTERModel = <TBL_FINANCE_CARD_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
// request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.CARD_TYPE = this.formData.get('CARD_TYPE').value;
request.CARD_KEY = this.formData.get('CARD_KEY').value;
request.CARD_NO = this.formData.get('CARD_NO').value;
request.VALID_FROM = this.formData.get('VALID_FROM').value;
request.VALID_TO = this.formData.get('VALID_TO').value;
request.PIN = this.formData.get('PIN').value;
request.REMARKS = this.formData.get('REMARKS').value;
// request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
// request.ENTRY_BY = this.formData.get('ENTRY_BY').value;

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
        this.service.delete(id,"TBL_FINANCE_CARD_MASTER/id?id=").subscribe(response => {
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
