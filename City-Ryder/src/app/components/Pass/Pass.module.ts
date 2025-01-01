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
import { DynamicPassComponent } from "./Dynamic-Pass/Dynamic-Pass.component";
import { PassListComponent } from "./Pass-List/Pass-List.component";
import { UserPassComponent } from "./User-Pass/User-Pass.component";
import { PassRoutingModule } from './Pass-routing.module';
import { PassListAddComponent } from "./Pass-List-add/Pass-List.component";

@NgModule({
  declarations: [
    DynamicPassComponent, PassListComponent,UserPassComponent,PassListAddComponent
  ],
  imports: [
    CommonModule,
    PassRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    SharedModule, MultiSelectModule,
    TableModule, PaginatorModule,
    ButtonModule, CheckboxModule, SelectButtonModule
  ]
})
export class PassModule { }
