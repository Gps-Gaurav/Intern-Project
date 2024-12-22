import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { GroupComponent } from './group/group.component';
import { InsertTBL_BRANCH_MASTERComponent } from './insert-TBL_BRANCH_MASTER/insert-TBL_BRANCH_MASTER.component';
import { InsertTBL_Category_MASTERComponent } from './insert-TBL_CATEGORY_MASTER/insert-TBL_CATEGORY_MASTER.component';
import { InsertTBL_Group_MASTERComponent } from './insert-TBL_GROUP_MASTER/insert-TBL_GROUP_MASTER.component';
import { InsertTBL_Product_MASTERComponent } from './insert-TBL_PRODUCT_MASTER/insert-TBL_PRODUCT_MASTER.component';
import { InsertTBL_Packet_MASTERComponent } from './insert-TBL_PACKET_MASTER/insert-TBL_PACKET_MASTER.component';
import { InsertTBL_Modify_MASTERComponent } from './insert-TBL_MODIFY_PRODUCT_MASTER/insert-TBL_MODIFY_PRODUCT_MASTER.component';
import { InsertTBL_Color_MASTERComponent } from './insert-TBL_COLOR_MASTER/insert-TBL_COLOR_MASTER.component';

import {InsertTBL_SubCategory_MASTERComponent} from './insert-TBL_SUB_CATEGORY_MASTER/insert-TBL_SUB_CATEGORY_MASTER.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { PacketComponent} from './packet/packet.component';
import { ColorComponent} from './color/color.component';
import { SeriesComponent} from './series/series.component';
import { UnitRelationComponent} from './unit_relation/unit_relation.component';
import { SubCategoryComponent } from './subcategory/subcategory.component';

import { TBL_BRANCH_MASTERComponent } from './TBL_BRANCH_MASTER/TBL_BRANCH_MASTER.component';
import { InsertTBL_Series_MASTERComponent } from './insert-TBL_SERIES_MASTER/insert-TBL_SERIES_MASTER.component';
import { InsertTBL_OpBILL_ENTRY_MASTERComponent } from './insert-TBL_OpBILL_ENTRY_MASTER/insert-TBL_OpBILL_ENTRY_MASTER.component';
import {InsertTBL_Unit_Relation_MASTERComponent} from './insert-TBL_UNIT_RELATION_MASTER/insert-TBL_UNIT_RELATION_MASTER.component';
import { InsertTBL_Diamond_MASTERComponent } from './insert-TBL_DIAMOND_MASTER/insert-TBL_DIAMOND_MASTER.component';
import { InsertTBL_Location_MASTERComponent } from './insert-TBL_LOCATION_MASTER/insert-TBL_LOCATION_MASTER.component';
import { InsertTBL_Item_MASTERComponent } from './insert-TBL_ITEM_MASTER/insert-TBL_ITEM_MASTER.component';
import { InsertTBL_Ledger_MASTERComponent } from './insert-TBL_LEDGER_MASTER/insert-TBL_LEDGER_MASTER.component';
import { InsertTBL_Invoice_MASTERComponent } from './insert-TBL_INVOICE_MASTER/insert-TBL_INVOICE_MASTER.component';
import { DiamondComponent } from './diamond/diamond.component';
import { LocationComponent } from './location/location.component';
import { LedgerComponent } from './ledger/ledger.component';
import { ItemComponent } from './item/item.component';
import { OpBILL_ENTRYComponent } from './OpBill_Entry/OpBill_Entry.component';
import { InvoiceComponent } from './SaleInvoice/SaleInvoice.component';
import { InsertOpeningStockComponent } from './insert-opening-stock/insert-opening-stock.component';
// import { SubItemComponent } from './sub-item/subitem.component';
import { UnitComponent } from './unit/unit.component';
import { FinishGoodsComponent } from './finish-goods/finish-goods.component';
import { GhatComponent } from './ghat/ghat.component';
import { InsertTBLUNITMASTERComponent } from './insert-tbl-unit-master/insert-tbl-unit-master.component';

import { SubitemComponent } from './subitem/subitem.component';
import { InsertSubItemComponent } from './insert-sub-item/insert-sub-item.component';


const routes: Routes = [
   
 {  path: 'branch-master', component: TBL_BRANCH_MASTERComponent },
 {  path: 'CREATE_BRANCH_MASTER', component: InsertTBL_BRANCH_MASTERComponent },
 {  path: 'CREATE_PRODUCT_MASTER', component: InsertTBL_Product_MASTERComponent },
 {  path: 'CREATE_PACKET_MASTER', component: InsertTBL_Packet_MASTERComponent },
 {  path: 'CREATE_MODIFY_PRODUCT_MASTER', component: InsertTBL_Modify_MASTERComponent },
 {  path: 'CREATE_CATEGORY_MASTER', component: InsertTBL_Category_MASTERComponent },
 {  path: 'CREATE_GROUP_MASTER', component: InsertTBL_Group_MASTERComponent },
 {  path: 'CREATE_SUB_CATEGORY_MASTER', component: InsertTBL_SubCategory_MASTERComponent },
 {  path: 'CREATE_COLOR_MASTER', component: InsertTBL_Color_MASTERComponent },
 {  path: 'CREATE_SERIES_MASTER', component: InsertTBL_Series_MASTERComponent },
 {  path: 'CREATE_OpBILL_ENTRY_MASTER', component: InsertTBL_OpBILL_ENTRY_MASTERComponent },
 {  path: 'CREATE_UNIT_RELATION_MASTER',component:InsertTBL_Unit_Relation_MASTERComponent},
 {  path: 'CREATE_LOCATION_MASTER', component: InsertTBL_Location_MASTERComponent},
 {  path: 'CREATE_ITEM_MASTER', component: InsertTBL_Item_MASTERComponent},
 {  path: 'CREATE_LEDGER_MASTER', component: InsertTBL_Ledger_MASTERComponent},
 {  path: 'CREATE_DIAMOND_MASTER', component: InsertTBL_Diamond_MASTERComponent },
 {  path: 'CREATE_INVOICE_MASTER', component: InsertTBL_Invoice_MASTERComponent },
 {  path: 'menu', component: MenuComponent },
 {  path: 'category', component: CategoryComponent },
 {  path: 'subcategory', component:SubCategoryComponent },
 {  path: 'color', component:ColorComponent },
 {  path: 'series', component:SeriesComponent },
 {  path: 'OpBill_Entry', component:OpBILL_ENTRYComponent},
 {  path: 'location', component:LocationComponent },
 {  path: 'item', component:ItemComponent },
 {  path: 'ledger', component:LedgerComponent },
 {  path: 'unit_relation', component:UnitRelationComponent },
 {  path: 'diamond', component:DiamondComponent },
 {  path: 'group', component:GroupComponent },
 {  path: 'product', component:ProductComponent},
 {  path: 'packet', component:PacketComponent},
 {  path: 'SaleInvoice', component:InvoiceComponent},
 {  path: 'insert-opening-stock', component:InsertOpeningStockComponent},
//  {  path: 'sub-item', component:SubItemComponent },
 {  path: 'unit', component:UnitComponent },
 {  path: 'finish-goods', component:FinishGoodsComponent },
 {  path: 'insert-tbl-unit-master', component:InsertTBLUNITMASTERComponent },
 {  path: 'ghat', component:GhatComponent },
 
 {  path: 'subitem', component:SubitemComponent },
 {  path: 'insert-sub-item', component:InsertSubItemComponent },
 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule {}
