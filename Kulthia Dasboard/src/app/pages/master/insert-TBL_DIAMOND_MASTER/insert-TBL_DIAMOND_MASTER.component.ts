

import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, throttleTime, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { TBL_BRANCH_MASTERModel } from '../TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { DiamondModel } from 'src/app/core/models/diamond.model';
@Component({
  selector: 'app-insert-TBL_DIAMOND_MASTER',
  templateUrl: './insert-TBL_DIAMOND_MASTER.component.html',
  styleUrls: ['./insert-TBL_DIAMOND_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Diamond_MASTERComponent  implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  RecType: { name: string; code: string; }[];
  id: any;
  WPCID: any;
 
  filteredrectype: { name: string; code: string; }[];
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  diamondData: DiamondModel[]=[];
  get form() {
    return this.formData.controls;
  }

  formData: FormGroup;
  SlNo: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

  image = '';
  file = '';

  ngOnInit() {

  //   this.RecType= [
  //     {name: 'Weight Ranges', code: 'W'},
  //     {name: 'Colour', code: 'C'},
  //     {name: 'Size', code: 'Z'},
  //     {name: 'Shape', code: 'S'},
  //     {name: 'Purities', code: 'P'}
  // ];

    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'DIAMOND MASTER', active: true }];

    this.formData = this.formBuilder.group({

      SlNo: ['', [Validators.required]],
      RecType: ['', [Validators.required]],
      WPCName: ['', [Validators.required]],
     
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
    })
    this.formData.get("WPCName").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(500)).
    subscribe(selectedValue => {  
      let value=this.formData.get('WPCName').value;
      
      if(this.id>0){

      }else{
      console.log("WPCName",value)
      if(value.length >1){
        let request={
          "table_name": "DiamondMast",
          "column_name": "WPCName",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['WPCName'].setErrors({ invalid: 'WPCName Already Exist!' });
         
            this.toastr.error( 'WPCName Already Exist!','Error!');
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
      let request: DiamondModel = <DiamondModel>{};
      request.WPCID = this.id;
      // request.SlNo = this.formData.get('SlNo').value;//
      request.RecType = this.formData.get('RecType').value.code;//
      request.WPCName = this.formData.get('WPCName').value;//
      request.UserID=1;



      let jsonData: DiamondModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_DiamondMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.code==1){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/master/diamond']);
        }
        else{
          this.toastr.error( 'Product Inserted Successfully!','Success!');
        }
     
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_Get_DiamondMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search="";
    requestModel.ColumnValue="";

    this.service.GetFilterApiJson(requestModel).subscribe(response => {
       this.diamondData= JSON.parse(response.items);
      if(this.diamondData.length){
     let data=this.diamondData[0];
      console.log("diamondData",data);
      this.formData.controls['SlNo'].setValue(data['SlNo']);
      this.formData.controls['RecType'].setValue(data['RecType']);
      this.formData.controls['WPCName'].setValue(data['WPCName']);
      }
    });   
    // let requestModel = <RequestModel>{};
    // requestModel.spName="sp_admin_GetDiamondMast";
    // requestModel.pageNo=1;
    // requestModel.pageSize=1;
    // requestModel.search= "";
    // requestModel.id=Number(this.id);
    // requestModel.ColumnValue="";
    // // this.service.get("TBL_BRANCH_MASTER/id?id=" + this.SlNo).subscribe(response => {
    // //   console.log("response", response.items)
    // //   let data = response.items;

    // this.service.GetFilterApiJson(requestModel).subscribe(response => {
    //   this.diamondData= JSON.parse(response.diamond);
    //   if(this.diamondData.length){
    //   let data=this.diamondData[0];
    //   console.log("diamondData",data);
    //   this.formData.controls['SlNo'].setValue(data['SlNo']);
    //   this.formData.controls['RecType'].setValue(data['RecType']);
    //   this.formData.controls['WPCName'].setValue(data['WPCName']);
    //   }
    
    // });
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
    //  this.myInputField.nativeElement.focus();
  }

  public _fetchRecType(event){
    this.filteredrectype=[];
    this.filteredrectype= [
      {name: 'Weight Ranges', code: 'W'},
      {name: 'Colour', code: 'C'},
      {name: 'Size', code: 'Z'},
      {name: 'Shape', code: 'S'},
      {name: 'Purities', code: 'P'}
  ];
  
   // this.filtereditemtype= this.itemtype;
   }

}

