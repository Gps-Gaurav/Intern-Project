using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class LedgerModel
    {
        public int id { get; set; }
        public int debit { get; set; }
        public int credit { get; set; }
        public int balance { get; set; }
        public string note { get; set; }
        public string invoice_no { get; set; }
        public string particulars { get; set; }
        public string check_no { get; set; }
        public string created_date { get; set; }
        public string payment_type { get; set; }
        public int status { get; set; }
    }
}
