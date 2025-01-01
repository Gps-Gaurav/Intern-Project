using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class PaymentModel
    {
        public int id { get; set; }
        public string payment_date { get; set; }
        public string payment_type { get; set; }
        public string payment_note { get; set; }
        public decimal payment { get; set; }
    }
}
