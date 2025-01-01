using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class DashboardModel
    {
        public int today_item_sold { get; set; }
        public decimal today_sale_amount { get; set; }
        public decimal today_margin { get; set; }
        public decimal today_expense { get; set; }

        public int month_item_sold { get; set; }
        public decimal month_sale_amount { get; set; }
        public decimal month_margin { get; set; }
        public decimal month_expense { get; set; }

        public int year_item_sold { get; set; }
        public decimal year_sale_amount { get; set; }
        public decimal year_margin { get; set; }
        public decimal year_expense { get; set; }

        public int all_item_sold { get; set; }
        public decimal all_sale_amount { get; set; }
        public decimal all_margin { get; set; }
        public decimal all_expense { get; set; }
        public decimal all_purchase_amount { get; set; }

        public int total_customer { get; set; }
        public int total_supplier { get; set; }
        public int total_sale_invoice { get; set; }
        public int total_purchase_invoice { get; set; }
        public string month_sales { get; set; }
    }
    public class MonthSaleModel
    {
        public string sales_month { get; set; }
        public int online_order_count { get; set; }
        public int store_order_count { get; set; }
        public int online_exchange_count { get; set; }
        public int store_exchange_count { get; set; }

        public decimal online_sale_amount{ get; set; }
        public decimal store_sale_amount { get; set; }

    }
}
