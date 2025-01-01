import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_CHARGE_MASTERModel } from './TBL_CHARGE_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_CHARGE_MASTER',
  templateUrl: './TBL_CHARGE_MASTER.component.html',
  styleUrls: ['./TBL_CHARGE_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_CHARGE_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_CHARGE_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_CHARGE_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_CHARGE_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      CODE: ['', [Validators.required]],
ITEMCODE: ['', [Validators.required]],
ITEMNAME: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
mode: ['', [Validators.required]],
loadcharge: ['', [Validators.required]],
unloadcharge: ['', [Validators.required]],
L_PKG_CHARGE: ['', [Validators.required]],
U_PKG_CHARGE: ['', [Validators.required]],
L_WT_CHARGE: ['', [Validators.required]],
U_WT_CHARGE: ['', [Validators.required]],
L_TON_CHARGE: ['', [Validators.required]],
U_TON_CHARGE: ['', [Validators.required]],
L_TRUCK_CH_WT: ['', [Validators.required]],
U_TRUCK_CH_WT: ['', [Validators.required]],
L_TRUCK_LT_WT: ['', [Validators.required]],
U_TRUCK_LT_WT: ['', [Validators.required]],
L_TRUCK_LT_PK: ['', [Validators.required]],
U_TRUCK_LT_PK: ['', [Validators.required]],
L_TRUCK_CH_PK: ['', [Validators.required]],
U_TRUCK_CH_PK: ['', [Validators.required]],
L_MIM_CH: ['', [Validators.required]],
U_MIM_CH: ['', [Validators.required]],
L_TYPE: ['', [Validators.required]],
U_TYPE: ['', [Validators.required]],
L_QTY: ['', [Validators.required]],
U_QTY: ['', [Validators.required]],
ENTER_DATE: ['', [Validators.required]],
ENTER_BY: ['', [Validators.required]],
COVER: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_CHARGE_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_CHARGE_MASTER";
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
    this.router.navigate(['/master/insert_TBL_CHARGE_MASTER']);
  }
  edit(data:TBL_CHARGE_MASTERModel,content: any){
     this.formData.controls['CODE'].setValue(data.CODE);
this.formData.controls['ITEMCODE'].setValue(data.ITEMCODE);
this.formData.controls['ITEMNAME'].setValue(data.ITEMNAME);
this.formData.controls['BRANCH_CODE'].setValue(data.BRANCH_CODE);
this.formData.controls['BRANCH_NAME'].setValue(data.BRANCH_NAME);
this.formData.controls['mode'].setValue(data.mode);
this.formData.controls['loadcharge'].setValue(data.loadcharge);
this.formData.controls['unloadcharge'].setValue(data.unloadcharge);
this.formData.controls['L_PKG_CHARGE'].setValue(data.L_PKG_CHARGE);
this.formData.controls['U_PKG_CHARGE'].setValue(data.U_PKG_CHARGE);
this.formData.controls['L_WT_CHARGE'].setValue(data.L_WT_CHARGE);
this.formData.controls['U_WT_CHARGE'].setValue(data.U_WT_CHARGE);
this.formData.controls['L_TON_CHARGE'].setValue(data.L_TON_CHARGE);
this.formData.controls['U_TON_CHARGE'].setValue(data.U_TON_CHARGE);
this.formData.controls['L_TRUCK_CH_WT'].setValue(data.L_TRUCK_CH_WT);
this.formData.controls['U_TRUCK_CH_WT'].setValue(data.U_TRUCK_CH_WT);
this.formData.controls['L_TRUCK_LT_WT'].setValue(data.L_TRUCK_LT_WT);
this.formData.controls['U_TRUCK_LT_WT'].setValue(data.U_TRUCK_LT_WT);
this.formData.controls['L_TRUCK_LT_PK'].setValue(data.L_TRUCK_LT_PK);
this.formData.controls['U_TRUCK_LT_PK'].setValue(data.U_TRUCK_LT_PK);
this.formData.controls['L_TRUCK_CH_PK'].setValue(data.L_TRUCK_CH_PK);
this.formData.controls['U_TRUCK_CH_PK'].setValue(data.U_TRUCK_CH_PK);
this.formData.controls['L_MIM_CH'].setValue(data.L_MIM_CH);
this.formData.controls['U_MIM_CH'].setValue(data.U_MIM_CH);
this.formData.controls['L_TYPE'].setValue(data.L_TYPE);
this.formData.controls['U_TYPE'].setValue(data.U_TYPE);
this.formData.controls['L_QTY'].setValue(data.L_QTY);
this.formData.controls['U_QTY'].setValue(data.U_QTY);
this.formData.controls['ENTER_DATE'].setValue(data.ENTER_DATE);
this.formData.controls['ENTER_BY'].setValue(data.ENTER_BY);
this.formData.controls['COVER'].setValue(data.COVER);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_CHARGE_MASTERModel = <TBL_CHARGE_MASTERModel>{};
request.CODE = this.formData.get('CODE').value;
request.ITEMCODE = this.formData.get('ITEMCODE').value;
request.ITEMNAME = this.formData.get('ITEMNAME').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.mode = this.formData.get('mode').value;
request.loadcharge = this.formData.get('loadcharge').value;
request.unloadcharge = this.formData.get('unloadcharge').value;
request.L_PKG_CHARGE = this.formData.get('L_PKG_CHARGE').value;
request.U_PKG_CHARGE = this.formData.get('U_PKG_CHARGE').value;
request.L_WT_CHARGE = this.formData.get('L_WT_CHARGE').value;
request.U_WT_CHARGE = this.formData.get('U_WT_CHARGE').value;
request.L_TON_CHARGE = this.formData.get('L_TON_CHARGE').value;
request.U_TON_CHARGE = this.formData.get('U_TON_CHARGE').value;
request.L_TRUCK_CH_WT = this.formData.get('L_TRUCK_CH_WT').value;
request.U_TRUCK_CH_WT = this.formData.get('U_TRUCK_CH_WT').value;
request.L_TRUCK_LT_WT = this.formData.get('L_TRUCK_LT_WT').value;
request.U_TRUCK_LT_WT = this.formData.get('U_TRUCK_LT_WT').value;
request.L_TRUCK_LT_PK = this.formData.get('L_TRUCK_LT_PK').value;
request.U_TRUCK_LT_PK = this.formData.get('U_TRUCK_LT_PK').value;
request.L_TRUCK_CH_PK = this.formData.get('L_TRUCK_CH_PK').value;
request.U_TRUCK_CH_PK = this.formData.get('U_TRUCK_CH_PK').value;
request.L_MIM_CH = this.formData.get('L_MIM_CH').value;
request.U_MIM_CH = this.formData.get('U_MIM_CH').value;
request.L_TYPE = this.formData.get('L_TYPE').value;
request.U_TYPE = this.formData.get('U_TYPE').value;
request.L_QTY = this.formData.get('L_QTY').value;
request.U_QTY = this.formData.get('U_QTY').value;
request.ENTER_DATE = this.formData.get('ENTER_DATE').value;
request.ENTER_BY = this.formData.get('ENTER_BY').value;
request.COVER = this.formData.get('COVER').value;

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
        this.service.delete(id,"TBL_CHARGE_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
