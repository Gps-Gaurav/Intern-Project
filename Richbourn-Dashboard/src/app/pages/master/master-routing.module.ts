import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { RawCategoryComponent } from './raw_category/raw_category.component';
import { GroupComponent } from './group/group.component';
import { AccountSubGroupComponent } from './account_sub_group/account_sub_group.component';
import { InsertTBL_BRANCH_MASTERComponent } from './insert-TBL_BRANCH_MASTER/insert-TBL_BRANCH_MASTER.component';
import { InsertTBL_Category_MASTERComponent } from './insert-TBL_CATEGORY_MASTER/insert-TBL_CATEGORY_MASTER.component';
import { InsertTBL_Raw_Category_MASTERComponent } from './insert-TBL_RAW_CATEGORY_MASTER/insert-TBL_RAW_CATEGORY_MASTER.component';
import { InsertTBL_Group_MASTERComponent } from './insert-TBL_GROUP_MASTER/insert-TBL_GROUP_MASTER.component';

import { InsertTBL_Account_Sub_Group_MASTERComponent } from './insert-TBL_ACCOUNT_SUB_GROUP_MASTER/insert-TBL_ACCOUNT_SUB_GROUP_MASTER.component';

import { InsertTBL_Party_MASTERComponent } from './insert-TBL_PARTY_MASTER/insert-TBL_PARTY_MASTER.component';
import { InsertTBL_Modify_MASTERComponent } from './insert-TBL_MODIFY_PRODUCT_MASTER/insert-TBL_MODIFY_PRODUCT_MASTER.component';
import { InsertTBL_Color_MASTERComponent } from './insert-TBL_COLOR_MASTER/insert-TBL_COLOR_MASTER.component';
import { InsertTBL_Company_MASTERComponent } from './insert-TBL_COMPANY_MASTER/insert-TBL_COMPANY_MASTER.component';

import { InsertTBL_SubCategory_MASTERComponent } from './insert-TBL_SUB_CATEGORY_MASTER/insert-TBL_SUB_CATEGORY_MASTER.component';
import { InsertTBL_Raw_SubCategory_MASTERComponent } from './insert-TBL_RAW_SUB_CATEGORY_MASTER/insert-TBL_RAW_SUB_CATEGORY_MASTER.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { PartyComponent } from './party/party.component';
import { ColorComponent } from './color/color.component';
import { SeriesComponent } from './series/series.component';
import { UnitComponent } from './unit/unit.component';
import { SubCategoryComponent } from './subcategory/subcategory.component';
import { RawSubCategoryComponent } from './raw_subcategory/raw_subcategory.component';

import { TBL_BRANCH_MASTERComponent } from './TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.component';
import { InsertTBL_Series_MASTERComponent } from './insert-TBL_SERIES_MASTER/insert-TBL_SERIES_MASTER.component';
import { InsertTBL_OpSTOCK_MASTERComponent } from './insert-TBL_OpSTOCK_MASTER/insert-TBL_OpSTOCK_MASTER.component';
import { InsertTBL_Unit_MASTERComponent } from './insert-TBL_UNIT_MASTER/insert-TBL_UNIT_MASTER.component';
import { InsertTBL_Currency_MASTERComponent } from './insert-TBL_CURRENCY_MASTER/insert-TBL_CURRENCY_MASTER.component';
import { InsertTBL_Location_MASTERComponent } from './insert-TBL_LOCATION_MASTER/insert-TBL_LOCATION_MASTER.component';
import { InsertTBL_Item_MASTERComponent } from './insert-TBL_ITEM_MASTER/insert-TBL_ITEM_MASTER.component';
import { InsertTBL_Ledger_MASTERComponent } from './insert-TBL_LEDGER_MASTER/insert-TBL_LEDGER_MASTER.component';
import { CurrencyComponent } from './currency/currency.component';

import { LocationComponent } from './location/location.component';
import { LedgerComponent } from './ledger/ledger.component';
import { ItemComponent } from './item/item.component';
import { OpSTOCKComponent } from './OpStock/OpStock.component';
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
import { SERIESTAXSETUPComponent } from './series-tax-setup/series-tax-setup.component';
import { CompanyComponent } from './company/company.component';
import { userComponent } from './user/user.component';
import { InsertTBL_User_MASTERComponent } from './insert-TBL_USER_MASTER/insert-TBL_USER_MASTER.component';
import { InsertTBL_Size_MASTERComponent } from './insert-TBL_SIZE_MASTER/insert-TBL_SIZE_MASTER.component';
import { SizeComponent } from './Size/Size.component';


const routes: Routes = [

    { path: 'branch-master', component: TBL_BRANCH_MASTERComponent },
    { path: 'CREATE_BRANCH_MASTER', component: InsertTBL_BRANCH_MASTERComponent },

    { path: 'CREATE_PARTY_MASTER', component: InsertTBL_Party_MASTERComponent },
    { path: 'CREATE_MODIFY_PRODUCT_MASTER', component: InsertTBL_Modify_MASTERComponent },
    { path: 'CREATE_CATEGORY_MASTER', component: InsertTBL_Category_MASTERComponent },
    { path: 'create-raw-category', component: InsertTBL_Raw_Category_MASTERComponent },

    { path: 'CREATE_GROUP_MASTER', component: InsertTBL_Group_MASTERComponent },

    { path: 'CREATE_ACCOUNT_SUB_GROUP_MASTER', component: InsertTBL_Account_Sub_Group_MASTERComponent },
    { path: 'CREATE_SUB_CATEGORY_MASTER', component: InsertTBL_SubCategory_MASTERComponent },
    { path: 'create-raw-subcategory', component: InsertTBL_Raw_SubCategory_MASTERComponent },

 {  path: 'menu', component: MenuComponent },
 {  path: 'category', component: CategoryComponent },
 {  path: 'raw-category', component: RawCategoryComponent },
 {  path: 'subcategory', component:SubCategoryComponent },
 {  path: 'raw-subcategory', component:RawSubCategoryComponent },
 {  path: 'color', component:ColorComponent },
 {  path: 'series', component:SeriesComponent },
 {  path: 'OpStock', component:OpSTOCKComponent},
 {  path: 'OpStock-raw-material', component:OpStockRawMaterialComponent},
 {  path: 'insert-OpStock-raw-material', component:InsertOpeningStockRawMaterialComponent},
 {  path: 'location', component:LocationComponent },
 {  path: 'item', component:ItemComponent },
 {  path: 'state', component:StateComponent },
 {  path: 'insert-state-master', component:InsertStateMasterComponent },
 {  path: 'city', component:CityComponent },
 {  path: 'party-discount', component:PartyDiscountComponent },
 {  path: 'insert-city-master', component:InsertCityMasterComponent },
 {  path: 'raw-stock-hand', component:RawMaterialStockHandComponent },
 {  path: 'ledger', component:LedgerComponent },
 {  path: 'unit', component:UnitComponent },
 {  path: 'currency', component:CurrencyComponent },
 {  path: 'group', component:GroupComponent },
 {  path: 'account_sub_group', component:AccountSubGroupComponent },
 {  path: 'product', component:ProductComponent},
 {  path: 'party', component:PartyComponent},
 {  path: 'account-group', component:AccountGroupComponent},
 {  path: 'insert-account-group', component:InsertAccountGroup_MASTERComponent},
 { path: 'series-tax-setup', component: SERIESTAXSETUPComponent },
 {  path: 'insert-series-tax-setup', component:InsertSeriesTaxMasterComponent},
    { path: 'CREATE_USER_MASTER', component: InsertTBL_User_MASTERComponent},
    { path: 'CREATE_COMPANY_MASTER', component: InsertTBL_Company_MASTERComponent },
    { path: 'CREATE_COLOR_MASTER', component: InsertTBL_Color_MASTERComponent },
    { path: 'CREATE_SERIES_MASTER', component: InsertTBL_Series_MASTERComponent },
    { path: 'CREATE_OpSTOCK_MASTER', component: InsertTBL_OpSTOCK_MASTERComponent },
    { path: 'CREATE_UNIT_MASTER', component: InsertTBL_Unit_MASTERComponent },
    { path: 'CREATE_LOCATION_MASTER', component: InsertTBL_Location_MASTERComponent },
    { path: 'CREATE_ITEM_MASTER', component: InsertTBL_Item_MASTERComponent },
    { path: 'CREATE_LEDGER_MASTER', component: InsertTBL_Ledger_MASTERComponent },
    { path: 'CREATE_CURRENCY_MASTER', component: InsertTBL_Currency_MASTERComponent },
    { path: 'CREATE_SIZE_MASTER', component: InsertTBL_Size_MASTERComponent },

    { path: 'menu', component: MenuComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'raw-category', component: RawCategoryComponent },
    { path: 'subcategory', component: SubCategoryComponent },
    { path: 'raw-subcategory', component: RawSubCategoryComponent },
    { path: 'color', component: ColorComponent },
    { path: 'Size', component: SizeComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'series', component: SeriesComponent },
    { path: 'OpStock', component: OpSTOCKComponent },
    { path: 'OpStock-raw-material', component: OpStockRawMaterialComponent },
    { path: 'insert-OpStock-raw-material', component: InsertOpeningStockRawMaterialComponent },
    { path: 'location', component: LocationComponent },
    { path: 'item', component: ItemComponent },
    { path: 'state', component: StateComponent },
    { path: 'insert-state-master', component: InsertStateMasterComponent },
    { path: 'city', component: CityComponent },
    { path: 'party-discount', component: PartyDiscountComponent },
    { path: 'insert-city-master', component: InsertCityMasterComponent },
    { path: 'raw-stock-hand', component: RawMaterialStockHandComponent },
    { path: 'ledger', component: LedgerComponent },
    { path: 'unit', component: UnitComponent },
    { path: 'user', component: userComponent },
    { path: 'currency', component: CurrencyComponent },
    { path: 'group', component: GroupComponent },
    { path: 'account_sub_group', component: AccountSubGroupComponent },
    { path: 'product', component: ProductComponent },
    { path: 'party', component: PartyComponent },
    { path: 'account-group', component: AccountGroupComponent },
    { path: 'insert-account-group', component: InsertAccountGroup_MASTERComponent },
    { path: 'insert-series-tax-setup', component: InsertSeriesTaxMasterComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
