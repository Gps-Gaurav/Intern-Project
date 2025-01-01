import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from './Change-Password.component';
import { ChangePasswordRoutingModule } from './Change-Password-routing.module';


@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    SharedModule
  ]
})
export class ChangePasswordModule { }
