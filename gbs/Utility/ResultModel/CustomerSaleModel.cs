using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class CustomerSaleModel
    {
        public int customer_id { get; set; }
        public string customer_name { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string gstin { get; set; }
        public string tax_number { get; set; }
        public string email { get; set; }
        public int opening_balance { get; set; }
        public int country_id { get; set; }
        public int state_id { get; set; }
        public string postcode { get; set; }
        public string address { get; set; }
        public string sales_date { get; set; }


        public string sales_code { get; set; }
        public string sales_note { get; set; }
        public decimal grand_total { get; set; }
        public decimal subtotal { get; set; }
        public decimal other_charges_input { get; set; }
        public int other_charges_tax_id { get; set; }
        public decimal other_charges_amt { get; set; }
        public string discount_to_all_input { get; set; }
        public string discount_to_all_type { get; set; }
        public string created_time { get; set; }
        public decimal tot_discount_to_all_amt { get; set; }
        public decimal round_off { get; set; }
        public string created_by { get; set; }
        public string customer_city { get; set; }
        public string sales_status { get; set; }
        public int pos { get; set; }
    }

    public class SupplierPurchaseModel
    {
        public string purchase_code { get; set; }
        public int Id { get; set; }
       
        public int opening_balance { get; set; }
        public string reference_no { get; set; }
        public string purchase_date { get; set; }
        public string purchase_status { get; set; }
        public decimal subtotal { get; set; }
        public decimal grand_total { get; set; }
        public string purchase_note { get; set; }
        public string created_date { get; set; }
        public string status { get; set; }
        public string supplier_code { get; set; }
        public string supplier_name { get; set; }
        public string supplier_id { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string country_id { get; set; }
        public string email { get; set; }
        public string state_id { get; set; }
        public string city { get; set; }
        public string postcode { get; set; }
        public string address { get; set; }
        public string gstin { get; set; }
    }
}
