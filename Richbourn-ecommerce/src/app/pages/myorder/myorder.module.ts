import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyorderComponent } from './myorder.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
      path: '',
      component: MyorderComponent
  },
 
];

@NgModule({
  declarations: [MyorderComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class MyorderModule { }
