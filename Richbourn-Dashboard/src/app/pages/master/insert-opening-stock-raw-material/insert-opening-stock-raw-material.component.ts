
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { OpStockModel } from 'src/app/core/models/OpStock.model';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { LocationModel } from 'src/app/core/models/location.model';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemModel } from 'src/app/core/models/item.model';
@Component({
  selector: 'app-insert-opening-stock-raw-material',
  templateUrl: './insert-opening-stock-raw-material.component.html',
  styleUrls: ['./insert-opening-stock-raw-material.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertOpeningStockRawMaterialComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  imageURL: string;
  SlNo: any;
  uploadedFiles: any[]=[];
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
ProdImage="";
public readonly ImgUrl = environment.ImgUrl;
  stateData: StateModel[];
  locationData:LocationModel[] = [];
 seriesData: OpStockModel[]=[];
 itemsData:ItemModel[]=[];
 results: string[]=[];;
    config: DropzoneConfigInterface = {
      // Change this to your upload POST address:
      maxFilesize: 50,
      acceptedFiles: 'image/*',
      method: 'POST',
      uploadMultiple: true,
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

    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'OpSTOCK MASTER', active: true }];
  
    this.formData = this.formBuilder.group({

      LocationID: ['', [Validators.required]],
      ProdCode: ['', [Validators.required]],
    
      Qty: ['', [Validators.required]],
      Rate: [''],
      Amt: [''],

      
    });
    this.formData.get("ProdCode").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('ProdCode').value;
     this._fetchProdCode(value);
    });


   this.formData.get("Rate").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('Rate').value;
      let Qty=this.formData.get('Qty').value;
      let Amt= value*Qty;
      this.formData.controls['Amt'].setValue(Amt);
    })
    this.formData.get("Qty").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('Rate').value;
      let Qty=this.formData.get('Qty').value;
      let Amt= value*Qty;
      this.formData.controls['Amt'].setValue(Amt);
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    })
    this.formData.get("ProdCode").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('ProdCode').value;
      console.log("ProdCode",value)
      if(this.id>0){

      }else{
     
      if(value>0){
        let request={
          "table_name": "ProdOpStock",
          "column_name": "ProdCode",
          "column_value": value.toString()
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['ProdCode'].setErrors({ invalid: 'Product Code Already Exist!' });
         
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
    this.formData.get("LocationID").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('LocationID').value;
      console.log("LocationID",value)
      if(this.id>0){

      }else{
     
      if(value>0){
        let request={
          "table_name": "ProdOpStock",
          "column_name": "LocationID",
          "column_value": value.toString()
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['LocationID'].setErrors({ invalid: 'LocationID Already Exist!' });
         
            this.toastr.error( 'LocationID Already Exist!','Error!');
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
      let index=1;
      for (const file of this.uploadedFiles) {
        let fileName:string = this.formData.get('ProdSlNo').value+"_"+index; //get name from form for example
        let fileExtension:string = file.name.split('?')[0].split('.').pop();
       // formData.append('files', file) // appending every file to formdata
        formData.append('files', file, fileName+'.'+fileExtension);
       }
    
     
      this.service.UploadFile(formData).subscribe(response => {
        console.log(response);  
        
      });   


      let request: OpStockModel = <OpStockModel>{};

      request.SlNo= this.id;
      request.LocationID= this.formData.get('LocationID').value.SlNo;//
      request.ItemCode = this.formData.get('ProdCode').value.ItemCode;//
     request.Qty = this.formData.get('Qty').value;//
      request.Rate = this.formData.get('Rate').value;//
      request.Amt = this.formData.get('Amt').value;//
      request.OpType="raw";


      let jsonData: OpStockModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_OpStockRawMaterial_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'OpStock Inserted Successfully!','Success!');
          this.router.navigate(['/master/OpStock-raw-material']);
        }
        else{
          this.toastr.error( 'OpStock not Added!','Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetOpSTOCKMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];

    //  this.formData.controls['LocationID'].setValue(data['LocationID']);
      this.formData.controls['LocationID'].setValue( {Location: data['Location'], SlNo: data['LocationID']});
      this.formData.controls['ProdCode'].setValue(data['ProdCode']);
      this.formData.controls['Qty'].setValue(data['Qty']);
      this.formData.controls['Rate'].setValue(data['Rate'])
      this.formData.controls['Amt'].setValue(data['Amt']);
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

  private _fetchState() {
    this.requestModel.url = "SP/sp_app_get_state";
    this.stateservice.postStoreList(this.requestModel).subscribe(response => {
      this.stateData = response.items;
      console.log("this.stateData", this.stateData);
    });
  }

  ngAfterViewInit() {
    // this.myInputField.nativeElement.focus();
  }


  public _fetchLocation(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetLocationMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.locationData = JSON.parse(response.items);
      
    });   
  }
  myUploader(event) {
    //event.files == files to upload
    this.uploadedFiles=event.files;
   
}
public _fetchItem(event) { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_GetItemMast";
  requestModel.pageNo=1;
  requestModel.pageSize=10;
  requestModel.search=event.query;
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.itemsData = JSON.parse(response.items);
 
  });   
}

private _fetchProdCode(ProdeCode:string) {

  let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_GetProdMast_ProdCode";
  requestModel.pageNo=1;
  requestModel.pageSize=1;
  requestModel.search= "";
  requestModel.ColumnValue=ProdeCode
  requestModel.id=Number(this.id);
  this.service.GetFilterApiJson(requestModel).subscribe(response => {
  let ProdData= JSON.parse(response.items);
   if(ProdData.length){
   let data=ProdData[0];
 this.ProdImage=this.ImgUrl+data.ProdCode+'_1.jpg?'+this.createId();
   console.warn("image",this.ProdImage);
}
   
  });
}
Close(){
  this.router.navigate(['/master/OpStock-raw-material']);
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

