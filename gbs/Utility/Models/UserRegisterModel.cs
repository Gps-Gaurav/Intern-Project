using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.Models
{
    public class UserRegisterModel
    {
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string mobile { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string stbirthday_Day { get; set; }
        public string stbirthday_Year { get; set; }
        public string stbirthday_Month { get; set; }
    }
}
