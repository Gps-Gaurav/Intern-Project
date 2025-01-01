import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PushMessageComponent } from './Push-Message.component';
import { PushMessageRoutingModule } from './Push-Message-routing.module';


@NgModule({
  declarations: [
    PushMessageComponent
  ],
  imports: [
    CommonModule,
    PushMessageRoutingModule,
    SharedModule
  ]
})
export class PushMessageModule { }
