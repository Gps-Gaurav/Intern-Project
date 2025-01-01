using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.PostModel
{
    public class PostBrand
    {
        public string brand { get; set; }
        public string description { get; set; }
        public int q_id { get; set; }
        public string image { get; set; }
        public string type { get; set; } = "";
    }
}
