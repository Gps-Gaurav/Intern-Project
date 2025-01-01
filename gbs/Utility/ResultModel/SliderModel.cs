using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Utility.ResultModel
{
    public class SliderModel
    {
        public int id { get; set; }
        public string title { get; set; }
        [DataType(DataType.MultilineText)]
        
        public string text { get; set; }
        public string image { get; set; }
        public string text_position { get; set; }
        public int status { get; set; } = 0;

        public string slug { get; set; }

        public string type { get; set; }
        public string button_text { get; set; } = "Explore Product";
    }
}