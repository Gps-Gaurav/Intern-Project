using System;
using System.Collections.Generic;
using System.Text;

namespace Utility
{
    public class SearchModel
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public string Search { get; set; }
        public string SPName { get; set; }
        public string JSNData { get; set; }
        public int id { get; set; } = 0;
        public string ColumnName { get; set; }
        public string ColumnValue { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }

        public string TableName { get; set; }
        public string FilterColumn { get; set; }
        public string SearchColumn { get; set; }
    }
}
