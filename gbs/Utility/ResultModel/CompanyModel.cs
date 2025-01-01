using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class CompanyModel
    {
        public string company_name { get; set; }
        public string website { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string country { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public string postcode { get; set; }

        public string address { get; set; }
        public string gstin { get; set; }
        public string vat { get; set; }
        public string pan { get; set; }
        public string bank_details { get; set; }

        public string upi_id { get; set; }
        public string company_logo { get; set; }
        public string upi_code { get; set; }
        public int Id { get; set; }

    }
}
