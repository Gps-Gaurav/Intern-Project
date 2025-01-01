import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from "./Booking/Booking.component";
import { LiveBookingComponent } from "./Live-Booking/Live-Booking.component";
import { NoSearchDataComponent } from "./No-Search-Data/No-Search-Data.component";
import { TimeSuggestionComponent } from "./Time-Suggestion/Time-Suggestion.component";
import { TripComponent } from "./Trip/Trip.component";

const routes: Routes = [{
  path: "",
  children: [

    {
      path: "Booking",
      component: BookingComponent,
    },
    {
      path: "Live-Booking",
      component: LiveBookingComponent,
    },
    {
      path: "No-Search-Data",
      component: NoSearchDataComponent,
    },
    {
      path: "TimeSuggestion",
      component: TimeSuggestionComponent,
    },
    {
      path: "Trip",
      component: TripComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingManagerRoutingModule { }
