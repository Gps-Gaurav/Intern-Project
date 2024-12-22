

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
import { TBL_BRANCH_MASTERModel } from '../TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { SubCategoryModel } from 'src/app/core/models/SubCategory.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_SUB_CATEGORY_MASTER.component.html',
  styleUrls: ['./insert-TBL_SUB_CATEGORY_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_SubCategory_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  subcategoryData: SubCategoryModel[]=[];
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
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BRANCH MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
    
      SubCate: ['', [Validators.required]],
   
    
     
      
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
      let request: SubCategoryModel = <SubCategoryModel>{};

     
      request.SubCate = this.formData.get('SubCate').value;//
      //request.UserID = this.formData.get('UserID').value;//
      request.CompName = "abc";
      request.UserID = 1;
      request.SlNo = Number(this.id);

      let jsonData: SubCategoryModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_SubCateMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.code==1){
          this.toastr.success( 'Category Inserted Successfully!','Success!');
          this.router.navigate(['/master/subcategory']);
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
    requestModel.spName="sp_admin_GetSubCateMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.subcategoryData= JSON.parse(response.items);
      if(this.subcategoryData.length){
      let data=this.subcategoryData[0];

      this.formData.controls['SubCate'].setValue(data['SubCate']);
      this.formData.controls['UserID'].setValue(data['UserID']);
      this.formData.controls['CompName'].setValue(data['CompName']);
      
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

