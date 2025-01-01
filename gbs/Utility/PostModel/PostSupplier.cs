using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.PostModel
{
    public class PostSupplier
    {
        public int Id { get; set; }
        public string supplier_code { get; set; }
        public string supplier_name { get; set; }//
        public string gstin { get; set; }//
        public string state_code { get; set; } = "";//
        public string email { get; set; }//
        public string phone { get; set; }//
        public string address { get; set; }//
        public string city { get; set; }//
        public string postcode { get; set; }//
        public int state_id { get; set; }

        public int country_id { get; set; }
        public string mobile { get; set; }

        public string account_no { get; set; }

        public string bank_name { get; set; }
        public string ifsc { get; set; }

      
   
        public DateTime created_date { get; set; }
        public int created_by { get; set; }
        
  
        public int status { get; set; }
    }
}
