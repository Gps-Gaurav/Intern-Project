import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ManageLocationComponent } from "./manage-location/manage-location.component";
import { manageRouteComponent } from "./manage-route/manage-route.component";
import { RouteDepartureComponent } from "./Route-Departure/Route-Departure.component";

const routes: Routes = [ {
  path: "",
  children: [

    {
      path: "manage-location",
      component: ManageLocationComponent,
    },
    {
      path: "manage-route",
      component: manageRouteComponent,
    },
    {
      path: "Route-Departure",
      component: RouteDepartureComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
