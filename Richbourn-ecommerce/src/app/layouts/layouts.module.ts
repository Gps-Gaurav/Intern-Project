import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { UIModule } from '../shared/ui/ui.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';

import { VerticalComponent } from './vertical/vertical.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LayoutComponent, FooterComponent, VerticalComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,

    UIModule,
    
  ],
  providers: []
})
export class LayoutsModule { }
