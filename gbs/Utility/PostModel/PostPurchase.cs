using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.PostModel
{
    public class PostPurchase
    {
        public int Id { get; set; }
        public string purchase_code { get; set; }
        public string reference_no { get; set; }
        public DateTime purchase_date { get; set; }
        public string purchase_status { get; set; }
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
        public string purchase_note { get; set; }
        public DateTime created_date { get; set; }
        public int created_by { get; set; }
        public string system_ip { get; set; }
        public string system_name { get; set; }
        public int status { get; set; }
    }
}
