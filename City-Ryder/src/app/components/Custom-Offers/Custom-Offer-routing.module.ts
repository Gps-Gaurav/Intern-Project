import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { OfferListComponent } from "./Offer-List/Offer-List.component";
import { GiveOfferComponent } from "./Give-Offer/Give-Offer.component";

const routes: Routes = [ {
  path: "",
  children: [

    {
      path: "Offer-List",
      component: OfferListComponent,
    },
    {
      path: "Give-Offer",
      component: GiveOfferComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomOffersRoutingModule { }
