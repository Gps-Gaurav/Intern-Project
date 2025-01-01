using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.DataModel
{
    public static class Static_StoreProcedure_Name
    {
        public static readonly string spAccSetup = "spAccSetup";
       

    }
    public class BaseStatus
    {
        public string Status { get; set; } = "0";
        public string Message { get; set; } = "Failed";
        public int totalCount { get; set; } = 0;
        public int totalAmount { get; set; } = 0;
    }

    public class BasePagination
    {
        public int CurrentPage { get; set; } = 1;

        public int Count { get; set; }

        public int PageSize { get; set; } = 10;

        public int TotalPages => (int)Math.Ceiling(decimal.Divide(Count, PageSize));

        public bool EnablePrevious => CurrentPage > 1;

        public bool EnableNext => CurrentPage < TotalPages;
    }


    public class ResponseModel
    {
       public class ResponseData<T> : BaseStatus
        {
            public T items { get; set; }
        }
    }


    public class ResponsePaginationModel
    {
        public class ResponsePaginationData<T> : BasePagination
        {
            public T items { get; set; }
        }
    }


}
