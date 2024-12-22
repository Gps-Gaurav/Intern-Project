import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PurchaseComponent } from './Purchase/Purchase.component';
import { InvoiceComponent } from './SaleInvoice/SaleInvoice.component';
import { InsertTBL_PURCHASEComponent } from './insert_TBL_PURCHASE/insert_TBL_PURCHASE.component';

import { InsertTBL_PURCHASE_RETURNComponent } from './insert_TBL_PURCHASE_RETURN/insert_TBL_PURCHASE_RETURN.component';
import { InsertTBL_SALE_RETURNComponent } from './insert_TBL_SALE_RETURN/insert_TBL_SALE_RETURN.component';
import { InsertStockTransferComponent } from './insert_TBL_STOCK_TRANSFER/insert_TBL_STOCK_TRANSFER.component';
import { InsertTBL_Invoice_MASTERComponent } from './insert-TBL_SALE_INVOICE_MASTER/insert-TBL_SALE_INVOICE_MASTER.component';

import { Purchase_RawComponent } from './Purchase_Raw/Purchase_Raw.component';
import { Sales_RawComponent } from './Sales_Raw/Sales_Raw.component';
import { InsertStockTransferRawComponent } from './Stock_Transfer_Raw/Stock_Transfer_Raw.component';

import { SaleReturnComponent } from './SaleReturn/SaleReturn.component';
import { PurchaseReturnComponent } from './PurchaseReturn/PurchaseReturn.component';
import { InsertTBL_PURCHASE_RAWComponent } from './insert_TBL_PURCHASE_RAW/insert_TBL_PURCHASE_RAW.component';
import { insert_TBL_SALE_RAWComponent } from './insert_TBL_SALE_RAW/insert_TBL_SALE_RAW.component';
import { Purchase_Detail_InvoicesComponent } from './Purchase_Detail_Invoices/Purchase_Detail_Invoices.component';
import { Sale_Detail_InvoicesComponent } from './Sale_Detail_Invoices/Sale_Detail_Invoices.component';
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

const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'detail', component: DetailComponent },
    { path: 'Purchase', component: PurchaseComponent },
    { path: 'Purchase_Detail_Invoices', component: Purchase_Detail_InvoicesComponent },
    { path: 'Purchase_Raw_Detail_Invoices', component: Purchase_Raw_Detail_InvoicesComponent },
    { path: 'Purchase_Return_Detail_Invoices', component: Purchase_Return_Detail_InvoicesComponent },
    { path: 'Sale_Detail_Invoices', component: Sale_Detail_InvoicesComponent },
    { path: 'Sale_Raw_Detail_Invoices', component: Sale_Raw_Detail_InvoicesComponent },
    { path: 'Sale_Return_Detail_Invoices', component: Sale_Return_Detail_InvoicesComponent },
    { path: 'SaleInvoice', component: InvoiceComponent },
    { path: 'Purchase-Voucher', component: Purchase_VoucherComponent },
    { path: 'SaleInvoice', component: InvoiceComponent },
    { path: 'Sales_Raw', component: Sales_RawComponent },
    { path: 'SaleReturn', component: SaleReturnComponent },
    { path: 'PurchaseReturn', component: PurchaseReturnComponent },

    { path: 'insert_TBL_PURCHASE', component: InsertTBL_PURCHASEComponent },
    { path: 'Purchase_Raw', component: Purchase_RawComponent },
    { path: 'insert_TBL_SALE_RAW', component: insert_TBL_SALE_RAWComponent },
    { path: 'InsertTBL_PURCHASE_RAW', component: InsertTBL_PURCHASE_RAWComponent },
   
    { path: 'insert_TBL_PURCHASE_RETURN', component: InsertTBL_PURCHASE_RETURNComponent },
    { path: 'insert_TBL_SALE_RETURN', component: InsertTBL_SALE_RETURNComponent },
    { path: 'insert_TBL_STOCK_TRANSFER', component: InsertStockTransferComponent },
    { path: 'Stock_Transfer', component:Stock_TransferComponent },
    { path: 'Stock_Transfer_Raw', component: InsertStockTransferRawComponent },
    { path: 'insert-TBL_SALE_INVOICE_MASTER', component: InsertTBL_Invoice_MASTERComponent },
    { path: 'product-stock-report', component: ProductStockReportComponent },
    { path: 'item-stock-report', component: ItemStockReportComponent },
    { path: 'barcode-generation', component: BarcodeGenerationComponent },
    { path: 'barcode-print', component: BarcodePrintComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoicesRoutingModule { }
