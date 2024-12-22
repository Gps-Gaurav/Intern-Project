import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq.component';


const routes: Routes = [
  {
      path: '',
      component: FaqComponent
  },
 
];

@NgModule({
  declarations: [FaqComponent],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class FaqModule { }
