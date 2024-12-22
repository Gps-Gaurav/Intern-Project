import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';
import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TBL_BRANCH_MASTERComponent } from './TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { MasterRoutingModule } from './master-routing.module';
import { InsertTBL_BRANCH_MASTERComponent } from './insert-TBL_BRANCH_MASTER/insert-TBL_BRANCH_MASTER.component';
import { ImageModule } from 'primeng/image';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TwoDigitDecimaNumberDirective } from 'src/app/core/helpers/TwoDigitDecimaNumberDirective';
import { KeyHandlerDirective } from 'src/app/core/helpers/KeyHandlerDirective';
import { TabDirective } from 'src/app/core/helpers/TabDirective';
import { UppercaseInputDirective } from 'src/app/core/helpers/UppercaseInputDirective';
import { LowercaseInputDirective } from 'src/app/core/helpers/LowercaseInputDirective';
import { InsertTBL_Category_MASTERComponent } from './insert-TBL_CATEGORY_MASTER/insert-TBL_CATEGORY_MASTER.component';
import { InsertTBL_Raw_Category_MASTERComponent } from './insert-TBL_RAW_CATEGORY_MASTER/insert-TBL_RAW_CATEGORY_MASTER.component';
import { InsertTBL_Modify_MASTERComponent } from './insert-TBL_MODIFY_PRODUCT_MASTER/insert-TBL_MODIFY_PRODUCT_MASTER.component';
import { InsertTBL_Group_MASTERComponent } from './insert-TBL_GROUP_MASTER/insert-TBL_GROUP_MASTER.component';

import { InsertTBL_SubCategory_MASTERComponent } from './insert-TBL_SUB_CATEGORY_MASTER/insert-TBL_SUB_CATEGORY_MASTER.component';
import { InsertTBL_Account_Sub_Group_MASTERComponent } from './insert-TBL_ACCOUNT_SUB_GROUP_MASTER/insert-TBL_ACCOUNT_SUB_GROUP_MASTER.component';

import { InsertTBL_Raw_SubCategory_MASTERComponent } from './insert-TBL_RAW_SUB_CATEGORY_MASTER/insert-TBL_RAW_SUB_CATEGORY_MASTER.component';
import { MenuComponent } from './menu/menu.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CategoryComponent } from './category/category.component';
import { RawCategoryComponent } from './raw_category/raw_category.component';
import { LocationComponent } from './location/location.component';
import { PartyComponent } from './party/party.component';
import { ColorComponent } from './color/color.component';
import { SeriesComponent } from './series/series.component';
import { UnitComponent } from './unit/unit.component';
import { CurrencyComponent } from './currency/currency.component';
import { SubCategoryComponent } from './subcategory/subcategory.component';
import { RawSubCategoryComponent } from './raw_subcategory/raw_subcategory.component';
import { GroupComponent } from './group/group.component';
import { ProductComponent } from './product/product.component';
import { DropdownModule } from 'primeng/dropdown';
import { InsertTBL_Party_MASTERComponent } from './insert-TBL_PARTY_MASTER/insert-TBL_PARTY_MASTER.component';
import { InsertTBL_Color_MASTERComponent } from './insert-TBL_COLOR_MASTER/insert-TBL_COLOR_MASTER.component';
import { InsertTBL_Series_MASTERComponent } from './insert-TBL_SERIES_MASTER/insert-TBL_SERIES_MASTER.component';
import { InsertTBL_OpSTOCK_MASTERComponent } from './insert-TBL_OpSTOCK_MASTER/insert-TBL_OpSTOCK_MASTER.component';
import { InsertTBL_Location_MASTERComponent } from './insert-TBL_LOCATION_MASTER/insert-TBL_LOCATION_MASTER.component';
import { InsertTBL_Item_MASTERComponent } from './insert-TBL_ITEM_MASTER/insert-TBL_ITEM_MASTER.component';
import { InsertTBL_Ledger_MASTERComponent } from './insert-TBL_LEDGER_MASTER/insert-TBL_LEDGER_MASTER.component';
import { InsertTBL_Unit_MASTERComponent } from './insert-TBL_UNIT_MASTER/insert-TBL_UNIT_MASTER.component';
import { InsertTBL_Currency_MASTERComponent } from './insert-TBL_CURRENCY_MASTER/insert-TBL_CURRENCY_MASTER.component';
import { LedgerComponent } from './ledger/ledger.component';
import { ItemComponent } from './item/item.component';
import { OpSTOCKComponent } from './OpStock/OpStock.component';
import { PaginatorModule } from 'primeng/paginator';
import { InputMaskModule } from 'primeng/inputmask';
import { AccountSubGroupComponent } from './account_sub_group/account_sub_group.component';
import { AccountGroupComponent } from './account-group/acc-group.component';
import { InsertAccountGroup_MASTERComponent } from './insert-account_GROUP_MASTER/insert-TBL_GROUP_MASTER.component';
import { OpStockRawMaterialComponent } from './OpStock-raw-material/OpStock-raw-material.component';
import { InsertOpeningStockRawMaterialComponent } from './insert-opening-stock-raw-material/insert-opening-stock-raw-material.component';
import { InsertSeriesTaxMasterComponent } from './insert-series-tax-master/insert-series-tax-master.component';
import { StateComponent } from './state/state.component';
import { InsertStateMasterComponent } from './insert-state-master/insert-state-master.component';
import { InsertCityMasterComponent } from './insert-city-master/insert-city-master.component';
import { CityComponent } from './city/city.component';
import { PartyDiscountComponent } from './party-discount/party-discount.component';
import { RawMaterialStockHandComponent } from './raw-material-stock-in-hand/raw-material-stock-in-hand.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SERIESTAXSETUPComponent } from './series-tax-setup/series-tax-setup.component';
import { InsertTBL_Company_MASTERComponent } from './insert-TBL_COMPANY_MASTER/insert-TBL_COMPANY_MASTER.component';
import { CompanyComponent } from './company/company.component';
import { userComponent } from './user/user.component';
import { InsertTBL_User_MASTERComponent } from './insert-TBL_USER_MASTER/insert-TBL_USER_MASTER.component';
import { InsertTBL_Size_MASTERComponent } from './insert-TBL_SIZE_MASTER/insert-TBL_SIZE_MASTER.component';
import { SizeComponent } from './Size/Size.component';


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
    OpStockRawMaterialComponent,
    InsertTBL_Party_MASTERComponent,
    InsertTBL_Category_MASTERComponent,
    InsertTBL_Raw_Category_MASTERComponent, InsertSeriesTaxMasterComponent,
    InsertTBL_BRANCH_MASTERComponent, InsertTBL_Party_MASTERComponent,
    InsertTBL_Category_MASTERComponent, InsertTBL_Raw_Category_MASTERComponent,
    InsertTBL_SubCategory_MASTERComponent, InsertTBL_Company_MASTERComponent,
    InsertTBL_Raw_SubCategory_MASTERComponent,
    InsertTBL_Group_MASTERComponent,InsertTBL_User_MASTERComponent,
    InsertTBL_Modify_MASTERComponent, RawMaterialStockHandComponent,
    InsertTBL_Color_MASTERComponent,
    InsertTBL_Series_MASTERComponent, PartyDiscountComponent,
    InsertTBL_OpSTOCK_MASTERComponent,
    InsertTBL_Unit_MASTERComponent,
    InsertTBL_Location_MASTERComponent,
    InsertTBL_Ledger_MASTERComponent, CityComponent,
    InsertTBL_Item_MASTERComponent,
    InsertTBL_Currency_MASTERComponent, StateComponent, InsertStateMasterComponent,
    InsertCityMasterComponent,SizeComponent,
    InsertOpeningStockRawMaterialComponent,
    InsertTBL_Account_Sub_Group_MASTERComponent,
    UppercaseInputDirective, LowercaseInputDirective, TwoDigitDecimaNumberDirective, KeyHandlerDirective,
    TabDirective, CompanyComponent,
    MenuComponent,
    InsertTBL_BRANCH_MASTERComponent,InsertTBL_Size_MASTERComponent,
    CategoryComponent,
    RawCategoryComponent,
    SubCategoryComponent,
    RawSubCategoryComponent,
    GroupComponent,userComponent,
    ProductComponent,
    OpSTOCKComponent,
    PartyComponent,
    ColorComponent,
    SeriesComponent,
    LocationComponent,
    AccountGroupComponent,
    ItemComponent,
    LedgerComponent,
    UnitComponent,
    CurrencyComponent, AccountSubGroupComponent,
    InsertAccountGroup_MASTERComponent,
    CurrencyComponent,SERIESTAXSETUPComponent,
    AccountGroupComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    InputNumberModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    ReactiveFormsModule,
    UIModule, ContextMenuModule,
    WidgetModule,
    Ng5SliderModule, PaginatorModule,
    FileUploadModule,
    DropdownModule, CheckboxModule,
    ImageModule, InputMaskModule,
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
export class MasterModule { }