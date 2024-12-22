using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class SaleItemReport
    {
        public int Id { get; set; }
        public string ProdCode { get; set; }
        public string DesignCode { get; set; }
        public string HsnCode { get; set; }

        public string Qty { get; set; }
        public string Mrp { get; set; }
        public string Rate { get; set; }

        public string Discount { get; set; }
        public string Amount { get; set; }
    }
}
