using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utility.Models
{
    public class UpdateStock
    {
        public string sku { get; set; }
        public int stock_qty { get; set; }
        public string condition { get; set; }
        public int price { get; set; }
    }
}
