using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class PosInvoiceModel
    {

        public List<CustomerSaleModel> customer { get; set; }
        public List<StateModel> state { get; set; }

        public List<CountryModel> country { get; set; }
        public List<CompanyModel> company { get; set; }

        public List<InvoiceSaleItems> sale_items { get; set; }

        public List<PaymentModel> payment { get; set; }

        public List<ReturnItemsModel> return_items { get; set; }

    }

    public class PurchaseInvoiceModel
    {

        public List<SupplierPurchaseModel> supplier { get; set; }
        public List<StateModel> state { get; set; }

        public List<CountryModel> country { get; set; }
        public List<CompanyModel> company { get; set; }

        public List<InvoicePurchaseItems> purchase_items { get; set; }



    }

    public class CscInvoiceModel
    {

        public List<SupplierPurchaseModel> supplier { get; set; }
        public List<StateModel> state { get; set; }

        public List<CountryModel> country { get; set; }
        public List<CompanyModel> company { get; set; }

        public List<CscItemModel> purchase_items { get; set; }



    }


    public class ReturnItemsModel
    {
        public string item_name { get; set; }
        public decimal total_cost { get; set; }
        public string sku { get; set; }
        public string created_date { get; set; }
    }
}
