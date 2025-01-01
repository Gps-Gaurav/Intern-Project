import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { NonOperationalDataComponent } from './NonOperationalData.component';
import { NonOperationalDataRoutingModule } from './NonOperationalData-routing.module';


@NgModule({
  declarations: [
    NonOperationalDataComponent
  ],
  imports: [
    CommonModule,
    NonOperationalDataRoutingModule,
    SharedModule
  ]
})
export class  NonOperationalDataModule { }
