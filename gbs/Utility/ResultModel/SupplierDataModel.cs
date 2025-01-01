using Utility.PostModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Utility.ResultModel
{
    public class SupplierDataModel
    {
        public List<CountryModel> country { get; set; }
        public List<StateModel> states { get; set; }
        public List<PostSupplier> supplier { get; set; }
    }
}
