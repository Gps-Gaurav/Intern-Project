import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TBL_PARTY_MASTERModel } from './TBL_PARTY_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-TBL_PARTY_MASTER',
  templateUrl: './TBL_PARTY_MASTER.component.html',
  styleUrls: ['./TBL_PARTY_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_PARTY_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_PARTY_MASTERModel[];
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
  // page
  currentpage: number;
  search: string = "";

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_PARTY_MASTERModel>,private toastr: ToastrService) { 

    
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
    this.breadCrumbItems = [{ label: 'PARTY MASTER' }, { label: 'PARTY MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
BRANCH_AGENT_CODE: ['', [Validators.required]],
BRANCH_AGENT_NAME: ['', [Validators.required]],
PARTY_CODE: ['', [Validators.required]],
PARTY_NAME: ['', [Validators.required]],
GROUP_CODE: ['', [Validators.required]],
GROUP_NAME: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
CITY: ['', [Validators.required]],
PIN: ['', [Validators.required]],
STATE: ['', [Validators.required]],
CONTACT_PERSON: ['', [Validators.required]],
PHONE_OFFICE: ['', [Validators.required]],
PHONE_RESIDENCE: ['', [Validators.required]],
MOBILE: ['', [Validators.required]],
FAX: ['', [Validators.required]],
EMAIL: ['', [Validators.required]],
PARTY_TYPE: ['', [Validators.required]],
OPERATOR: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
PAYMENT_DAY: ['', [Validators.required]],
INSURANCE: ['', [Validators.required]],
INS_FROM_DATE: ['', [Validators.required]],
INS_TO_DATE: ['', [Validators.required]],
CST_NO: ['', [Validators.required]],
DATE: ['', [Validators.required]],
VAT: ['', [Validators.required]],
RISK: ['', [Validators.required]],
SERVICE_TAX: ['', [Validators.required]],
SERVICE_TAX_BY: ['', [Validators.required]],
PARTY_REG_NO: ['', [Validators.required]],
PAYMODE: ['', [Validators.required]],
BILLEDAT: ['', [Validators.required]],
ADDRESS2: ['', [Validators.required]],
PANNO: ['', [Validators.required]],
GST1: ['', [Validators.required]],
GST2: ['', [Validators.required]],
GST3: ['', [Validators.required]],
GSTNO: ['', [Validators.required]],
TANNO: ['', [Validators.required]],
STATE_CODE: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_PARTY_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    
     
    this.requestModel.url = "TBL_PARTY_MASTER?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    this.router.navigate(['/master/insert_TBL_PARTY_MASTER']);
  }
  edit(data:Number){
    this.router.navigate(['/master/insert_TBL_PARTY_MASTER', { id: data }]);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_PARTY_MASTERModel = <TBL_PARTY_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.BRANCH_AGENT_CODE = this.formData.get('BRANCH_AGENT_CODE').value;
request.BRANCH_AGENT_NAME = this.formData.get('BRANCH_AGENT_NAME').value;
request.PARTY_CODE = this.formData.get('PARTY_CODE').value;
request.PARTY_NAME = this.formData.get('PARTY_NAME').value;
request.GROUP_CODE = this.formData.get('GROUP_CODE').value;
request.GROUP_NAME = this.formData.get('GROUP_NAME').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.CITY = this.formData.get('CITY').value;
request.PIN = this.formData.get('PIN').value;
request.STATE = this.formData.get('STATE').value;
request.CONTACT_PERSON = this.formData.get('CONTACT_PERSON').value;
request.PHONE_OFFICE = this.formData.get('PHONE_OFFICE').value;
request.PHONE_RESIDENCE = this.formData.get('PHONE_RESIDENCE').value;
request.MOBILE = this.formData.get('MOBILE').value;
request.FAX = this.formData.get('FAX').value;
request.EMAIL = this.formData.get('EMAIL').value;
request.PARTY_TYPE = this.formData.get('PARTY_TYPE').value;
request.OPERATOR = this.formData.get('OPERATOR').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.PAYMENT_DAY = this.formData.get('PAYMENT_DAY').value;
request.INSURANCE = this.formData.get('INSURANCE').value;
request.INS_FROM_DATE = this.formData.get('INS_FROM_DATE').value;
request.INS_TO_DATE = this.formData.get('INS_TO_DATE').value;
request.CST_NO = this.formData.get('CST_NO').value;
request.DATE = this.formData.get('DATE').value;
request.VAT = this.formData.get('VAT').value;
request.RISK = this.formData.get('RISK').value;
request.SERVICE_TAX = this.formData.get('SERVICE_TAX').value;
request.SERVICE_TAX_BY = this.formData.get('SERVICE_TAX_BY').value;
request.PARTY_REG_NO = this.formData.get('PARTY_REG_NO').value;
request.PAYMODE = this.formData.get('PAYMODE').value;
request.BILLEDAT = this.formData.get('BILLEDAT').value;
request.ADDRESS2 = this.formData.get('ADDRESS2').value;
request.PANNO = this.formData.get('PANNO').value;
request.GST1 = this.formData.get('GST1').value;
request.GST2 = this.formData.get('GST2').value;
request.GST3 = this.formData.get('GST3').value;
request.GSTNO = this.formData.get('GSTNO').value;
request.TANNO = this.formData.get('TANNO').value;
request.STATE_CODE = this.formData.get('STATE_CODE').value;

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
        this.service.delete(id,"TBL_PARTY_MASTER/id?id=").subscribe(response => {
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
