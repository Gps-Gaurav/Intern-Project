using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.PostModel
{
    public class PostSales
    {
        public string Id { get; set; }
        public string sales_code { get; set; }
        public string reference_no { get; set; }
        public string sales_date { get; set; }
        public string sales_status { get; set; }
        public string supplier_id { get; set; }
        public string other_charges_input { get; set; }
        public string other_charges_tax_id { get; set; }
        public string other_charges_amt { get; set; }
        public string discount_to_all_input { get; set; }
        public string discount_to_all_type { get; set; }
        public string tot_discount_to_all_amt { get; set; }
        public string subtotal { get; set; }
        public string round_off { get; set; }
        public string grand_total { get; set; }
        public string sales_note { get; set; }
        public string created_date { get; set; }
        public string created_by { get; set; }
        public string system_ip { get; set; }
        public string system_name { get; set; }
        public string status { get; set; }
}
}
