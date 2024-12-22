import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInformationComponent } from './account-information.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
      path: '',
      component: AccountInformationComponent
  },
 
];

@NgModule({
  declarations: [AccountInformationComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class AccountInformationModule { }
