using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.PostModel
{
    public class PostItem
    {
        public string item_name { get; set; }
        public string description { get; set; }
        public int q_id { get; set; }
        public int brand_id { get; set; }
        public int category_id { get; set; }
        public string sku { get; set; }

        public string hsn { get; set; }
        public int unit_id { get; set; }
        public int alert_qty { get; set; }
        public int lot_number { get; set; }
        public DateTime expire_date { get; set; }
        public decimal price { get; set; }
        public int tax_id { get; set; }
        public int stock_qty { get; set; }
        public decimal purchase_price { get; set; }
        public string tax_type { get; set; }
        public int profit_margin { get; set; }
        public decimal sales_price { get; set; }
        public string custom_barcode { get; set; }
        public string system_ip { get; set; }
        public string system_name { get; set; }
        public DateTime created_date { get; set; }
        public int created_by { get; set; }
        public int status { get; set; }
        public int current_opening_stock { get; set; }
        public string image { get; set; }
        public string item_type { get; set; } = "";
        public string gender { get; set; } = "";
    }



    public class PostItemExcel
    {
        public int id { get; set; } = 0;
        public string brand_name { get; set; }
        public string category_name { get; set; }
        public string item_name { get; set; }
        public string unit_name { get; set; }
        public string modelno { get; set; }

        public string hsn { get; set; }
        public string description { get; set; }

        public int price { get; set; }
        public int stock_qty { get; set; }
        public int alert_qty { get; set; }
       
        public string Products_image { get; set; }
        public string gender { get; set; }
        public string item_type { get; set; }
        public string selling_type { get; set; }
    }


    public class PostItemWebExcel
    {
        public object id { get; set; } = 0;
        public object BRAND { get; set; }
        public object CATEGORY { get; set; }
        public object HSN { get; set; }
        public object ITEM_NAME { get; set; }
        public object MODEL_NO { get; set; }
       

        public object DESCRIPTION { get; set; }
        public object UNIT { get; set; }
        public object MRP { get; set; }
        public object STOCK_QUANTITY { get; set; }

        public object COST { get; set; }
        public object QUANTITY_ALERT { get; set; }


        public object SALE_PRICE { get; set; }
        public object Products_image { get; set; }
    }


    public class PostEditItem
    {
        public int id { get; set; }
        public string brand_name { get; set; }
        public string category_name { get; set; }
        public string sku { get; set; }
        public string unit_name { get; set; }
        public int stock_qty { get; set; }
        public int alert_qty { get; set; }
        public string price { get; set; }
        public string action { get; set; }

    }


    public class PostEditColumnItem
    {
        public string pk { get; set; }
        public string name { get; set; }
        public string value { get; set; }
        

    }

    public class PostBulkItemExcel
    {
        public object BRAND { get; set; }
        public object CATEGORY { get; set; }
        public object MODEL_NO { get; set; }
       
        public object ITEM_NAME { get; set; }
        public object DESCRIPTION { get; set; }
        public object GENDER { get; set; }
        public object PRODUCT_TYPE { get; set; }
        public object Products_image { get; set; }
        public object Image1 { get; set; } = "";
        public object Image2 { get; set; } = "";
        public object Image3 { get; set; } = "";
        public object Image4 { get; set; } = "";
        public object Image5 { get; set; } = "";


    }

    public class PostExcelApp
    {
        public string invoice { get; set; }
        public string excel { get; set; }
    }
}
