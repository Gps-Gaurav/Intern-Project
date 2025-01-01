import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TBL_TRUCK_MASTERModel } from './TBL_TRUCK_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-TBL_TRUCK_MASTER',
  templateUrl: './TBL_TRUCK_MASTER.component.html',
  styleUrls: ['./TBL_TRUCK_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_TRUCK_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_TRUCK_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_TRUCK_MASTERModel>,private toastr: ToastrService) {

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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'TRUCK MASTER', active: true }];

    this.formData = this.formBuilder.group({
      CODE: ['', [Validators.required]],
LNO1: ['', [Validators.required]],
LNO2: ['', [Validators.required]],
LNO3: ['', [Validators.required]],
BLACK_LISTED: ['', [Validators.required]],
CHASSIS_NO: ['', [Validators.required]],
GROUPS: ['', [Validators.required]],
ENGINE_NO: ['', [Validators.required]],
REGAT: ['', [Validators.required]],
BODY_TYPE: ['', [Validators.required]],
MAKE: ['', [Validators.required]],
MODEL: ['', [Validators.required]],
COLOR: ['', [Validators.required]],
PERMIT: ['', [Validators.required]],
DATE: ['', [Validators.required]],
VALID_STATE: ['', [Validators.required]],
INSURANCE: ['', [Validators.required]],
POLICY_BO: ['', [Validators.required]],
POLICY_VALID: ['', [Validators.required]],
ADDRESS: ['', [Validators.required]],
DIVNNO: ['', [Validators.required]],
HIGHT: ['', [Validators.required]],
LENGTH: ['', [Validators.required]],
WIDTH: ['', [Validators.required]],
LODING: ['', [Validators.required]],
UNLODING: ['', [Validators.required]],
FITNESS_VALID: ['', [Validators.required]],
TAX_TOKEN_NO: ['', [Validators.required]],
TAX_ISSUE_FROM: ['', [Validators.required]],
TAX_VALID_UPTO: ['', [Validators.required]],
VEHICLE_TYPE: ['', [Validators.required]],
OWNER_NAME: ['', [Validators.required]],
SONE_OF: ['', [Validators.required]],
PAN: ['', [Validators.required]],
ADDRES_PERM: ['', [Validators.required]],
ADDRESS_TEMP: ['', [Validators.required]],
PHONE: ['', [Validators.required]],
LAST_INST: ['', [Validators.required]],
FINANCER_NAME: ['', [Validators.required]],
FINANCER_ADDRESS: ['', [Validators.required]],
FINANCER_SON_OF: ['', [Validators.required]],
PINANCER_PHONE: ['', [Validators.required]],
DRIVER_CODE: ['', [Validators.required]],
DRIVER_NAME: ['', [Validators.required]],
ENTRY_BY: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
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
    this.requestModel.url = "SP/sp_get_list_TBL_TRUCK_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    // this.requestModel.url = "TBL_TRUCK_MASTER";
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

    this.requestModel.url = "TBL_TRUCK_MASTER?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    this.router.navigate(['/master/insert_TBL_TRUCK_MASTER']);
  }
  edit(data:Number){
    this.router.navigate(['/master/insert_TBL_TRUCK_MASTER', { id: data }]);
    
  }

  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_TRUCK_MASTERModel = <TBL_TRUCK_MASTERModel>{};
request.CODE = this.formData.get('CODE').value;
request.LNO1 = this.formData.get('LNO1').value;
request.LNO2 = this.formData.get('LNO2').value;
request.LNO3 = this.formData.get('LNO3').value;
request.BLACK_LISTED = this.formData.get('BLACK_LISTED').value;
request.CHASSIS_NO = this.formData.get('CHASSIS_NO').value;
request.GROUPS = this.formData.get('GROUPS').value;
request.ENGINE_NO = this.formData.get('ENGINE_NO').value;
request.REGAT = this.formData.get('REGAT').value;
request.BODY_TYPE = this.formData.get('BODY_TYPE').value;
request.MAKE = this.formData.get('MAKE').value;
request.MODEL = this.formData.get('MODEL').value;
request.COLOR = this.formData.get('COLOR').value;
request.PERMIT = this.formData.get('PERMIT').value;
request.DATE = this.formData.get('DATE').value;
request.VALID_STATE = this.formData.get('VALID_STATE').value;
request.INSURANCE = this.formData.get('INSURANCE').value;
request.POLICY_BO = this.formData.get('POLICY_BO').value;
request.POLICY_VALID = this.formData.get('POLICY_VALID').value;
request.ADDRESS = this.formData.get('ADDRESS').value;
request.DIVNNO = this.formData.get('DIVNNO').value;
request.HIGHT = this.formData.get('HIGHT').value;
request.LENGTH = this.formData.get('LENGTH').value;
request.WIDTH = this.formData.get('WIDTH').value;
request.LODING = this.formData.get('LODING').value;
request.UNLODING = this.formData.get('UNLODING').value;
request.FITNESS_VALID = this.formData.get('FITNESS_VALID').value;
request.TAX_TOKEN_NO = this.formData.get('TAX_TOKEN_NO').value;
request.TAX_ISSUE_FROM = this.formData.get('TAX_ISSUE_FROM').value;
request.TAX_VALID_UPTO = this.formData.get('TAX_VALID_UPTO').value;
request.VEHICLE_TYPE = this.formData.get('VEHICLE_TYPE').value;
request.OWNER_NAME = this.formData.get('OWNER_NAME').value;
request.SONE_OF = this.formData.get('SONE_OF').value;
request.PAN = this.formData.get('PAN').value;
request.ADDRES_PERM = this.formData.get('ADDRES_PERM').value;
request.ADDRESS_TEMP = this.formData.get('ADDRESS_TEMP').value;
request.PHONE = this.formData.get('PHONE').value;
request.LAST_INST = this.formData.get('LAST_INST').value;
request.FINANCER_NAME = this.formData.get('FINANCER_NAME').value;
request.FINANCER_ADDRESS = this.formData.get('FINANCER_ADDRESS').value;
request.FINANCER_SON_OF = this.formData.get('FINANCER_SON_OF').value;
request.PINANCER_PHONE = this.formData.get('PINANCER_PHONE').value;
request.DRIVER_CODE = this.formData.get('DRIVER_CODE').value;
request.DRIVER_NAME = this.formData.get('DRIVER_NAME').value;
request.ENTRY_BY = this.formData.get('ENTRY_BY').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
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
        this.service.delete(id,"TBL_TRUCK_MASTER/CODE?CODE=").subscribe(response => {
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
