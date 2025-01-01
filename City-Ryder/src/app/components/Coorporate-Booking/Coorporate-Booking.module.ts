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
import { CompanyListComponent } from "./Company-List/Company-List.component";
import { InvoiceComponent } from "./Invoice/Invoice.component";
import { CoorporateBookingRoutingModule } from './Coorporate-Booking-routing.module';
import { CompanyListAddComponent } from "./Company-List-Add/Company-List-Add.component";

@NgModule({
  declarations: [
    CompanyListComponent, InvoiceComponent,CompanyListAddComponent
  ],
  imports: [
    CommonModule,
    CoorporateBookingRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule, MultiSelectModule,
    TableModule, PaginatorModule,
    ButtonModule, CheckboxModule, SelectButtonModule
  ]
})
export class CoorporateBookingModule { }
