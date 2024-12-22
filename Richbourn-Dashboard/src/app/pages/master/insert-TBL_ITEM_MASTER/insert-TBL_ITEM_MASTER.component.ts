import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { ItemModel } from 'src/app/core/models/item.model';
import { CategoryModel } from 'src/app/core/models/ProdCateMast model';
import { SubCategoryModel } from 'src/app/core/models/SubCategory.model';
import { UnitModel } from 'src/app/core/models/unit.model';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper/lib/dropzone.interfaces';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { throttleTime } from 'rxjs/internal/operators/throttleTime';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_ITEM_MASTER.component.html',
  styleUrls: ['./insert-TBL_ITEM_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */

export class InsertTBL_Item_MASTERComponent implements OnInit, AfterViewInit {
 selectedValues: string[] = ['val1','val2'];

  @ViewChild("myinput") myInputField: ElementRef;
   
  
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
uploadedFiles: any[] = [];
  stateData: StateModel[];
  ItemData: ItemModel[]=[];
 text: CategoryModel = <CategoryModel>{};
 texts: SubCategoryModel = <SubCategoryModel>{};
 subcategoryData: SubCategoryModel[]=[];
 categoryData: CategoryModel[]=[];
 unitData: UnitModel[]=[];

 config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  method: 'POST',
  uploadMultiple: false,
  accept: (file) => {
    this.onAccept(file);
  }
};
image = '';
file = '';
  get form() {

    return this.formData.controls;
  }

  formData: FormGroup;
  
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ITEM MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ItemName: ['', [Validators.required]],
      BaseUnit: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      SubCategory: ['', [Validators.required]],
      ItemDesc: [''],
      Cost: [''],
      MRP: [''],
      ReOrder: [''],
      BaseQty: [''],
      HsnCode: [''],
      Active: [false],
      Visible: [false],
      StockMaintain: [false],
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    })
    this.formData.get("ItemName").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('ItemName').value;
      
      if(this.id>0){

      }else{
      console.log("ItemName",value)
      if(value.length >1){
        let request={
          "table_name": "ItemMast",
          "column_name": "ItemName",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['ItemName'].setErrors({ invalid: 'Item Name Already Exist!' });
         
            this.toastr.error( 'Item Name Already Exist!','Error!');
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
Close(){
  this.router.navigate(['/master/item'])
}
  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    if (this.formData.valid) {

      var formData: any = new FormData();
      let index=1;
      for (const file of this.uploadedFiles) {
        let fileName:string = this.formData.get('ItemCode').value+"_"+index; //get name from form for example
        let fileExtension:string = file.name.split('?')[0].split('.').pop();
       // formData.append('files', file) // appending every file to formdata
        formData.append('files', file, fileName+'.'+fileExtension);
       }
    
     
      this.service.UploadFile(formData).subscribe(response => {
        console.log(response);  
        
      });   




      let request: ItemModel = <ItemModel>{};
      request.ItemCode=this.id;
      request.ItemName = this.formData.get('ItemName').value;//
      request.BaseUnit = this.formData.get('BaseUnit').value.UnitID;//
      request.Category = this.formData.get('Category').value.SlNo;//
      request.SubCategory = this.formData.get('SubCategory').value.SlNo;//
      request.ItemDesc = this.formData.get('ItemDesc').value;//
      request.Cost = this.formData.get('Cost').value;//
      request.MRP = this.formData.get('MRP').value;//
      request.ReOrder = this.formData.get('ReOrder').value;//
      request.BaseQty = this.formData.get('BaseQty').value;//
      request.HsnCode = this.formData.get('HsnCode').value;//
      


      let jsonData: ItemModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_ItemMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'Item Inserted Successfully!','Success!');
          this.router.navigate(['/master/item']);
        }
        else{
          this.toastr.error( 'Item not Added!','Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetItemMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.ItemData= JSON.parse(response.items);
      if(this.ItemData.length){
      let data=this.ItemData[0];

     // this.unitData=[];
      let unit: UnitModel = <UnitModel>{};
      unit.ShortName=data['UnitName'];
      unit.SlNo=data.BaseUnit;
     // this.unitData.push(unit)
     let category: CategoryModel = <CategoryModel>{};
     category.ProdCate=data['ProdCate'];
     category.ProdCateID=data['CategoryID'];

     let subcategory: SubCategoryModel = <SubCategoryModel>{};
     subcategory.SubCate=data['SubCate'];
     subcategory.SlNo=data['SubCateID'];



      this.formData.controls['ItemName'].setValue(data['ItemName']);
      this.formData.controls['BaseUnit'].setValue(unit);
      this.formData.controls['Category'].setValue(category);
      this.formData.controls['SubCategory'].setValue(subcategory);
      this.formData.controls['ItemDesc'].setValue(data['ItemDesc']);
      this.formData.controls['Cost'].setValue(data['Cost']);
      this.formData.controls['MRP'].setValue(data['MRP']);
      this.formData.controls['ReOrder'].setValue(data['ReOrdQty']);
      this.formData.controls['BaseQty'].setValue(data['BaseQty']);
      this.formData.controls['HsnCode'].setValue(data['HSNCode']);
      
    
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
    requestModel.ColumnValue="raw";
    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.categoryData = JSON.parse(response.items);
      
    });   
  }

  public _fetchSubCategory(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetSubCateMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    requestModel.ColumnValue="raw";
    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.subcategoryData = JSON.parse(response.items);
      
    });   
  }
  public _fetchUnit(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetUnitMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.unitData = JSON.parse(response.items);
      
    });   
  }


  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
  myUploader(event) {
    //event.files == files to upload
    this.uploadedFiles=event.files;
   
}
}

