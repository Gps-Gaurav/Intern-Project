
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { Finished_Category_Model } from 'src/app/core/models/Finished_category.model';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
@Component({
  selector: 'app-insert-TBL_UNIT_RELATION_MASTER',
  templateUrl: './insert-Finished_Product_Category.component.html',
  styleUrls: ['./insert-Finished_Product_Category.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Finished_Product_CategoryComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  unitData:  Finished_Category_Model [] = [];
  boolData: any[];
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'FINISHED PRODUCT', active: true }];

    this.formData = this.formBuilder.group({
  
      ProductName: ['', [Validators.required]],
      ShortName: ['', [Validators.required]],
      SubItem: ['', [Validators.required]],
      NoOfPcs: ['', [Validators.required]],
      FullDescription: ['', [Validators.required]],
      Making: ['', [Validators.required]],
      
      StartingNo: ['', [Validators.required]],
      HSNCode: ['', [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    })

 this.formData.get("ProductName").valueChanges.pipe(distinctUntilChanged(),
  throttleTime(50)).
  subscribe(selectedValue => {  
    let value=this.formData.get('ProductName').value;
    
    if(this.id>0){

    }else{
    console.log("ProductName",value)
    if(value.length >1){
      let request={
        "table_name": "ProdCate",
        "column_name": "ProductName",
        "column_value": value
      }
      this.validservice.CheckData(request).subscribe(response => {
     
        console.log("response",response);
        if(response.document.statusMessage==="failed"){
       
          this.formData.controls['ProductName'].setErrors({ invalid: 'Product Name Already Exist!' });
       
          this.toastr.error( 'Product Name Already Exist!','Error!');
          this.submit = true;
        }
        else{
       
          this.submit = false;
        }
       
       
      });
     
    }
  }
  });
  this.submit = false;
}
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;
    console.log('hello')
    if (this.formData.valid) {
      let request: Finished_Category_Model = <Finished_Category_Model>{};
     
      request.ProductName = this.formData.get('ProductName').value;//
      request.ShortName = this.formData.get('ShortName').value;//
      request.SubItem = this.formData.get('SubItem').value;//
      
      request.NoOfPcs = this.formData.get('NoOfPcs').value;//
      request.FullDescription = this.formData.get('FullDescription').value;//
      
      request.Making = this.formData.get('Making').value;//
      request.StartingNo= this.formData.get('StartingNo').value;//
      request.HSNCode= this.formData.get('HSNCode').value;//



      let jsonData: Finished_Category_Model[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_ProdCateMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.code == 1) {
          this.toastr.success('unit Inserted Successfully!', 'Success!');
          this.router.navigate(['/invoices/Finished_Product_Category']);
        }
        else {
          this.toastr.error('unit not Added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }

  }
  public _fetchBool(event) {
    this.boolData = [];
    this.boolData = [
      { name: 'YES', code: 'Y' },
      { name: 'NO', code: 'N' }

    ];

  }
  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_ProdCateMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.unitData= JSON.parse(response.items);
      if(this.unitData.length){
      let data=this.unitData[0];
      this.formData.controls['ProductName'].setValue(data['ProductName']);
      this.formData.controls['ShortName'].setValue(data['ShortName']);
      this.formData.controls['SubItem'].setValue(data['SubItem']);
      this.formData.controls['NoOfPcs'].setValue(data['NoOfPcs']);
      this.formData.controls['FullDescription'].setValue(data['FullDescription']);
      this.formData.controls['Making'].setValue(data['Making']);
      this.formData.controls['StartingNo'].setValue(data['StartingNo']);
      this.formData.controls['HSNCode'].setValue(data['HSNCode']);

    }});
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

