import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { CategoryModel } from 'src/app/core/models/ProdCateMast.model';
import { InvoiceModel } from 'src/app/core/models/Invoice.model';
import { SubCategoryModel } from 'src/app/core/models/SubCategory.model';
import { ColorsModel } from 'src/app/core/models/colors.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_INVOICE_MASTER.component.html',
  styleUrls: ['./insert-TBL_INVOICE_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Invoice_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  InvoiceData: any;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  invoiceData: InvoiceModel[]=[];
  text: CategoryModel = <CategoryModel>{};
  texts: SubCategoryModel = <SubCategoryModel>{};

  results: string[]=[];

  colorsData: ColorsModel[]=[];

  get form() {
    return this.formData.controls;
  }

  formData: FormGroup;
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

  image = '';
  file = '';

  ngOnInit() {
    
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'INVOICE MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
      InvoiceNo: ['', [Validators.required]],
      Party: ['', [Validators.required]],
      Baddress: ['', [Validators.required]],
      Daddress: ['', [Validators.required]],
      WayBillNo: ['', [Validators.required]],
      
      GrossAmount: ['', [Validators.required]],
      InvoiceDate: ['', [Validators.required]],
      DueDate: ['', [Validators.required]],
      TransporterName: ['', [Validators.required]],
      Discount: ['', [Validators.required]],
      OtherCharges: ['', [Validators.required]],
      RoundOff: ['', [Validators.required]],
      ReceivedAmount: ['', [Validators.required]],
      NetAmount: ['', [Validators.required]],
      DueAmount: ['', [Validators.required]],
      CnNo: ['', [Validators.required]],
      Narration: ['', [Validators.required]],
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

    if (this.formData.valid) {
      let request: InvoiceModel = <InvoiceModel>{};

      request.InvoiceNo = this.formData.get('InvoiceNo').value;//
      request.Party = this.formData.get('Party').value;//
      request.Baddress = this.formData.get('Baddress').value;//
      request.Daddress = this.formData.get('Daddress').value;//
      request.WayBillNo = this.formData.get('WayBillNo').value;//
      request.GrossAmount = this.formData.get('GrossAmount').value;//
      request.InvoiceDate = this.formData.get('InvoiceDate').value;//
      request.DueDate = this.formData.get('DueDate').value;//
      request.TransporterName = this.formData.get('TransporterName').value;//
      request.Discount = this.formData.get('Discount').value;//
      request.OtherCharges = this.formData.get('OtherCharges').value;//
      request.RoundOff = this.formData.get('OtherCharges').value;//
      request.ReceivedAmount = this.formData.get('ReceivedAmount').value;//
      request.NetAmount = this.formData.get('NetAmount').value;//
      request.DueAmount = this.formData.get('DueAmount').value;//
      request.CnNo = this.formData.get('CnNo').value;//
      request.Narration = this.formData.get('Narration').value;//
    
     
      
      request.UserID = 1;
      request.SlNo = Number(this.id);

      let jsonData: InvoiceModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_InvoiceMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if(Response.code==1){
          this.toastr.success( 'Party Inserted Successfully!','Success!');
          this.router.navigate(['/master/SaleInvoice']);
        }
        else{
          this.toastr.error( 'Party not added!','Error!');
        }
       })

      console.log("post product", request);//

    }
  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetInvoiceMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.invoiceData= JSON.parse(response.items);
      if(this.invoiceData.length){
      let data=this.invoiceData[0];
      console.log("invoiceData",data);
      //this.formData.controls['ID'].setValue(data['ID']);
      this.formData.controls['InvoiceNo'].setValue(data['InvoiceNo']);
      this.formData.controls['Party'].setValue(data['Party']);
      this.formData.controls['Baddress'].setValue(data['Baddress']);
      this.formData.controls['Daddress'].setValue(data['Daddress']);
      this.formData.controls['WayBillNo'].setValue(data['WayBillNo']);
      this.formData.controls['GrossAmount'].setValue(data['GrossAmount']);
      this.formData.controls['InvoiceDate'].setValue(data['InvoiceDate']);
      this.formData.controls['DueDate'].setValue(data['DueDate']);
      this.formData.controls['TransporterName'].setValue(data['TransporterName']);
      this.formData.controls['Discount'].setValue(data['Discount']);
      this.formData.controls['OtherCharges'].setValue(data['OtherCharges']);
      this.formData.controls['RoundOff'].setValue(data['RoundOff']);
      this.formData.controls['ReceivedAmount'].setValue(data['ReceivedAmount']);
      this.formData.controls['NetAmount'].setValue(data['NetAmount']);
      this.formData.controls['DueAmount'].setValue(data['DueAmount']);
      this.formData.controls['CnNo'].setValue(data['CnNo']);
      this.formData.controls['Narration'].setValue(data['Narration']);
   
     
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
}

