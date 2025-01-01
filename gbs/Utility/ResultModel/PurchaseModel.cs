using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class PurchaseModel
    {
        public int Id { get; set; }
        public string purchase_code { get; set; }
        public string reference_no { get; set; }
        public string purchase_date { get; set; }
        public string purchase_status { get; set; }
        public int supplier_id { get; set; }
        public string supplier_name { get; set; }
        public decimal subtotal { get; set; }
        public decimal round_off { get; set; }
        public decimal grand_total { get; set; }
        public string purchase_note { get; set; }
        public string created_date { get; set; }
        public int created_by { get; set; }
        public int status { get; set; }
        public int total_product { get; set; }
    }
}
