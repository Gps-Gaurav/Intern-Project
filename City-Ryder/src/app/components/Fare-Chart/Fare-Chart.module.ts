import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FareChartComponent } from './Fare-Chart.component';
import { FareChartRoutingModule } from './Fare-Chart-routing.module';


@NgModule({
  declarations: [
    FareChartComponent
  ],
  imports: [
    CommonModule,
    FareChartRoutingModule,
    SharedModule
  ]
})
export class FareChartModule { }
