using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class LoginModel
    {
        public int id { get; set; }
        public string username { get; set; }
        public int role_id { get; set; }
        public string role_name { get; set; }
    }
}
