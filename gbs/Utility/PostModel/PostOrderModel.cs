using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utility.PostModel
{
    public class PostOrderModel
    {
        public string order_id { get; set; }
        public string order_date { get; set; }
        public string pickup_location { get; set; }
        public string channel_id { get; set; }
        public string comment { get; set; }
        public string billing_customer_name { get; set; }
        public string billing_last_name { get; set; }
        public string billing_address { get; set; }
        public string billing_address_2 { get; set; } = "";
        public string billing_city { get; set; }
        public string billing_pincode { get; set; }
        public string billing_state { get; set; }
        public string billing_country { get; set; }
        public string billing_email { get; set; }
        public string billing_phone { get; set; }
        public bool shipping_is_billing { get; set; }
        public string shipping_customer_name { get; set; } = "";
        public string shipping_last_name { get; set; } = "";
        public string shipping_address { get; set; } = "";
        public string shipping_address_2 { get; set; } = "";
        public string shipping_city { get; set; } = "";
        public string shipping_pincode { get; set; } = "";
        public string shipping_country { get; set; } = "";
        public string shipping_state { get; set; } = "";
        public string shipping_email { get; set; } = "";
        public string shipping_phone { get; set; } = "";
        public List<OrderItem> order_items { get; set; }
        public string payment_method { get; set; }
        public int shipping_charges { get; set; } = 0;
        public int giftwrap_charges { get; set; } = 0;
        public int transaction_charges { get; set; } = 0;
        public int total_discount { get; set; }
        public int sub_total { get; set; }
        public double length { get; set; }
        public double breadth { get; set; }
        public double height { get; set; }
        public double weight { get; set; }
    }

    public class OrderItem
    {
        public int id { get; set; } = 0;
        public int item_id { get; set; }
        public int sales_qty { get; set; }
        public decimal price_per_unit { get; set; }

        public decimal tax_amt { get; set; }
        public string tax_type { get; set; }

        public int tax_id { get; set; }
        public decimal tax_value { get; set; }

        public decimal total_cost { get; set; }

        public string description { get; set; }

        public decimal single_unit_total_cost { get; set; }
    }
}
