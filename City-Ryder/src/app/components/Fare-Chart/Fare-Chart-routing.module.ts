import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FareChartComponent } from "./Fare-Chart.component";

const routes: Routes = [
  {
    path: "",
    component: FareChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FareChartRoutingModule {}
