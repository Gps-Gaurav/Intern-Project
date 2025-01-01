using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class RepairReportModel
    {
        public int No_of_watch_for_repair { get; set; }
        public int No_of_watch_for_repair_delivered { get; set; }
        public int No_of_watch_sent_csc_stock { get; set; }
        public int No_of_watch_sent_csc_customer { get; set; }
        public int No_of_watch_recieved_csc_stock { get; set; }
        public int No_of_watch_recieved_csc_customer { get; set; }
        public decimal Revenue_sparts { get; set; }
        public decimal Revenue_lc { get; set; }
    }
}
