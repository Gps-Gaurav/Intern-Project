using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class CategoryModel
    {
        public int id { get; set; }
        public string category_code { get; set; }
        public string category_name { get; set; }
        public string description { get; set; }
        public string type { get; set; } = "";

        public string image { get; set; }
        public int status { get; set; }
    }
}
