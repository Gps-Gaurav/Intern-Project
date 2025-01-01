import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { SMSServicesComponent } from './SMS-Services.component';
import { SMSServicesRoutingModule } from './SMS-Services-routing.module';


@NgModule({
  declarations: [
    SMSServicesComponent
  ],
  imports: [
    CommonModule,
    SMSServicesRoutingModule,
    SharedModule
  ]
})
export class SMSServicesModule { }
