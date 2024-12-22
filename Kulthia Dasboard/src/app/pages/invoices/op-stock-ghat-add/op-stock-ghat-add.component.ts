import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { LocationModel } from 'src/app/core/models/location.model';
import { CategoryModel } from 'src/app/core/models/ProdCateMast.model';
import { MessageService } from 'primeng/api';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { GhatModel } from 'src/app/core/models/Ghat.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-op-stock-ghat-add',
  templateUrl: './op-stock-ghat-add.component.html',
  styleUrls: ['./op-stock-ghat-add.component.scss'],
  providers: [MessageService, TabService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Ecomerce Customers component
 */

export class OpStockGhatAddComponent implements OnInit, AfterViewInit {

  //  selectedValues: string[] = ['val1','val2'];
  //  selectedCities: string[] = [];


  @ViewChild("myinput") myInputField: ElementRef;
  GhatType: { name: string; code: string; }[];
  imageURL: string;
  selectedUser: any;
  Gross_wt:any;

  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private messageService: MessageService,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  subcategoryData: CategoryModel[] = [];
  ItemData: any = [];
  JobberData: any[] = [];
  prodcatData: any[] = [];
  seriesData: GhatModel[] = [];
  selectedUsers: any = [];
  unitData: any = [];
  ImgUrl="";
  get form() {

    return this.formData.controls;
  }

  formData: FormGroup;
  Weight = 0;
  id: Number = 0;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  Diamond_wt = 0;
  Pcs = 0;

  ngOnInit() {



    this.breadCrumbItems = [{ label: 'INVOICES' }, { label: 'GHAT STOCK', active: true }];
    this._fetchProduct();
    this.formData = this.formBuilder.group({
      OpNo: ['NEW', [Validators.required]],
      GhatType: ['', [Validators.required]],
      OpDate: [''],
      JobberID: ['', [Validators.required]],
      ItemName: ['', [Validators.required]],
      Unit: ['', [Validators.required]],
      TotalQty: ['', [Validators.required]],
      Purity: ['', [Validators.required]],
      TotalPcs: ['', [Validators.required]],
      PureWt: ['', [Validators.required]],
      Narration: [''],

      usersDetails: this.formBuilder.array([]),
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if (this.id > 0) {
        this._fetchData()
      }
      else{
        for (var i = 0; i < 1; i++) {
          this.onAdd()
        }
      }
    });

    this.formData.get("Purity").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(0)).
    subscribe(selectedValue => {
      let value=this.formData.get('TotalQty').value;
      let Purity=this.formData.get('Purity').value;
      let purityval=value*Purity/100;
      this.formData.controls['PureWt'].setValue(purityval);
     this.Gross_wt=value;
    })

    this.formData.get("TotalQty").valueChanges.pipe(distinctUntilChanged(),
    throttleTime(0)).
    subscribe(selectedValue => {
      let value=this.formData.get('TotalQty').value;
      let Purity=this.formData.get('Purity').value;
      let purityval=value*Purity/100;
      this.formData.controls['PureWt'].setValue(purityval);
     this.Gross_wt=value;
    })
    // this.usersDetails.get("Weight").valueChanges.pipe(distinctUntilChanged(),
    //   throttleTime(500)).
    //   subscribe(selectedValue => {
    //     let value = this.usersDetails.get('Weight').value;
    //     this.Weight = value;
    //   })
    // this.submit = false;
    // this.usersDetails.get("Pcs").valueChanges.pipe(distinctUntilChanged(),
    //   throttleTime(500)).
    //   subscribe(selectedValue => {
    //     let val = this.usersDetails.get('Pcs').value;
    //     this.Pcs = val;
    //   })
    this.submit = false;




  }
  // onAccept(file: any) {
  //   this.image = file.name;
  //   this.file = file;
  // }

  validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    if (this.formData.valid) {

      let request: GhatModel = <GhatModel>{};
      request.SlNo=Number(this.id);
      request.OpNo = this.formData.get('OpNo').value;//
      request.GhatType = this.formData.get('GhatType').value.code;//
      request.OpDate = this.formData.get('OpDate').value;//
      request.JobberID = this.formData.get('JobberID').value.SlCode;//

      request.ItemName = this.formData.get('ItemName').value.ItemCode;//
      request.Unit = this.formData.get('Unit').value.UnitID;//
      request.TotalQty = this.formData.get('TotalQty').value;//

      request.Purity = this.formData.get('Purity').value;//
      request.TotalPcs = this.formData.get('TotalPcs').value;//
      request.PureWt = this.formData.get('PureWt').value;//
      request.Narration = this.formData.get('Narration').value;//
      request.usersDetails = JSON.stringify(this.formData.get('usersDetails').value);//

      let jsonData: GhatModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_op-stock-ghat_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.code == 1) {
          this.toastr.success('Series Inserted Successfully!', 'Success!');
          this.router.navigate(['/invoices/op-stock-ghat-list']);
        }
        else {
          this.toastr.error('Series not Added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_op_stock_ghat_SlNo";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);
    console.log(requestModel)
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.seriesData = JSON.parse(response.items);
      if (this.seriesData.length) {
        let data = this.seriesData[0];

        this.formData.controls['OpNo'].setValue(data['OpNo']);
      //  this.formData.controls['GhatType'].setValue(data['GhatType']);
        this.formData.controls['GhatType'].setValue(data['GhatType']=="K"? { name: 'Kora Ghat', code: 'K' }:   { name: 'Polished Ghat', code: 'P' });
        this.formData.controls['OpDate'].setValue(data['OpDate']);
      //  this.formData.controls['JobberID'].setValue(data['JobberID']);
        this.formData.controls['JobberID'].setValue( {SlCode: data['JobberID'], SlName: data['SlName']});

        this.formData.controls['ItemName'].setValue( {ItemCode: data['SItemCode'], ItemName: data['ItemName']});
     //   this.formData.controls['ItemName'].setValue(data['ItemName'])
     this.formData.controls['Unit'].setValue( {UnitID: data['UnitID'], Description: data['Description']});
     //   this.formData.controls['Unit'].setValue(data['Unit']);
        this.formData.controls['TotalQty'].setValue(data['TotalQty']);
        this.formData.controls['Purity'].setValue(data['Purity']);
        this.formData.controls['TotalPcs'].setValue(data['TotalPcs']);
        this.formData.controls['PureWt'].setValue(data['PureWt']);
        this.formData.controls['Narration'].setValue(data['Narration']);



        let summery=data.usersDetails;
        console.log("summery",summery)
        if(summery!=null && summery.length){
          summery.forEach(obj => {
            this.usersDetails.push(this.uodateControls(obj));
        });
        }
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

  public _fetchJobber(event) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetJobberMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.JobberData = JSON.parse(response.items);

    });
  }
  public _fetchItem(event) {

    let requestModel = <RequestModel>{};
    // requestModel.spName="sp_admin_Get_SubItemMast";
     requestModel.pageNo=1;
     requestModel.pageSize=9999999;
     requestModel.search="";
     requestModel.TableName="SubItemMast";
     requestModel.FilterColumn="SItemCode";
     requestModel.SearchColumn="ItemName";
     this.service.GetDynamicApiJson(requestModel).subscribe(response => {
       this.ItemData= JSON.parse(response.items).filter(m=>m.GoldItem==='Y');

     });


  }
  public _fetchUnit(event) {
    let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_Get_UnitMast";
  requestModel.pageNo=1;
  requestModel.pageSize=10;
  requestModel.search=event.query;
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.unitData= JSON.parse(response.items);

  });
  }

  ngAfterViewInit() {
  //  this.myInputField.nativeElement.focus();
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

      SlNo: new FormControl(0),
      ProdCateID: new FormControl(""),
      ProductNo: new FormControl(""),
      Weight: new FormControl(""),
      Pcs: new FormControl(""),


    });
  }
  private uodateControls(item:any) {
    return new FormGroup({
      SlNo: new FormControl(item.SlNo),
      ProdCateID: new FormControl(Number(item.ProdCateID)),
      ProductNo: new FormControl(item.SlNo),
      Weight: new FormControl(item.SlNo),
      Pcs: new FormControl(item.Pcs),

    });
  }


  onDelete() {
    if (this.selectedUsers.length < 1) {
      this.messageService.add({
        severity: "warn",
        summary: "Info",
        detail: "Please select a record to delete!",
      });
      return;
    }
    console.log(this.selectedUsers);
    for (var i = this.selectedUsers.length - 1; i >= 0; i--) {
      this.usersDetails.controls.splice(this.selectedUsers[i] - 1, 1);
    }
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Selected records deleted!",
    });

    this.selectedUsers = [];
  }


  public _fetchProduct() {
    let requestModel = <RequestModel>{};
  requestModel.spName="sp_admin_Get_ProdCate_dropdown";
  requestModel.pageNo=1;
  requestModel.pageSize=1;
  requestModel.search= "";
  requestModel.id=Number(this.id);
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.prodcatData= JSON.parse(response.items);
    console.log("this.prodcatData",this.prodcatData)

  });
  }

  onSelect(event: any, index: number) {
    console.log(event, index);
    let prod = this.prodcatData.filter(m => m.SlNo == event.value);
    if (prod) {
      let t = prod[0];
      console.log("proditem", t);
      const myForm = (<FormArray>this.formData.get("usersDetails")).at(index);
      myForm.patchValue({
        ProductDescription: t.ProdDesc,
        MRP: t.MRP,
        HSNCode: t.HSNCode,
        Location: t.Location,
        Discount: t.Discount,
        Quantity: 1,
        Amount: t.MRP,
        ProductImage: this.ImgUrl + t.ProdCode + '_1.jpg'
      })
    }



  }

  public _fetchGhatType(event){
    this.GhatType=[];
    this.GhatType = [
      { name: 'Kora Ghat', code: 'K' },

      { name: 'Polished Ghat', code: 'P' }
    ];

   // this.filtereditemtype= this.itemtype;
   }
}
