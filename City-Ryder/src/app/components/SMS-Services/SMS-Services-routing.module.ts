import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SMSServicesComponent } from "./SMS-Services.component";

const routes: Routes = [
  {
    path: "",
    component: SMSServicesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SMSServicesRoutingModule {}
