using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class CscItemModel
    {
        public int id { get; set; }
        public int csc_id { get; set; }
        public string csc_type { get; set; }
        public string brand_name { get; set; }
        public string category_name { get; set; }
        public string model_no { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
        public string complain { get; set; }
        public string image { get; set; }
        public string created_date { get; set; }
        public string status { get; set; }
        public string reference_no { get; set; }
    }
}
