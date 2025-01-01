import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { ManageLocationComponent } from './manage-location/manage-location.component';
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
import { manageRouteComponent } from "./manage-route/manage-route.component";
import { RouteDepartureComponent } from "./Route-Departure/Route-Departure.component";

@NgModule({
  declarations: [
    ManageLocationComponent,manageRouteComponent,RouteDepartureComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule,MultiSelectModule,
    TableModule,PaginatorModule,
    ButtonModule,CheckboxModule,SelectButtonModule
  ]
})
export class RoutesModule { }
