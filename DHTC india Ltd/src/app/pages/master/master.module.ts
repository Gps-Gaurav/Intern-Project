import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";

import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';



import {TBL_BRANCH_MASTERComponent } from './TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.component';
import { MasterRoutingModule } from './master-routing.module';

import { TBL_ACCOUNT_GROUP_MASTERComponent } from './TBL_ACCOUNT_GROUP_MASTER/TBL_ACCOUNT_GROUP_MASTER.component';
import { TBL_ACCOUNT_MASTERComponent } from './TBL_ACCOUNT_MASTER/TBL_ACCOUNT_MASTER.component';
import { TBL_ACCOUNT_SUB_GROUP_MASTERComponent } from './TBL_ACCOUNT_SUB_GROUP_MASTER/TBL_ACCOUNT_SUB_GROUP_MASTER.component';
import { TBL_BROKER_MASTERComponent } from './TBL_BROKER_MASTER/TBL_BROKER_MASTER.component';
import { TBL_CHARGE_MASTERComponent } from './TBL_CHARGE_MASTER/TBL_CHARGE_MASTER.component';
import { TBL_CONTRACT_MASTERComponent } from './TBL_CONTRACT_MASTER/TBL_CONTRACT_MASTER.component';
import { TBL_DRIVER_MASTERComponent } from './TBL_DRIVER_MASTER/TBL_DRIVER_MASTER.component';
import { TBL_FINANCE_BANK_MASTERComponent } from './TBL_FINANCE_BANK_MASTER/TBL_FINANCE_BANK_MASTER.component';
import { TBL_FINANCE_CARD_MASTERComponent } from './TBL_FINANCE_CARD_MASTER/TBL_FINANCE_CARD_MASTER.component';
import { TBL_FINANCE_FUND_MASTERComponent } from './TBL_FINANCE_FUND_MASTER/TBL_FINANCE_FUND_MASTER.component';
import { TBL_FINANCE_IFSC_CODE_MASTERComponent } from './TBL_FINANCE_IFSC_CODE_MASTER/TBL_FINANCE_IFSC_CODE_MASTER.component';
import { TBL_GROUP_MASTERComponent } from './TBL_GROUP_MASTER/TBL_GROUP_MASTER.component';
import { TBL_HR_EMPLOYEE_MASTERComponent } from './TBL_HR_EMPLOYEE_MASTER/TBL_HR_EMPLOYEE_MASTER.component';
import { TBL_HR_HOLIDAY_MASTERComponent } from './TBL_HR_HOLIDAY_MASTER/TBL_HR_HOLIDAY_MASTER.component';
import { TBL_HR_LOAN_MASTERComponent } from './TBL_HR_LOAN_MASTER/TBL_HR_LOAN_MASTER.component';
import { TBL_ITEM_GROUP_MASTERComponent } from './TBL_ITEM_GROUP_MASTER/TBL_ITEM_GROUP_MASTER.component';
import { TBL_ITEM_MASTERComponent } from './TBL_ITEM_MASTER/TBL_ITEM_MASTER.component';
import { TBL_MISC_BROKER_MASTERComponent } from './TBL_MISC_BROKER_MASTER/TBL_MISC_BROKER_MASTER.component';
import { TBL_MISC_COLLECTIONER_MASTERComponent } from './TBL_MISC_COLLECTIONER_MASTER/TBL_MISC_COLLECTIONER_MASTER.component';
import { TBL_MISC_GARDEN_MASTERComponent } from './TBL_MISC_GARDEN_MASTER/TBL_MISC_GARDEN_MASTER.component';
import { TBL_MISC_WARE_HOUSE_MASTERComponent } from './TBL_MISC_WARE_HOUSE_MASTER/TBL_MISC_WARE_HOUSE_MASTER.component';
import { TBL_MODULE_DETAILS_MASTERComponent } from './TBL_MODULE_DETAILS_MASTER/TBL_MODULE_DETAILS_MASTER.component';
import { TBL_PARTY_MASTERComponent } from './TBL_PARTY_MASTER/TBL_PARTY_MASTER.component';
import { TBL_PARTY_REGISTRATION_MASTERComponent } from './TBL_PARTY_REGISTRATION_MASTER/TBL_PARTY_REGISTRATION_MASTER.component';
import { TBL_RENT_MASTERComponent } from './TBL_RENT_MASTER/TBL_RENT_MASTER.component';
import { TBL_STATE_MASTERComponent } from './TBL_STATE_MASTER/TBL_STATE_MASTER.component';
import { TBL_STATION_MASTERComponent } from './TBL_STATION_MASTER/TBL_STATION_MASTER.component';
import { TBL_STATIONARY_ISSUE_MASTERComponent } from './TBL_STATIONARY_ISSUE_MASTER/TBL_STATIONARY_ISSUE_MASTER.component';
import { TBL_STATIONARY_MASTERComponent } from './TBL_STATIONARY_MASTER/TBL_STATIONARY_MASTER.component';
import { TBL_TRANSIT_TIME_MASTERComponent } from './TBL_TRANSIT_TIME_MASTER/TBL_TRANSIT_TIME_MASTER.component';
import { TBL_TRUCK_GROUP_MASTERComponent } from './TBL_TRUCK_GROUP_MASTER/TBL_TRUCK_GROUP_MASTER.component';
import { TBL_TRUCK_MASTERComponent } from './TBL_TRUCK_MASTER/TBL_TRUCK_MASTER.component';
import { TBL_USER_MASTERComponent } from './TBL_USER_MASTER/TBL_USER_MASTER.component';
import { TblAccMasterComponent } from './TblAccMaster/TblAccMaster.component';
import { InsertTBL_BRANCH_MASTERComponent } from './insert_TBL_BRANCH_MASTER/insert_TBL_BRANCH_MASTER.component';
import { InsertTBL_ACCOUNT_GROUP_MASTERComponent } from './insert_TBL_ACCOUNT_GROUP_MASTER/insert_TBL_ACCOUNT_GROUP_MASTER.component';
import { InsertTBL_ACCOUNT_MASTERComponent } from './insert_TBL_ACCOUNT_MASTER/insert_TBL_ACCOUNT_MASTER.component';
import { InsertTBL_ACCOUNT_SUB_GROUP_MASTERComponent } from './insert_TBL_ACCOUNT_SUB_GROUP_MASTER/insert_TBL_ACCOUNT_SUB_GROUP_MASTER.component';
import { InsertTBL_BROKER_MASTERComponent } from './insert_TBL_BROKER_MASTER/insert_TBL_BROKER_MASTER.component';
import { InsertTBL_CHARGE_MASTERComponent } from './insert_TBL_CHARGE_MASTER/insert_TBL_CHARGE_MASTER.component';
import { InsertTBL_CONTRACT_MASTERComponent } from './insert_TBL_CONTRACT_MASTER/insert_TBL_CONTRACT_MASTER.component';
import { InsertTBL_DRIVER_MASTERComponent } from './insert_TBL_DRIVER_MASTER/insert_TBL_DRIVER_MASTER.component';
import { InsertTBL_FINANCE_BANK_MASTERComponent } from './insert_TBL_FINANCE_BANK_MASTER/insert_TBL_FINANCE_BANK_MASTER.component';
import { InsertTBL_FINANCE_CARD_MASTERComponent } from './insert_TBL_FINANCE_CARD_MASTER/insert_TBL_FINANCE_CARD_MASTER.component';
import { InsertTBL_FINANCE_FUND_MASTERComponent } from './insert_TBL_FINANCE_FUND_MASTER/insert_TBL_FINANCE_FUND_MASTER.component';
import { InsertTBL_FINANCE_IFSC_CODE_MASTERComponent } from './insert_TBL_FINANCE_IFSC_CODE_MASTER/insert_TBL_FINANCE_IFSC_CODE_MASTER.component';
import { InsertTBL_GROUP_MASTERComponent } from './insert_TBL_GROUP_MASTER/insert_TBL_GROUP_MASTER.component';
import { InsertTBL_HR_EMPLOYEE_MASTERComponent } from './insert_TBL_HR_EMPLOYEE_MASTER/insert_TBL_HR_EMPLOYEE_MASTER.component';
import { InsertTBL_HR_HOLIDAY_MASTERComponent } from './insert_TBL_HR_HOLIDAY_MASTER/insert_TBL_HR_HOLIDAY_MASTER.component';
import { InsertTBL_HR_LOAN_MASTERComponent } from './insert_TBL_HR_LOAN_MASTER/insert_TBL_HR_LOAN_MASTER.component';
import { InsertTBL_ITEM_GROUP_MASTERComponent } from './insert_TBL_ITEM_GROUP_MASTER/insert_TBL_ITEM_GROUP_MASTER.component';
import { InsertTBL_ITEM_MASTERComponent } from './insert_TBL_ITEM_MASTER/insert_TBL_ITEM_MASTER.component';
import { InsertTBL_MISC_BROKER_MASTERComponent } from './insert_TBL_MISC_BROKER_MASTER/insert_TBL_MISC_BROKER_MASTER.component';
import { InsertTBL_MISC_COLLECTIONER_MASTERComponent } from './insert_TBL_MISC_COLLECTIONER_MASTER/insert_TBL_MISC_COLLECTIONER_MASTER.component';
import { InsertTBL_MISC_GARDEN_MASTERComponent } from './insert_TBL_MISC_GARDEN_MASTER/insert_TBL_MISC_GARDEN_MASTER.component';
import { InsertTBL_MISC_WARE_HOUSE_MASTERComponent } from './insert_TBL_MISC_WARE_HOUSE_MASTER/insert_TBL_MISC_WARE_HOUSE_MASTER.component';
import { InsertTBL_MODULE_DETAILS_MASTERComponent } from './insert_TBL_MODULE_DETAILS_MASTER/insert_TBL_MODULE_DETAILS_MASTER.component';
import { InsertTBL_PARTY_MASTERComponent } from './insert_TBL_PARTY_MASTER/insert_TBL_PARTY_MASTER.component';
import { InsertTBL_PARTY_REGISTRATION_MASTERComponent } from './insert_TBL_PARTY_REGISTRATION_MASTER/insert_TBL_PARTY_REGISTRATION_MASTER.component';
import { InsertTBL_RENT_MASTERComponent } from './insert_TBL_RENT_MASTER/insert_TBL_RENT_MASTER.component';
import { InsertTBL_STATION_MASTERComponent } from './insert_TBL_STATION_MASTER/insert_TBL_STATION_MASTER.component';
import { InsertTBL_STATE_MASTERComponent } from './insert_TBL_STATE_MASTER/insert_TBL_STATE_MASTER.component';
import { InsertTBL_STATIONARY_ISSUE_MASTERComponent } from './insert_TBL_STATIONARY_ISSUE_MASTER/insert_TBL_STATIONARY_ISSUE_MASTER.component';
import { InsertTBL_STATIONARY_MASTERComponent } from './insert_TBL_STATIONARY_MASTER/insert_TBL_STATIONARY_MASTER.component';
import { InsertTBL_TRANSIT_TIME_MASTERComponent } from './insert_TBL_TRANSIT_TIME_MASTER/insert_TBL_TRANSIT_TIME_MASTER.component';
import { InsertTBL_TRUCK_GROUP_MASTERComponent } from './insert_TBL_TRUCK_GROUP_MASTER/insert_TBL_TRUCK_GROUP_MASTER.component';
import { InsertTBL_TRUCK_MASTERComponent } from './insert_TBL_TRUCK_MASTER/insert_TBL_TRUCK_MASTER.component';
import { InsertTBL_USER_MASTERComponent } from './insert_TBL_USER_MASTER/insert_TBL_USER_MASTER.component';
import { InsertTblAccMasterComponent } from './insert_tblAccMaster/insert_tblAccMaster.component';
import { TBL_BILTY_ENTRYComponent } from './TBL_BILTY_ENTRY/TBL_BILTY_ENTRY.component';
import { InsertTBL_BILTY_ENTRYComponent } from './insert_TBL_BILTY_ENTRY/insert_TBL_BILTY_ENTRY.component';
import { TBL_ACKNOWLEDGEMENT_ENTRYComponent } from './TBL_ACKNOWLEDGEMENT_ENTRY/TBL_ACKNOWLEDGEMENT_ENTRY.component';
import { InsertTBL_ACKNOWLEDGEMENT_ENTRYComponent } from './insert_TBL_ACKNOWLEDGEMENT_ENTRY/insert_TBL_ACKNOWLEDGEMENT_ENTRY.component';
import { InsertTBL_SHORT_CERTIFICATE_ENTRYComponent } from './insert_TBL_SHORT_CERTIFICATE_ENTRY/insert_TBL_SHORT_CERTIFICATE_ENTRY.component';
import { TBL_MONEY_RECIPTComponent } from './TBL_MONEY_RECIPT/TBL_MONEY_RECIPT.component';
import { TBL_SHORT_CERTIFICATE_ENTRYComponent } from './TBL_SHORT_CERTIFICATE_ENTRY/TBL_SHORT_CERTIFICATE_ENTRY.component';
import { InsertTBL_MONEY_RECIPTComponent } from './insert_TBL_MONEY_RECIPT/insert_TBL_MONEY_RECIPT.component';
import { TBL_LORRY_HIRE_STATEMENTComponent } from './TBL_LORRY_HIRE_STATEMENT/TBL_LORRY_HIRE_STATEMENT.component';
import { InsertTBL_LORRY_HIRE_STATEMENTComponent } from './insert_TBL_LORRY_HIRE_STATEMENT/insert_TBL_LORRY_HIRE_STATEMENT.component';
import { TBL_ARRIVAL_BREAKUPComponent } from './TBL_ARRIVAL_BREAKUP/TBL_ARRIVAL_BREAKUP.component';
import { InsertTBL_ARRIVAL_BREAKUPComponent } from './insert_TBL_ARRIVAL_BREAKUP/insert_TBL_ARRIVAL_BREAKUP.component';
import { TBL_DELIVERY_STATEMENT_ENTRYComponent } from './TBL_DELIVERY_STATEMENT_ENTRY/TBL_DELIVERY_STATEMENT_ENTRY.component';
import { InsertTBL_DELIVERY_STATEMENT_ENTRYComponent } from './insert_TBL_DELIVERY_STATEMENT_ENTRY/insert_TBL_DELIVERY_STATEMENT_ENTRY.component';
import { TBL_CHALLANComponent } from './TBL_CHALLAN/TBL_CHALLAN.component';
import { InsertTBL_CHALLANComponent } from './insert_TBL_CHALLAN/insert_TBL_CHALLAN.component';
import { UppercaseInputDirective } from 'src/app/core/helpers/UppercaseInputDirective';
import { InsertARRIVAL_CHALLANG_ENTRYComponent } from './insert_ARRIVAL_CHALLANG_ENTRY/insert_ARRIVAL_CHALLANG_ENTRY.component';
import { TBL_ARRIVAL_CHALLAN_ENTRYComponent } from './ARRIVAL_CHALLAN_ENTRY/TBL_ARRIVAL_CHALLAN_ENTRY.component';
import { LowercaseInputDirective } from 'src/app/core/helpers/LowercaseInputDirective';
import { InsertTBL_CLAIM_REMARKSComponent } from './insert_TBL_CLAIM_REMARKS/insert_TBL_CLAIM_REMARKS.component';
import { TBL_CLAIM_REMARKSComponent } from './TBL_CLAIM_REMARKS/TBL_CLAIM_REMARKS.component';
import { InsertTBL_LORRY_ACCIDENTComponent } from './insert_TBL_LORRY_ACCIDENT/insert_TBL_LORRY_ACCIDENT.component';
import { TBL_LORRY_ACCIDENTComponent } from './TBL_LORRY_ACCIDENT/TBL_LORRY_ACCIDENT.component';
import { TwoDigitDecimaNumberDirective } from 'src/app/core/helpers/TwoDigitDecimaNumberDirective';
import { KeyHandlerDirective } from 'src/app/core/helpers/KeyHandlerDirective';
import { TabDirective } from 'src/app/core/helpers/TabDirective';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';




const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations:[
    TBL_BRANCH_MASTERComponent,
    InsertTBL_BRANCH_MASTERComponent,
    TBL_ACCOUNT_GROUP_MASTERComponent,
    InsertTBL_ACCOUNT_GROUP_MASTERComponent,
    TBL_ACCOUNT_MASTERComponent,
    InsertTBL_ACCOUNT_MASTERComponent,
    TBL_ACCOUNT_SUB_GROUP_MASTERComponent,
    InsertTBL_ACCOUNT_SUB_GROUP_MASTERComponent,
    TBL_BROKER_MASTERComponent,
    InsertTBL_BROKER_MASTERComponent,
    TBL_CHARGE_MASTERComponent,
    InsertTBL_CHARGE_MASTERComponent,
    TBL_CONTRACT_MASTERComponent,
    InsertTBL_CONTRACT_MASTERComponent,    
    TBL_DRIVER_MASTERComponent,
    InsertTBL_DRIVER_MASTERComponent,
    TBL_FINANCE_BANK_MASTERComponent,
    InsertTBL_FINANCE_BANK_MASTERComponent,
    TBL_FINANCE_CARD_MASTERComponent,
    InsertTBL_FINANCE_CARD_MASTERComponent,
    TBL_FINANCE_FUND_MASTERComponent,
    InsertTBL_FINANCE_FUND_MASTERComponent,
    InsertTBL_FINANCE_IFSC_CODE_MASTERComponent,
    TBL_FINANCE_IFSC_CODE_MASTERComponent,
    TBL_GROUP_MASTERComponent,
    InsertTBL_GROUP_MASTERComponent,
    TBL_HR_EMPLOYEE_MASTERComponent,
    InsertTBL_HR_EMPLOYEE_MASTERComponent,
    TBL_HR_HOLIDAY_MASTERComponent,
    InsertTBL_HR_HOLIDAY_MASTERComponent,
    TBL_HR_LOAN_MASTERComponent,
    InsertTBL_HR_LOAN_MASTERComponent,
    TBL_ITEM_GROUP_MASTERComponent,
    InsertTBL_ITEM_GROUP_MASTERComponent,
    TBL_ITEM_MASTERComponent,
    InsertTBL_ITEM_MASTERComponent,
    TBL_MISC_BROKER_MASTERComponent,
    InsertTBL_MISC_BROKER_MASTERComponent,
    TBL_MISC_COLLECTIONER_MASTERComponent,
    InsertTBL_MISC_COLLECTIONER_MASTERComponent,
    TBL_MISC_GARDEN_MASTERComponent,
    InsertTBL_MISC_GARDEN_MASTERComponent,
    TBL_MISC_WARE_HOUSE_MASTERComponent,
    InsertTBL_MISC_WARE_HOUSE_MASTERComponent,
    TBL_MODULE_DETAILS_MASTERComponent,
    InsertTBL_MODULE_DETAILS_MASTERComponent,
    TBL_PARTY_MASTERComponent,
    InsertTBL_PARTY_MASTERComponent,
    TBL_PARTY_REGISTRATION_MASTERComponent,
    InsertTBL_PARTY_REGISTRATION_MASTERComponent,
    TBL_RENT_MASTERComponent,
    InsertTBL_RENT_MASTERComponent,
    TBL_STATE_MASTERComponent,
    InsertTBL_STATE_MASTERComponent,
    TBL_STATION_MASTERComponent,
    InsertTBL_STATION_MASTERComponent,
    TBL_STATIONARY_ISSUE_MASTERComponent,
    InsertTBL_STATIONARY_ISSUE_MASTERComponent,
    TBL_STATIONARY_MASTERComponent,
    InsertTBL_STATIONARY_MASTERComponent,
    TBL_TRANSIT_TIME_MASTERComponent,
    InsertTBL_TRANSIT_TIME_MASTERComponent,
    TBL_TRUCK_GROUP_MASTERComponent,
    InsertTBL_TRUCK_GROUP_MASTERComponent,    
    TBL_TRUCK_MASTERComponent,
    InsertTBL_TRUCK_MASTERComponent,
    TBL_USER_MASTERComponent,
    InsertTBL_USER_MASTERComponent,
    TblAccMasterComponent,
    InsertTblAccMasterComponent,
    TBL_BILTY_ENTRYComponent,
    InsertTBL_BILTY_ENTRYComponent,
    TBL_ACKNOWLEDGEMENT_ENTRYComponent,
    InsertTBL_ACKNOWLEDGEMENT_ENTRYComponent,
    TBL_SHORT_CERTIFICATE_ENTRYComponent,
    InsertTBL_SHORT_CERTIFICATE_ENTRYComponent,
    TBL_MONEY_RECIPTComponent,
    InsertTBL_MONEY_RECIPTComponent,
    TBL_LORRY_HIRE_STATEMENTComponent,
    InsertTBL_LORRY_HIRE_STATEMENTComponent,
    TBL_ARRIVAL_BREAKUPComponent,
    InsertTBL_ARRIVAL_BREAKUPComponent,
    TBL_DELIVERY_STATEMENT_ENTRYComponent,
    InsertTBL_DELIVERY_STATEMENT_ENTRYComponent,
    TBL_CHALLANComponent,
    InsertTBL_CHALLANComponent,InsertARRIVAL_CHALLANG_ENTRYComponent,
    TBL_ARRIVAL_CHALLAN_ENTRYComponent,InsertTBL_CLAIM_REMARKSComponent,TBL_CLAIM_REMARKSComponent,
    InsertTBL_LORRY_ACCIDENTComponent,TBL_LORRY_ACCIDENTComponent,
    UppercaseInputDirective,LowercaseInputDirective,TwoDigitDecimaNumberDirective,KeyHandlerDirective,
    TabDirective
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    ReactiveFormsModule,
    TableModule ,
    UIModule,ToastModule,
    WidgetModule,
    Ng5SliderModule,MessagesModule,
    NgSelectModule,
    NgbPaginationModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config
    },
    DatePipe
  ]
})
export class MasterModule { }
