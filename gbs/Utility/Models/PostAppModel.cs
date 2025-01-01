using System;
using System.Collections.Generic;

namespace Utility.Models
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }

    

    public class UserData
    {
        public String success { get; set; }

        public customerModel data { get; set; }

        public String message { get; set; }
    }

    public class customerModel
    {

        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string rememberToken { get; set; }
        public System.DateTime timestamps { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }


    }
}
