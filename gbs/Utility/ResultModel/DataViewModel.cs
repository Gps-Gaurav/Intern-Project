using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class DataViewModel
    {
        [Key]
        public string Data { get; set; }
    }
}
