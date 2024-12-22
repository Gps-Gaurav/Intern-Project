import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PriceListComponent } from './price-list/price-list.component';
import { PRICELISTADDComponent } from './price-list-add/price-list-add.component';

import { FinishedGoodsComponent } from './opening-stock-finished-goods/finished-goods.Component';
import { SaleFinishedGoodsComponent } from './sale-finished-goods/sale-finished-goods.Component';
import { PurchaseFinishedGoodsComponent } from './Purchase-finished-goods/Purchase-finished-goods.Component';
import { InsertFinishedGoodsComponent} from './insert-op-stock-finished-goods/insert-op-stock-finished-goods.component';
import { PurchaseRawMaterialAddComponent} from './purchase-raw-material-add/purchase-raw-material-add.component';
import { PurchaseRawComponent } from './Purchase-Raw-material/Purchase-Raw-material.component';
import { InsertSaleFinishedGoodsComponent } from './insert-Sale-finished-goods/insert-Sale-finished-goods.component';
import { InsertPurchaseFinishedGoodsComponent } from './insert-Purchase-finished-goods/insert-Purchase-finished-goods.component';
import { InsertTBL_Finished_Product_CategoryComponent } from './insert-Finished_Product_Category/insert-Finished_Product_Category.component';
import { Finished_Product_CategoryComponent } from './Finished_Product_Category/Finished_Product_Category.component';
import { GhatStockListComponent } from './op-stock-ghat-list/op-stock-ghat-list..component';
import { CustomerStockListComponent } from './op-stock-customer-list/op-stock-customer-list..component';
import { OpStockGhatAddComponent } from './op-stock-ghat-add/op-stock-ghat-add.component';
import { OpStockCustomerAddComponent } from './op-stock-customer-add/op-stock-customer-add.component';


const routes: Routes = [
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'detail',
        component: DetailComponent
    },
    {
        path: 'price-list',
        component: PriceListComponent
    },
    {
        path: 'price-list-add',
        component:  PRICELISTADDComponent
    },
    {
        path: 'op-stock-ghat',
        component:  OpStockGhatAddComponent
    },
    {
        path: 'op-stock-ghat-list',
        component:  GhatStockListComponent
    },
    {
        path: 'op-stock-customer',
        component:  CustomerStockListComponent
    },
    {
        path: 'insert-op-stock-customer',
        component:  OpStockCustomerAddComponent
    },
    {
        path: 'finished-goods',
        component:  FinishedGoodsComponent
    },
    {
        path: 'insert-finished-goods',
        component:  InsertFinishedGoodsComponent
    },
    {
        path: 'purchase-raw-material-add',
        component:  PurchaseRawMaterialAddComponent
    },
    {
        path: 'purchase-raw-material',
        component:  PurchaseRawComponent
    },
    {
        path: 'sale-finished-goods',
        component:  SaleFinishedGoodsComponent
    },
    {
        path: 'Purchase-finished-goods',
        component:  PurchaseFinishedGoodsComponent
    },
    {
        path: 'insert-Sale-finished-goods',
        component:  InsertSaleFinishedGoodsComponent 
    },
    {
        path: 'insert-Purchase-finished-goods',
        component:  InsertPurchaseFinishedGoodsComponent
    },
    {
        path: 'insert-Finished_Product_Category',
        component:  InsertTBL_Finished_Product_CategoryComponent
    },
    {
        path: 'Finished_Product_Category',
        component: Finished_Product_CategoryComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoicesRoutingModule {}
