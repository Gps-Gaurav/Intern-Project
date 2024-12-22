

import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, throttleTime, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { CategoryModel } from 'src/app/core/models/ProdCateMast.model';
import { ModifyModel } from 'src/app/core/models/Modify.modal';
import { SubCategoryModel } from 'src/app/core/models/SubCategory.model';
import { ColorsModel } from 'src/app/core/models/colors.model';
import { GroupModel } from 'src/app/core/models/Group.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_MODIFY_PRODUCT_MASTER.component.html',
  styleUrls: ['./insert-TBL_MODIFY_PRODUCT_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Modify_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  colorsData: { name: string; code: string; }[];
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

    requestModel: RequestModel = <RequestModel>{};
    stateData: StateModel[];
    categoryData: CategoryModel[]=[];
    GroupData: GroupModel[]=[];
    subcategoryData: SubCategoryModel[]=[];
    text: CategoryModel = <CategoryModel>{};
    texts: SubCategoryModel = <SubCategoryModel>{};
  
    results: string[]=[];;

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
    this.colorsData = [
      {name: 'Red', code: 'R'},
      {name: 'Green', code: 'G'},
      {name: 'Blue', code: 'BL'},
      {name: 'Black', code: 'BK'},
      {name: 'Yellow', code: 'Y'}
  ];
    
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'MODIFY MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
      ProductCode: ['', [Validators.required]],
      MRPCode: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      SubCategory: ['', [Validators.required]],
      Group: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      CT: ['', [Validators.required]],
      MRP: ['', [Validators.required]],
      ReOrderLevel: ['', [Validators.required]],
      BaseQty: ['', [Validators.required]],
      Size: ['', [Validators.required]],
      Colours: ['', [Validators.required]],
      HSNCode: ['', [Validators.required]],
      LabourRt: ['', [Validators.required]],
      Remarks: ['', [Validators.required]],
      TagLine: ['', [Validators.required]],
      ArtNo: ['', [Validators.required]],
      MRP2: ['', [Validators.required]],

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
      let request: ModifyModel = <ModifyModel>{};

      request.MRPCode = this.formData.get('MRPCode').value;//
      request.ProductCode = this.formData.get('ProductCode').value;//
      request.Category = this.formData.get('Category').value;//
      request.SubCategory = this.formData.get('SubCategory').value;//
      request.Group = this.formData.get('Group').value;//
      request.Description = this.formData.get('Description').value;//
      request.CT = this.formData.get('CT').value;//
      request.MRP = this.formData.get('MRP').value;//
      request.ReOrderLevel = this.formData.get('ReOrderLevel').value;//
      request.BaseQty = this.formData.get('BaseQty').value;//
      request.Size = this.formData.get('Size').value;//
      request.Colours = this.formData.get('Colours').value;//
      request.HSNCode = this.formData.get('HSNCode').value;//
      request.LabourRt = this.formData.get('LabourRt').value;//
      request.Remarks = this.formData.get('Remarks').value;//
      request.TagLine = this.formData.get('TagLine').value;//
      request.ArtNo = this.formData.get('ArtNo').value;//
      request.MRP2 = this.formData.get('MRP2').value;//
      
      request.UserID = 1;
      request.SlNo = Number(this.id);

      request.DisCont = this.formData.get('DisCont').value;//

      let jsonData: ModifyModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_ProdMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if(Response.code==1){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/product']);
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
      //this.formData.controls['ID'].setValue(data['ID']);
      this.formData.controls['ProductCode'].setValue(data['ProductCode']);
      this.formData.controls['MRPCode'].setValue(data['MRPCode']);
      this.formData.controls['Category'].setValue(data['Category']);
      this.formData.controls['SubCategory'].setValue(data['SubCategory']);
      this.formData.controls['SubCate'].setValue(data['SubCate']);
      this.formData.controls['Group'].setValue(data['Group']);
      this.formData.controls['Description'].setValue(data['Description']);
      this.formData.controls['CT'].setValue(data['CT']);
      this.formData.controls['MRP'].setValue(data['MRP']);
      this.formData.controls['ReOrderLevel'].setValue(data['ReOrderLevel']);
      this.formData.controls['BaseQty'].setValue(data['BaseQty']);
      this.formData.controls['Size'].setValue(data['Size']);
      this.formData.controls['Colours'].setValue(data['Colours']);
      this.formData.controls['HSNCode'].setValue(data['HSNCode']);
      this.formData.controls['LabourRt'].setValue(data['LabourRt']);
      this.formData.controls['Remarks'].setValue(data['Remarks']);
      this.formData.controls['TagLine'].setValue(data['TagLine']);
      this.formData.controls['ArtNo'].setValue(data['ArtNo']);
      this.formData.controls['MRP2'].setValue(data['MRP2']);
      
      this.formData.controls['EMAIL'].setValue(data['email']);
      this.formData.controls['AGENT_BRANCH'].setValue(data['agenT_BRANCH']);
      this.formData.controls['REGIONAL_BRANCH'].setValue(data['regionaL_BRANCH']);
      this.formData.controls['ZONE'].setValue(data['zone']);
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
  public _fetchCategory(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetProdCateMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.categoryData = JSON.parse(response.items);
      
    });   
  }

  public _fetchGroup(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetGroupMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.GroupData = JSON.parse(response.items);
      
    });   
  }
  public _fetchSubCategory(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetSubCateMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.subcategoryData= JSON.parse(response.items);
      
    });   
  }
 
 
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }



}

