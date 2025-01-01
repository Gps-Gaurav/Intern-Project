

 import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BRANCH_MASTERModel } from '../../master/TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { TBL_ITEM_MASTERModel } from '../TBL_ITEM_MASTER/TBL_ITEM_MASTER.model';
import { TBL_ITEM_GROUP_MASTERModel } from '../TBL_ITEM_GROUP_MASTER/TBL_ITEM_GROUP_MASTER.model';
import { ItemGroupModel } from '../TBL_ITEM_GROUP_MASTER/item_group_master';
@Component({
  selector: 'app-insert-TBL_ITEM_MASTER',
  templateUrl: './insert-TBL_ITEM_MASTER.component.html',
  styleUrls: ['./insert-TBL_ITEM_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_ITEM_MASTERComponent implements OnInit ,AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_ITEM_MASTERModel>,
  private item_group_service:ResourceService<ItemGroupModel>,
    private toastr: ToastrService,private router: Router,
   private route: ActivatedRoute) { }
   stateData: ItemGroupModel[];
  requestModel :RequestModel = <RequestModel>{};
 
  get form() {
    return this.formData.controls;
  }
 
 formData: FormGroup;
 id:Number=0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;

 
  image = '';
  file = '';


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ITEM MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
ITEM_CODE: ['', [Validators.required]],
ITEM_NAME: ['', [Validators.required]],
ITEM_MODE: [null],
ITEM_GROUP: [''],
// COSTING_RATIO: ['', [Validators.required]],
IS_EXEMPT: [null, [Validators.required]],
// ENTRY_DATE: ['', [Validators.required]],
// ENTRY_BY: ['', [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
  this._fetchitemgroup();
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
 
  validSubmit() {

  const controls = this.formData.controls;
  

      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_ITEM_MASTERModel = <TBL_ITEM_MASTERModel>{};
// request.ID = this.formData.get('ID').value;
request.ITEM_CODE = this.formData.get('ITEM_CODE').value;
request.ITEM_NAME = this.formData.get('ITEM_NAME').value;
request.ITEM_MODE = this.formData.get('ITEM_MODE').value;
request.ITEM_GROUP = this.formData.get('ITEM_GROUP').value;
// request.COSTING_RATIO = this.formData.get('COSTING_RATIO').value;
request.IS_EXEMPT = this.formData.get('IS_EXEMPT').value;
// request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
// request.ENTRY_BY = this.formData.get('ENTRY_BY').value;

     // formData.append('id', this.id.toString());
  
     if(this.id>0){
      this.service.update(request,"TBL_ITEM_MASTER/ID?ID="+this.id).subscribe(response => {
         
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/item-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    else{
      this.service.add(request,"TBL_ITEM_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/item-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    }  
}
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_ITEM_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
  //  this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['ITEM_CODE'].setValue(data['iteM_CODE']);
this.formData.controls['ITEM_NAME'].setValue(data['iteM_NAME']);
this.formData.controls['ITEM_MODE'].setValue(data['iteM_MODE']);
this.formData.controls['ITEM_GROUP'].setValue(data['iteM_GROUP']);
// this.formData.controls['COSTING_RATIO'].setValue(data['COSTING_RATIO']);
this.formData.controls['IS_EXEMPT'].setValue(data['iS_EXEMPT']);
// this.formData.controls['ENTRY_DATE'].setValue(data['ENTRY_DATE']);
// this.formData.controls['ENTRY_BY'].setValue(data['ENTRY_BY']);
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
ngAfterViewInit() {
  this.myInputField.nativeElement.focus();
  }


  private _fetchitemgroup() {
    this.requestModel.url="SP/sp_get_list_item_group_master";
    this.item_group_service.postStoreList(this.requestModel).subscribe(response => {
     this.stateData=response.document;
     console.log("this.stateData", this.stateData);
    });
  }
  
}
