import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_ACCOUNT_MASTERModel } from './TBL_ACCOUNT_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_ACCOUNT_MASTER',
  templateUrl: './TBL_ACCOUNT_MASTER.component.html',
  styleUrls: ['./TBL_ACCOUNT_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_ACCOUNT_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_ACCOUNT_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_ACCOUNT_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ACCOUNT MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
ACC_CODE: ['', [Validators.required]],
ACC_NAME: ['', [Validators.required]],
GRP_ID: ['', [Validators.required]],
SUB_GRP_ID: ['', [Validators.required]],
PARTY_ID: ['', [Validators.required]],
ACC_ADDRESS: ['', [Validators.required]],
PAN_NO: ['', [Validators.required]],
BANK_BRANCH_ID: ['', [Validators.required]],
AC_NO: ['', [Validators.required]],
OD_LIMIT: ['', [Validators.required]],
AVERAGE_BAL: ['', [Validators.required]],
OPENING_DATE: ['', [Validators.required]],
CLOSING_DATE: ['', [Validators.required]],
OPENING_BAL: ['', [Validators.required]],
BAL_TYPE: ['', [Validators.required]],
OPERATOR: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
DEFINE: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_ACCOUNT_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_ACCOUNT_MASTER";
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
    this.router.navigate(['/master/insert_TBL_ACCOUNT_MASTER']);
  }
  edit(data:number){
    this.router.navigate(['/master/insert_TBL_ACCOUNT_MASTER', { id: data }]);
  } 


  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_ACCOUNT_MASTERModel = <TBL_ACCOUNT_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.ACC_CODE = this.formData.get('ACC_CODE').value;
request.ACC_NAME = this.formData.get('ACC_NAME').value;
request.GRP_ID = this.formData.get('GRP_ID').value;
request.SUB_GRP_ID = this.formData.get('SUB_GRP_ID').value;
request.PARTY_ID = this.formData.get('PARTY_ID').value;
request.ACC_ADDRESS = this.formData.get('ACC_ADDRESS').value;
request.PAN_NO = this.formData.get('PAN_NO').value;
request.BANK_BRANCH_ID = this.formData.get('BANK_BRANCH_ID').value;
request.AC_NO = this.formData.get('AC_NO').value;
request.OD_LIMIT = this.formData.get('OD_LIMIT').value;
request.AVERAGE_BAL = this.formData.get('AVERAGE_BAL').value;
request.OPENING_DATE = this.formData.get('OPENING_DATE').value;
request.CLOSING_DATE = this.formData.get('CLOSING_DATE').value;
request.OPENING_BAL = this.formData.get('OPENING_BAL').value;
request.BAL_TYPE = this.formData.get('BAL_TYPE').value;
request.OPERATOR = this.formData.get('OPERATOR').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.DEFINE = this.formData.get('DEFINE').value;

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
        this.service.delete(id,"TBL_ACCOUNT_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }

  updateCheckBoxVal(item, eve) {
    debugger;
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
