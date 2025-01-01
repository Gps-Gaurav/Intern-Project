import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CustomerPaymentComponent } from "./CustomerPayment/CustomerPayment.component";
import { CustomerTripwiseComponent } from "./CustomerTripwise/CustomerTripwise.component";
import { UserWithPinCodeComponent } from "./UserWithPinCode/UserWithPinCode.component";
import { VehicleDayWIseComponent } from "./VehicleDayWIse/VehicleDayWIse.component";
import { VehicleTripWiseComponent } from "./VehicleTripWise/VehicleTripWise.component";
import { VendorIncentiveComponent } from "./VendorIncentive/VendorIncentive.component";
import { VendorPaymentComponent } from "./VendorPayment/VendorPayment.component";

const routes: Routes = [{
  path: "",
  children: [

    {
      path: "CustomerPayment",
      component: CustomerPaymentComponent,
    },
    {
      path: "CustomerTripwise",
      component: CustomerTripwiseComponent,
    },
    {
      path: "UserWithPinCode",
      component: UserWithPinCodeComponent,
    },
    {
      path: "VehicleDayWIse",
      component: VehicleDayWIseComponent,
    },
    {
      path: "VehicleTripWise",
      component: VehicleTripWiseComponent,
    },
    {
      path: "VendorIncentive",
      component: VendorIncentiveComponent,
    },
    {
      path: "VendorPayment",
      component: VendorPaymentComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
