using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class TaxModel
    {
        public int Id { get; set; }
        public string tax_name { get; set; }
        public decimal tax { get; set; }
        public int group_bit { get; set; }
        public int subtax_ids { get; set; }
        public int status { get; set; }
    }
}
