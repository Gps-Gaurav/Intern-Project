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
import { ChangeVehicleOwnerComponent } from "./ChangeVehicleOwner/ChangeVehicleOwner.component";
import { ManageVehicleTypeComponent } from "./ManageVehicleType/ManageVehicleType.component";
import { VehicleComponent } from "./Vehicle/Vehicle.component";
import { VehicleLayoutComponent } from "./VehicleLayout/VehicleLayout.component";
import { VendorKMSlabPriceComponent } from "./VendorKMSlabPrice/VendorKMSlabPrice.component";
import { VehicleSettingsRoutingModule } from './Vehicle-Settings-routing.module';
import { VehicleAddComponent } from "./Vehicle-Add/Vehicle-Add.component";

@NgModule({
  declarations: [
    ChangeVehicleOwnerComponent,ManageVehicleTypeComponent,VehicleComponent,
    VehicleLayoutComponent,VendorKMSlabPriceComponent,VehicleAddComponent

  ],
  imports: [
    CommonModule,
    VehicleSettingsRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule, MultiSelectModule,
    TableModule, PaginatorModule,
    ButtonModule, CheckboxModule, SelectButtonModule
  ]
})
export class VehicleSettingsModule { }
