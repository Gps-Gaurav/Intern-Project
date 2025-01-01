import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TBL_DRIVER_MASTERModel } from './TBL_DRIVER_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-TBL_DRIVER_MASTER',
  templateUrl: './TBL_DRIVER_MASTER.component.html',
  styleUrls: ['./TBL_DRIVER_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_DRIVER_MASTERComponent implements OnInit {
  SelectedId:number=0;
  IsChecked:boolean;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_DRIVER_MASTERModel[];
  requestModel :RequestModel = <RequestModel>{};
  term: any;
  startIndex:number=0;
  endIndex:number=0;
  totalRecords:number=0;
  page:number=1;
  pageSize:number=10;
  total$: Observable<number>;
  // page
  searchChanged: Subject<string> = new Subject<string>();

  currentpage: number;
  search: string = "";


  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_DRIVER_MASTERModel>,private toastr: ToastrService) {

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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'DRIVER MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
CODE: ['', [Validators.required]],
NAME: ['', [Validators.required]],
F_NAME: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
LICENCE_NO: ['', [Validators.required]],
LIC_VALID: ['', [Validators.required]],
LIC_ISSUE: ['', [Validators.required]],
PHONE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
OPERATOR: ['', [Validators.required]],
// ENTRY_DATE: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_DRIVER_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    // this.requestModel.url = "TBL_DRIVER_MASTER";
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

     
    this.requestModel.url = "TBL_DRIVER_MASTER?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    this.router.navigate(['/master/insert_TBL_DRIVER_MASTER']);
  }
  edit(data:Number){
    this.router.navigate(['/master/insert_TBL_DRIVER_MASTER', { id: data }]);

  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_DRIVER_MASTERModel = <TBL_DRIVER_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
request.CODE = this.formData.get('CODE').value;
request.NAME = this.formData.get('NAME').value;
request.F_NAME = this.formData.get('F_NAME').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.LICENCE_NO = this.formData.get('LICENCE_NO').value;
request.LIC_VALID = this.formData.get('LIC_VALID').value;
request.LIC_ISSUE = this.formData.get('LIC_ISSUE').value;
request.PHONE = this.formData.get('PHONE').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.OPERATOR = this.formData.get('OPERATOR').value;
// request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;

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
        this.service.delete(id,"TBL_DRIVER_MASTER/id?id=").subscribe(response => {
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
