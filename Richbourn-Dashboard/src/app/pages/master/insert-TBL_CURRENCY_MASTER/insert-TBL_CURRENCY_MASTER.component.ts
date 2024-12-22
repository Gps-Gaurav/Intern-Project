

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
import { CurrencyModel } from 'src/app/core/models/currency.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_CURRENCY_MASTER.component.html',
  styleUrls: ['./insert-TBL_CURRENCY_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Currency_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  CurrencyData: any;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe) { }

  requestModel: RequestModel = <RequestModel>{};

  booleanItem: any[];
  get form() {
    return this.formData.controls;
  }

  formData: FormGroup;
  SlNo: Number = 0;
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

  image = '';
  file = '';

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'CURRENCY MASTER', active: true }];

    this.formData = this.formBuilder.group({
      CurrencyName: ['', [Validators.required]],
      ShortName: ['', [Validators.required]],
      CurrDesc: ['', [Validators.required]],
      CurrSign: ['', [Validators.required]],
      DefaCurr: ['', [Validators.required]],
     
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    })
    this.submit = false;
  }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;
    console.log("submit")
    if (this.formData.valid) {
      let request: CurrencyModel = <CurrencyModel>{};


      request.CurrencyName = this.formData.get('CurrencyName').value;//
      request.ShortName = this.formData.get('ShortName').value;//
      request.CurrDesc = this.formData.get('CurrDesc').value;//
      request.CurrSign = this.formData.get('CurrSign').value;//
      request.DefaCurr = this.formData.get('DefaCurr').value.code;//
       request.SlNo=Number(this.id);



      let jsonData: CurrencyModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_CurrencyMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'Currency Inserted Successfully!','Success!');
          this.router.navigate(['/master/currency']);
        }
        else{
          this.toastr.error( 'Currency Inserted Successfully!','Success!');
        }
     
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetCurrencyMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.CurrencyData= JSON.parse(response.items);
      if(this.CurrencyData.length){
      let data=this.CurrencyData[0];
      console.log("CurrencyData",data);
      this.formData.controls['CurrencyName'].setValue(data['CurrencyName']);
      this.formData.controls['ShortName'].setValue(data['ShortName']);
      this.formData.controls['CurrDesc'].setValue(data['CurrDesc']);
      this.formData.controls['CurrSign'].setValue(data['CurrSign']);
    //  this.formData.controls['DefaCurr'].setValue(data['DefaCurr']);
      this.formData.controls['DefaCurr'].setValue(data['DefaCurr']=="Y"? { name: 'YES', code: 'Y' }:  { name: 'NO', code: 'N' });
      }
    });
  }
  public _fetchBoolean(event){
    this.booleanItem=[];
    this.booleanItem= [
      {name: 'YES', code: 'Y'},
      {name: 'NO', code: 'N'}
      
  ];
  
   }
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


     ngAfterViewInit() {
     this.myInputField.nativeElement.focus();
  }
  Close(){
    this.router.navigate(['/master/currency']);
  }
}

