using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.ResultModel;

namespace Utility.Models
{
    public class BrandItemViewModel
    {
        public int brand_id { get; set; }
        public string brand_name { get; set; }
        public  List<ItemModel> items { get; set; }
    }
}
