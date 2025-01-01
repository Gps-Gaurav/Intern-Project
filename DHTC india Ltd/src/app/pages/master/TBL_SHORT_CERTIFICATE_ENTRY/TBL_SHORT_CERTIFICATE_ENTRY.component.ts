import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_SHORT_CERTIFICATE_ENTRYModel } from './TBL_SHORT_CERTIFICATE_ENTRY.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_SHORT_CERTIFICATE_ENTRY',
  templateUrl: './TBL_SHORT_CERTIFICATE_ENTRY.component.html',
  styleUrls: ['./TBL_SHORT_CERTIFICATE_ENTRY.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_SHORT_CERTIFICATE_ENTRYComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_SHORT_CERTIFICATE_ENTRYModel[];
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
  search: string="";
  SelectedId:number=0;
  IsChecked:boolean;
  constructor(private modalService: NgbModal,private router:Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_SHORT_CERTIFICATE_ENTRYModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'SHORT CERTIFICATE ENTRY', active: true }];

    this.formData = this.formBuilder.group({
      CODE: ['', [Validators.required]],
CERTIFICATE_NO: ['', [Validators.required]],
FROM_BRANCH_CODE: ['', [Validators.required]],
FROM_BRANCH_NAME: ['', [Validators.required]],
D_Date: ['', [Validators.required]],
ENTRY_BY: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],
BILTYNO: ['', [Validators.required]],
BILTY_DATE: ['', [Validators.required]],
FROM_STATION_CODE: ['', [Validators.required]],
FROM_STATION_NAME: ['', [Validators.required]],
TO_STATION_CODE: ['', [Validators.required]],
TO_STATION_NAME: ['', [Validators.required]],
PKG: ['', [Validators.required]],
BILTY_WT: ['', [Validators.required]],
CODES: ['', [Validators.required]],
PARTY_NAME: ['', [Validators.required]],
PKG_BOOKED: ['', [Validators.required]],
DLY_PKG: ['', [Validators.required]],
PKG_SHORT: ['', [Validators.required]],
PKG_DAMAGE: ['', [Validators.required]],
WT_BOOKED: ['', [Validators.required]],
DELIVERED_WT: ['', [Validators.required]],
WT_SHORT: ['', [Validators.required]],
WT_DAMAGE: ['', [Validators.required]],
AMOUNT: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_SHORT_CERTIFICATE_ENTRY?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    //this.requestModel.url = "TBL_SHORT_CERTIFICATE_ENTRY";
    this.requestModel.url = "TBL_SHORT_CERTIFICATE_ENTRY?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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

  openModal() {
    this.router.navigate(['/master/insert_TBL_SHORT_CERTIFICATE_ENTRY']);
  }
  edit(data:number){
    this.router.navigate(['/master/insert_TBL_SHORT_CERTIFICATE_ENTRY', { id: data }]);

//     

   
//     this.modalService.open(content);
  }




  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_SHORT_CERTIFICATE_ENTRYModel = <TBL_SHORT_CERTIFICATE_ENTRYModel>{};
request.CODE = this.formData.get('CODE').value;
request.CERTIFICATE_NO = this.formData.get('CERTIFICATE_NO').value;
request.FROM_BRANCH_CODE = this.formData.get('FROM_BRANCH_CODE').value;
request.FROM_BRANCH_NAME = this.formData.get('FROM_BRANCH_NAME').value;
request.D_Date = this.formData.get('D_Date').value;
request.ENTRY_BY = this.formData.get('ENTRY_BY').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.REMARKS = this.formData.get('REMARKS').value;
request.BILTYNO = this.formData.get('BILTYNO').value;
request.BILTY_DATE = this.formData.get('BILTY_DATE').value;
request.FROM_STATION_CODE = this.formData.get('FROM_STATION_CODE').value;
request.FROM_STATION_NAME = this.formData.get('FROM_STATION_NAME').value;
request.TO_STATION_CODE = this.formData.get('TO_STATION_CODE').value;
request.TO_STATION_NAME = this.formData.get('TO_STATION_NAME').value;
request.PKG = this.formData.get('PKG').value;
request.BILTY_WT = this.formData.get('BILTY_WT').value;
request.CODES = this.formData.get('CODES').value;
request.PARTY_NAME = this.formData.get('PARTY_NAME').value;
request.PKG_BOOKED = this.formData.get('PKG_BOOKED').value;
request.DLY_PKG = this.formData.get('DLY_PKG').value;
request.PKG_SHORT = this.formData.get('PKG_SHORT').value;
request.PKG_DAMAGE = this.formData.get('PKG_DAMAGE').value;
request.WT_BOOKED = this.formData.get('WT_BOOKED').value;
request.DELIVERED_WT = this.formData.get('DELIVERED_WT').value;
request.WT_SHORT = this.formData.get('WT_SHORT').value;
request.WT_DAMAGE = this.formData.get('WT_DAMAGE').value;
request.AMOUNT = this.formData.get('AMOUNT').value;

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
        this.service.delete(id,"TBL_SHORT_CERTIFICATE_ENTRY/id?id=").subscribe(response => {
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
