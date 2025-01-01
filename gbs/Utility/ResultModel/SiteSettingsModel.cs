using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class SiteSettingsModel
    {
        public int id { get; set; }
        public string site_name { get; set; }
        public string logo { get; set; }
        public int currency_id { get; set; }
        public string currency_placement { get; set; }
        public int language_id { get; set; }
        public string timezone { get; set; }
        public string time_format { get; set; }
        public string date_format { get; set; }
        public string sales_discount { get; set; }
        public string change_return { get; set; }
        public int sales_invoice_format_id { get; set; }


        public string sales_invoice_footer_text { get; set; }
        public int round_off { get; set; }
        public int show_upi_code { get; set; }
        public string category_init { get; set; }
        public string item_init { get; set; }
        public string supplier_init { get; set; }
        public string purchase_init { get; set; }
        public string purchase_return_init { get; set; }
        public string customer_init { get; set; }
        public string sales_init { get; set; }
        public string sales_return_init { get; set; }
        public string expense_init { get; set; }
        public string sales_terms_and_conditions { get; set; }
    }
}
