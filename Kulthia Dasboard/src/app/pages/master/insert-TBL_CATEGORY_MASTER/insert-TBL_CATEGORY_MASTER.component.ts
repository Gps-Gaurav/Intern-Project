  
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { CategoryModel } from 'src/app/core/models/ProdCateMast.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_CATEGORY_MASTER.component.html',
  styleUrls: ['./insert-TBL_CATEGORY_MASTER.component.scss'],
  providers: [TabService],
  encapsulation:ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Category_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  DiscontData: any;
  page: number;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  categoryData: CategoryModel[]=[];
  get form() {
    return this.formData.controls;
  }

  formData: FormGroup;
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  totalRecords:number=0;

  image = '';
  file = '';

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'CATEGORY MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
      ProductName: ['', [Validators.required]],
      ShortName: ['', [Validators.required]],
      SubItem: ['', [Validators.required]],
      NoOfPcs: ['', [Validators.required]],
      FullDescription: ['', [Validators.required]],
      Making: ['', [Validators.required]],
      StartingNo: ['', [Validators.required]],
      HSNCode: ['', [Validators.required]],
      Unit: ['', [Validators.required]],
      PrintGrossWt: ['', [Validators.required]],
      CalculatePoints: ['', [Validators.required]],
      
      
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
      let request: CategoryModel = <CategoryModel>{};

      request.ProductName = this.formData.get('ProductName').value;//
      request.ShortName = this.formData.get('ShortName').value;//
      request.SubItem = this.formData.get('SubItem').value;//
      request.NoOfPcs = this.formData.get('NoOfPcs').value;//
      request.FullDescription = this.formData.get('FullDescription').value;//
      request.Making = this.formData.get('Making').value;//
      request.StartingNo = this.formData.get('StartingNo').value;//
      request.HSNCode = this.formData.get('HSNCode').value;//
      request.Unit = this.formData.get('Unit').value;//
      request.PrintGrossWt = this.formData.get('PrintGrossWt').value;//
      request.CalculatePoints = this.formData.get('CalculatePoints').value;//
      request.UserID= 1;
      request.SlNo=Number(this.id);

      request.DisCont = this.formData.get('DisCont').value;//

      let jsonData:CategoryModel[]=[];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};
      
      postrequest.spName="sp_ui_admin_add_ProdCateMast_json";
      postrequest.jsnData=JSON.stringify(jsonData);
    this.service.PostApiJson(postrequest).subscribe(response=>{ 
        if(response.code==1){
          this.toastr.success( 'Category Inserted Successfully!','Success!');
          this.router.navigate(['/master/category']);
        }
        else{
          this.toastr.error( 'Category not Added!','Error!');
        }
     
    })

      console.log("post product", request);//

      
    }
  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetProdCateMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
     this.categoryData= JSON.parse(response.items);
     if(this.categoryData.length){
     let data=this.categoryData[0];
      this.formData.controls['ProductName'].setValue(data['ProductName']);
      this.formData.controls['ShortName'].setValue(data['ShortName']);
      this.formData.controls['SubItem'].setValue(data['SubItem']);
      this.formData.controls['NoOfPcs'].setValue(data['NoOfPcs']);
      this.formData.controls['FullDescription'].setValue(data['FullDescription']);
      this.formData.controls['Making'].setValue(data['Making']);
      this.formData.controls['StartingNo'].setValue(data['StartingNo']);
      this.formData.controls['HSNCode'].setValue(data['HSNCode']);
      this.formData.controls['Unit'].setValue(data['Unit']);
      this.formData.controls['PrintGrossWt'].setValue(data['PrintGrossWt']);
      this.formData.controls['CalculatePoints'].setValue(data['CalculatePoints']);
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

