using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class CustomerModel
    {
        public int Id { get; set; }
        public string customer_code { get; set; }
        public int role_id { get; set; }
        public string customer_name { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public int country_id { get; set; }
        public int state_id { get; set; }
        public string city { get; set; }
        public string postcode { get; set; }
        public string address { get; set; }
        public int opening_balance { get; set; }
        public string system_ip { get; set; }
        public string system_name { get; set; }
        public string created_date { get; set; }
        public int created_by { get; set; }
        public int status { get; set; }
        public string gstin { get; set; }
        public string tax_number { get; set; }
        public string birth_day { get; set; }
        public string customeraddress { get; set; }
        public string role_name { get; set; }
        public string password { get; set; }
        public string aniversary { get; set; }
        public string gender { get; set; }
    }
}
