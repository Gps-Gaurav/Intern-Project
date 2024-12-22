import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import { UIModule } from '../../shared/ui/ui.module';
import {SelectButtonModule} from 'primeng/selectbutton';
import {PaginatorModule} from 'primeng/paginator';
import { WidgetModule } from '../../shared/widget/widget.module';
import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import {CalendarModule} from 'primeng/calendar';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import { TBL_BRANCH_MASTERComponent } from './TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { MasterRoutingModule } from './master-routing.module';
import { InsertTBL_BRANCH_MASTERComponent } from './insert-TBL_BRANCH_MASTER/insert-TBL_BRANCH_MASTER.component';
import {ImageModule} from 'primeng/image';
import {ColorPickerModule} from 'primeng/colorpicker';
import { TwoDigitDecimaNumberDirective } from 'src/app/core/helpers/TwoDigitDecimaNumberDirective';
import { KeyHandlerDirective } from 'src/app/core/helpers/KeyHandlerDirective';
import { TabDirective } from 'src/app/core/helpers/TabDirective';
import { UppercaseInputDirective } from 'src/app/core/helpers/UppercaseInputDirective';
import { LowercaseInputDirective } from 'src/app/core/helpers/LowercaseInputDirective';
import { InsertTBL_Product_MASTERComponent } from './insert-TBL_PRODUCT_MASTER/insert-TBL_PRODUCT_MASTER.component';
import { InsertTBL_Category_MASTERComponent } from './insert-TBL_CATEGORY_MASTER/insert-TBL_CATEGORY_MASTER.component';
import { InsertTBL_Modify_MASTERComponent } from './insert-TBL_MODIFY_PRODUCT_MASTER/insert-TBL_MODIFY_PRODUCT_MASTER.component';
import { InsertTBL_Group_MASTERComponent } from './insert-TBL_GROUP_MASTER/insert-TBL_GROUP_MASTER.component';
import { InsertTBL_SubCategory_MASTERComponent } from './insert-TBL_SUB_CATEGORY_MASTER/insert-TBL_SUB_CATEGORY_MASTER.component';
import { MenuComponent } from './menu/menu.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple'; 
import {TabViewModule} from 'primeng/tabview';

import { CategoryComponent } from './category/category.component';
import { LocationComponent } from './location/location.component';
import { PacketComponent } from './packet/packet.component';
import { ColorComponent } from './color/color.component';
import { SeriesComponent } from './series/series.component';
import { UnitRelationComponent } from './unit_relation/unit_relation.component';
import { DiamondComponent } from './diamond/diamond.component';
import { SubCategoryComponent } from './subcategory/subcategory.component';
import { GroupComponent } from './group/group.component';
import { InvoiceComponent } from './SaleInvoice/SaleInvoice.component';
import { ProductComponent } from './product/product.component';
import {DropdownModule} from 'primeng/dropdown';
import { InsertTBL_Packet_MASTERComponent } from './insert-TBL_PACKET_MASTER/insert-TBL_PACKET_MASTER.component';
import { InsertTBL_Color_MASTERComponent } from './insert-TBL_COLOR_MASTER/insert-TBL_COLOR_MASTER.component';
import { InsertTBL_Series_MASTERComponent } from './insert-TBL_SERIES_MASTER/insert-TBL_SERIES_MASTER.component';
import { InsertTBL_OpBILL_ENTRY_MASTERComponent } from './insert-TBL_OpBILL_ENTRY_MASTER/insert-TBL_OpBILL_ENTRY_MASTER.component';
import { InsertTBL_Location_MASTERComponent } from './insert-TBL_LOCATION_MASTER/insert-TBL_LOCATION_MASTER.component';
import { InsertTBL_Item_MASTERComponent } from './insert-TBL_ITEM_MASTER/insert-TBL_ITEM_MASTER.component';
import { InsertTBL_Ledger_MASTERComponent } from './insert-TBL_LEDGER_MASTER/insert-TBL_LEDGER_MASTER.component';
import { InsertTBL_Invoice_MASTERComponent } from './insert-TBL_INVOICE_MASTER/insert-TBL_INVOICE_MASTER.component';
import { InsertTBL_Unit_Relation_MASTERComponent } from './insert-TBL_UNIT_RELATION_MASTER/insert-TBL_UNIT_RELATION_MASTER.component';
import { InsertTBL_Diamond_MASTERComponent } from './insert-TBL_DIAMOND_MASTER/insert-TBL_DIAMOND_MASTER.component';
import { LedgerComponent } from './ledger/ledger.component';
import { ItemComponent } from './item/item.component';
import { OpBILL_ENTRYComponent } from './OpBill_Entry/OpBill_Entry.component';
import { InsertOpeningStockComponent } from './insert-opening-stock/insert-opening-stock.component';
// import { SubItemComponent } from './sub-item/subitem.component';
import { UnitComponent } from './unit/unit.component';
import { FinishGoodsComponent } from './finish-goods/finish-goods.component';

import { InsertTBLUNITMASTERComponent } from './insert-tbl-unit-master/insert-tbl-unit-master.component';
import { GhatComponent } from './ghat/ghat.component';
import { SubitemComponent } from './subitem/subitem.component';

// import {InputNumberModule} from 'primeng/inputnumber';
import { InsertSubItemComponent } from './insert-sub-item/insert-sub-item.component';



const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    TBL_BRANCH_MASTERComponent,
    InsertTBL_BRANCH_MASTERComponent,
   InsertTBL_Product_MASTERComponent,
   InsertTBL_Packet_MASTERComponent,
    InsertTBL_Category_MASTERComponent,
    InsertSubItemComponent,
    InsertTBL_SubCategory_MASTERComponent,
    InsertTBL_Group_MASTERComponent,
    InsertTBL_Modify_MASTERComponent,
    InsertTBL_Color_MASTERComponent,
    InsertTBL_Series_MASTERComponent,
    InsertTBL_OpBILL_ENTRY_MASTERComponent,
    InsertTBL_Unit_Relation_MASTERComponent,
    InsertTBL_Location_MASTERComponent,
    InsertTBL_Ledger_MASTERComponent,
    InsertTBL_Item_MASTERComponent,
    InsertTBL_Diamond_MASTERComponent ,
    InsertTBL_Invoice_MASTERComponent,
    InsertTBLUNITMASTERComponent,
    InsertSubItemComponent,
 
    UppercaseInputDirective, LowercaseInputDirective, TwoDigitDecimaNumberDirective, KeyHandlerDirective,
    TabDirective,
    MenuComponent,
    InsertTBL_BRANCH_MASTERComponent,
    CategoryComponent,
    SubCategoryComponent,
    GroupComponent,
    ProductComponent,
    OpBILL_ENTRYComponent,
    PacketComponent,
    ColorComponent,
    SeriesComponent,
    LocationComponent,
    InvoiceComponent,
    ItemComponent,
    LedgerComponent,
    UnitRelationComponent,
    DiamondComponent,
 
    InsertOpeningStockComponent,
   UnitComponent,FinishGoodsComponent, InsertTBLUNITMASTERComponent
    ,FinishGoodsComponent,GhatComponent, SubitemComponent

  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    ReactiveFormsModule,
    TabViewModule,
    UIModule,PaginatorModule,
    WidgetModule,
    Ng5SliderModule,
    FileUploadModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,SelectButtonModule,
    ImageModule,
    InputTextareaModule,MultiSelectModule,ColorPickerModule,
    NgSelectModule,TableModule,ConfirmDialogModule,DialogModule,ToolbarModule,ToastModule ,
    NgbPaginationModule,FileUploadModule,RatingModule,ButtonModule,RippleModule,AutoCompleteModule,

  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config
    },
    DatePipe
  ]
})
export class MasterModule { }