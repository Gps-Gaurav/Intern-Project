import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_ARRIVAL_BREAKUPModel } from './TBL_ARRIVAL_BREAKUP.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_ARRIVAL_BREAKUP',
  templateUrl: './TBL_ARRIVAL_BREAKUP.component.html',
  styleUrls: ['./TBL_ARRIVAL_BREAKUP.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_ARRIVAL_BREAKUPComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_ARRIVAL_BREAKUPModel[];
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
  search:String="";
  constructor(private modalService: NgbModal,private router:Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_ARRIVAL_BREAKUPModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ARRIVAL BREAKUP', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
CHALLAN_ID: ['', [Validators.required]],
LOT_NO_BILL: ['', [Validators.required]],
GARDEN_NAME: ['', [Validators.required]],
INVOICE_NO: ['', [Validators.required]],
DELIEVERY_PKG: ['', [Validators.required]],
FRESH_SHORTAGE: ['', [Validators.required]],
BROKEN_SHORTAGE: ['', [Validators.required]],
RETURNSS: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_ARRIVAL_BREAKUP?PageNo="+this.page+"&PageSize="+this.pageSize;
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

    this.requestModel.url = "TBL_ARRIVAL_BREAKUP?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    // this.requestModel.url = "TBL_ARRIVAL_BREAKUP";
    // this.service.getList(this.page,this.pageSize,this.requestModel.url).subscribe(response => {
    //    this.tableData = response.document.records;
    //   this.totalRecords = response.totalCount;
    //   this.startIndex = (this.page - 1) * this.pageSize + 1;
    //   this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    //   if (this.endIndex > this.totalRecords) {
    //       this.endIndex = this.totalRecords;
    //   }
    //   this.total$=new BehaviorSubject<number>(this.totalRecords)
    // });
  }

  loadPage(page: number) {
    console.log("pagechange",page)
    this.page=page;
    this._fetchData();
  }
  get form() {
    return this.formData.controls;
  }

  openModal() {
    this.router.navigate(['/master/insert_TBL_ARRIVAL_BREAKUP']);
  }
  edit(data:number){
    this.router.navigate(['/master/insert_TBL_ARRIVAL_BREAKUP', { id: data }]);

//     

   
//     this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_ARRIVAL_BREAKUPModel = <TBL_ARRIVAL_BREAKUPModel>{};
request.ID = this.formData.get('ID').value;
request.CHALLAN_ID = this.formData.get('CHALLAN_ID').value;
request.LOT_NO_BILL = this.formData.get('LOT_NO_BILL').value;
request.GARDEN_NAME = this.formData.get('GARDEN_NAME').value;
request.INVOICE_NO = this.formData.get('INVOICE_NO').value;
request.DELIEVERY_PKG = this.formData.get('DELIEVERY_PKG').value;
request.FRESH_SHORTAGE = this.formData.get('FRESH_SHORTAGE').value;
request.BROKEN_SHORTAGE = this.formData.get('BROKEN_SHORTAGE').value;
request.RETURNSS = this.formData.get('RETURNSS').value;
request.REMARKS = this.formData.get('REMARKS').value;

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
        this.service.delete(id,"TBL_ARRIVAL_BREAKUP/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
