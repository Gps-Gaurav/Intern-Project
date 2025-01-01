using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class ItemModel
    {
        public int id { get; set; }
        public string description { get; set; }
        public string item_code { get; set; }
        public string item_name { get; set; }
        public string brand_name { get; set; }
        public string category_name { get; set; }
        public string sku { get; set; }
        public string hsn { get; set; }
        public string unit_name { get; set; }
        public int stock_qty { get; set; }
        public int alert_qty { get; set; }
        public int lot_number { get; set; }
        public DateTime expire_date { get; set; }
        public int price { get; set; }
        public int tax_id { get; set; }
        public Decimal purchase_price { get; set; }
        public string tax_type { get; set; }
        public int profit_margin { get; set; }
        public Decimal sales_price { get; set; }
        public string custom_barcode { get; set; }
        public string system_ip { get; set; }
        public string brand_image { get; set; }
        public string created_date { get; set; }
        public int created_by { get; set; }
        public int status { get; set; }
        public string image { get; set; }
        public string gender { get; set; }
        public string item_type { get; set; }
        public string type { get; set; } = "";
        public int brand_id { get; set; }

        public string delivery_info { get; set; }
        public string why_shop { get; set; }
        public string gallery { get; set; }
    }
}
