import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TBL_TRANSIT_TIME_MASTERModel } from './TBL_TRANSIT_TIME_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-TBL_TRANSIT_TIME_MASTER',
  templateUrl: './TBL_TRANSIT_TIME_MASTER.component.html',
  styleUrls: ['./TBL_TRANSIT_TIME_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_TRANSIT_TIME_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_TRANSIT_TIME_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_TRANSIT_TIME_MASTERModel>,private toastr: ToastrService) { 

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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'TRANSIT TIME MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
// FROM_CODE: ['', [Validators.required]],
FROM_NAME: ['', [Validators.required]],
// TO_CODE: ['', [Validators.required]],
TO_NAME: ['', [Validators.required]],
TRANSIT_DAYS: ['', [Validators.required]],
DISTANCE: [''],
// ENTERBY: ['', [Validators.required]],
// ENTERDATE: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_TRANSIT_TIME_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    // this.requestModel.url = "TBL_TRANSIT_TIME_MASTER";
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

    this.requestModel.url = "TBL_TRANSIT_TIME_MASTER?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    this.router.navigate(['/master/insert_TBL_TRANSIT_TIME_MASTER']);
  }
  edit(data:Number){
    this.router.navigate(['/master/insert_TBL_TRANSIT_TIME_MASTER', { id: data }]);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_TRANSIT_TIME_MASTERModel = <TBL_TRANSIT_TIME_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.FROM_CODE = this.formData.get('FROM_CODE').value;
request.FROM_NAME = this.formData.get('FROM_NAME').value;
request.TO_CODE = this.formData.get('TO_CODE').value;
request.TO_NAME = this.formData.get('TO_NAME').value;
request.TRANSIT_DAYS = this.formData.get('TRANSIT_DAYS').value;
request.DISTANCE = this.formData.get('DISTANCE').value;
request.ENTERBY = this.formData.get('ENTERBY').value;
request.ENTERDATE = this.formData.get('ENTERDATE').value;

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
        this.service.delete(id,"TBL_TRANSIT_TIME_MASTER/id?id=").subscribe(response => {
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
