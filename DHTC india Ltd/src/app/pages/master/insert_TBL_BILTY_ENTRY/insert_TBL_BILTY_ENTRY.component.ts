

 import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TBL_BILTY_ENTRYModel } from '../TBL_BILTY_ENTRY/TBL_BILTY_ENTRY.model';
import { TBL_STATION_MASTERModel } from '../TBL_STATION_MASTER/TBL_STATION_MASTER.model';
import { TBL_PARTY_MASTERModel } from '../TBL_PARTY_MASTER/TBL_PARTY_MASTER.model';
import { TBL_BRANCH_MASTERModel } from '../TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.model';
import { TBL_STATE_MASTERModel } from '../TBL_STATE_MASTER/TBL_STATE_MASTER.model';
import { TBL_ITEM_MASTERModel } from '../TBL_ITEM_MASTER/TBL_ITEM_MASTER.model';
import { distinctUntilChanged,throttleTime,takeUntil } from 'rxjs/operators';
import { TabService } from 'src/app/core/helpers/TabService';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-insert-TBL_BILTY_ENTRY',
  providers: [TabService],
  templateUrl: './insert-TBL_BILTY_ENTRY.component.html',
  styleUrls: ['./insert-TBL_BILTY_ENTRY.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class InsertTBL_BILTY_ENTRYComponent implements OnInit ,AfterViewInit{
  branchData: TBL_BRANCH_MASTERModel[];
  @Input('hide-arrow') hideArrow: boolean = false;
  @ViewChild("myinput") myInputField: ElementRef;
 constructor(public formBuilder: FormBuilder, private service:ResourceService<TBL_BILTY_ENTRYModel>,
    private toastr: ToastrService,private router: Router,private station_service:ResourceService<any>,
    private validservice:ResourceService<any>,
    public datepipe: DatePipe,
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
  search: string = "";
  stationData: TBL_STATION_MASTERModel[];
  stateData:TBL_STATE_MASTERModel[];
  partyData: TBL_PARTY_MASTERModel[]=[];
  itemData:TBL_ITEM_MASTERModel[];
  image = '';
  file = '';

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === "Tab") {
      let value=this.formData.get('BILTYNO').value;
      console.log("BILTYNO",value)
      if(value.length ==7){
        let request={
          "table_name": "TBL_BILTY_ENTRY",
          "column_name": "BILTYNO",
          "column_value": value
        }
        this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
       
          console.log("response",response);
          if(response.statusMessage=="failed"){
         
            this.formData.controls['BILTYNO'].setErrors({ invalid: 'BILTY NO ALREADY Exist' });
            this.myInputField.nativeElement.focus();
            
          }
          else{
         
           
          }
         
         
        });
       
      }

      else{
        this.myInputField.nativeElement.focus();
      }
    }
    else if(event.key==="Enter"){
      let value=this.formData.get('BILTYNO').value;
      console.log("BILTYNO",value)
      if(this.id>0){

      }else{
      if(value.length ==7){
        let request={
          "table_name": "TBL_BILTY_ENTRY",
          "column_name": "BILTYNO",
          "column_value": value
        }
        this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
       
          console.log("response",response);
          if(response.statusMessage=="failed"){
         
            this.formData.controls['BILTYNO'].setErrors({ invalid: 'BILTY NO ALREADY Exist' });
            this.myInputField.nativeElement.focus();
            
          }
          else{
         
           
          }
         
         
        });
       
      }

      else{
        this.myInputField.nativeElement.focus();
      }
    }
    }
   
  }
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BILTY ENTRY ', active: true }];
 
 this.formData = this.formBuilder.group({
      
BILTYNO: ['', [Validators.required]],
DATE: ['', [Validators.required]],
STBY: [null, [Validators.required]],
PACK: ['', [Validators.required]],

FROM_STATION: [null, [Validators.required]],
TO_STATION: [null, [Validators.required]],
CNGE: [null, [Validators.required]],
NET_WT: ['', [Validators.required]],

CNGR: [null, [Validators.required]],
PARTY: [null, [Validators.required]],
CALCEL: [null, [Validators.required]],
GROSS_WT: ['', [Validators.required]],

CNGR_STATE_CODE: [null, [Validators.required]],
ITEM: [null, [Validators.required]],
FROM_BR_CODE: [null, [Validators.required]],
CHARGES_WT: ['', [Validators.required]],

TO_BR_CODE: [null, [Validators.required]],
RISK: [null, [Validators.required]],
COLLBY: [null, [Validators.required]],
GOODS_VALUES: [''],

IN_AC: ['', [Validators.required]],
INVNO: [''],
LORRYNO: [''],
RATE: ['', [Validators.required]],

CFT1: [''],
CFT2: [''],
CFT3: [''],
CFTEQL: [''],
BILTY_REMARLS: [''],
FRIGHT: ['', [Validators.required]],

Freight_Confirm: [''],
GATE_PASS: [''],
SURCHARGE: [''],

UNLOAD: [''],
BANK: [''],
EWay_Bill_No: [''],
INS: [''],

Expiry_Date: [''],
CC: [null],
CLAIM_RATE: [''],
HANDEL: [''],

DLY_DATE: [''],
SHRT_PKG: [''],
SHRT_WT: [''],
CPC: [''],


ENTRY_BY: ['admin'],
ENTRY_DATE: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
Packing_Method: ['', [Validators.required]],
ST: [''],


Breakup_Description: [''],
OTHERS: [''],
WH: [''],
HAMALI: [''],

NettTotal: ['', [Validators.required]],

 OTHER_EXP: [''],
 PRIVATE_MARKS: [''],                                                                                                                                                                                                                                                                                                                        
 SGST: [''],   
 CGST: [''],   
 IGST: [''],   


    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      console.log(" this.id", this.id);
      if(this.id>0){
        this._fetchData()
      }
    })
    this.submit = false;
    this._fetchStationData();
    this._fetchPartyData();
    this._fetchBranchData();
    this._fetchState();
    this._fetchItemData();
    this.formData.get("BILTYNO").valueChanges.pipe(distinctUntilChanged()).
    subscribe(selectedValue => {  
      if(this.id>0){

      }else{

     
      let value=this.formData.get('BILTYNO').value;
      console.log("BILTYNO",value)
      if(value.length ==7){
        let request={
          "table_name": "TBL_BILTY_ENTRY",
          "column_name": "BILTYNO",
          "column_value": value
        }
        this.validservice.add(request,"SP/check_data_Manager").subscribe(response => {
       
          console.log("response",response);
          if(response.statusMessage=="failed"){
         
            this.formData.controls['BILTYNO'].setErrors({ invalid: 'BILTY NO ALREADY Exist' });
         
            
          }
          else{
         
           
          }
         
         
        });
       
      }
    }
    });
    this.formData.get("RATE").valueChanges.pipe(distinctUntilChanged()).
    subscribe(selectedValue => {  
      let value=this.formData.get('RATE').value;
      console.log("BILTYNO",value)
      this.formData.controls['FRIGHT'].setValue(value);
    
    });
  }

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
  validSubmit() {

  const controls = this.formData.controls;
  
  
      this.submit = true;
	
    if (this.formData.valid) {
      let request :TBL_BILTY_ENTRYModel = <TBL_BILTY_ENTRYModel>{};
request.ID =this.id.toString();
 
request.BILTYNO=this.formData.get('BILTYNO').value;
request.DATE=this.formData.get('DATE').value;
request.STBY=this.formData.get('STBY').value;
request.PACK=Number(this.formData.get('PACK').value);

request.FROM_STATION=this.formData.get('FROM_STATION').value;
request.TO_STATION=this.formData.get('TO_STATION').value;
request.CNGE=this.formData.get('CNGE').value;

request.CNGR=this.formData.get('CNGR').value;
request.PARTY=this.formData.get('PARTY').value;
request.CALCEL=this.formData.get('CALCEL').value;
request.GROSS_WT=Number(this.formData.get('GROSS_WT').value);

request.CNGR_STATE_CODE=this.formData.get('CNGR_STATE_CODE').value;
request.ITEM=this.formData.get('ITEM').value;
request.FROM_BR_CODE=this.formData.get('FROM_BR_CODE').value;
request.CHARGES_WT=Number(this.formData.get('CHARGES_WT').value);

request.TO_BR_CODE=this.formData.get('TO_BR_CODE').value;
request.RISK=this.formData.get('RISK').value;
request.COLLBY=this.formData.get('COLLBY').value;
request.GOODS_VALUES=Number(this.formData.get('GOODS_VALUES').value);

request.IN_AC=this.formData.get('IN_AC').value;
request.INVNO=this.formData.get('INVNO').value;
request.LORRYNO=this.formData.get('LORRYNO').value;
request.RATE=Number(this.formData.get('RATE').value);

request.CFT1=Number(this.formData.get('CFT1').value);
request.CFT2=Number(this.formData.get('CFT2').value);
request.CFT3=Number(this.formData.get('CFT3').value);
request.CFTEQL=Number(this.formData.get('CFTEQL').value);
request.BILTY_REMARLS=this.formData.get('BILTY_REMARLS').value;
request.FRIGHT=Number(this.formData.get('FRIGHT').value);

request.Freight_Confirm=this.formData.get('Freight_Confirm').value;
request.GATE_PASS=this.formData.get('GATE_PASS').value;
request.SURCHARGE=Number(this.formData.get('SURCHARGE').value);

request.UNLOAD=this.formData.get('UNLOAD').value;
request.BANK=this.formData.get('BANK').value;
request.EWay_Bill_No=this.formData.get('EWay_Bill_No').value;
request.INS=Number(this.formData.get('INS').value);

request.Expiry_Date=this.formData.get('Expiry_Date').value;
request.CC=this.formData.get('CC').value;
request.CLAIM_RATE=Number(this.formData.get('CLAIM_RATE').value);
request.HANDEL=Number(this.formData.get('HANDEL').value);

request.DLY_DATE=this.formData.get('DLY_DATE').value;
request.SHRT_PKG=this.formData.get('SHRT_PKG').value;
request.SHRT_WT=this.formData.get('SHRT_WT').value;
request.CPC=Number(this.formData.get('CPC').value);


request.ENTRY_BY=this.formData.get('ENTRY_BY').value;
request.ENTRY_DATE=this.formData.get('ENTRY_DATE').value;
request.Packing_Method=this.formData.get('Packing_Method').value;
request.ST=Number(this.formData.get('ST').value)

request.Breakup_Description=this.formData.get('Breakup_Description').value;
request.OTHERS=Number(this.formData.get('OTHERS').value);
request.WH=Number(this.formData.get('WH').value);
request.HAMALI=Number(this.formData.get('HAMALI').value);

request.NettTotal=Number(this.formData.get('NettTotal').value);
request.OTHER_EXP=Number(this.formData.get('OTHER_EXP').value);
request.PRIVATE_MARKS=this.formData.get('PRIVATE_MARKS').value;
request.SGST=Number(this.formData.get('SGST').value);
request.CGST=Number(this.formData.get('CGST').value);
request.IGST=Number(this.formData.get('IGST').value);

// request.BILTYNO = this.formData.get('BILTYNO').value;
// request.BRANCH_CODE = this.formData.get('BRANCH_CODE').value;
// request.BRANCH_NAME = this.formData.get('BRANCH_NAME').value;
// request.DATE = this.formData.get('DATE').value;
// request.CALCEL = this.formData.get('CALCEL').value;
// request.FROM_STATION = this.formData.get('FROM_STATION').value;
// request.TO_STATION = this.formData.get('TO_STATION').value;
// request.CNGR = this.formData.get('CNGR').value;
// request.CNGE = this.formData.get('CNGE').value;
// request.PARTY = this.formData.get('PARTY').value;
// request.ITEM = this.formData.get('ITEM').value;
// request.PAYMODE = this.formData.get('PAYMODE').value;
// request.STBY = this.formData.get('STBY').value;
// request.RISK = this.formData.get('RISK').value;
// request.BILL1 = this.formData.get('BILL1').value;
// request.COLLBY = this.formData.get('COLLBY').value;
// request.IN_AC = this.formData.get('IN_AC').value;
// request.INVNO = this.formData.get('INVNO').value;
// request.DIV_AT = this.formData.get('DIV_AT').value;
// request.DLY_DATE = this.formData.get('DLY_DATE').value;
// request.GRP_BILTY = this.formData.get('GRP_BILTY').value;
// request.GATE_PASS = this.formData.get('GATE_PASS').value;
// request.LORRYNO = this.formData.get('LORRYNO').value;
// request.CFT1 = this.formData.get('CFT1').value;
// request.CFT2 = this.formData.get('CFT2').value;
// request.CFT3 = this.formData.get('CFT3').value;
// request.CFTEQL = this.formData.get('CFTEQL').value;
// request.BILTY_REMARLS = this.formData.get('BILTY_REMARLS').value;
// request.PRINT_REMARKS = this.formData.get('PRINT_REMARKS').value;
// request.CC = this.formData.get('CC').value;
// request.UNLOAD = this.formData.get('UNLOAD').value;
// request.CLAIM_RATE = this.formData.get('CLAIM_RATE').value;
// request.SHRT_PKG = this.formData.get('SHRT_PKG').value;
// request.SHRT_WT = this.formData.get('SHRT_WT').value;
// request.S_TAX = this.formData.get('S_TAX').value;
// request.CESS = this.formData.get('CESS').value;
// request.ENTRY_BY = this.formData.get('ENTRY_BY').value;
// request.ENTRY_DATE = this.formData.get('ENTRY_DATE').value;
// request.PACK = this.formData.get('PACK').value;
// request.NET_WT = this.formData.get('NET_WT').value;
// request.GROSS_WT = this.formData.get('GROSS_WT').value;
// request.CHARGES_WT = this.formData.get('CHARGES_WT').value;
// request.GOODS_VALUES = this.formData.get('GOODS_VALUES').value;
// request.RATE = this.formData.get('RATE').value;
// request.FRIGHT = this.formData.get('FRIGHT').value;
// request.SURCHARGE = this.formData.get('SURCHARGE').value;
// request.INS = this.formData.get('INS').value;
// request.HANDEL = this.formData.get('HANDEL').value;
// request.CPC = this.formData.get('CPC').value;
// request.ST = this.formData.get('ST').value;
// request.OTHERS = this.formData.get('OTHERS').value;
// request.WH = this.formData.get('WH').value;
// request.HAMALI = this.formData.get('HAMALI').value;
// request.S_TAX1 = this.formData.get('S_TAX1').value;
// request.CSS1 = this.formData.get('CSS1').value;
// request.FINYR = this.formData.get('FINYR').value;
// request.VariableTot = this.formData.get('VariableTot').value;
// request.NettTotal = this.formData.get('NettTotal').value;
// request.INVDATE = this.formData.get('INVDATE').value;
// request.BANK = this.formData.get('BANK').value;
// request.CNGE_STATE_CODE = this.formData.get('CNGE_STATE_CODE').value;
// request.CNGE_STATE_NAME = this.formData.get('CNGE_STATE_NAME').value;
// request.CNGR_STATE_CODE = this.formData.get('CNGR_STATE_CODE').value;
// request.CNGR_STATE_NAME = this.formData.get('CNGR_STATE_NAME').value;
// request.CNGE_GSTNO = this.formData.get('CNGE_GSTNO').value;
// request.CNGR_GSTNO = this.formData.get('CNGR_GSTNO').value;
// request.FROM_BR_CODE = this.formData.get('FROM_BR_CODE').value;
// request.TO_BR_CODE = this.formData.get('TO_BR_CODE').value;
// request.Packing_Method = this.formData.get('Packing_Method').value;
// request.Breakup_Description = this.formData.get('Breakup_Description').value;
// request.EWay_Bill_No = this.formData.get('EWay_Bill_No').value;
// request.Expiry_Date = this.formData.get('Expiry_Date').value;
// request.Freight_Confirm = this.formData.get('Freight_Confirm').value;

     // formData.append('id', this.id.toString());
     if(this.id>0){
      this.service.update(request,"TBL_BILTY_ENTRY/ID?ID="+this.id).subscribe(response => {
         
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/bilty-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }
    else{
     
      this.service.add(request,"TBL_BILTY_ENTRY").subscribe(response => {
       
        console.log("response",response);
        if(response.document>0){
          this.toastr.success( 'Product Inserted Successfully!','Success!');
          this.router.navigate(['/bilty-master']);
          
        }
        else{
          this.toastr.error( 'Something went wrong!','Error!');
         
        }
       
       
      });
    }

     
    
    }
  

  
}
 
 
 
 
 private _fetchData() {
   
  this.service.get("TBL_BILTY_ENTRY/id?id="+this.id).subscribe(response => {
   console.log("response",response.document)
   let data=response.document;
   //this.formData.controls['ID'].setValue(data['ID']);
this.formData.controls['BILTYNO'].setValue(data['biltyno']);
this.formData.controls['DATE'].setValue(this.datepipe.transform(data['date'], 'yyyy-MM-dd'));
this.formData.controls['STBY'].setValue(data['stby']);
this.formData.controls['PACK'].setValue(data['pack']);
// this.formData.controls['DATE'].setValue(data['date']);
//
 this.formData.controls['FROM_STATION'].setValue(data['froM_STATION']);
 this.formData.controls['TO_STATION'].setValue(data['tO_STATION']);
 this.formData.controls['CNGR'].setValue(data['cngr']);
 this.formData.controls['NET_WT'].setValue(data['neT_WT']);

 this.formData.controls['CNGE'].setValue(data['cnge']);
 this.formData.controls['PARTY'].setValue(data['party']);
 this.formData.controls['CALCEL'].setValue(data['calcel']);
 this.formData.controls['GROSS_WT'].setValue(data['grosS_WT']);


 this.formData.controls['CNGR_STATE_CODE'].setValue(data['cngR_STATE_CODE']);
 this.formData.controls['ITEM'].setValue(data['item']);
 this.formData.controls['FROM_BR_CODE'].setValue(data['froM_BR_CODE']);
 this.formData.controls['CHARGES_WT'].setValue(data['chargeS_WT']);


 this.formData.controls['TO_BR_CODE'].setValue(data['tO_BR_CODE']);
 this.formData.controls['RISK'].setValue(data['risk']);
 this.formData.controls['COLLBY'].setValue(data['collby']);
 this.formData.controls['GOODS_VALUES'].setValue(data['goodS_VALUES']);



 this.formData.controls['IN_AC'].setValue(data['iN_AC']);
 this.formData.controls['INVNO'].setValue(data['invno']);
 this.formData.controls['LORRYNO'].setValue(data['collby']);
 this.formData.controls['RATE'].setValue(data['goodS_VALUES']);


 
this.formData.controls['CFT1'].setValue(data['cfT1']);
this.formData.controls['CFT2'].setValue(data['cfT2']);
this.formData.controls['CFT3'].setValue(data['cfT3']);
this.formData.controls['CFTEQL'].setValue(data['cfteql']);
this.formData.controls['BILTY_REMARLS'].setValue(data['biltY_REMARLS']);
this.formData.controls['FRIGHT'].setValue(data['fright']);



this.formData.controls['Freight_Confirm'].setValue(data['freight_Confirm']);
this.formData.controls['GATE_PASS'].setValue(data['gatE_PASS']);
this.formData.controls['SURCHARGE'].setValue(data['surcharge']);
//this.formData.controls['OTHER_EXP'].setValue(data['GRP_BILTY']);




this.formData.controls['UNLOAD'].setValue(data['unload']);
this.formData.controls['BANK'].setValue(data['bank']);
this.formData.controls['EWay_Bill_No'].setValue(data['eWay_Bill_No']);
this.formData.controls['INS'].setValue(data['ins']);


this.formData.controls['Expiry_Date'].setValue(this.datepipe.transform(data['entrY_DATE'], 'yyyy-MM-dd'));
this.formData.controls['CC'].setValue(data['cc']);
this.formData.controls['CLAIM_RATE'].setValue(data['claiM_RATE']);
this.formData.controls['HANDEL'].setValue(data['handel']);

this.formData.controls['DLY_DATE'].setValue(this.datepipe.transform(data['dlY_DATE'], 'yyyy-MM-dd'));
this.formData.controls['SHRT_PKG'].setValue(data['shrT_PKG']);
this.formData.controls['SHRT_WT'].setValue(data['shrT_WT']);
this.formData.controls['CPC'].setValue(data['cpc']);


this.formData.controls['ENTRY_DATE'].setValue(this.datepipe.transform(data['entrY_DATE'], 'yyyy-MM-dd'));
this.formData.controls['ENTRY_BY'].setValue(data['entrY_BY']);
this.formData.controls['Packing_Method'].setValue(data['packing_Method']);
this.formData.controls['ST'].setValue(data['st']);



this.formData.controls['Breakup_Description'].setValue(data['breakup_Description']);
this.formData.controls['OTHERS'].setValue(data['others']);
this.formData.controls['WH'].setValue(data['wh']);
this.formData.controls['HAMALI'].setValue(data['hamali']);


this.formData.controls['NettTotal'].setValue(data['nettTotal']);
this.formData.controls['OTHER_EXP'].setValue(data['otheR_EXP']);
this.formData.controls['PRIVATE_MARKS'].setValue(data['privatE_MARKS']);
this.formData.controls['SGST'].setValue(data['sgst']);
this.formData.controls['CGST'].setValue(data['cgst']);
this.formData.controls['IGST'].setValue(data['igst']);

// 
// 
// this.formData.controls['GOODS_VALUES'].setValue(data['GOODS_VALUES']);
// this.formData.controls['RATE'].setValue(data['RATE']);
// this.formData.controls['FRIGHT'].setValue(data['FRIGHT']);
// this.formData.controls['SURCHARGE'].setValue(data['SURCHARGE']);
// this.formData.controls['INS'].setValue(data['INS']);
// this.formData.controls['HANDEL'].setValue(data['HANDEL']);
// this.formData.controls['CPC'].setValue(data['CPC']);
// this.formData.controls['ST'].setValue(data['ST']);
// this.formData.controls['OTHERS'].setValue(data['OTHERS']);
// this.formData.controls['WH'].setValue(data['WH']);
// this.formData.controls['HAMALI'].setValue(data['HAMALI']);
// this.formData.controls['S_TAX1'].setValue(data['S_TAX1']);
// this.formData.controls['CSS1'].setValue(data['CSS1']);
// this.formData.controls['FINYR'].setValue(data['FINYR']);
// this.formData.controls['VariableTot'].setValue(data['VariableTot']);
// this.formData.controls['NettTotal'].setValue(data['NettTotal']);
// this.formData.controls['INVDATE'].setValue(data['INVDATE']);
// this.formData.controls['BANK'].setValue(data['BANK']);
// this.formData.controls['CNGE_STATE_CODE'].setValue(data['CNGE_STATE_CODE']);
// this.formData.controls['CNGE_STATE_NAME'].setValue(data['CNGE_STATE_NAME']);
//
// this.formData.controls['CNGR_STATE_NAME'].setValue(data['CNGR_STATE_NAME']);
// this.formData.controls['CNGE_GSTNO'].setValue(data['CNGE_GSTNO']);
// this.formData.controls['CNGR_GSTNO'].setValue(data['CNGR_GSTNO']);
// this.formData.controls['FROM_BR_CODE'].setValue(data['FROM_BR_CODE']);
// this.formData.controls['TO_BR_CODE'].setValue(data['TO_BR_CODE']);
// this.formData.controls['Packing_Method'].setValue(data['Packing_Method']);
// this.formData.controls['Breakup_Description'].setValue(data['Breakup_Description']);
// this.formData.controls['EWay_Bill_No'].setValue(data['EWay_Bill_No']);
// this.formData.controls['Expiry_Date'].setValue(data['Expiry_Date']);
// this.formData.controls['Freight_Confirm'].setValue(data['Freight_Confirm']);

 
 
   
  });
}

  numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

private _fetchStationData() {
   
  this.requestModel.url = "TBL_STATION_MASTER?PageNo=" + 1 + "&PageSize=" + 999999 + "&Search=" + this.search;
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.stationData = response.document;
   
  });

}

public _fetchPartyData() {
     
  this.requestModel.url = "TBL_PARTY_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search="+ this.search;
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.partyData = response.document;
   
  });



}
private _fetchBranchData() {
    
     
  this.requestModel.url = "TBL_BRANCH_MASTER?PageNo=" + 1 + "&PageSize=" + 999999+ "&Search=" + this.search;
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.branchData = response.document;
   
  });



}

private _fetchState() {
  this.requestModel.url="SP/sp_app_get_state";
  this.station_service.postStoreList(this.requestModel).subscribe(response => {
   this.stateData=response.document;
   console.log("this.stateData", this.stateData);
  });
}


private _fetchItemData() {
 
  this.requestModel.url = "TBL_ITEM_MASTER?PageNo=" + 1 + "&PageSize=" + 999999 + "&Search=" + this.search;
  this.station_service.getStoreList(this.requestModel).subscribe(response => {
    this.itemData = response.document;
   
  });
}


ngAfterViewInit() {
  this.myInputField.nativeElement.focus();
  }

}
