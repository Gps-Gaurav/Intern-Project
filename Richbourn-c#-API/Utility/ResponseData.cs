using System;
using System.Collections.Generic;
using System.Text;

namespace Utility
{

    public class BaseStatus
    {
        public string Status { get; set; } = "0";
        public string Message { get; set; } = "Failed";
        public int totalCount { get; set; } = 0;

    }


    public class ResponseData<T> : BaseStatus
    {
        public T items { get; set; }
    }

}
