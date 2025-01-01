using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class SalesItemModel
    {
        public string image { get; set; }
        public string brand { get; set; }
        public string category { get; set; }
        public string sku { get; set; }
        public decimal sale_price { get; set; }
        public int qty { get; set; }
        public decimal cost_price { get; set; }
    }
}
