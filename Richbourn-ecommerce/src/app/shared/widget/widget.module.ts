import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { StatComponent } from './stat/stat.component';


@NgModule({
  declarations: [StatComponent],
  imports: [
    CommonModule
  ],
  exports: [StatComponent]
})
export class WidgetModule { }
