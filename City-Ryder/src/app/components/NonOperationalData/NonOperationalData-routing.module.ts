import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NonOperationalDataComponent } from "./NonOperationalData.component";

const routes: Routes = [
  {
    path: "",
    component: NonOperationalDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonOperationalDataRoutingModule {}
