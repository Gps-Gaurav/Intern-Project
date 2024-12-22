import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { WidgetModule } from '../../shared/widget/widget.module';
import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { CalendarModule } from 'primeng/calendar';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { ImageModule } from 'primeng/image';
import { ColorPickerModule } from 'primeng/colorpicker';
// import { TwoDigitDecimaNumberDirective } from 'src/app/core/helpers/TwoDigitDecimaNumberDirective';
// import { KeyHandlerDirective } from 'src/app/core/helpers/KeyHandlerDirective';
// import { TabDirective } from 'src/app/core/helpers/TabDirective';
// import { UppercaseInputDirective } from 'src/app/core/helpers/UppercaseInputDirective';
// import { LowercaseInputDirective } from 'src/app/core/helpers/LowercaseInputDirective';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PriceListComponent } from './price-list/price-list.component';
import { PRICELISTADDComponent } from './price-list-add/price-list-add.component';


import { FinishedGoodsComponent } from './opening-stock-finished-goods/finished-goods.Component';
import { SaleFinishedGoodsComponent } from './sale-finished-goods/sale-finished-goods.Component';
import { InsertFinishedGoodsComponent } from './insert-op-stock-finished-goods/insert-op-stock-finished-goods.component';

import { PurchaseFinishedGoodsComponent } from './Purchase-finished-goods/Purchase-finished-goods.Component';
import { PurchaseRawComponent } from './Purchase-Raw-material/Purchase-Raw-material.component';
import { InsertSaleFinishedGoodsComponent } from './insert-Sale-finished-goods/insert-Sale-finished-goods.component';
import { InsertPurchaseFinishedGoodsComponent } from './insert-Purchase-finished-goods/insert-Purchase-finished-goods.component';
import { InsertTBL_Finished_Product_CategoryComponent } from './insert-Finished_Product_Category/insert-Finished_Product_Category.component';
import { Finished_Product_CategoryComponent } from './Finished_Product_Category/Finished_Product_Category.component';
import { GhatStockListComponent } from './op-stock-ghat-list/op-stock-ghat-list..component';
import { CustomerStockListComponent } from './op-stock-customer-list/op-stock-customer-list..component';
import { PurchaseRawMaterialAddComponent } from './purchase-raw-material-add/purchase-raw-material-add.component';
import { OpStockGhatAddComponent } from './op-stock-ghat-add/op-stock-ghat-add.component';
import { OpStockCustomerAddComponent } from './op-stock-customer-add/op-stock-customer-add.component';




const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};

@NgModule({
  declarations: [ListComponent, DetailComponent, PriceListComponent,
     PRICELISTADDComponent, OpStockGhatAddComponent,PurchaseRawComponent,
     OpStockCustomerAddComponent, FinishedGoodsComponent,SaleFinishedGoodsComponent,
       InsertFinishedGoodsComponent, PurchaseRawMaterialAddComponent,PurchaseFinishedGoodsComponent,
       InsertSaleFinishedGoodsComponent,InsertPurchaseFinishedGoodsComponent,InsertTBL_Finished_Product_CategoryComponent,
       Finished_Product_CategoryComponent,GhatStockListComponent,CustomerStockListComponent

  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    UIModule, PaginatorModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    ReactiveFormsModule,
    UIModule,
    WidgetModule,
    Ng5SliderModule,
    FileUploadModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    InputTextareaModule, MultiSelectModule, ColorPickerModule,
    NgSelectModule, TableModule, ConfirmDialogModule, DialogModule, ToolbarModule, ToastModule,
    NgbPaginationModule, FileUploadModule, RatingModule, ButtonModule, RippleModule, AutoCompleteModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config
    },
    DatePipe
  ]
})
export class InvoicesModule { }
