import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { CategoryModel } from 'src/app/core/models/ProdCateMast model';
import { PartyModel } from 'src/app/core/models/Party.model';
import { SubCategoryModel } from 'src/app/core/models/SubCategory.model';
import { ColorsModel } from 'src/app/core/models/colors.model';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { throttleTime } from 'rxjs/internal/operators/throttleTime';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_PARTY_MASTER.component.html',
  styleUrls: ['./insert-TBL_PARTY_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Party_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  Name: any;
 
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  PartyData: PartyModel[]=[];
  text: CategoryModel = <CategoryModel>{};
  texts: SubCategoryModel = <SubCategoryModel>{};
 cityData: any[] = [];
 gltypeData: any[] = [];
 DcityData: any[] = [];
  results: string[]=[];
  StateId=0;
  CountryId=0;
  DStateId=0;
  DCountryId=0;
  colorsData: ColorsModel[]=[];
  selectedDoc="";
  GLTypeId:number=0;
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
    
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'PARTY MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Alias: [''],
      DCity: ['', [Validators.required]],
      DZipCode: [''],
      City: ['', [Validators.required]],
      ZipCode: [''],

      State: [''],
      Country: [''],
      BillingAddress: [''],
      ContactPerson: [''],
      TelePhone: [''],
      WhatsappNo: [''],
      Email: [''],
      CINNo: [''],
      GSTNo: [''],
      PanNo: [''],
      DeliveryAddress: [''],
      DState: [''],
      DCountry: [''],
      DContactPerson: [''],
      DTelePhone: [''],
      DWhatsappNo: [''],
      DEmail: [''],
      AccountNo: [''],
      BankName: [''],
      IfscCode: [''],
      TransporterName: [''],
      SalesPerson: [''],
      MobileNo: [''],
    });
this._fetchGlType();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    })

    this.formData.get("Name").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('Name').value;
      this.formData.patchValue({
        Alias : value,
     });
      console.log("Name",value)
      if(this.id>0){

      }else{
     
      if(value>0){
        let request={
          "table_name": "ASLMast",
          "column_name": "Name",
          "column_value": value.toString()
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['Name'].setErrors({ invalid: 'Name Already Exist!' });
         
            this.toastr.error( 'Name Already Exist!','Error!');
            // this.submit = true;
          }
          else{
         
            this.submit = false;
          }
         
         
        });
       
      }
    }
    });

    this.selectedDoc= sessionStorage.getItem("partydoctype");
    let GlTypedata=sessionStorage.getItem("GLTypeId");
    if(this.selectedDoc!="" && this.selectedDoc!=null && GlTypedata!=undefined && Number(GlTypedata)>0){
      this.GLTypeId=Number(GlTypedata);
    }
    else{

      //this.messageService.add({severity:'error', summary: 'Error', detail: 'Select Doc Type', life: 3000});
      this.router.navigate(['/master/party']);
    }
    this.submit = false;
  }
  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
  Close(){
    this.router.navigate(['/master/party']);
  }

  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    if (this.formData.valid) {
      let request: PartyModel = <PartyModel>{};

      request.Name = this.formData.get('Name').value;//
      request.Alias = this.formData.get('Alias').value;//
      request.GlType = this.GLTypeId;//
      request.GlBillingAdd = this.formData.get('BillingAddress').value;//
      request.CityId = this.formData.get('City').value.SlNo;//
      request.ZipCode = this.formData.get('ZipCode').value;//
      request.State = this.StateId.toString();
      request.Country = this.CountryId.toString();
      request.ContactPerson = this.formData.get('ContactPerson').value;//
      request.TelePhone = this.formData.get('TelePhone').value;//
      request.WhatsappNo = this.formData.get('WhatsappNo').value;//
      request.Email = this.formData.get('Email').value;//
    //  request.CC = this.formData.get('CC').value;//
      request.CINNo = this.formData.get('CINNo').value//
      request.GSTNo = this.formData.get('GSTNo').value;//
      request.PanNo = this.formData.get('PanNo').value;//
      request.MobileNo = this.formData.get('MobileNo').value;//
      request.DelvAddress = this.formData.get('DeliveryAddress').value;//
      request.DCityId = this.formData.get('DCity').value.SlNo;//
      request.DZipCode = this.formData.get('DZipCode').value;//
     
      request.DContactPerson = this.formData.get('DContactPerson').value;//
      request.DTelePhone = this.formData.get('DTelePhone').value;//
      request.DWhatsappNo = this.formData.get('DWhatsappNo').value;//
      request.DEmail = this.formData.get('DEmail').value;//
      //request.DCC = this.formData.get('DCC').value;//
      request.AccountNo = this.formData.get('AccountNo').value;//
      request.BankName= this.formData.get('BankName').value;//
      request.IfscCode = this.formData.get('IfscCode').value;//
      request.TransporterName = this.formData.get('TransporterName').value;//
      request.SalesPerson = this.formData.get('SalesPerson').value;//
      
      request.UserID = 1;
      request.id = Number(this.id);

      let jsonData: PartyModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_PartyMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'Party Inserted Successfully!','Success!');
          this.router.navigate(['/master/party']);
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
    requestModel.spName="sp_admin_GetPartyMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.PartyData= JSON.parse(response.items);
      if(this.PartyData.length){
      let data=this.PartyData[0];
      console.log("PartyData",data);
      //this.formData.controls['ID'].setValue(data['ID']);
      this.formData.controls['Name'].setValue(data['GLName']);
      this.formData.controls['Alias'].setValue(data['Alias']);
      this.formData.controls['BillingAddress'].setValue(data['GlBillingAdd']);
      this.formData.controls['MobileNo'].setValue(data['GLMobileNo']);
      this.formData.controls['City'].setValue( {CityName: data['CityName'], SlNo: data['GlCityID']});
      this.formData.controls['ZipCode'].setValue(data['GlPinCode']);
      this.formData.controls['State'].setValue(data['StateName']);
      this.formData.controls['Country'].setValue(data['CountryName']);
      this.formData.controls['DContactPerson'].setValue(data['DelvContactPerson']);
      this.formData.controls['TelePhone'].setValue(data['GLPhoneNo']);
      this.formData.controls['DWhatsappNo'].setValue(data['DelvWhatsappNo']);
      this.formData.controls['Email'].setValue(data['EmailID']);
     // this.formData.controls['CC'].setValue(data['CC']);
      this.formData.controls['CINNo'].setValue(data['CINNo']);
      this.formData.controls['GSTNo'].setValue(data['GSTNo']);
      this.formData.controls['PanNo'].setValue(data['PANNo']);

      this.formData.controls['DeliveryAddress'].setValue(data['DelvAddress']);
    //  this.formData.controls['DCity'].setValue(data['DCity']);
      this.formData.controls['DCity'].setValue( {CityName: data['DCityName'], SlNo: data['DelvCityID']});
      this.formData.controls['DZipCode'].setValue(data['DelvPinCode']);
      this.formData.controls['DState'].setValue(data['DStateName']);
      this.formData.controls['DCountry'].setValue(data['DCountryName']);
      this.formData.controls['ContactPerson'].setValue(data['ContactPerson']);
      this.formData.controls['DTelePhone'].setValue(data['DelvPhoneNo']);
      this.formData.controls['WhatsappNo'].setValue(data['WhatsappNo']);
      this.formData.controls['DEmail'].setValue(data['DelvEmail']);
   //   this.formData.controls['DCC'].setValue(data['DCC']);
      this.formData.controls['AccountNo'].setValue(data['BankAcNo']);
      this.formData.controls['BankName'].setValue(data['BankName']);
      this.formData.controls['IfscCode'].setValue(data['BankIfscCode']);
     // this.formData.controls['TransporterName'].setValue(data['TransporterName']);
     // this.formData.controls['SalesPerson'].setValue(data['SalesPerson']);
     this.formData.controls['TransporterName'].setValue( data['TransporterName']);
      this.formData.controls['SalesPerson'].setValue(Number(data['SalesPersonID']));
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
  public _fetchCity(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetCityMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.cityData = JSON.parse(response.items);
      
    });   
  }
 onSelectCity(event: any){
    //console.log( event.DocType );
    this.StateId=event.StateId;
    this.CountryId=event.Country_id;
      this.formData.patchValue({
      State: event.StateName,
      Country:event.CountryName
    });
  }


  public _fetchDCity(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetCityMast";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.DcityData = JSON.parse(response.items);
      
    });   
  }
  onSelectDCity(event: any){
   // console.log( event.DocType );
    this.DStateId=event.StateId;
    this.DCountryId=event.Country_id;
      this.formData.patchValue({
      DState: event.StateName,
      DCountry:event.CountryName
    });


  }
  onName(event: any){
    console.log( event.DocType );
    this.Name=event.Name;
    this.formData.patchValue({
      Name : event.Alias,
   });
  }



  public _fetchGlType() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetFilterGltype";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search="'OR'";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.gltypeData = JSON.parse(response.items);
      
    });   
  }
}

