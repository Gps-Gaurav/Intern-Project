using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.PostModel
{
    public class PostPos
    {
        public int id { get; set; } = 0;
        public int item_id { get; set; }
        public int sales_qty { get; set; }
        public decimal price_per_unit { get; set; }

        public decimal tax_amt { get; set; }
        public string tax_type { get; set; }

        public int tax_id { get; set; }
        public decimal tax_value { get; set; }

        public decimal total_cost { get; set; }

        public string description { get; set; }
        public int item_discount { get; set; }
        public decimal single_unit_total_cost { get; set; }
    }

    public class PostPosModel
    {
        public int customer_id { get; set; }
        public int sales_id { get; set; }
        public string json_data { get; set; }
        public decimal tot_amt { get; set; }
        public decimal tot_grand { get; set; }
        public string status { get; set; }
        public int item_count { get; set; }
        public decimal tot_disc { get; set; }
    }

}
