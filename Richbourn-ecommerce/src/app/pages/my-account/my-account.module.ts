import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account.component';


const routes: Routes = [
  {
      path: '',
      component: MyAccountComponent
  },
 
];

@NgModule({
  declarations: [MyAccountComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class MyAccountModule { }
