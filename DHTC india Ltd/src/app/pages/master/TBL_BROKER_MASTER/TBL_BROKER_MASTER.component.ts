import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TBL_BROKER_MASTERModel } from './TBL_BROKER_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-TBL_BROKER_MASTER',
  templateUrl: './TBL_BROKER_MASTER.component.html',
  styleUrls: ['./TBL_BROKER_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_BROKER_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_BROKER_MASTERModel[];
  requestModel :RequestModel = <RequestModel>{};
  term: any;
  startIndex:number=0;
  endIndex:number=0;
  totalRecords:number=0;
  page:number=1;
  pageSize:number=10;
  total$: Observable<number>;
  // page
 
  SelectedId:number=0;
  IsChecked:boolean;

 
  searchChanged: Subject<string> = new Subject<string>();

  currentpage: number;
  search: string = "";

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_BROKER_MASTERModel>,private toastr: ToastrService) { 

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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BROKER MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
BR_CODE: ['', [Validators.required]],
BR_NAME: ['', [Validators.required]],
CONTACT_PERSON: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
PHONE_OFF1: ['', [Validators.required]],
PHONE_OFF2: ['', [Validators.required]],
PHONE_RES1: ['', [Validators.required]],
PHONE_RES2: ['', [Validators.required]],
DESTINATE_COMPANY: ['', [Validators.required]],
COM_ADDRESS: ['', [Validators.required]],
COM_CONTACT_PERSON: ['', [Validators.required]],
COM_PHONE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
STATUS: ['', [Validators.required]],
STDNO: ['', [Validators.required]],
FAXNO: ['', [Validators.required]],
PAGER: ['', [Validators.required]],
MOBILE: ['', [Validators.required]],
ENTER_DATE: ['', [Validators.required]],
ENTER_BY: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_BROKER_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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

    this.requestModel.url = "TBL_BROKER_MASTER?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    this.router.navigate(['/master/insert_TBL_BROKER_MASTER']);
  }
  edit(data:Number){
    this.router.navigate(['/master/insert_TBL_BROKER_MASTER', { id: data }]);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_BROKER_MASTERModel = <TBL_BROKER_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.BR_CODE = this.formData.get('BR_CODE').value;
request.BR_NAME = this.formData.get('BR_NAME').value;
request.CONTACT_PERSON = this.formData.get('CONTACT_PERSON').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.PHONE_OFF1 = this.formData.get('PHONE_OFF1').value;
request.PHONE_OFF2 = this.formData.get('PHONE_OFF2').value;
request.PHONE_RES1 = this.formData.get('PHONE_RES1').value;
request.PHONE_RES2 = this.formData.get('PHONE_RES2').value;
request.DESTINATE_COMPANY = this.formData.get('DESTINATE_COMPANY').value;
request.COM_ADDRESS = this.formData.get('COM_ADDRESS').value;
request.COM_CONTACT_PERSON = this.formData.get('COM_CONTACT_PERSON').value;
request.COM_PHONE = this.formData.get('COM_PHONE').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.STATUS = this.formData.get('STATUS').value;
request.STDNO = this.formData.get('STDNO').value;
request.FAXNO = this.formData.get('FAXNO').value;
request.PAGER = this.formData.get('PAGER').value;
request.MOBILE = this.formData.get('MOBILE').value;
request.ENTER_DATE = this.formData.get('ENTER_DATE').value;
request.ENTER_BY = this.formData.get('ENTER_BY').value;

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
        this.service.delete(id,"TBL_BROKER_MASTER/id?id=").subscribe(response => {
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
