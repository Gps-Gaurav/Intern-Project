import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AccountRoutingModule } from './account-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,AuthModule,
    AccountRoutingModule
    
  ]
})
export class AccountModule { }
