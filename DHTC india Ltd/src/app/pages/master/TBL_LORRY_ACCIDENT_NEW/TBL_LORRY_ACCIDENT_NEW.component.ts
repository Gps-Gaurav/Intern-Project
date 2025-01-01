import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_LORRY_ACCIDENT_NEWModel } from './TBL_LORRY_ACCIDENT_NEW.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-TBL_LORRY_ACCIDENT_NEW',
  templateUrl: './TBL_LORRY_ACCIDENT_NEW.component.html',
  styleUrls: ['./TBL_LORRY_ACCIDENT_NEW.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_LORRY_ACCIDENT_NEWComponent implements OnInit {

 import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_LORRY_ACCIDENT_NEWModel } from './TBL_LORRY_ACCIDENT_NEW.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-insert-TBL_LORRY_ACCIDENT_NEW',
  templateUrl: './insert-TBL_LORRY_ACCIDENT_NEW.component.html',
  styleUrls: ['./insert-TBL_LORRY_ACCIDENT_NEW.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_LORRY_ACCIDENT_NEWComponent implements OnInit {

   constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_LORRY_ACCIDENT_NEWModel>,
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
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Add Product', active: true }];
 
   this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
FROM_STATION_CODE: ['', [Validators.required]],
FROM_STATION_NAME: ['', [Validators.required]],
CHALLAN_NO: ['', [Validators.required]],
FILE_NO: ['', [Validators.required]],
LORRY_NO: ['', [Validators.required]],
ACCIDENT_AT: ['', [Validators.required]],
CONT_NU: ['', [Validators.required]],
BRANCH_CODE: ['', [Validators.required]],
BRANCH_NAME: ['', [Validators.required]],
POLICE_STATION: ['', [Validators.required]],
FIR_LODGE: ['', [Validators.required]],
PHOTO_RECEIVE: ['', [Validators.required]],
GOODS_COLLECTED_BY: ['', [Validators.required]],
BILTY_WISE_ENTRY: ['', [Validators.required]],
NAME_OF_PERSON: ['', [Validators.required]],
REASON_FOR_SHORTAGE: ['', [Validators.required]],
DAMAGE: ['', [Validators.required]],
LYING_SWEEPING_AT: ['', [Validators.required]],
ADV_DEDUCT: ['', [Validators.required]],
SHORTAGE_WT: ['', [Validators.required]],
SHORTAGE_PKG: ['', [Validators.required]],
SHORTAGE_VALUE: ['', [Validators.required]],
SWEEPING_WT: ['', [Validators.required]],
SWEEPING_PKG: ['', [Validators.required]],
SWEEPING_VALUE: ['', [Validators.required]],
REMARKS: ['', [Validators.required]],

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

    const controls = this.productForm.controls;
  

      this.submit = true;
	
    if (this.productForm.valid) {
      let request :TBL_LORRY_ACCIDENT_NEWModel = <TBL_LORRY_ACCIDENT_NEWModel>{};
request.ID = this.formData.get('ID').value;
request.FROM_STATION_CODE = this.formData.get('FROM_STATION_CODE').value;
request.FROM_STATION_NAME = this.formData.get('FROM_STATION_NAME').value;
request.CHALLAN_NO = this.formData.get('CHALLAN_NO').value;
request.FILE_NO = this.formData.get('FILE_NO').value;
request.LORRY_NO = this.formData.get('LORRY_NO').value;
request.ACCIDENT_AT = this.formData.get('ACCIDENT_AT').value;
request.CONT_NU = this.formData.get('CONT_NU').value;
request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
request.POLICE_STATION = this.formData.get('POLICE_STATION').value;
request.FIR_LODGE = this.formData.get('FIR_LODGE').value;
request.PHOTO_RECEIVE = this.formData.get('PHOTO_RECEIVE').value;
request.GOODS_COLLECTED_BY = this.formData.get('GOODS_COLLECTED_BY').value;
request.BILTY_WISE_ENTRY = this.formData.get('BILTY_WISE_ENTRY').value;
request.NAME_OF_PERSON = this.formData.get('NAME_OF_PERSON').value;
request.REASON_FOR_SHORTAGE = this.formData.get('REASON_FOR_SHORTAGE').value;
request.DAMAGE = this.formData.get('DAMAGE').value;
request.LYING_SWEEPING_AT = this.formData.get('LYING_SWEEPING_AT').value;
request.ADV_DEDUCT = this.formData.get('ADV_DEDUCT').value;
request.SHORTAGE_WT = this.formData.get('SHORTAGE_WT').value;
request.SHORTAGE_PKG = this.formData.get('SHORTAGE_PKG').value;
request.SHORTAGE_VALUE = this.formData.get('SHORTAGE_VALUE').value;
request.SWEEPING_WT = this.formData.get('SWEEPING_WT').value;
request.SWEEPING_PKG = this.formData.get('SWEEPING_PKG').value;
request.SWEEPING_VALUE = this.formData.get('SWEEPING_VALUE').value;
request.REMARKS = this.formData.get('REMARKS').value;

      formData.append('id', this.id.toString());
  
     
      this.service.add(formData,"TBL_LORRY_ACCIDENT_NEW").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/admin/TBL_LORRY_ACCIDENT_NEW']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
  

  
}
 
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_LORRY_ACCIDENT_NEW/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   {fetchdata}
 
 
   
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
