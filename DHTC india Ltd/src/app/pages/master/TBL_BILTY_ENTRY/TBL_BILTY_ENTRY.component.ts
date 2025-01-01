import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TBL_BILTY_ENTRYModel } from './TBL_BILTY_ENTRY.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TBL_STATION_MASTERModel } from '../TBL_STATION_MASTER/TBL_STATION_MASTER.model';
@Component({
  selector: 'app-TBL_BILTY_ENTRY',
  templateUrl: './TBL_BILTY_ENTRY.component.html',
  styleUrls: ['./TBL_BILTY_ENTRY.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_BILTY_ENTRYComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_BILTY_ENTRYModel[];
  stationData: TBL_STATION_MASTERModel[];
  requestModel :RequestModel = <RequestModel>{};
  term: any;
  startIndex:number=0;
  endIndex:number=0;
  totalRecords:number=0;
  page:number=1;
  pageSize:number=10;
  total$: Observable<number>;
  IsChecked:boolean;
  SelectedId:number=0;
  searchChanged: Subject<string> = new Subject<string>();
  // page
  currentpage: number;
  search: string = "";
  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_BILTY_ENTRYModel>,private toastr: ToastrService,
    
    ) { 
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BILTY ENTRY MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
BILTYNO: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
DATE: ['', [Validators.required]],
CALCEL: ['', [Validators.required]],
FROM_STATION: ['', [Validators.required]],
TO_STATION: ['', [Validators.required]],
CNGR: ['', [Validators.required]],
CNGE: ['', [Validators.required]],
PARTY: ['', [Validators.required]],
ITEM: ['', [Validators.required]],
PAYMODE: ['', [Validators.required]],
STBY: ['', [Validators.required]],
RISK: ['', [Validators.required]],
BILL1: ['', [Validators.required]],
COLLBY: ['', [Validators.required]],
IN_AC: ['', [Validators.required]],
INVNO: ['', [Validators.required]],
DIV_AT: ['', [Validators.required]],
DLY_DATE: ['', [Validators.required]],
GRP_BILTY: ['', [Validators.required]],
GATE_PASS: ['', [Validators.required]],
LORRYNO: ['', [Validators.required]],
CFT1: ['', [Validators.required]],
CFT2: ['', [Validators.required]],
CFT3: ['', [Validators.required]],
CFTEQL: ['', [Validators.required]],
BILTY_REMARLS: ['', [Validators.required]],
PRINT_REMARKS: ['', [Validators.required]],
CC: ['', [Validators.required]],
UNLOAD: ['', [Validators.required]],
CLAIM_RATE: ['', [Validators.required]],
SHRT_PKG: ['', [Validators.required]],
SHRT_WT: ['', [Validators.required]],
S_TAX: ['', [Validators.required]],
CESS: ['', [Validators.required]],
ENTRY_BY: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
PACK: ['', [Validators.required]],
NET_WT: ['', [Validators.required]],
GROSS_WT: ['', [Validators.required]],
CHARGES_WT: ['', [Validators.required]],
GOODS_VALUES: ['', [Validators.required]],
RATE: ['', [Validators.required]],
FRIGHT: ['', [Validators.required]],
SURCHARGE: ['', [Validators.required]],
INS: ['', [Validators.required]],
HANDEL: ['', [Validators.required]],
CPC: ['', [Validators.required]],
ST: ['', [Validators.required]],
OTHERS: ['', [Validators.required]],
WH: ['', [Validators.required]],
HAMALI: ['', [Validators.required]],
S_TAX1: ['', [Validators.required]],
CSS1: ['', [Validators.required]],
FINYR: ['', [Validators.required]],
VariableTot: ['', [Validators.required]],
NettTotal: ['', [Validators.required]],
INVDATE: ['', [Validators.required]],
BANK: ['', [Validators.required]],
CNGE_STATE_CODE: ['', [Validators.required]],
CNGE_STATE_NAME: ['', [Validators.required]],
CNGR_STATE_CODE: ['', [Validators.required]],
CNGR_STATE_NAME: ['', [Validators.required]],
CNGE_GSTNO: ['', [Validators.required]],
CNGR_GSTNO: ['', [Validators.required]],
FROM_BR_CODE: ['', [Validators.required]],
TO_BR_CODE: ['', [Validators.required]],
Packing_Method: ['', [Validators.required]],
Breakup_Description: ['', [Validators.required]],
EWay_Bill_No: ['', [Validators.required]],
Expiry_Date: ['', [Validators.required]],
Freight_Confirm: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_BILTY_ENTRY?PageNo="+this.page+"&PageSize="+this.pageSize;
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
   
    this.requestModel.url = "TBL_BILTY_ENTRY?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
    this.service.getStoreList(this.requestModel).subscribe(response => {
      this.tableData = response.document;
     
      this.totalRecords = response.totalCount;
      console.log(" this.totalRecords", this.totalRecords)
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
    this.router.navigate(['/master/insert-bilty-master']);
  }
  edit(data:number){
    this.router.navigate(['/master/insert-bilty-master', { id: data }]);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_BILTY_ENTRYModel = <TBL_BILTY_ENTRYModel>{};
request.ID = this.formData.get('ID').value;
request.BILTYNO = this.formData.get('BILTYNO').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.DATE = this.formData.get('DATE').value;
request.CALCEL = this.formData.get('CALCEL').value;
request.FROM_STATION = this.formData.get('FROM_STATION').value;
request.TO_STATION = this.formData.get('TO_STATION').value;
request.CNGR = this.formData.get('CNGR').value;
request.CNGE = this.formData.get('CNGE').value;
request.PARTY = this.formData.get('PARTY').value;
request.ITEM = this.formData.get('ITEM').value;
request.PAYMODE = this.formData.get('PAYMODE').value;
request.STBY = this.formData.get('STBY').value;
request.RISK = this.formData.get('RISK').value;
request.BILL1 = this.formData.get('BILL1').value;
request.COLLBY = this.formData.get('COLLBY').value;
request.IN_AC = this.formData.get('IN_AC').value;
request.INVNO = this.formData.get('INVNO').value;
request.DIV_AT = this.formData.get('DIV_AT').value;
request.DLY_DATE = this.formData.get('DLY_DATE').value;
request.GRP_BILTY = this.formData.get('GRP_BILTY').value;
request.GATE_PASS = this.formData.get('GATE_PASS').value;
request.LORRYNO = this.formData.get('LORRYNO').value;
request.CFT1 = this.formData.get('CFT1').value;
request.CFT2 = this.formData.get('CFT2').value;
request.CFT3 = this.formData.get('CFT3').value;
request.CFTEQL = this.formData.get('CFTEQL').value;
request.BILTY_REMARLS = this.formData.get('BILTY_REMARLS').value;
request.PRINT_REMARKS = this.formData.get('PRINT_REMARKS').value;
request.CC = this.formData.get('CC').value;
request.UNLOAD = this.formData.get('UNLOAD').value;
request.CLAIM_RATE = this.formData.get('CLAIM_RATE').value;
request.SHRT_PKG = this.formData.get('SHRT_PKG').value;
request.SHRT_WT = this.formData.get('SHRT_WT').value;
request.S_TAX = this.formData.get('S_TAX').value;
request.CESS = this.formData.get('CESS').value;
request.ENTRY_BY = this.formData.get('ENTRY_BY').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.PACK = this.formData.get('PACK').value;
request.NET_WT = this.formData.get('NET_WT').value;
request.GROSS_WT = this.formData.get('GROSS_WT').value;
request.CHARGES_WT = this.formData.get('CHARGES_WT').value;
request.GOODS_VALUES = this.formData.get('GOODS_VALUES').value;
request.RATE = this.formData.get('RATE').value;
request.FRIGHT = this.formData.get('FRIGHT').value;
request.SURCHARGE = this.formData.get('SURCHARGE').value;
request.INS = this.formData.get('INS').value;
request.HANDEL = this.formData.get('HANDEL').value;
request.CPC = this.formData.get('CPC').value;
request.ST = this.formData.get('ST').value;
request.OTHERS = this.formData.get('OTHERS').value;
request.WH = this.formData.get('WH').value;
request.HAMALI = this.formData.get('HAMALI').value;
request.S_TAX1 = this.formData.get('S_TAX1').value;
request.CSS1 = this.formData.get('CSS1').value;
request.FINYR = this.formData.get('FINYR').value;
request.VariableTot = this.formData.get('VariableTot').value;
request.NettTotal = this.formData.get('NettTotal').value;
request.INVDATE = this.formData.get('INVDATE').value;
request.BANK = this.formData.get('BANK').value;
request.CNGE_STATE_CODE = this.formData.get('CNGE_STATE_CODE').value;
request.CNGE_STATE_NAME = this.formData.get('CNGE_STATE_NAME').value;
request.CNGR_STATE_CODE = this.formData.get('CNGR_STATE_CODE').value;
request.CNGR_STATE_NAME = this.formData.get('CNGR_STATE_NAME').value;
request.CNGE_GSTNO = this.formData.get('CNGE_GSTNO').value;
request.CNGR_GSTNO = this.formData.get('CNGR_GSTNO').value;
request.FROM_BR_CODE = this.formData.get('FROM_BR_CODE').value;
request.TO_BR_CODE = this.formData.get('TO_BR_CODE').value;
request.Packing_Method = this.formData.get('Packing_Method').value;
request.Breakup_Description = this.formData.get('Breakup_Description').value;
request.EWay_Bill_No = this.formData.get('EWay_Bill_No').value;
request.Expiry_Date = this.formData.get('Expiry_Date').value;
request.Freight_Confirm = this.formData.get('Freight_Confirm').value;

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
        this.service.delete(id,"TBL_BILTY_ENTRY/id?id=").subscribe(response => {
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
