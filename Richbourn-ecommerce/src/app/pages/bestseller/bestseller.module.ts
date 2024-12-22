import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestsellerComponent } from './bestseller.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
      path: '',
      component: BestsellerComponent
  },
 
];

@NgModule({
  declarations: [BestsellerComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class BestsellerModule { }
