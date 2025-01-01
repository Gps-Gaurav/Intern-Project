using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.Models
{
    public class UserAddressModel
    {
        public int Id { get; set; }
        public int id_address { get; set; } = 0;
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string address { get; set; }
        public string postcode { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public string mobile { get; set; }
        public string phone { get; set; }
        public string street_name { get; set; }
        public string apartment { get; set; }

    
        public string nearby { get; set; }
        public string landmark { get; set; }
        public int userid { get; set; }
        public string message { get; set; }
    }
}
