import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from "./Admin-List/Admin-List.component";
import { CarOwnerComponent } from "./Car-Owner/Car-Owner.component";
import { DriverListComponent } from "./Driver-List/Driver-List.component";
import { UserListComponent } from "./User-List/User-List.component";

const routes: Routes = [ {
  path: "",
  children: [

    {
      path: "Admin-List",
      component: AdminListComponent,
    },
    {
      path: "Car-Owner",
      component: CarOwnerComponent,
    },
    {
      path: "Driver-List",
      component: DriverListComponent,
    },
    {
      path: "User-List",
      component: UserListComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }
