import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MasterModule } from '../master/master.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { PagesRoutingModule } from '../pages-routing.module';
import { TasksModule } from '../tasks/tasks.module';
import { ChartModule } from '../chart/chart.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DropdownModule } from 'primeng/dropdown';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RatingModule } from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PurchaseComponent } from './Purchase/Purchase.component';
import { Purchase_RawComponent } from './Purchase_Raw/Purchase_Raw.component';
import { InvoiceComponent } from './SaleInvoice/SaleInvoice.component';
import { Sales_RawComponent } from './Sales_Raw/Sales_Raw.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InsertTBL_PURCHASEComponent } from './insert_TBL_PURCHASE/insert_TBL_PURCHASE.component';
import { InsertStockTransferComponent } from './insert_TBL_STOCK_TRANSFER/insert_TBL_STOCK_TRANSFER.component';
import { InsertTBL_Invoice_MASTERComponent } from './insert-TBL_SALE_INVOICE_MASTER/insert-TBL_SALE_INVOICE_MASTER.component';
import {ContextMenuModule} from 'primeng/contextmenu';
import { InsertTBL_PURCHASE_RETURNComponent } from './insert_TBL_PURCHASE_RETURN/insert_TBL_PURCHASE_RETURN.component';
import { InsertTBL_SALE_RETURNComponent } from './insert_TBL_SALE_RETURN/insert_TBL_SALE_RETURN.component';
import { PaginatorModule } from 'primeng/paginator';
import { ImageModule } from 'primeng/image';
import { InsertStockTransferRawComponent } from './Stock_Transfer_Raw/Stock_Transfer_Raw.component';
import { SaleReturnComponent } from './SaleReturn/SaleReturn.component';
import { PurchaseReturnComponent } from './PurchaseReturn/PurchaseReturn.component';
import { InsertTBL_PURCHASE_RAWComponent } from './insert_TBL_PURCHASE_RAW/insert_TBL_PURCHASE_RAW.component';
import { insert_TBL_SALE_RAWComponent } from './insert_TBL_SALE_RAW/insert_TBL_SALE_RAW.component';


import { DialogInsertPURCHASEComponent } from './dialog-insert-purchase/dialog-insert-purchase.component';
import { DialogInsertSALEComponent } from './dialog-insert-sale/dialog-insert-sale.component';
import { Purchase_Detail_InvoicesComponent } from './Purchase_Detail_Invoices/Purchase_Detail_Invoices.component';
import { Sale_Detail_InvoicesComponent } from './Sale_Detail_Invoices/Sale_Detail_Invoices.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { Purchase_Raw_Detail_InvoicesComponent } from './Purchase_Raw_Detail_Invoices/Purchase_Raw_Detail_Invoices.component';
import { Sale_Raw_Detail_InvoicesComponent } from './Sale_Raw_Detail_Invoices/Sale_Raw_Detail_Invoices.component';
import { Purchase_Return_Detail_InvoicesComponent } from './Purchase_Return_Detail_Invoices/Purchase_Return_Detail_Invoices.component';
import { Sale_Return_Detail_InvoicesComponent } from './Sale_Return_Detail_Invoices/Sale_Return_Detail_Invoices.component';
import { Stock_TransferComponent } from './Stock_Transfer/Stock_Transfer.component';
import { Purchase_VoucherComponent } from './Purchase_Voucher/Purchase_Voucher.component';
import { ProductStockReportComponent } from './product-stock-report/product-stock-report.component';
import { ItemStockReportComponent } from './item-stock-report/item-stock-report.component';
import { BarcodeGenerationComponent } from './barcode-generation/barcode-generation.component';
import { BarcodePrintComponent } from './barcode-print/barcode-print.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [

    ListComponent,Sale_Raw_Detail_InvoicesComponent,
    DetailComponent,Purchase_Raw_Detail_InvoicesComponent,
    InsertTBL_PURCHASEComponent, insert_TBL_SALE_RAWComponent,
    InsertStockTransferComponent, PurchaseReturnComponent,
    PurchaseComponent, InvoiceComponent, Purchase_RawComponent,
    InsertTBL_Invoice_MASTERComponent,Purchase_Detail_InvoicesComponent,
    InsertTBL_PURCHASE_RETURNComponent, Sales_RawComponent, SaleReturnComponent, InsertTBL_PURCHASE_RAWComponent,
    InsertTBL_SALE_RETURNComponent, InsertStockTransferRawComponent,
    DialogInsertPURCHASEComponent, DialogInsertSALEComponent,
    Sale_Detail_InvoicesComponent,Purchase_Return_Detail_InvoicesComponent,
    Sale_Return_Detail_InvoicesComponent,Stock_TransferComponent,Purchase_VoucherComponent,
    ProductStockReportComponent,ItemStockReportComponent,BarcodeGenerationComponent,
    BarcodePrintComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    InvoicesRoutingModule,
    HttpClientModule,
    UIModule,
    TasksModule,
    ChartModule,
    DropdownModule,
    WidgetModule,
    FullCalendarModule,
    NgbNavModule,QRCodeModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule, CheckboxModule,
    MasterModule, TableModule,
    CalendarModule, ToastModule,
    Ng5SliderModule, Ng2SearchPipeModule,
    DropzoneModule, NgSelectModule, InputTextareaModule,
    AutoCompleteModule, RatingModule, FileUploadModule,
    ColorPickerModule, RippleModule, ToolbarModule,
    ButtonModule, DialogModule, ConfirmDialogModule, ImageModule, DynamicDialogModule,
    ContextMenuModule,AutocompleteLibModule

  ],
})

export class InvoicesModule { }
