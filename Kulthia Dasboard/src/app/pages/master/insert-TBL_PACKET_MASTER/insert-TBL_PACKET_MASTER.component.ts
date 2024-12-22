import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StateModel } from '../../common/state.model';
import { TabService } from 'src/app/core/helpers/TabService';
import { CategoryModel } from 'src/app/core/models/ProdCateMast.model';
import { PacketModel } from 'src/app/core/models/Packet.model';
import { SubCategoryModel } from 'src/app/core/models/SubCategory.model';
import { ColorsModel } from 'src/app/core/models/colors.model';
@Component({
  selector: 'app-insert-TBL_BRANCH_MASTER',
  templateUrl: './insert-TBL_PACKET_MASTER.component.html',
  styleUrls: ['./insert-TBL_PACKET_MASTER.component.scss'],
  providers: [TabService]
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_Packet_MASTERComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") myInputField: ElementRef;
  constructor(public formBuilder: FormBuilder, private service: ResourceService<any>,
    private toastr: ToastrService, private router: Router,
    private validservice: ResourceService<any>,
    private route: ActivatedRoute, public datepipe: DatePipe, private stateservice: ResourceService<StateModel>) { }

  requestModel: RequestModel = <RequestModel>{};
  stateData: StateModel[];
  PartyData: PacketModel[]=[];
  text: CategoryModel = <CategoryModel>{};
  texts: SubCategoryModel = <SubCategoryModel>{};

  results: string[]=[];

  colorsData: ColorsModel[]=[];

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
    
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'PACKET MASTER', active: true }];

    this.formData = this.formBuilder.group({
      // ID: ['', [Validators.required]],
      ItemName: ['', [Validators.required]],
      DShape: ['', [Validators.required]],
      DColour: ['', [Validators.required]],
      Purity: ['', [Validators.required]],
      DSize: ['', [Validators.required]],
      WRange: ['', [Validators.required]],
      Unit: ['', [Validators.required]],
      CertificateNo: ['', [Validators.required]],
      DefaultRate: ['', [Validators.required]],
      OpQty: ['', [Validators.required]],
      OpPcs: ['', [Validators.required]],
      Rate: ['', [Validators.required]],
      Value: ['', [Validators.required]],
      PacketIDinteger: ['', [Validators.required]],
      Remark: ['', [Validators.required]],
      

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
      let request: PacketModel = <PacketModel>{};

      request.ItemName = this.formData.get('ItemName').value;//
      request.DShape = this.formData.get('DShape').value;//
      request.DColour = this.formData.get('DColour').value;//
      request.Purity = this.formData.get('Purity').value;//
      request.DSize = this.formData.get('DSize').value;//
      request.WRange = this.formData.get('WRange').value;//
      request.Unit = this.formData.get('Unit').value;//
      request.CertificateNo = this.formData.get('CertificateNo').value;//
      request.DefaultRate = this.formData.get('DefaultRate').value;//
      request.OpQty = this.formData.get('OpQty').value;//
      request.OpPcs = this.formData.get('OpPcs').value;//
      request.Rate = this.formData.get('Rate').value;//
      request.Value = this.formData.get('Value').value;//
      request.PacketIDinteger = this.formData.get('PacketIDinteger').value;//
      request.Remark = this.formData.get('Remark').value;//
      
     
      request.UserID = 1;
      request.SlNo = Number(this.id);

      let jsonData: PacketModel[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_PacketMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => {
        if(Response.code==1){
          this.toastr.success( 'Party Inserted Successfully!','Success!');
          this.router.navigate(['/master/party']);
        }
        else{
          this.toastr.error( 'Party not added!','Error!');
        }
       })

      console.log("post product", request);//

    }
  }

  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetPacketMast";
    requestModel.pageNo=1;
    requestModel.pageSize=1;
    requestModel.search= "";
    requestModel.id=Number(this.id);

    this.service.GetApiJson(requestModel).subscribe(response => {
      this.PartyData= JSON.parse(response.items);
      if(this.PartyData.length){
      let data=this.PartyData[0];
      console.log("PartyData",data);
      //this.formData.controls['ID'].setValue(data['ID']);
      this.formData.controls['ItemName'].setValue(data['ItemName']);
      this.formData.controls['DShape'].setValue(data['DShape']);
      this.formData.controls['DSize'].setValue(data['DSize']);
      this.formData.controls['DColour'].setValue(data['DColour']);
      this.formData.controls['Purity'].setValue(data['Purity']);
      this.formData.controls['WRange'].setValue(data['WRange']);
      this.formData.controls['Unit'].setValue(data['Unit']);
      this.formData.controls['CertificateNo'].setValue(data['CertificateNo']);
      this.formData.controls['DefaultRate'].setValue(data['TelePhone']);
      this.formData.controls['OpQty'].setValue(data['OpQty']);
      this.formData.controls['OpPcs'].setValue(data['OpPcs']);
      this.formData.controls['Rate'].setValue(data['Rate']);
      this.formData.controls['Value'].setValue(data['Value']);
      this.formData.controls['PacketIDinteger'].setValue(data['PacketIDinteger']);
      this.formData.controls['Remark'].setValue(data['Remark'])
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

