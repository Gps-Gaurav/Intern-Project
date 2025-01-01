import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TBL_GROUP_MASTERModel } from './TBL_GROUP_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_GROUP_MASTER',
  templateUrl: './TBL_GROUP_MASTER.component.html',
  styleUrls: ['./TBL_GROUP_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_GROUP_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_GROUP_MASTERModel[];
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
  SelectedId:number=0;
  IsChecked:boolean;

  searchChanged: Subject<string> = new Subject<string>();

  
  search: string = "";


  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_GROUP_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'GROUP MASTER', active: true }];

    this.formData = this.formBuilder.group({
       ID: ['', [Validators.required]],
GROUP_CODE: ['', [Validators.required]],
GROUP_NAME: ['', [Validators.required]],
CONTACT_PERSON: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
CITY: ['', [Validators.required]],
PIN: ['', [Validators.required]],
STATE: ['', [Validators.required]],
PHONE_OFFICE: ['', [Validators.required]],
PHONE_RESIDENCE: ['', [Validators.required]],
MOBILE: ['', [Validators.required]],
FAX: ['', [Validators.required]],
EMAIL: ['', [Validators.required]],
GROUP_TYPE: ['', [Validators.required]],
IS_CONTACT_GROUP: ['', [Validators.required]],
HAMAIL_TERM: ['', [Validators.required]],
HAMAIL_REMARKS: ['', [Validators.required]],
UNLOAD_TERM: ['', [Validators.required]],
UNLOAD_REMARKS: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
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
    this.requestModel.url = "SP/sp_get_list_TBL_GROUP_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    // this.requestModel.url = "TBL_GROUP_MASTER";
    // this.service.getList(this.page,this.pageSize,this.requestModel.url).subscribe(response => {
    //    this.tableData = response.document.records;
    //   this.totalRecords = response.document.totalRecords;
    //   this.startIndex = (this.page - 1) * this.pageSize + 1;
    //   this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    //   if (this.endIndex > this.totalRecords) {
    //       this.endIndex = this.totalRecords;
    //   }
    //   this.total$=new BehaviorSubject<number>(this.totalRecords)
    // });

    this.requestModel.url = "TBL_GROUP_MASTER?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    this.router.navigate(['/master/insert_TBL_GROUP_MASTER']);
  }
  edit(data:Number){
    this.router.navigate(['/master/insert_TBL_GROUP_MASTER', { id: data }]);

  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_GROUP_MASTERModel = <TBL_GROUP_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.GROUP_CODE = this.formData.get('GROUP_CODE').value;
request.GROUP_NAME = this.formData.get('GROUP_NAME').value;
request.CONTACT_PERSON = this.formData.get('CONTACT_PERSON').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.CITY = this.formData.get('CITY').value;
request.PIN = this.formData.get('PIN').value;
request.STATE = this.formData.get('STATE').value;
request.PHONE_OFFICE = this.formData.get('PHONE_OFFICE').value;
request.PHONE_RESIDENCE = this.formData.get('PHONE_RESIDENCE').value;
request.MOBILE = this.formData.get('MOBILE').value;
request.FAX = this.formData.get('FAX').value;
request.EMAIL = this.formData.get('EMAIL').value;
request.GROUP_TYPE = this.formData.get('GROUP_TYPE').value;
request.IS_CONTACT_GROUP = this.formData.get('IS_CONTACT_GROUP').value;
request.HAMAIL_TERM = this.formData.get('HAMAIL_TERM').value;
request.HAMAIL_REMARKS = this.formData.get('HAMAIL_REMARKS').value;
request.UNLOAD_TERM = this.formData.get('UNLOAD_TERM').value;
request.UNLOAD_REMARKS = this.formData.get('UNLOAD_REMARKS').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
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
        this.service.delete(id,"TBL_GROUP_MASTER/id?id=").subscribe(response => {
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
