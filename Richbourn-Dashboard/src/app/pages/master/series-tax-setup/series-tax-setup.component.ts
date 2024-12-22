

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { PurchaseModel } from 'src/app/core/models/Purchase.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TabService } from 'src/app/core/helpers/TabService';
import { DatePipe } from '@angular/common';
import { PartyModel } from 'src/app/core/models/Party.model';
import { StateModel } from 'src/app/core/models/state.model';
import { SeriesTaxModel } from 'src/app/core/models/series-tax.model';
import { DeleteModel } from 'src/app/core/models/delete.model';
@Component({
  selector: 'app-series-tax-setup',
  templateUrl: './series-tax-setup.component.html',
  styleUrls: ['./series-tax-setup.component.scss'],
  providers: [MessageService,ConfirmationService],

})

/**
 * Ecomerce Customers component
 */
export class SERIESTAXSETUPComponent implements OnInit {
  stateservice: any;
  selectedUser: any = [];
  selectDoctype: any={};
  selectSeries: any;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private messageService: MessageService,
    public datepipe: DatePipe,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute) { }
  selectedUsers: any = [];
  search: string = "";
  totalRecords:number=0;
  requestModel: RequestModel = <RequestModel>{};
  page:number=1;
  pageSize:number=10;
  selectedItems: SeriesTaxModel[];
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

  stateData: StateModel[] = [];
  docTypeData: any[] = [];
  txtItem: any[];
  items: any[] = [];
  image = '';
  file = '';
  SeriesSlNo=0;
  SeriesShortName='';
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'SERIES WISE TAX SETUP', active: true }];

    

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
    
      
      
    })
    this._fetchDoctype();
   
    
    let seriesname= sessionStorage.getItem("SeriesShortName");
    let seriessl= sessionStorage.getItem("SeriesSlNo");

    if(this.selectDoctype!=undefined && this.selectDoctype!=""){
      //this.selectDoctype=docdata;
    
      this._fetchData();
    }
    this.selectSeries={ShortName:seriesname,SlNo:seriessl};
    this.submit = false;

  }
  onChangeDoc(event){
   // this.selectDoctype=event;
    this._fetchTax(event);
   }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  

  public _fetchDoctype() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetDocType";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = "";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.docTypeData = JSON.parse(response.items);
      let selectedRole = this.docTypeData.find(x => x.DocType== sessionStorage.getItem("txdoctype"));

      if (selectedRole !== undefined) {
        console.log("selectedrole",selectedRole)
          this.selectDoctype.value = selectedRole.DocType;
      }
     
    });
  }
  showData(){
    this._fetchData();
  }
  private _fetchData() {
    this.items=[];
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetSeriesTaxMast";
    requestModel.pageNo=this.page;
    requestModel.pageSize=this.pageSize;
    requestModel.search=this.search;
    requestModel.id=Number(this.id);
    requestModel.ColumnValue=this.selectDoctype;
    requestModel.ColumnName=this.SeriesSlNo+"";
    this.service.GetFilterApiJson(requestModel).subscribe(response => {
 
      this.items = JSON.parse(response.items);
      this.totalRecords = response.totalCount;
    }); 
  }

  public _fetchTax(event) {
    console.log("selectDoctype",this.selectDoctype)
    // this.txtItem = [];
    // this.txtItem = [
    //   { name: 'CGST', code: 'CGST' },
    //   { name: 'IGST', code: 'IGST' }

    // ];

    
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetSeriesMast";
    requestModel.pageNo=this.page;
    requestModel.pageSize=this.pageSize;
    requestModel.search=this.search;
    requestModel.ColumnValue=this.selectDoctype;
    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.txtItem = JSON.parse(response.items);
     
    });   
  }
  openNew() {
    if(this.SeriesSlNo>0){
      sessionStorage.setItem("SeriesSlNo",this.SeriesSlNo+"")
      sessionStorage.setItem("SeriesShortName",this.SeriesShortName+"")
      sessionStorage.setItem("txdoctype",this.selectDoctype)
    this.router.navigate(['/master/insert-series-tax-setup']);
  }
  }
  
  private _fetchState() {
    this.requestModel.url = "SP/sp_app_get_state";
    this.stateservice.postStoreList(this.requestModel).subscribe(response => {
      this.stateData = response.items;
      console.log("this.stateData", this.stateData);
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  editProduct(data: SeriesTaxModel) {
    sessionStorage.setItem("SeriesSlNo",this.SeriesSlNo+"")
    sessionStorage.setItem("txdoctype",this.selectDoctype)
    sessionStorage.setItem("SeriesShortName",this.SeriesShortName+"")
    this.router.navigate(['/invoices/insert-series-tax-setup', { id: data.SlNo }]);
    // this.item = {...data};
    // this.productDialog = true;
  }
  selectTax(event){
    this.SeriesSlNo=event.value;
    let selectedRole = this.txtItem.find(x => x.SlNo==this.SeriesSlNo);
    this.SeriesShortName=selectedRole.ShortName;
    this._fetchData();
  }
  public deleteProduct(data: SeriesTaxModel) {
    console.log("delete")
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete ' + data.SlNo + '?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
        
          
    //     }
    // });
    let requestModel = <DeleteModel>{};
    requestModel.table_name="SeriesTaxMast";
    requestModel.column_name="SlNo";
    requestModel.column_value=data.SlNo.toString();
    this.service.DeleteApiJson(requestModel).subscribe(response => {
    console.log("delete",response);
    this._fetchData();
 });   
  }
  public handlePagination(paginationData): void {
    this.page = paginationData.page + 1;
    this._fetchData();
  }
 

  onDelete() {
    if (this.selectedUsers.length == 0) {
      this.messageService.add({
        severity: "warn",
        summary: "Info",
        detail: "Please select a record to delete!",
      });
      return;
    }
    console.log(this.selectedUsers);
   
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Selected records deleted!",
    });

    this.selectedUsers = [];
  }
 
}
function onDelete() {
  throw new Error('Function not implemented.');
}

