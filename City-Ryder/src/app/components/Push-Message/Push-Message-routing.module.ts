import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PushMessageComponent } from "./Push-Message.component";

const routes: Routes = [
  {
    path: "",
    component: PushMessageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushMessageRoutingModule {}
