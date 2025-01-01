import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { OfferListComponent } from "./Offer-List/Offer-List.component";
import { GiveOfferComponent } from "./Give-Offer/Give-Offer.component";
import { CustomOffersRoutingModule } from './Custom-Offer-routing.module';

@NgModule({
  declarations: [
  OfferListComponent, GiveOfferComponent
  ],
  imports: [
    CommonModule,
    CustomOffersRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule, MultiSelectModule,
    TableModule, PaginatorModule,
    ButtonModule, CheckboxModule, SelectButtonModule
  ]
})
export class CustomOffersModule { }
