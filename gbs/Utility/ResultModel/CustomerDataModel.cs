using Utility.PostModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Utility.DataModel.ResponseModel;

namespace Utility.ResultModel
{
    public class CustomerDataModel
    {
        public List<CountryModel> country { get; set; }
        public List<StateModel> states { get; set; }
        public List<PostCustomer> customer { get; set; }
    }
}
