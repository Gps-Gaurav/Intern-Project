using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.DataModel
{
    public class PostPaginationModel
    {
        public string SearchColumn { get; set; } = "";
        public string SearchValue { get; set; } = "";
        public object filter { get; set; } 
        public int pageNumber { get; set; }
        public int pageSize { get; set; } = 10;
        public string sortField { get; set; }
        public string SortOrder { get; set; }
        public int id { get; set; }
        public string refer { get; set; }
    }
}
