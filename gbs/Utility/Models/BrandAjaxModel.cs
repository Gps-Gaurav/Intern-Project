
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Utility.ResultModel;

namespace Utility.Models
{
    public class BrandAjaxModel
    {
        public string draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<List<string>> data { get; set; }
    }


    public class ItemAjaxModel
    {
        public string draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<ItemModel> data { get; set; }
    }
}
