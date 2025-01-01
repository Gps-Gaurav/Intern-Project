using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class SalesAppModel
    {
        public int id { get; set; }
        public string sales_code { get; set; }
        public string sales_status { get; set; }
        public string sales_date { get; set; }
        public decimal subtotal { get; set; }
        public decimal grand_total { get; set; }
        public string sales_note { get; set; }
        public string customer_name { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string city { get; set; }
        public string postcode { get; set; }
        public string address { get; set; }
        public string country { get; set; }
        public string phone { get; set; }
        public string nearby { get; set; }
        public string landmark { get; set; }
        public string state { get; set; }
    }
}
