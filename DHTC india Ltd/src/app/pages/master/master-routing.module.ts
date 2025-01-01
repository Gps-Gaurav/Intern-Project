import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TBL_ACCOUNT_GROUP_MASTERComponent } from './TBL_ACCOUNT_GROUP_MASTER/TBL_ACCOUNT_GROUP_MASTER.component';
import {TBL_BRANCH_MASTERComponent } from './TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.component';
import {TBL_ACCOUNT_MASTERComponent } from './TBL_ACCOUNT_MASTER/TBL_ACCOUNT_MASTER.component';
import {TBL_ACCOUNT_SUB_GROUP_MASTERComponent } from './TBL_ACCOUNT_SUB_GROUP_MASTER/TBL_ACCOUNT_SUB_GROUP_MASTER.component';
import {TBL_BROKER_MASTERComponent } from './TBL_BROKER_MASTER/TBL_BROKER_MASTER.component';
import {TBL_CHARGE_MASTERComponent } from './TBL_CHARGE_MASTER/TBL_CHARGE_MASTER.component';
import {TBL_CONTRACT_MASTERComponent } from './TBL_CONTRACT_MASTER/TBL_CONTRACT_MASTER.component';
import {TBL_DRIVER_MASTERComponent } from './TBL_DRIVER_MASTER/TBL_DRIVER_MASTER.component';
import {TBL_FINANCE_BANK_MASTERComponent } from './TBL_FINANCE_BANK_MASTER/TBL_FINANCE_BANK_MASTER.component';
import {TBL_FINANCE_CARD_MASTERComponent } from './TBL_FINANCE_CARD_MASTER/TBL_FINANCE_CARD_MASTER.component';
import {TBL_FINANCE_FUND_MASTERComponent } from './TBL_FINANCE_FUND_MASTER/TBL_FINANCE_FUND_MASTER.component';
import {TBL_FINANCE_IFSC_CODE_MASTERComponent } from './TBL_FINANCE_IFSC_CODE_MASTER/TBL_FINANCE_IFSC_CODE_MASTER.component';
import {TBL_GROUP_MASTERComponent } from './TBL_GROUP_MASTER/TBL_GROUP_MASTER.component';
import {TBL_HR_EMPLOYEE_MASTERComponent } from './TBL_HR_EMPLOYEE_MASTER/TBL_HR_EMPLOYEE_MASTER.component';
import {TBL_HR_HOLIDAY_MASTERComponent } from './TBL_HR_HOLIDAY_MASTER/TBL_HR_HOLIDAY_MASTER.component';
import {TBL_HR_LOAN_MASTERComponent } from './TBL_HR_LOAN_MASTER/TBL_HR_LOAN_MASTER.component';
import {TBL_ITEM_GROUP_MASTERComponent } from './TBL_ITEM_GROUP_MASTER/TBL_ITEM_GROUP_MASTER.component';
import {TBL_ITEM_MASTERComponent } from './TBL_ITEM_MASTER/TBL_ITEM_MASTER.component';
import {TBL_MISC_BROKER_MASTERComponent } from './TBL_MISC_BROKER_MASTER/TBL_MISC_BROKER_MASTER.component';
import {TBL_MISC_COLLECTIONER_MASTERComponent } from './TBL_MISC_COLLECTIONER_MASTER/TBL_MISC_COLLECTIONER_MASTER.component';
import {TBL_MISC_GARDEN_MASTERComponent } from './TBL_MISC_GARDEN_MASTER/TBL_MISC_GARDEN_MASTER.component';
import {TBL_MISC_WARE_HOUSE_MASTERComponent } from './TBL_MISC_WARE_HOUSE_MASTER/TBL_MISC_WARE_HOUSE_MASTER.component';
import {TBL_MODULE_DETAILS_MASTERComponent } from './TBL_MODULE_DETAILS_MASTER/TBL_MODULE_DETAILS_MASTER.component';
import {TBL_PARTY_MASTERComponent } from './TBL_PARTY_MASTER/TBL_PARTY_MASTER.component';
import {TBL_PARTY_REGISTRATION_MASTERComponent } from './TBL_PARTY_REGISTRATION_MASTER/TBL_PARTY_REGISTRATION_MASTER.component';
import {TBL_RENT_MASTERComponent } from './TBL_RENT_MASTER/TBL_RENT_MASTER.component';
import {TBL_STATE_MASTERComponent } from './TBL_STATE_MASTER/TBL_STATE_MASTER.component';
import {TBL_STATION_MASTERComponent } from './TBL_STATION_MASTER/TBL_STATION_MASTER.component';
import {TBL_STATIONARY_ISSUE_MASTERComponent } from './TBL_STATIONARY_ISSUE_MASTER/TBL_STATIONARY_ISSUE_MASTER.component';
import {TBL_STATIONARY_MASTERComponent } from './TBL_STATIONARY_MASTER/TBL_STATIONARY_MASTER.component';
import {TBL_TRANSIT_TIME_MASTERComponent } from './TBL_TRANSIT_TIME_MASTER/TBL_TRANSIT_TIME_MASTER.component';
import {TBL_TRUCK_GROUP_MASTERComponent } from './TBL_TRUCK_GROUP_MASTER/TBL_TRUCK_GROUP_MASTER.component';
import {TBL_TRUCK_MASTERComponent } from './TBL_TRUCK_MASTER/TBL_TRUCK_MASTER.component';
import {TBL_USER_MASTERComponent } from './TBL_USER_MASTER/TBL_USER_MASTER.component';
import {TblAccMasterComponent } from './TblAccMaster/TblAccMaster.component';
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
import { TBL_SHORT_CERTIFICATE_ENTRYComponent } from './TBL_SHORT_CERTIFICATE_ENTRY/TBL_SHORT_CERTIFICATE_ENTRY.component';
import { InsertTBL_SHORT_CERTIFICATE_ENTRYComponent } from './insert_TBL_SHORT_CERTIFICATE_ENTRY/insert_TBL_SHORT_CERTIFICATE_ENTRY.component';
import { TBL_MONEY_RECIPTComponent } from './TBL_MONEY_RECIPT/TBL_MONEY_RECIPT.component';
import { InsertTBL_MONEY_RECIPTComponent } from './insert_TBL_MONEY_RECIPT/insert_TBL_MONEY_RECIPT.component';
import { TBL_LORRY_HIRE_STATEMENTComponent } from './TBL_LORRY_HIRE_STATEMENT/TBL_LORRY_HIRE_STATEMENT.component';
import { InsertTBL_LORRY_HIRE_STATEMENTComponent } from './insert_TBL_LORRY_HIRE_STATEMENT/insert_TBL_LORRY_HIRE_STATEMENT.component';
import { TBL_ARRIVAL_BREAKUPComponent } from './TBL_ARRIVAL_BREAKUP/TBL_ARRIVAL_BREAKUP.component';
import { InsertTBL_ARRIVAL_BREAKUPComponent } from './insert_TBL_ARRIVAL_BREAKUP/insert_TBL_ARRIVAL_BREAKUP.component';
import { TBL_DELIVERY_STATEMENT_ENTRYComponent } from './TBL_DELIVERY_STATEMENT_ENTRY/TBL_DELIVERY_STATEMENT_ENTRY.component';
import { InsertTBL_DELIVERY_STATEMENT_ENTRYComponent } from './insert_TBL_DELIVERY_STATEMENT_ENTRY/insert_TBL_DELIVERY_STATEMENT_ENTRY.component';
import { TBL_CHALLANComponent } from './TBL_CHALLAN/TBL_CHALLAN.component';
import { InsertTBL_CHALLANComponent } from './insert_TBL_CHALLAN/insert_TBL_CHALLAN.component';
import { InsertARRIVAL_CHALLANG_ENTRYComponent } from './insert_ARRIVAL_CHALLANG_ENTRY/insert_ARRIVAL_CHALLANG_ENTRY.component';
import { TBL_ARRIVAL_CHALLAN_ENTRYComponent } from './ARRIVAL_CHALLAN_ENTRY/TBL_ARRIVAL_CHALLAN_ENTRY.component';

import { InsertTBL_CLAIM_REMARKSComponent } from './insert_TBL_CLAIM_REMARKS/insert_TBL_CLAIM_REMARKS.component';
import { TBL_CLAIM_REMARKSComponent } from './TBL_CLAIM_REMARKS/TBL_CLAIM_REMARKS.component';
import { InsertTBL_LORRY_ACCIDENTComponent } from './insert_TBL_LORRY_ACCIDENT/insert_TBL_LORRY_ACCIDENT.component';
import { TBL_LORRY_ACCIDENTComponent } from './TBL_LORRY_ACCIDENT/TBL_LORRY_ACCIDENT.component';

const routes: Routes = [
   
 {  path: 'branch-master', component: TBL_BRANCH_MASTERComponent },
 {  path: 'CREATE_BRANCH_MASTER', component: InsertTBL_BRANCH_MASTERComponent },
 {  path: 'TBL_ACCOUNT_GROUP_MASTER', component: TBL_ACCOUNT_GROUP_MASTERComponent },
 {  path: 'insert_TBL_ACCOUNT_GROUP_MASTER', component: InsertTBL_ACCOUNT_GROUP_MASTERComponent },
 {  path: 'account-master', component: TBL_ACCOUNT_MASTERComponent },
 {  path: 'insert_TBL_ACCOUNT_MASTER', component: InsertTBL_ACCOUNT_MASTERComponent },
 {  path: 'account-sub-group-master', component: TBL_ACCOUNT_SUB_GROUP_MASTERComponent },
 {  path: 'insert_TBL_ACCOUNT_SUB_GROUP_MASTER', component: InsertTBL_ACCOUNT_SUB_GROUP_MASTERComponent },
 {  path: 'broker-master', component: TBL_BROKER_MASTERComponent },
 {  path: 'insert_TBL_BROKER_MASTER', component: InsertTBL_BROKER_MASTERComponent },
 {  path: 'TBL_CHARGE_MASTER', component: TBL_CHARGE_MASTERComponent },
 {  path: 'insert_TBL_CHARGE_MASTER', component: InsertTBL_CHARGE_MASTERComponent },
 {  path: 'TBL_CONTRACT_MASTER', component: TBL_CONTRACT_MASTERComponent },
 {  path: 'insert_TBL_CONTRACT_MASTER', component: InsertTBL_CONTRACT_MASTERComponent },
 {  path: 'driver-master', component: TBL_DRIVER_MASTERComponent },
 {  path: 'insert_TBL_DRIVER_MASTER', component: InsertTBL_DRIVER_MASTERComponent },
 {  path: 'bank-account-master', component: TBL_FINANCE_BANK_MASTERComponent },
 {  path: 'insert_TBL_FINANCE_BANK_MASTER', component: InsertTBL_FINANCE_BANK_MASTERComponent },
 {  path: 'card-master', component: TBL_FINANCE_CARD_MASTERComponent },
 {  path: 'insert_TBL_FINANCE_CARD_MASTER', component: InsertTBL_FINANCE_CARD_MASTERComponent },
 {  path: 'fund-master', component: TBL_FINANCE_FUND_MASTERComponent },
 {  path: 'insert_TBL_FINANCE_FUND_MASTER', component: InsertTBL_FINANCE_FUND_MASTERComponent },
 {  path: 'TBL_FINANCE_IFSC_CODE_MASTER', component: TBL_FINANCE_IFSC_CODE_MASTERComponent },
 {  path: 'insert_TBL_FINANCE_IFSC_CODE_MASTER', component: InsertTBL_FINANCE_IFSC_CODE_MASTERComponent },
 {  path: 'group-master', component: TBL_GROUP_MASTERComponent },
 {  path: 'insert_TBL_GROUP_MASTER', component: InsertTBL_GROUP_MASTERComponent },
 {  path: 'TBL_HR_EMPLOYEE_MASTER', component: TBL_HR_EMPLOYEE_MASTERComponent },
 {  path: 'insert_TBL_HR_EMPLOYEE_MASTER', component: InsertTBL_HR_EMPLOYEE_MASTERComponent },
 {  path: 'TBL_HR_HOLIDAY_MASTER', component: TBL_HR_HOLIDAY_MASTERComponent },
 {  path: 'insert_TBL_HR_HOLIDAY_MASTER', component: InsertTBL_HR_HOLIDAY_MASTERComponent },
 {  path: 'TBL_HR_LOAN_MASTER', component: TBL_HR_LOAN_MASTERComponent },
 {  path: 'insert_TBL_HR_LOAN_MASTER', component: InsertTBL_HR_LOAN_MASTERComponent },
 {  path: 'TBL_ITEM_GROUP_MASTER', component: TBL_ITEM_GROUP_MASTERComponent },
 {  path: 'insert_TBL_ITEM_GROUP_MASTER', component: InsertTBL_ITEM_GROUP_MASTERComponent },
 {  path: 'item-master', component: TBL_ITEM_MASTERComponent },
 {  path: 'insert_TBL_ITEM_MASTER', component: InsertTBL_ITEM_MASTERComponent },
 {  path: 'TBL_MISC_BROKER_MASTER', component: TBL_MISC_BROKER_MASTERComponent },
 {  path: 'insert_TBL_MISC_BROKER_MASTER', component: InsertTBL_MISC_BROKER_MASTERComponent },
 {  path: 'TBL_MISC_COLLECTIONER_MASTER', component: TBL_MISC_COLLECTIONER_MASTERComponent },
 {  path: 'insert_TBL_MISC_COLLECTIONER_MASTER', component: InsertTBL_MISC_COLLECTIONER_MASTERComponent },
 {  path: 'TBL_MISC_GARDEN_MASTER', component: TBL_MISC_GARDEN_MASTERComponent },
 {  path: 'insert_TBL_MISC_GARDEN_MASTER', component: InsertTBL_MISC_GARDEN_MASTERComponent },
 {  path: 'TBL_MISC_WARE_HOUSE_MASTER', component: TBL_MISC_WARE_HOUSE_MASTERComponent },
 {  path: 'insert_TBL_MISC_WARE_HOUSE_MASTER', component: InsertTBL_MISC_WARE_HOUSE_MASTERComponent },
 {  path: 'TBL_MODULE_DETAILS_MASTER', component: TBL_MODULE_DETAILS_MASTERComponent },
 {  path: 'insert_TBL_MODULE_DETAILS_MASTER', component: InsertTBL_MODULE_DETAILS_MASTERComponent },
 {  path: 'party-master', component: TBL_PARTY_MASTERComponent },
 {  path: 'insert_TBL_PARTY_MASTER', component: InsertTBL_PARTY_MASTERComponent },
 {  path: 'TBL_PARTY_REGISTRATION_MASTER', component: TBL_PARTY_REGISTRATION_MASTERComponent },
 {  path: 'insert_TBL_PARTY_REGISTRATION_MASTER', component: InsertTBL_PARTY_REGISTRATION_MASTERComponent },
 {  path: 'rent-master', component: TBL_RENT_MASTERComponent },
 {  path: 'insert_TBL_RENT_MASTER', component: InsertTBL_RENT_MASTERComponent },
 {  path: 'TBL_STATE_MASTER', component: TBL_STATE_MASTERComponent },
 {  path: 'insert_TBL_STATE_MASTER', component: InsertTBL_STATE_MASTERComponent },
 {  path: 'station-master', component: TBL_STATION_MASTERComponent },
 {  path: 'insert_TBL_STATION_MASTER', component: InsertTBL_STATION_MASTERComponent },
 {  path: 'TBL_STATIONARY_ISSUE_MASTER', component: TBL_STATIONARY_ISSUE_MASTERComponent },
 {  path: 'insert_TBL_STATIONARY_ISSUE_MASTER', component: InsertTBL_STATIONARY_ISSUE_MASTERComponent },
 {  path: 'TBL_STATIONARY_MASTER', component: TBL_STATIONARY_MASTERComponent },
 {  path: 'insert_TBL_STATIONARY_MASTER', component: InsertTBL_STATIONARY_MASTERComponent },
 {  path: 'transit-item-master', component: TBL_TRANSIT_TIME_MASTERComponent },
 {  path: 'insert_TBL_TRANSIT_TIME_MASTER', component: InsertTBL_TRANSIT_TIME_MASTERComponent },
 {  path: 'TBL_TRUCK_GROUP_MASTER', component: TBL_TRUCK_GROUP_MASTERComponent },
 {  path: 'insert_TBL_TRUCK_GROUP_MASTER', component: InsertTBL_TRUCK_GROUP_MASTERComponent },
 {  path: 'truck-master', component: TBL_TRUCK_MASTERComponent },
 {  path: 'insert_TBL_TRUCK_MASTER', component: InsertTBL_TRUCK_MASTERComponent },
 {  path: 'TBL_USER_MASTER', component: TBL_USER_MASTERComponent },
 {  path: 'insert_TBL_USER_MASTER', component: InsertTBL_USER_MASTERComponent },
 {  path: 'TblAccMaster', component: TblAccMasterComponent },
 {  path: 'insert_TblAccMaster', component: InsertTblAccMasterComponent },
 {  path: 'bilty-master', component: TBL_BILTY_ENTRYComponent },
 {  path: 'insert-bilty-master', component: InsertTBL_BILTY_ENTRYComponent },
 {  path: 'acknowledgement-entry', component: TBL_ACKNOWLEDGEMENT_ENTRYComponent },
 {  path: 'insert_TBL_ACKNOWLEDGEMENT_ENTRY', component: InsertTBL_ACKNOWLEDGEMENT_ENTRYComponent },
 {  path: 'short-certificate-entry', component: TBL_SHORT_CERTIFICATE_ENTRYComponent },
 {  path: 'insert_TBL_SHORT_CERTIFICATE_ENTRY', component: InsertTBL_SHORT_CERTIFICATE_ENTRYComponent },
 {  path: 'money-recipt', component: TBL_MONEY_RECIPTComponent },
 {  path: 'insert_TBL_MONEY_RECIPT', component: InsertTBL_MONEY_RECIPTComponent },
 {  path: 'lorry-hire-statement', component: TBL_LORRY_HIRE_STATEMENTComponent },
 {  path: 'insert_TBL_LORRY_HIRE_STATEMENT', component: InsertTBL_LORRY_HIRE_STATEMENTComponent },
 {  path: 'arrival-breakup', component: TBL_ARRIVAL_BREAKUPComponent },
 {  path: 'insert_TBL_ARRIVAL_BREAKUP', component: InsertTBL_ARRIVAL_BREAKUPComponent },
 {  path: 'delivery-statement-entry', component: TBL_DELIVERY_STATEMENT_ENTRYComponent },
 {  path: 'insert_TBL_DELIVERY_STATEMENT_ENTRY', component: InsertTBL_DELIVERY_STATEMENT_ENTRYComponent }, 
 {  path: 'challan', component: TBL_CHALLANComponent },
 {  path: 'insert_TBL_CHALLAN', component: InsertTBL_CHALLANComponent },
 {  path: 'insert-arrival-CHALLAN', component: InsertARRIVAL_CHALLANG_ENTRYComponent },
 {  path: 'arrival-challan', component: TBL_ARRIVAL_CHALLAN_ENTRYComponent },
 {  path: 'insert-claim-remarks', component: InsertTBL_CLAIM_REMARKSComponent },
 {  path: 'claim-remarks', component: TBL_CLAIM_REMARKSComponent },
 {  path: 'insert-lorry-accident', component: InsertTBL_LORRY_ACCIDENTComponent },
 {  path: 'lorry-accident', component: TBL_LORRY_ACCIDENTComponent },
 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule {}
