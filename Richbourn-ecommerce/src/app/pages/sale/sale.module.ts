import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
      path: '',
      component: SaleComponent
  },
 
];

@NgModule({
  declarations: [SaleComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class SaleModule { }
