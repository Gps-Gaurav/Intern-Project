

import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, throttleTime, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { CategoryModel } from 'src/app/core/models/ProdCateMast model';
import { ModifyModel } from 'src/app/core/models/Modify.modal';
import { SubCategoryModel } from 'src/app/core/models/SubCategory.model';
import { ColorsModel } from 'src/app/core/models/colors.model';
import { GroupModel } from 'src/app/core/models/Group.model';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MessageService } from 'primeng/api';
import { UnitModel } from 'src/app/core/models/unit.model';
import { ItemModel } from 'src/app/core/models/item.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_MODIFY_PRODUCT_MASTER.component.html',
  styleUrls: ['./insert-TBL_MODIFY_PRODUCT_MASTER.component.scss'],
  providers: [MessageService,TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Modify_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  colorsData: any[] = [];
  imageURL: string;
  ProdImage="";galleryImage1="";galleryImage2="";galleryImage3="";galleryImage4="";
public readonly ImgUrl = environment.ImgUrl;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe,
    private messageService: MessageService,
     private stateservice: ResourceService<any>) { }
     uploadedFiles: any[] = [];
     image1: any[] = [];
     image2: any[] = [];
     image3: any[] = [];
     image4: any[] = [];
    requestModel: RequestModel = <RequestModel>{};
    stateData: StateModel[];
    categoryData: CategoryModel[]=[];
    GroupData: GroupModel[]=[];
    sizeData:any[]=[];
    subcategoryData: SubCategoryModel[]=[];
    selectedUsers: any = [];
    unitData: UnitModel[]=[];
    itemData: ItemModel[]=[];
    results: string[]=[];;
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
   
    
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'PRODUCT MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
      ProductCode: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      SubCategory: ['', [Validators.required]],
      Group: ['', [Validators.required]],

      Description: [''],
      MRPCode: [''],
      CT: [''],
      MRP: [''],
      ReOrderLevel: [''],
      BaseQty: [''],
      Length: [''],
      Width: [''],
      Height: [''],
      Colours: [''],
      HSNCode: [''],
      LabourRt: [''],
      Remarks: [''],
      TagLine: [''],
      ArtNo: [''],
      OnlineSKU: [''],
      image: [''],
      MRP2:[''],
      Size:[''],
      Age:[0],
      usersDetails: this.formBuilder.array([]),
 
    });
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
      else{
        //this._fetchColor([]);
      }
    });
    this._fetchColor();
    this._fetchSize();
    this._fetchUnit();
    this._fetchItem();
    this.formData.get("ProductCode").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('ProductCode').value;
      console.log("ProductCode",value)
      if(this.id>0){

      }else{
     
      if(value>0){
        let request={
          "table_name": "ProdMast",
          "column_name": "ProductCode",
          "column_value": value.toString()
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['ProductCode'].setErrors({ invalid: 'Product Code Already Exist!' });
         
            this.toastr.error( 'Product Code Already Exist!','Error!');
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
    console.log("post product", "request");//

    if (this.formData.valid) {

      var formData: any = new FormData();
      
     



      let request: ModifyModel = <ModifyModel>{};

      request.MRPCode = this.formData.get('MRPCode').value;//
      request.ProductCode = this.formData.get('ProductCode').value;//
      request.Category = this.formData.get('Category').value.SlNo;//
      request.SubCategory = this.formData.get('SubCategory').value.SlNo;//
      request.Group = this.formData.get('Group').value.SlNo;//
      request.Description = this.formData.get('Description').value;//
      request.CT = this.formData.get('CT').value;//
      request.MRP = this.formData.get('MRP').value;//
      request.ReOrderLevel = this.formData.get('ReOrderLevel').value;//
      request.BaseQty = this.formData.get('BaseQty').value;//
      request.Length = this.formData.get('Length').value;//
      request.Width = this.formData.get('Width').value;//
      request.Height = this.formData.get('Height').value;//
      request.Colours = this.formData.get('Colours').value;//
      request.SizeID = this.formData.get('Size').value;//
      request.Age = this.formData.get('Age').value;//
      request.ColoursName = this.formData.get('Colours').value;//
      request.HSNCode = this.formData.get('HSNCode').value;//
      request.LabourRt = this.formData.get('LabourRt').value;//
      request.Remarks = this.formData.get('Remarks').value;//
      request.TagLine = this.formData.get('TagLine').value;//
      request.ArtNo = this.formData.get('ArtNo').value;//
      request.OnlineSKU = this.formData.get('OnlineSKU').value;//
      request.MRP2 = this.formData.get('MRP2').value;//
       request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//
      request.UserID = 1;
      request.SlNo = Number(this.id);

      let colorname=this.colorsData.find(m=>m.SlNo==request.Colours).ColorName;
     // var array = request.Colours.split(',');
     // var ColoursNamearray = request.ColoursName.split(',');

      for (const file of this.uploadedFiles) {
        let fileName:string = this.formData.get('ProductCode').value+"_"+colorname; //get name from form for example
        let fileExtension:string = file.name.split('?')[0].split('.').pop();
       // formData.append('files', file) // appending every file to formdata
        formData.append('files', file, fileName+'.'+fileExtension);
       }
       for (const file of this.image1) {
        let fileName:string = this.formData.get('ProductCode').value+"_"+colorname+"_"+1; //get name from form for example
        let fileExtension:string = file.name.split('?')[0].split('.').pop();
       // formData.append('files', file) // appending every file to formdata
        formData.append('files', file, fileName+'.'+fileExtension);
       }
       for (const file of this.image2) {
        let fileName:string = this.formData.get('ProductCode').value+"_"+colorname+"_"+2; //get name from form for example
        let fileExtension:string = file.name.split('?')[0].split('.').pop();
       // formData.append('files', file) // appending every file to formdata
        formData.append('files', file, fileName+'.'+fileExtension);
       }
       for (const file of this.image3) {
        let fileName:string = this.formData.get('ProductCode').value+"_"+colorname+"_"+3; //get name from form for example
        let fileExtension:string = file.name.split('?')[0].split('.').pop();
       // formData.append('files', file) // appending every file to formdata
        formData.append('files', file, fileName+'.'+fileExtension);
       }
       for (const file of this.image4) {
        let fileName:string = this.formData.get('ProductCode').value+"_"+colorname+"_"+4; //get name from form for example
        let fileExtension:string = file.name.split('?')[0].split('.').pop();
       // formData.append('files', file) // appending every file to formdata
        formData.append('files', file, fileName+'.'+fileExtension);
       }
      this.service.UploadFile(formData).subscribe(response => {
        console.log(response);  
      
          let jsonData: ModifyModel[] = [];
         // request.Colours=request.Colours;  
          request.ColoursName=colorname;
          jsonData.push(request);
          let postrequest: RequestModel = <RequestModel>{};
    
          postrequest.spName = "sp_ui_admin_add_ProdMast_json";
          postrequest.jsnData = JSON.stringify(jsonData);
          this.service.PostApiJson(postrequest).subscribe(Response => {
            if(Response.document.statusMessage==="success"){
              this.toastr.success( 'Product Modify Successfully!','Success!');
              this.router.navigate(['/master/product']);
            }
           })
    
          console.log("post product", request);//
          });
  


    
      

    }
  }

  private _fetchData() {

    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetProdMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
     this.categoryData= JSON.parse(response.items);
     if(this.categoryData.length){
     let data=this.categoryData[0];
      //this.formData.controls['ID'].setValue(data['ID']);
      let summery=data.ProdSummery;		
      if(summery!=null && summery.length){
        summery.forEach(obj => {
          this.usersDetails.push(this.uodateControls(obj));
      });
      }

      let category: CategoryModel = <CategoryModel>{};
      category.ProdCate=data['ProdCate'];
      category.SlNo=data['ProdCateID'];
 
      let subcategory: SubCategoryModel = <SubCategoryModel>{};
      subcategory.SubCate=data['SubCate'];
      subcategory.SlNo=data['SubCateID'];


      let group: GroupModel = <GroupModel>{};
      group.GroupCode=data['GroupCode'];
      group.SlNo=data['GroupID'];



      this.formData.controls['ProductCode'].setValue(data['ProdCode']);
      this.formData.controls['MRPCode'].setValue(data['MRPCode']);
      this.formData.controls['Category'].setValue(category);
      this.formData.controls['SubCategory'].setValue(subcategory);

      this.formData.controls['Group'].setValue(group);
      this.formData.controls['Description'].setValue(data['ProdDesc']);
      this.formData.controls['CT'].setValue(data['CT']);
      this.formData.controls['MRP'].setValue(data['MRP']);
      this.formData.controls['ReOrderLevel'].setValue(data['ReOrderLevel']);
      this.formData.controls['BaseQty'].setValue(data['BaseQty']);
      this.formData.controls['Length'].setValue(data['Length']);
      this.formData.controls['Width'].setValue(data['Width']);
      this.formData.controls['Height'].setValue(data['Height']);


      this.formData.controls['HSNCode'].setValue(data['HSNCode']);
      this.formData.controls['LabourRt'].setValue(data['LabourRate']);
      this.formData.controls['Remarks'].setValue(data['Remarks']);
      this.formData.controls['TagLine'].setValue(data['TagLine']);
      this.formData.controls['ArtNo'].setValue(data['ArtNo']);
      this.formData.controls['MRP2'].setValue(data['MRP2']);
      this.formData.controls['OnlineSKU'].setValue(data['OnlineSKU']);
      this.formData.controls['Age'].setValue(data['Age']);
      this.formData.controls['Size'].setValue(data['SizeID']);
      this.formData.controls['Colours'].setValue(Number(data['ProdColors']));
     console.log("colors");
      let selectcolor=data['ProdColors'].split(',');
      let selectcolorname=data['ColoursName'].split(',');
      console.log("selectcolorname",selectcolorname[0]);
     
      this.ProdImage=this.ImgUrl+data['ProdCode']+"_"+selectcolorname[0]+'.jpg?'+this.createId();
      this.galleryImage1=this.ImgUrl+data['ProdCode']+"_"+selectcolorname[0]+'_1.jpg?'+this.createId();
      this.galleryImage2=this.ImgUrl+data['ProdCode']+"_"+selectcolorname[0]+'_2.jpg?'+this.createId();
      this.galleryImage3=this.ImgUrl+data['ProdCode']+"_"+selectcolorname[0]+'_3.jpg?'+this.createId();
      this.galleryImage4=this.ImgUrl+data['ProdCode']+"_"+selectcolorname[0]+'_4.jpg?'+this.createId();
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
    requestModel.ColumnValue="finish";

    this.service.GetFilterApiJson(requestModel).subscribe(response => {
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
    requestModel.ColumnValue="finish";

    this.service.GetFilterApiJson(requestModel).subscribe(response => {
      this.subcategoryData= JSON.parse(response.items);
      
    });   
  }
 
 
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formData.patchValue({
      image: file
    });
    this.formData.get('image').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  get usersDetails(): FormArray {
    return this.formData.get("usersDetails") as FormArray;
  }
  
  onAdd() {
    this.formData.markAllAsTouched();
    this.usersDetails.push(this.addControls());
    
  }
  
  private addControls() {
    return new FormGroup({
      SlNo: new FormControl("0"),
      ItemCode: new FormControl(""),
      Unit: new FormControl(""),
      Qty: new FormControl(""),
      Rate: new FormControl(""),
      Amount: new FormControl(""),
      
    });
  }
  private uodateControls(item:any) {
    return new FormGroup({
      SlNo: new FormControl(item.SlNo),
      ItemCode: new FormControl(item.ItemCode),
      Unit: new FormControl(item.UnitId),
      Qty: new FormControl(item.Qty),
      Rate: new FormControl(item.Rate),
      Amount: new FormControl(item.Amt),
      
    });
  }

 public ChangeRate(event: any,index:number){
    console.log( event.value,index );
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
        myForm.patchValue({
          Amount:event.value*myForm.value.Qty,
         
        })
   //this.Calculate_Gross();
  }
  public ChangeQty(event: any,index:number){
    console.log( event.value,index );
    const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
        myForm.patchValue({
          Amount:event.value*myForm.value.Rate,
         
        })
   //this.Calculate_Gross();
  }
  onDelete() {
    if (this.selectedUsers.length ==0) {
      this.messageService.add({
        severity: "warn",
        summary: "Info",
        detail: "Please select a record to delete!",
      });
      return;
    }
    console.log(this.selectedUsers);
    for (var i = this.selectedUsers.length-1 ; i >= 0; i--) {
      this.usersDetails.controls.splice(this.selectedUsers[i] - 1, 1);
    }
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Selected records deleted!",
    });
  
    this.selectedUsers = [];
  }
  Close(){
    this.router.navigate(['/master/product']);
  }

  public _fetchUnit() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_dropdown_GetUnitMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search="";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.unitData = JSON.parse(response.items);
      
    });   
  }
  public _fetchSize() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_dropdown_GetSizeMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search="";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.sizeData = JSON.parse(response.items);
      
    });   
  }
  public _fetchItem() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_dropdown_GetItemMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search="";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.itemData = JSON.parse(response.items);
      
    });   
  }

  public _fetchColor() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_dropdown_GetColorMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search="";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.colorsData = JSON.parse(response.items);
     
    
    });   
  }

  myUploader(event,name) {
    //event.files == files to upload
    console.log("imgname",name)
    if(name===0){
      this.uploadedFiles=event.files;
    }
    else if(name===1){
      this.image1=event.files;
    }
    else if(name===2){
      this.image2=event.files;
    }
    else if(name===3){
      this.image3=event.files;
    }
    else if(name===4){
      this.image4=event.files;
    }
}
createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
}

