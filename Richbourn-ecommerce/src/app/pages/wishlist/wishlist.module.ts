import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
      path: '',
      component: WishlistComponent
  },
 
];

@NgModule({
  declarations: [WishlistComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class WishlistModule { }
