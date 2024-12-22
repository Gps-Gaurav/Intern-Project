import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDetailsComponent } from './cart-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: CartDetailsComponent
  },
 
];

@NgModule({
  declarations: [CartDetailsComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class CartDetailsModule { }
