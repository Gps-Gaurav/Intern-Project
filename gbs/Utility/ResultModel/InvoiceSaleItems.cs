using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class InvoiceSaleItems
    {
        public string item_name { get; set; }
        public string brand_name { get; set; }
        public string sku { get; set; }
        public string category_name { get; set; }
        public decimal price_per_unit { get; set; }
        public int sales_qty { get; set; }
        public decimal total_cost { get; set; }
        public decimal discount_amt { get; set; }
        public string hsn { get; set; }
        public int id { get; set; }
        public int item_id { get; set; }
    }

    public class InvoicePurchaseItems
    {
        public string item_name { get; set; }
        public string brand_name { get; set; }
        public string category_name { get; set; }
        public decimal price_per_unit { get; set; }
        public int purchase_qty { get; set; }
        public decimal total_cost { get; set; }
        public decimal price { get; set; }
        public decimal sale_price { get; set; }
    }
}
