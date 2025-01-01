

 import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BRANCH_MASTERModel } from '../../master/TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { TBL_ACCOUNT_GROUP_MASTERModel } from '../TBL_ACCOUNT_GROUP_MASTER/TBL_ACCOUNT_GROUP_MASTER.model';
@Component({
  selector: 'app-insert-TBL_ACCOUNT_GROUP_MASTER',
  templateUrl: './insert-TBL_ACCOUNT_GROUP_MASTER.component.html',
  styleUrls: ['./insert-TBL_ACCOUNT_GROUP_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_ACCOUNT_GROUP_MASTERComponent implements OnInit {

 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_ACCOUNT_GROUP_MASTERModel>,
    private toastr: ToastrService,private router: Router,
   private route: ActivatedRoute) { }
   
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
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'TBL_ACCOUNT_GROUP_MASTER', active: true }];
 
 this.formData = this.formBuilder.group({
      TrnNo: ['', [Validators.required]],
Code: ['', [Validators.required]],
Name: ['', [Validators.required]],
UnderGroup: ['', [Validators.required]],
Cat: ['', [Validators.required]],
Type: ['', [Validators.required]],
BalField: ['', [Validators.required]],
Narration: ['', [Validators.required]],
Define: ['', [Validators.required]],

    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
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
      let request :TBL_ACCOUNT_GROUP_MASTERModel = <TBL_ACCOUNT_GROUP_MASTERModel>{};
request.TrnNo = this.formData.get('TrnNo').value;
request.Code = this.formData.get('Code').value;
request.Name = this.formData.get('Name').value;
request.UnderGroup = this.formData.get('UnderGroup').value;
request.Cat = this.formData.get('Cat').value;
request.Type = this.formData.get('Type').value;
request.BalField = this.formData.get('BalField').value;
request.Narration = this.formData.get('Narration').value;
request.Define = this.formData.get('Define').value;

     // formData.append('id', this.id.toString());
  
     
      this.service.add(request,"TBL_ACCOUNT_GROUP_MASTER").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/MASTER/TBL_ACCOUNT_GROUP_MASTER']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_ACCOUNT_GROUP_MASTER/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   this.formData.controls['TrnNo'].setValue(data['TrnNo']);
this.formData.controls['Code'].setValue(data['Code']);
this.formData.controls['Name'].setValue(data['Name']);
this.formData.controls['UnderGroup'].setValue(data['UnderGroup']);
this.formData.controls['Cat'].setValue(data['Cat']);
this.formData.controls['Type'].setValue(data['Type']);
this.formData.controls['BalField'].setValue(data['BalField']);
this.formData.controls['Narration'].setValue(data['Narration']);
this.formData.controls['Define'].setValue(data['Define']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
}
