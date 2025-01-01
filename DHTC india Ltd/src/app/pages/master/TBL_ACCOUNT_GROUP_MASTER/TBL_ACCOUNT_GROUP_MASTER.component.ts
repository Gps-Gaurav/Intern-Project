import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_ACCOUNT_GROUP_MASTERModel } from './TBL_ACCOUNT_GROUP_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_ACCOUNT_GROUP_MASTER',
  templateUrl: './TBL_ACCOUNT_GROUP_MASTER.component.html',
  styleUrls: ['./TBL_ACCOUNT_GROUP_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_ACCOUNT_GROUP_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_ACCOUNT_GROUP_MASTERModel[];
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

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_ACCOUNT_GROUP_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_ACCOUNT_GROUP_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      TrnNo: ['', [Validators.required]],
Code: ['', [Validators.required]],
Name: ['', [Validators.required]],
UnderGroup: ['', [Validators.required]],
Cat: ['', [Validators.required]],
Type: ['', [Validators.required]],
BalField: ['', [Validators.required]],
Narration: ['', [Validators.required]],
Define: ['', [Validators.required]],

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
   
   private _fetchData() {
    this.requestModel.url = "TBL_ACCOUNT_GROUP_MASTER";
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
    this.router.navigate(['/master/insert_TBL_ACCOUNT_GROUP_MASTER']);
  }
  edit(data:TBL_ACCOUNT_GROUP_MASTERModel,content: any){
    this.router.navigate(['/master/TBL_ACCOUNT_GROUP_MASTER', { id: data.TrnNo }]);
  }
//     
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_ACCOUNT_GROUP_MASTERModel = <TBL_ACCOUNT_GROUP_MASTERModel>{};
request.TrnNo = this.formData.get('TrnNo').value;
request.Code = this.formData.get('Code').value;
request.Name = this.formData.get('Name').value;
request.UnderGroup = this.formData.get('UnderGroup').value;
request.Cat = this.formData.get('Cat').value;
request.Type = this.formData.get('Type').value;
request.BalField = this.formData.get('BalField').value;
request.Narration = this.formData.get('Narration').value;
request.Define = this.formData.get('Define').value;

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
        this.service.delete(id,"TBL_ACCOUNT_GROUP_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
