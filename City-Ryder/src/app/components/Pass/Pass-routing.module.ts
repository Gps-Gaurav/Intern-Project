import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DynamicPassComponent } from "./Dynamic-Pass/Dynamic-Pass.component";
import { PassListComponent } from "./Pass-List/Pass-List.component";
import { UserPassComponent } from "./User-Pass/User-Pass.component";
import { PassListAddComponent } from "./Pass-List-add/Pass-List.component";

const routes: Routes = [ {
  path: "",
  children: [

    {
      path: "Dynamic-Pass",
      component: DynamicPassComponent,
    },
    {
      path: "Pass-List",
      component: PassListComponent,
    },
    {
      path: "User-Pass",
      component: UserPassComponent,
    },
    {
      path: "User-Pass-Add",
      component: PassListAddComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassRoutingModule { }
