import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CustomerPaymentComponent } from "./CustomerPayment/CustomerPayment.component";
import { CustomerTripwiseComponent } from "./CustomerTripwise/CustomerTripwise.component";
import { UserWithPinCodeComponent } from "./UserWithPinCode/UserWithPinCode.component";
import { VehicleDayWIseComponent } from "./VehicleDayWIse/VehicleDayWIse.component";
import { VehicleTripWiseComponent } from "./VehicleTripWise/VehicleTripWise.component";
import { VendorIncentiveComponent } from "./VendorIncentive/VendorIncentive.component";
import { VendorPaymentComponent } from "./VendorPayment/VendorPayment.component";
import { ReportsRoutingModule } from './Reports-routing.module';

@NgModule({
  declarations: [
    CustomerPaymentComponent,CustomerTripwiseComponent,UserWithPinCodeComponent,
    VehicleDayWIseComponent,VehicleTripWiseComponent, VendorIncentiveComponent , VendorPaymentComponent

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule, MultiSelectModule,
    TableModule, PaginatorModule,
    ButtonModule, CheckboxModule, SelectButtonModule
  ]
})
export class ReportsModule { }
