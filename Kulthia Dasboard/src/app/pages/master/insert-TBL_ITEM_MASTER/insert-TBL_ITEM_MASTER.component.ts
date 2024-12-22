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
import { ItemModel } from 'src/app/core/models/item.model';
@Component({
  selector: 'app-insert-TBL_ITEM_MASTER',
  templateUrl: './insert-TBL_ITEM_MASTER.component.html',
  styleUrls: ['./insert-TBL_ITEM_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */

export class InsertTBL_Item_MASTERComponent implements OnInit, AfterViewInit {
 selectedValues: string[] = ['val1','val2'];

  @ViewChild("myinput") myInputField: ElementRef;
  cities: { name: string; code: string; }[];
 
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }
    filtereditemtype: any[];
  requestModel: RequestModel = <RequestModel>{};

  stateData: StateModel[];
  itemData: ItemModel[]=[];
  unitData: any[]=[];
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

  
    
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'ITEM GROUP MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ItemName: ['', [Validators.required]],
      ItemType: ['', [Validators.required]],
      BaseUnit: ['', [Validators.required]],
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
      let request: ItemModel = <ItemModel>{};
      request.ItemCode = this.id;
      request.ItemName = this.formData.get('ItemName').value;//
      request.ItemType = this.formData.get('ItemType').value.code;//
      request.BaseUnit = this.formData.get('BaseUnit').value.UnitID;//
      request.UserID = 1;
      request.Dec = 0;

      let jsonData: ItemModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_ItemMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { 
        if(Response.code==1){
          this.toastr.success( 'Item Inserted Successfully!','Success!');
          this.router.navigate(['/master/item']);
        }
        else{
          this.toastr.error( 'Item not Added!','Error!');
        }
      })

      console.log("post product", request);//

    }

  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_Get_ItemMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.itemData= JSON.parse(response.items);
      if(this.itemData.length){
      let data=this.itemData[0];

      this.formData.controls['ItemName'].setValue(data['ItemName']);
      this.formData.controls['ItemType'].setValue( {name: data['TypeName'], code: data['ItemType']});
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
  requestModel.spName="sp_admin_Get_UnitMast";
  requestModel.pageNo=1;
  requestModel.pageSize=10;
  requestModel.search=event.query;
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.unitData= JSON.parse(response.items);
    
  });   
  }

  ngAfterViewInit() {
    // this.myInputField.nativeElement.focus();
  }

 public _fetchItemType(event){
  this.filtereditemtype=[];
  this.filtereditemtype= [
    {name: 'Metal', code: 'M'},
    {name: 'Diamond', code: 'D'},
    {name: 'Stone', code: 'S'},
    {name: 'Other', code: 'O'}
];

 // this.filtereditemtype= this.itemtype;
 }
}

