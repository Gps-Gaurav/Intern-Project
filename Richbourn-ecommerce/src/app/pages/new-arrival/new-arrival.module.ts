import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewArrivalComponent } from './new-arrival.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
      path: '',
      component: NewArrivalComponent
  },
 
];

@NgModule({
  declarations: [NewArrivalComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class NewArrivalModule { }
