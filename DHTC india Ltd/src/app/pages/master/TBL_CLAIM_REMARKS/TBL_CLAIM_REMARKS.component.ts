import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TBL_CLAIM_REMARKSModel } from './TBL_CLAIM_REMARKS.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-TBL_CLAIM_REMARKS',
  templateUrl: './TBL_CLAIM_REMARKS.component.html',
  styleUrls: ['./TBL_CLAIM_REMARKS.component.scss']
})

/**

/**
 * Ecomerce Customers component
 */
export class TBL_CLAIM_REMARKSComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_CLAIM_REMARKSModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_CLAIM_REMARKSModel>,private toastr: ToastrService) { 
    
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ITEM MASTER', active: true }];

    

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
    this.requestModel.url = "SP/sp_get_list_TBL_ITEM_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
  
      
    this.requestModel.url = "TBL_CLAIM_REMARKS?PageNo=" + this.page + "&PageSize=" + this.pageSize + "&Search=" + this.search;
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
    this.router.navigate(['/master/insert-claim-remarks']);
  }
  edit(data:Number){
    this.router.navigate(['/master/insert-claim-remarks', { id: data }]);

  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_CLAIM_REMARKSModel = <TBL_CLAIM_REMARKSModel>{};
// request.ID = this.formData.get('ID').value;
// request.ITEM_CODE = this.formData.get('ITEM_CODE').value;
// request.ITEM_NAME = this.formData.get('ITEM_NAME').value;
// request.ITEM_MODE = this.formData.get('ITEM_MODE').value;
// request.ITEM_GROUP = this.formData.get('ITEM_GROUP').value;
// request.COSTING_RATIO = this.formData.get('COSTING_RATIO').value;
// request.IS_EXEMPT = this.formData.get('IS_EXEMPT').value;
// request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
// request.ENTRY_BY = this.formData.get('ENTRY_BY').value;

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
        this.service.delete(id,"TBL_ITEM_MASTER/id?id=").subscribe(response => {
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