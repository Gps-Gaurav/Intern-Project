import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TMPUserComponent } from "./TMP-User.component";

const routes: Routes = [
  {
    path: "",
    component: TMPUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TMPUserRoutingModule {}
