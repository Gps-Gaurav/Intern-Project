

import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, throttleTime, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BRANCH_MASTERModel } from '../TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { DatePipe } from '@angular/common';

import { TabService } from 'src/app/core/helpers/TabService';
import { SeriesModel } from 'src/app/core/models/series.model';
import { MessageService } from 'primeng/api';
import { StateModel } from 'src/app/core/models/state.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_SERIES_MASTER.component.html',
  styleUrls: ['./insert-TBL_SERIES_MASTER.component.scss'],
  providers: [TabService,MessageService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Series_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  selectedDoc="";
  stateData: StateModel[];
 seriesData: SeriesModel[]=[];

  get form() {

    return this.formData.controls;
  }

  formData: FormGroup;
  
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  booleanItem: any[];
  txtItem: any[];
  image = '';
  file = '';
  docTypeData: any[]=[];
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'SERIES MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ShortName: ['', [Validators.required]],
     
      SeriesDesc: ['', ],
      Cash: ['', [Validators.required]],
      TaxType: ['', [Validators.required]],
      DiscPer: ['', ],
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });

    this.formData.get("ShortName").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('ShortName').value;
      
      if(this.id>0){

      }else{
      console.log("ShortName",value)
      if(value.length >1){
        let request={
          "table_name": "SeriesMast",
          "column_name": "ShortName",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['ShortName'].setErrors({ invalid: 'Short Name Already Exist!' });
         
            this.toastr.error( 'Short Name Already Exist!','Error!');
            this.submit = true;
          }
          else{
         
            this.submit = false;
          }
         
         
        });
       
      }
    }
    });
    this.selectedDoc= sessionStorage.getItem("doctype");
    if(this.selectedDoc!="" && this.selectedDoc!=null){
     
    }
    else{

      this.messageService.add({severity:'error', summary: 'Error', detail: 'Select Doc Type', life: 3000});
      this.router.navigate(['/master/series']);
    }
    this.submit = false;
  }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    if (this.formData.valid) {
      let request: SeriesModel = <SeriesModel>{};

      request.SlNo = this.id;
      request.ShortName = this.formData.get('ShortName').value.toUpperCase();//
      request.SeriesDesc= this.formData.get('SeriesDesc').value.toUpperCase();//
      request.Cash = this.formData.get('Cash').value.code;//

      //request.DocType = this.formData.get('DocType').value.DocType;//
      request.DocType = this.selectedDoc;//
      request.TaxType = this.formData.get('TaxType').value.code;//
      request.DiscPer = this.formData.get('DiscPer').value;//



      let jsonData: SeriesModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_SeriesMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'Series Inserted Successfully!','Success!');
          this.router.navigate(['/master/series']);
        }
        else{
          this.toastr.error( 'Series not Added!','Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetSeriesMastsingle";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];

    
      this.formData.controls['ShortName'].setValue(data['ShortName']);
      this.formData.controls['SeriesDesc'].setValue(data['SeriesDesc']);
      //this.formData.controls['Cash'].setValue(data['Cash']);
    //  this.formData.controls['DocType'].setValue({ DocType: data['DocType'] });
      this.formData.controls['TaxType'].setValue( {name: data['TaxType'], code: data['TaxType']});
      this.formData.controls['Cash'].setValue(data['Cash']=="Y"? { name: 'YES', code: 'Y' }:  { name: 'NO', code: 'N' });
     // this.formData.controls['TaxType'].setValue(data['TaxType'])
      this.formData.controls['DiscPer'].setValue(data['DiscPer']);
      }
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  private _fetchState() {
    this.requestModel.url = "SP/sp_app_get_state";
    this.stateservice.postStoreList(this.requestModel).subscribe(response => {
      this.stateData = response.items;
      console.log("this.stateData", this.stateData);
    });
  }

  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  public _fetchBoolean(event){
    this.booleanItem=[];
    this.booleanItem= [
      {name: 'YES', code: 'Y'},
      {name: 'NO', code: 'N'}
      
  ];
  
   }
  


   public _fetchTax(event){
    this.txtItem=[];
    this.txtItem= [
      {name: 'CGST', code: 'CGST'},
      {name: 'IGST', code: 'IGST'}
      
  ];
  
   }  

   public _fetchDoctype(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetDocType";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.docTypeData = JSON.parse(response.items);
      
    });   
  }
  Close(){
    this.router.navigate(['/master/series']);
  }
}

