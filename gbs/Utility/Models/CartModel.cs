using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.Models
{
    public class CartModel
    {
        public int product_id { get; set; }
        public string modelno { get; set; }
        public string product_name { get; set; }
        public string image { get; set; }
        public int price { get; set; }
        public int subTotal { get; set; }
        public int qty { get; set; }
    }
}
