using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class CscModel
    {
        public int id { get; set; }
        public int supplier_id { get; set; }
        public string csc_type { get; set; }
        public string created_date { get; set; }
        public int status { get; set; }
        public string supplier_name { get; set; }
    }
}
