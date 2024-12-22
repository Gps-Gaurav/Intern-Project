import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { LedgerModel } from 'src/app/core/models/ledger.model';
import { GroupModel } from 'src/app/core/models/Group.model';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_LEDGER_MASTER.component.html',
  styleUrls: ['./insert-TBL_LEDGER_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */

export class InsertTBL_Ledger_MASTERComponent implements OnInit, AfterViewInit {
 selectedValues: string[] = ['val1','val2'];

  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  cityData: any[] = [];
  stateData: StateModel[];
 seriesData: LedgerModel[]=[];
 GroupData: GroupModel[]=[];
 LedgerTypeData: any[] = [];
 SubGroupData: any[] = [];
 gltypeData: any[] = [];
 StateId=0;
 CountryId=0;
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'LEDGER MASTER', active: true }];

    this.formData = this.formBuilder.group({
      LedgerDesc: ['', [Validators.required]],
      GroupID: ['', [Validators.required]],
      SubGrpID: ['', [Validators.required]],
      Alias: ['',],
      City: ['',],
      GroupDesc: ['',],
      Address: ['',],
      ZipCode: ['',],
      State: ['',],
      AcHolder: ['',],
      AcType: ['',],
      AcNO: ['',],
      IfscCode: ['',],
      Country: ['', ],
      Telephone: ['',],
      Email: ['',],
      ContactPerson: ['',],
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    });
    this.formData.get("GroupID").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('GroupID').value;
      
      if(this.id>0){

      }else{
      console.log("GroupID",value)
      if(value.length >1){
        let request={
          "table_name": "AGLMast",
          "column_name": "GroupID",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['GroupID'].setErrors({ invalid: 'GroupID Already Exist!' });
         
            this.toastr.error( 'GroupID Already Exist!','Error!');
            this.submit = true;
          }
          else{
         
            this.submit = false;
          }
         
         
        });
       
      }
    }
    });
    this.formData.get("LedgerDesc").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('LedgerDesc').value;
      this.formData.patchValue({
        Alias : value,
     });
     
 
    });
    // this.selectedDoc= sessionStorage.getItem("partydoctype");
    // let GlTypedata=sessionStorage.getItem("GLTypeId");
    // if(this.selectedDoc!="" && this.selectedDoc!=null && GlTypedata!=undefined && Number(GlTypedata)>0){
    //   this.GLTypeId=Number(GlTypedata);
    // }
    // else{

    //   //this.messageService.add({severity:'error', summary: 'Error', detail: 'Select Doc Type', life: 3000});
    //   this.router.navigate(['/master/party']);
    // }
    
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
      let request: LedgerModel = <LedgerModel>{};
      request.id=Number(this.id);
      request.Name = this.formData.get('LedgerDesc').value;//
      request.GroupID = this.formData.get('GroupID').value.GrpID;//
      request.SubGrpID=this.formData.get('SubGrpID').value.SubGrpID;//
      request.GlType=this.GLTypeId;//
      request.Alias = this.formData.get('Alias').value;//
      request.CityId = this.formData.get('City').value.SlNo;//
      request.GroupDesc = this.formData.get('GroupDesc').value;//
      request.GlBillingAdd = this.formData.get('Address').value;//
      request.ZipCode = this.formData.get('ZipCode').value;//
    //  request.LedgerType = this.formData.get('LedgerType').value;//
      request.AcHolder = this.formData.get('AcHolder').value;//
      request.AcType = this.formData.get('AcType').value;//
      request.AccountNo = this.formData.get('AcNO').value;//
      request.IfscCode = this.formData.get('IfscCode').value;//
      request.Country = this.CountryId.toString();
      request.State = this.StateId.toString();
      //request.Telephone = this.formData.get('Telephone').value;//
      request.TelePhone = this.formData.get('Telephone').value;//
      request.Email = this.formData.get('Email').value;//
      request.ContactPerson = this.formData.get('ContactPerson').value;//

      let jsonData: LedgerModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_PartyMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'Ledger Inserted Successfully!','Success!');
          this.router.navigate(['/master/ledger']);
        }
        else{
          this.toastr.error( 'Ledger not Added!','Error!');
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
      this.seriesData= JSON.parse(response.items);
      if(this.seriesData.length){
      let data=this.seriesData[0];

      this.formData.controls['LedgerDesc'].setValue(data['GLName']);
    //  this.formData.controls['GroupID'].setValue(data['GroupID']);
      this.formData.controls['GroupID'].setValue( {GrpDesc: data['GrpDesc'], GrpID: data['GrpID']});
      this.formData.controls['SubGrpID'].setValue( {SubGrpDesc: data['SubGrpDesc'], SubGrpID: data['SubGrpID']});
      this.formData.controls['Alias'].setValue(data['Alias']);
     // this.formData.controls['City'].setValue(data['City']);
      this.formData.controls['City'].setValue( {CityName: data['CityName'], SlNo: data['GlCityID']});
      this.formData.controls['GroupDesc'].setValue(data['SubGrpDesc']);
      this.formData.controls['Address'].setValue(data['GlBillingAdd'])
      this.formData.controls['ZipCode'].setValue(data['GlPinCode']);
      this.formData.controls['State'].setValue(data['StateName']);
    //  this.formData.controls['LedgerType'].setValue(data['LedgerType']);
      this.formData.controls['AcHolder'].setValue(data['BankAcName']);
      this.formData.controls['AcType'].setValue(data['BankAcType']);
      this.formData.controls['AcNO'].setValue(data['BankAcNo']);
      this.formData.controls['IfscCode'].setValue(data['BankIfscCode']);
      this.formData.controls['Country'].setValue(data['CountryName']);
      this.formData.controls['Telephone'].setValue(data['GLPhoneNo']);
      this.formData.controls['Email'].setValue(data['EmailID']);
      this.formData.controls['ContactPerson'].setValue(data['ContactPerson']);
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
  public _fetchGroup(event) { 
    let requestModel = <RequestModel>{};
    requestModel.pageNo = 1;
    requestModel.pageSize = 9999999;
    requestModel.search=event.query;
    requestModel.TableName = "AGrpMast";
    requestModel.FilterColumn = "GrpID";
    requestModel.SearchColumn = "GrpDesc";
    this.service.GetDynamicApiJson(requestModel).subscribe(response => {
      this.GroupData = JSON.parse(response.items);

    });


    // requestModel.spName="sp_admin_GetGroupMast";
    // requestModel.pageNo=1;
    // requestModel.TableName="AGrpMast";
    // requestModel.pageSize=10;
    // requestModel.search=event.query;
    // this.service.GetDynamicApiJson(requestModel).subscribe(response => {
    //   this.GroupData = JSON.parse(response.items);
      
    // });   
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
    console.log( event.DocType );
    this.StateId=event.StateId;
    this.CountryId=event.CountryId;
      this.formData.patchValue({
      State: event.StateName,
      Country:event.CountryName
    });
  }

  public _fetchLedgerType(event) { 
    let requestModel = <RequestModel>{};
    requestModel.pageNo = 1;
    requestModel.pageSize = 9999999;
    requestModel.search=event.query;
    requestModel.TableName = "GLTypes";
    requestModel.FilterColumn = "SlNo";
    requestModel.SearchColumn = "GLType";
    this.service.GetDynamicApiJson(requestModel).subscribe(response => {
      this.LedgerTypeData = JSON.parse(response.items);

    });

  }

  public _fetchSubGroup(event) { 
    let requestModel = <RequestModel>{};
    requestModel.pageNo = 1;
    requestModel.pageSize = 9999999;
    requestModel.search=event.query;
    requestModel.TableName = "ASubGrpMast";
    requestModel.FilterColumn = "SubGrpID";
    requestModel.SearchColumn = "SubGrpDesc";
    this.service.GetDynamicApiJson(requestModel).subscribe(response => {
      this.SubGroupData = JSON.parse(response.items);

    });


  }

  public _fetchGlType(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetGlType";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search="'DR','Cr','OR'";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.gltypeData = JSON.parse(response.items);
      
    });   
  }
}

