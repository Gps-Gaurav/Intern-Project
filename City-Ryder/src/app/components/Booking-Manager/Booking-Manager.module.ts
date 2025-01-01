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
import { BookingComponent } from "./Booking/Booking.component";
import { LiveBookingComponent } from "./Live-Booking/Live-Booking.component";
import { NoSearchDataComponent } from "./No-Search-Data/No-Search-Data.component";
import { TimeSuggestionComponent } from "./Time-Suggestion/Time-Suggestion.component";
import { TripComponent } from "./Trip/Trip.component";
import { BookingManagerRoutingModule } from './Booking-Manager-routing.module';

@NgModule({
  declarations: [
    BookingComponent,LiveBookingComponent,NoSearchDataComponent,TimeSuggestionComponent,
    TripComponent

  ],
  imports: [
    CommonModule,
    BookingManagerRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule, MultiSelectModule,
    TableModule, PaginatorModule,
    ButtonModule, CheckboxModule, SelectButtonModule
  ]
})
export class BookingManagerModule { }
