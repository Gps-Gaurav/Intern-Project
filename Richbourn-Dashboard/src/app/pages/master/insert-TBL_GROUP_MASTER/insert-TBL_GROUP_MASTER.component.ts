import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, throttleTime, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BRANCH_MASTERModel } from '../TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { DatePipe } from '@angular/common';
import { StateModel } from 'src/app/core/models/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { GroupModel } from 'src/app/core/models/Group.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_GROUP_MASTER.component.html',
  styleUrls: ['./insert-TBL_GROUP_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Group_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  groupData: any;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];

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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'GROUP MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
      GroupCode: ['', [Validators.required]],
      GroupDesc: ['', [Validators.required]],

      MobileNo: [''],


    });
    this.formData.get("GroupCode").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('GroupCode').value;
      
      if(this.id>0){

      }else{
      console.log("GroupCode",value)
      if(value.length >1){
        let request={
          "table_name": "GroupMast",
          "column_name": "GroupCode",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['GroupCode'].setErrors({ invalid: 'Group Code Already Exist!' });
         
            this.toastr.error( 'Group Code Already Exist!','Error!');
            this.submit = true;
          }
          else{
         
            this.submit = false;
          }
         
         
        });
       
      }
    }
    });
    this.formData.get("GroupDesc").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(50)).
    subscribe(selectedValue => {  
      let value=this.formData.get('GroupDesc').value;
      
      if(this.id>0){

      }else{
      console.log("GroupDesc",value)
      if(value.length >1){
        let request={
          "table_name": "GroupMast",
          "column_name": "GroupDesc",
          "column_value": value
        }
        this.validservice.CheckData(request).subscribe(response => {
       
          console.log("response",response);
          if(response.document.statusMessage==="failed"){
         
            this.formData.controls['GroupDesc'].setErrors({ invalid: 'Group Desc Already Exist!' });
         
            this.toastr.error( 'Group Desc Already Exist!','Error!');
            this.submit = true;
          }
          else{
         
            this.submit = false;
          }
         
         
        });
       
      }
    }
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
      let request: GroupModel = <GroupModel>{};

      request.GroupCode = this.formData.get('GroupCode').value.toUpperCase();//
      request.GroupDesc = this.formData.get('GroupDesc').value.toUpperCase();//
   
      request.CompName = "abc";
      request.MobileNo = this.formData.get('MobileNo').value;//
      request.UserID = 1;
      request.SlNo = Number(this.id);


      let jsonData: GroupModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_GroupMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.document.statusMessage==="success"){
          this.toastr.success( 'Group Inserted Successfully!','Success!');
          this.router.navigate(['/master/group']);
        }
        else{
          this.toastr.error( 'Group Inserted Successfully!','Success!');
        }
     
      })

      console.log("post product", request);//


    }
  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetGroupMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.groupData= JSON.parse(response.items);
      if(this.groupData.length){
      let data=this.groupData[0];
      console.log("groupData",data);
      this.formData.controls['GroupCode'].setValue(data['GroupCode']);
      this.formData.controls['GroupDesc'].setValue(data['GroupDesc']);

    //  this.formData.controls['CompName'].setValue(data['CompName']);
      this.formData.controls['MobileNo'].setValue(data['MobileNo']);
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
  Close(){
    this.router.navigate(['/master/group']);
        
  }
}
