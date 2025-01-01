import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_TRUCK_GROUP_MASTERModel } from './TBL_TRUCK_GROUP_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_TRUCK_GROUP_MASTER',
  templateUrl: './TBL_TRUCK_GROUP_MASTER.component.html',
  styleUrls: ['./TBL_TRUCK_GROUP_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_TRUCK_GROUP_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_TRUCK_GROUP_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_TRUCK_GROUP_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_TRUCK_GROUP_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
TRUCKGROUPCODE: ['', [Validators.required]],
TRUCKGROUPNAME: ['', [Validators.required]],
OWNERNAME: ['', [Validators.required]],
OWNER_TYPE: ['', [Validators.required]],
OWNER_PHONE: ['', [Validators.required]],
PAN_NO: ['', [Validators.required]],
PAN_IMAGES: ['', [Validators.required]],
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
    this.requestModel.url = "SP/sp_get_list_TBL_TRUCK_GROUP_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
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
    this.requestModel.url = "TBL_TRUCK_GROUP_MASTER";
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
    this.router.navigate(['/master/insert_TBL_TRUCK_GROUP_MASTER']);
  }
  edit(data:TBL_TRUCK_GROUP_MASTERModel,content: any){
     this.formData.controls['ID'].setValue(data.ID);
this.formData.controls['TRUCKGROUPCODE'].setValue(data.TRUCKGROUPCODE);
this.formData.controls['TRUCKGROUPNAME'].setValue(data.TRUCKGROUPNAME);
this.formData.controls['OWNERNAME'].setValue(data.OWNERNAME);
this.formData.controls['OWNER_TYPE'].setValue(data.OWNER_TYPE);
this.formData.controls['OWNER_PHONE'].setValue(data.OWNER_PHONE);
this.formData.controls['PAN_NO'].setValue(data.PAN_NO);
this.formData.controls['PAN_IMAGES'].setValue(data.PAN_IMAGES);
this.formData.controls['REMARKS'].setValue(data.REMARKS);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_TRUCK_GROUP_MASTERModel = <TBL_TRUCK_GROUP_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.TRUCKGROUPCODE = this.formData.get('TRUCKGROUPCODE').value;
request.TRUCKGROUPNAME = this.formData.get('TRUCKGROUPNAME').value;
request.OWNERNAME = this.formData.get('OWNERNAME').value;
request.OWNER_TYPE = this.formData.get('OWNER_TYPE').value;
request.OWNER_PHONE = this.formData.get('OWNER_PHONE').value;
request.PAN_NO = this.formData.get('PAN_NO').value;
request.PAN_IMAGES = this.formData.get('PAN_IMAGES').value;
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
        this.service.delete(id,"TBL_TRUCK_GROUP_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
