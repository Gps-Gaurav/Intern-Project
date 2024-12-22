import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountPasswordComponent } from './account-password.component';


const routes: Routes = [
  {
      path: '',
      component: AccountPasswordComponent
  },
 
];

@NgModule({
  declarations: [AccountPasswordComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class AccountPasswordModule { }
