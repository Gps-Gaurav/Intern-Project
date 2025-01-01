import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TMPUserComponent } from './TMP-User.component';
import { TMPUserRoutingModule } from './TMP-User-routing.module';


@NgModule({
  declarations: [
    TMPUserComponent
  ],
  imports: [
    CommonModule,
    TMPUserRoutingModule,
    SharedModule
  ]
})
export class TMPUserModule { }
