import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';

import { SubItemModel } from 'src/app/core/models/sub-item.model';
@Component({
  selector: 'app-insert-sub-item',
  templateUrl: './insert-sub-item.component.html',
  styleUrls: ['./insert-sub-item.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */

export class InsertSubItemComponent implements OnInit, AfterViewInit {
  selectedValues: string[] = ['val1', 'val2'];

  @ViewChild("myinput") myInputField: ElementRef;
  cities: { name: string; code: string; }[];

  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }
  filtereditemtype: any[];
  packetItem: any[];
  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
  subitemData: SubItemModel[] = [];
  unitData: any[] = [];
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



    this.breadCrumbItems = [{ label: 'MASTER' }, { label: ' SUB ITEM MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ItemName: ['', [Validators.required]],
      HSNCode: ['', [Validators.required]],
      SubItem: ['', [Validators.required]],
      BaseUnit: ['', [Validators.required]],
      PurRt: ['', [Validators.required]],
      JobDiscount: ['', [Validators.required]],
      GoldItem: ['', [Validators.required]],
      Purity: ['', [Validators.required]],
      PureQty: ['', [Validators.required]],
      OpRt: ['', [Validators.required]],
      OpPcs: ['', [Validators.required]],
      OpAmt: ['', [Validators.required]],
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
      let request: SubItemModel = <SubItemModel>{};
      request.SItemCode = this.id;
      request.ItemName = this.formData.get('ItemName').value;//
      request.BaseUnit = this.formData.get('BaseUnit').value.UnitID;//
      request.HSNCode = this.formData.get('HSNCode').value;//
      request.SubItem = this.formData.get('SubItem').value.code;//
      request.PurRt = this.formData.get('PurRt').value;//
      request.JobDiscount = this.formData.get('JobDiscount').value;//
      request.GoldItem = this.formData.get('GoldItem').value.code;//
      request.Purity = this.formData.get('Purity').value;//
      request.PureQty = this.formData.get('PureQty').value;//
      request.OpPcs = this.formData.get('OpPcs').value;//
      request.OpRt = this.formData.get('OpRt').value;//
      request.OpAmt = this.formData.get('OpAmt').value;//




      let jsonData: SubItemModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_SubItemMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if (Response.code == 1) {
          this.toastr.success('Item Inserted Successfully!', 'Success!');
          this.router.navigate(['/master/subitem']);
        }
        else {
          this.toastr.error('Item not Added!', 'Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_SubItemMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 1;
    requestModel.search = "";
    requestModel.id = Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.subitemData = JSON.parse(response.items);
      if (this.subitemData.length) {
        let data = this.subitemData[0];

        this.formData.controls['ItemName'].setValue(data['ItemName']);
       // this.formData.controls['BaseUnit'].setValue(data['BaseUnit']);
        this.formData.controls['HSNCode'].setValue(data['HSNCode']);
        //this.formData.controls['SubItem'].setValue(data['SubItem']);
        this.formData.controls['SubItem'].setValue({name: data['SubItem']=="Y"?"YES":"NO", code: data['SubItem']});
        this.formData.controls['PurRt'].setValue(data['PurRt']);
        this.formData.controls['JobDiscount'].setValue(data['JobDiscount']);
        this.formData.controls['GoldItem'].setValue({name: data['GoldItem']=="Y"?"YES":"NO", code: data['GoldItem']});
        this.formData.controls['Purity'].setValue(data['Purity']);
        this.formData.controls['PureQty'].setValue(data['PureQty']);
        this.formData.controls['OpPcs'].setValue(data['OpPcs']);
        this.formData.controls['OpRt'].setValue(data['OpRt']);
        this.formData.controls['OpAmt'].setValue(data['OpAmt']);
        // this.formData.controls['HSNCode'].setValue( {name: data['TypeName'], code: data['ItemType']});
         this.formData.controls['BaseUnit'].setValue( {Description: data['BaseUnit'], UnitID: data['UnitID']});

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
  public _fetchUnit(event) {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_UnitMast";
    requestModel.pageNo = 1;
    requestModel.pageSize = 10;
    requestModel.search = event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.unitData = JSON.parse(response.items);

    });
  }

  ngAfterViewInit() {
    // this.myInputField.nativeElement.focus();
  }

  //  public _fetchItemType(event){
  //   this.filtereditemtype=[];
  //   this.filtereditemtype= [
  //     {name: 'Metal', code: 'M'},
  //     {name: 'Diamond', code: 'D'},
  //     {name: 'Stone', code: 'S'},
  //     {name: 'Other', code: 'O'}
  // ];

  //  }

  public _fetchPacketItem(event) {
    this.packetItem = [];
    this.packetItem = [
      { name: 'YES', code: 'Y' },
      { name: 'NO', code: 'N' }

    ];

  }



}

