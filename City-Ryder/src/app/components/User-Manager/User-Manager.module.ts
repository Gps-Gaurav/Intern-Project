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
import { AdminListComponent } from "./Admin-List/Admin-List.component";
import { CarOwnerComponent } from "./Car-Owner/Car-Owner.component";
import { DriverListComponent } from "./Driver-List/Driver-List.component";
import { UserListComponent } from "./User-List/User-List.component";
import { UserManagerRoutingModule } from './User-Manager-routing.module';

@NgModule({
  declarations: [
    AdminListComponent, CarOwnerComponent,DriverListComponent,UserListComponent
  ],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule, MultiSelectModule,
    TableModule, PaginatorModule,
    ButtonModule, CheckboxModule, SelectButtonModule
  ]
})
export class UserManagerModule { }
