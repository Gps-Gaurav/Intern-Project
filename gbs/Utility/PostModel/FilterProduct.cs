using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.PostModel
{
    public class FilterProduct
    {
        public int page_number { get; set; } = 0;

        public string type { get; set; } = "";
        public string filters { get; set; } = "";
        public int purchase_id { get; set; } = 0;

    }
}
