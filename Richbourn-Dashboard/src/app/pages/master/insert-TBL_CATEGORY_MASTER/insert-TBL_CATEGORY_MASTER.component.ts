  
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { CategoryModel } from 'src/app/core/models/ProdCateMast model';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
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
  //@ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("myinput") myInputField;
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
  boolData: any[];
  image = '';
  file = '';
    boolCat=true;
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BRANCH MASTER', active: true }];
   
      this.boolCat=true;
    
    this.formData = this.formBuilder.group({
      ProdCateID: ['0'],
      ProdCate: ['', [Validators.required]],
     DisCont: [  { name: 'NO', code: 'N' }, [Validators.required]],
     
      
    });
    console.log(" this.route", this.router.url.split(';')[0]);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });

    this.formData.get("ProdCate").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('ProdCate').value;
      
      if(this.id>0){

      }else{
      console.log("ProdCate",value)
      if(value.length >1){
        let request={
          "table_name": "ProdCateMast",
          "column_name": "ProdCate",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['ProdCate'].setErrors({ invalid: 'Category Name Already Exist!' });
         
            this.toastr.error( 'Category Name Already Exist!','Error!');
            this.submit = true;
          }
          else{
         
            this.submit = false;
          }
         
         
        });
       
      }
    }
    });

    this.formData.get("ProdCateID").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('ProdCateID').value;
      console.log("ProdCateID",value)
      if(this.id>0){

      }else{
     
      if(value>0){
        let request={
          "table_name": "ProdCateMast",
          "column_name": "ProdCateID",
          "column_value": value.toString()
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['ProdCateID'].setErrors({ invalid: 'Category ID Already Exist!' });
         
            this.toastr.error( 'Category ID Already Exist!','Error!');
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

    if (this.formData.valid) {
      let request: CategoryModel = <CategoryModel>{};

      request.ProdCateID = this.formData.get('ProdCateID').value;//
      request.ProdCate = this.formData.get('ProdCate').value.toUpperCase();//
      request.UserID= 1;
      request.SlNo=Number(this.id);
    
        request.Filter="finish"
     
      request.DisCont = this.formData.get('DisCont').value.code;//

      let jsonData:CategoryModel[]=[];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};
      
      postrequest.spName="sp_ui_admin_add_ProdCateMast_json";
      postrequest.jsnData=JSON.stringify(jsonData);
    this.service.PostApiJson(postrequest).subscribe(response=>{ 
        if(response.document.statusMessage==="success"){
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
    console.log("this.router.url.split(';')[0]",this.router.url.split(';')[0])
   
      requestModel.ColumnValue="finish"
    
    requestModel.id=Number(this.id);
    this.service.GetFilterApiJson(requestModel).subscribe(response => {
     this.categoryData= JSON.parse(response.items);
     if(this.categoryData.length){
     let data=this.categoryData[0];
      this.formData.controls['ProdCateID'].setValue(data['ProdCateID']);
      this.formData.controls['ProdCate'].setValue(data['ProdCate']);
      this.formData.controls['DisCont'].setValue(data['DisCont']=="Y"? { name: 'YES', code: 'Y' }:  { name: 'NO', code: 'N' });

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
    this.myInputField.input.nativeElement.focus();
  }
  Close(){
    this.router.navigate(['/master/category']);
  }
  public _fetchBool(event) {
    this.boolData = [];
    this.boolData = [
      { name: 'YES', code: 'Y' },
      { name: 'NO', code: 'N' }

    ];

  }
}

