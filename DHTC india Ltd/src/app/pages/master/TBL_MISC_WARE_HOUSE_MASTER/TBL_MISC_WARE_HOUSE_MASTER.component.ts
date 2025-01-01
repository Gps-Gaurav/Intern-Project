import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_MISC_WARE_HOUSE_MASTERModel } from './TBL_MISC_WARE_HOUSE_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_MISC_WARE_HOUSE_MASTER',
  templateUrl: './TBL_MISC_WARE_HOUSE_MASTER.component.html',
  styleUrls: ['./TBL_MISC_WARE_HOUSE_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_MISC_WARE_HOUSE_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_MISC_WARE_HOUSE_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_MISC_WARE_HOUSE_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_MISC_WARE_HOUSE_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
WARE_HOUSE_CODE: ['', [Validators.required]],
WARE_HOUSE_NAME: ['', [Validators.required]],
LOCATION_ADDRESS: ['', [Validators.required]],
DISTANCE: ['', [Validators.required]],
AGENT_BRANCH: ['', [Validators.required]],
ENTRY_AREA: ['', [Validators.required]],
ENTRY_DATE: ['', [Validators.required]],
ENTRY_BY: ['', [Validators.required]],

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
    this.requestModel.url = "SP/sp_get_list_TBL_MISC_WARE_HOUSE_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_MISC_WARE_HOUSE_MASTER";
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
    this.router.navigate(['/master/insert_TBL_MISC_WARE_HOUSE_MASTER']);
  }
  edit(data:TBL_MISC_WARE_HOUSE_MASTERModel,content: any){
     this.formData.controls['ID'].setValue(data.ID);
this.formData.controls['WARE_HOUSE_CODE'].setValue(data.WARE_HOUSE_CODE);
this.formData.controls['WARE_HOUSE_NAME'].setValue(data.WARE_HOUSE_NAME);
this.formData.controls['LOCATION_ADDRESS'].setValue(data.LOCATION_ADDRESS);
this.formData.controls['DISTANCE'].setValue(data.DISTANCE);
this.formData.controls['AGENT_BRANCH'].setValue(data.AGENT_BRANCH);
this.formData.controls['ENTRY_AREA'].setValue(data.ENTRY_AREA);
this.formData.controls['ENTRY_DATE'].setValue(data.ENTRY_DATE);
this.formData.controls['ENTRY_BY'].setValue(data.ENTRY_BY);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_MISC_WARE_HOUSE_MASTERModel = <TBL_MISC_WARE_HOUSE_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.WARE_HOUSE_CODE = this.formData.get('WARE_HOUSE_CODE').value;
request.WARE_HOUSE_NAME = this.formData.get('WARE_HOUSE_NAME').value;
request.LOCATION_ADDRESS = this.formData.get('LOCATION_ADDRESS').value;
request.DISTANCE = this.formData.get('DISTANCE').value;
request.AGENT_BRANCH = this.formData.get('AGENT_BRANCH').value;
request.ENTRY_AREA = this.formData.get('ENTRY_AREA').value;
request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
request.ENTRY_BY = this.formData.get('ENTRY_BY').value;

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
        this.service.delete(id,"TBL_MISC_WARE_HOUSE_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
