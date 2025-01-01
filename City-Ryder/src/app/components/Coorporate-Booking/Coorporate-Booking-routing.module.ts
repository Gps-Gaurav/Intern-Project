import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from "./Company-List/Company-List.component";
import { InvoiceComponent } from "./Invoice/Invoice.component";
import { CompanyListAddComponent } from "./Company-List-Add/Company-List-Add.component";

const routes: Routes = [ {
  path: "",
  children: [

    {
      path: "Company-List",
      component: CompanyListComponent,
    },
    {
      path: "Invoice",
      component: InvoiceComponent,
    },
    {
      path: "Company-List-Add",
      component: CompanyListAddComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoorporateBookingRoutingModule { }
