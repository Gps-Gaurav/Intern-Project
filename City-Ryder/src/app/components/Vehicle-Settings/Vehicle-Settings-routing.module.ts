import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ChangeVehicleOwnerComponent } from "./ChangeVehicleOwner/ChangeVehicleOwner.component";
import { ManageVehicleTypeComponent } from "./ManageVehicleType/ManageVehicleType.component";
import { VehicleComponent } from "./Vehicle/Vehicle.component";
import { VehicleLayoutComponent } from "./VehicleLayout/VehicleLayout.component";
import { VendorKMSlabPriceComponent } from "./VendorKMSlabPrice/VendorKMSlabPrice.component";
import { VehicleAddComponent } from "./Vehicle-Add/Vehicle-Add.component";

const routes: Routes = [{
  path: "",
  children: [

    {
      path: "ChangeVehicleOwner",
      component: ChangeVehicleOwnerComponent,
    },
    {
      path: "ManageVehicleType",
      component: ManageVehicleTypeComponent,
    },
    {
      path: "Vehicle",
      component: VehicleComponent,
    },
    {
      path: "Vehicle-Add",
      component: VehicleAddComponent,
    },
    {
      path: "VehicleLayout",
      component: VehicleLayoutComponent,
    },
    {
      path: "VendorKMSlabPrice",
      component: VendorKMSlabPriceComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleSettingsRoutingModule { }
