using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class BrandModel
    {
        public int id { get; set; }
        public string brand_code { get; set; }
        public string brand_name { get; set; }
        public string description { get; set; }
        public string image { get; set; }

        public string banner_image { get; set; }
        public int status { get; set; }
        public string type { get; set; } = "";
    }
}
