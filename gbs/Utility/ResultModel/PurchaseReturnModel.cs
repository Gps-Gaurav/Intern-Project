using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class PurchaseReturnModel
    {
        public int Id { get; set; }
        public string salesreturn_code { get; set; }
        public string sales_code { get; set; }
        public string reference_no { get; set; }
        public DateTime sales_date { get; set; }
        public string sales_status { get; set; }
        public int supplier_id { get; set; }
        public string other_charges_input { get; set; }
        public int other_charges_tax_id { get; set; }
        public decimal other_charges_amt { get; set; }
        public string discount_to_all_input { get; set; }
        public string discount_to_all_type { get; set; }
        public decimal tot_discount_to_all_amt { get; set; }
        public decimal subtotal { get; set; }
        public decimal round_off { get; set; }
        public decimal grand_total { get; set; }
        public string sales_note { get; set; }
        public DateTime created_date { get; set; }
        public int status { get; set; }
        public int created_by { get; set; }
    }
}
