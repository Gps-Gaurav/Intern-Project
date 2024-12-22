using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model
{
    public class DataViewModel
    {
        [Key]
        public string Data { get; set; }
    }
}
