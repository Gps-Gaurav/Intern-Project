

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
import { SeriesTaxModel } from 'src/app/core/models/series-tax.model';
@Component({
  selector: 'app-insert-series-tax-master',
  templateUrl: './insert-series-tax-master.component.html',
  styleUrls: ['./insert-series-tax-master.component.scss'],
  providers: [TabService,MessageService]
})

/**
 * Ecomerce Customers component
 */
export class InsertSeriesTaxMasterComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe) { }

  requestModel: RequestModel = <RequestModel>{};
  selectedDoc="";
  SeriesSlNo=0;
 seriesData: SeriesModel[]=[];
 taxAcData:any[]=[];
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
  seriesname='';
  docTypeData: any[]=[];
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'SERIES MASTER', active: true }];

    this.formData = this.formBuilder.group({
    
      HSNCode: ['', [Validators.required]],
      TaxPer1: [''],
      TaxPer2: [''],
      TaxAc1: [''],
      TaxAc2: [''],
      SaleAc: [''],
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });

  
    this.selectedDoc= sessionStorage.getItem("txdoctype");
    if(this.selectedDoc!="" && this.selectedDoc!=null){
     
    }
    else{

      this.messageService.add({severity:'error', summary: 'Error', detail: 'Select Doc Type', life: 3000});
      this.router.navigate(['/master/series']);
    }

    this.SeriesSlNo= Number(sessionStorage.getItem("SeriesSlNo"));
    this.seriesname= sessionStorage.getItem("SeriesShortName");
    console.log(" this.SeriesSlNo", this.SeriesSlNo)

    if(this.SeriesSlNo>0){
     
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
      let request: SeriesTaxModel = <SeriesTaxModel>{};

      request.SlNo = this.id;
      request.DocType = this.selectedDoc;//
      request.HSNCode= this.formData.get('HSNCode').value;//
      request.TaxPer1 = this.formData.get('TaxPer1').value;//
       request.SeriesSlNo=this.SeriesSlNo;
      //request.DocType = this.formData.get('DocType').value.DocType;//
      request.TaxPer2 = this.formData.get('TaxPer2').value;//
      request.TaxAc1 = this.formData.get('TaxAc1').value.GLCode;//
      request.TaxAc2 = this.formData.get('TaxAc2').value.GLCode;//
      request.SaleAc = this.formData.get('SaleAc').value.GLCode;//


      let jsonData: SeriesTaxModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_SeriesTax_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'Series Inserted Successfully!','Success!');
          this.router.navigate(['/invoices/series-tax-setup']);
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
    requestModel.spName="sp_admin_GetSeriesMast_byid";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];
      console.log("post data", data);//
    
      this.formData.controls['TaxPer1'].setValue(data['TaxPer1']);
     this.formData.controls['TaxPer2'].setValue(data['TaxPer2']);
      this.formData.controls['HSNCode'].setValue(data['HSNCode']);
    //  this.formData.controls['DocType'].setValue({ DocType: data['DocType'] });
      this.formData.controls['TaxAc1'].setValue( {GLName: data['TaxAc1Name'], GLCode: data['TaxAc1']});
      this.formData.controls['TaxAc2'].setValue( {GLName: data['TaxAc2Name'], GLCode: data['TaxAc2']});
      this.formData.controls['SaleAc'].setValue( {GLName: data['SaleAcName'], GLCode: data['SaleAc']});
      
     // this.formData.controls['Cash'].setValue(data['Cash']=="Y"? { name: 'YES', code: 'Y' }:  { name: 'NO', code: 'N' });
     // this.formData.controls['TaxType'].setValue(data['TaxType'])
     // this.formData.controls['DiscPer'].setValue(data['DiscPer']);
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


  ngAfterViewInit() {
    //this.myInputField.nativeElement.focus();
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


  public _fetchTaxAccount(event) { 
    let requestModel = <RequestModel>{};
    requestModel.pageNo = 1;
    requestModel.pageSize = 12;
    requestModel.search=event.query;
    requestModel.TableName = "AGLMast";
    requestModel.FilterColumn = "GLCode";
    requestModel.SearchColumn = "GLName";
    this.service.GetDynamicApiJson(requestModel).subscribe(response => {
      this.taxAcData = JSON.parse(response.items);

    });

  }
  Close(){
    this.router.navigate(['/invoices/series-tax-setup']);
  }
}

