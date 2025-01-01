using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.PostModel
{
    public class PostLoginModel
    {
        public string username { get; set; }
        public string pass { get; set; }
        public string ReturnUrl { get; set; }
    }
}
