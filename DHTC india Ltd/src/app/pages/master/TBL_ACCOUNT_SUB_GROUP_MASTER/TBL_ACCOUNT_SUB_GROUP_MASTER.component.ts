import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_ACCOUNT_SUB_GROUP_MASTERModel } from './TBL_ACCOUNT_SUB_GROUP_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_ACCOUNT_SUB_GROUP_MASTER',
  templateUrl: './TBL_ACCOUNT_SUB_GROUP_MASTER.component.html',
  styleUrls: ['./TBL_ACCOUNT_SUB_GROUP_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_ACCOUNT_SUB_GROUP_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_ACCOUNT_SUB_GROUP_MASTERModel[];
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
  // page
  currentpage: number;

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_ACCOUNT_SUB_GROUP_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ACCOUNT SUB GROUP MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
ACC_GRP_CODE: ['', [Validators.required]],
ACC_GRP_NAME: ['', [Validators.required]],
ACC_SUB_GRP_CODE: ['', [Validators.required]],
ACC_SUB_GRP_NAME: ['', [Validators.required]],
TYPE: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_ACCOUNT_SUB_GROUP_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_ACCOUNT_SUB_GROUP_MASTER";
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
    this.router.navigate(['/master/insert_TBL_ACCOUNT_SUB_GROUP_MASTER']);
  }
  edit(data:Number){
    this.router.navigate(['/master/insert_TBL_ACCOUNT_SUB_GROUP_MASTER', { id: data }]);

  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_ACCOUNT_SUB_GROUP_MASTERModel = <TBL_ACCOUNT_SUB_GROUP_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.ACC_GRP_CODE = this.formData.get('ACC_GRP_CODE').value;
request.ACC_GRP_NAME = this.formData.get('ACC_GRP_NAME').value;
request.ACC_SUB_GRP_CODE = this.formData.get('ACC_SUB_GRP_CODE').value;
request.ACC_SUB_GRP_NAME = this.formData.get('ACC_SUB_GRP_NAME').value;
request.TYPE = this.formData.get('TYPE').value;

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
        this.service.delete(id,"TBL_ACCOUNT_SUB_GROUP_MASTER/id?id=").subscribe(response => {
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
