using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static Utility.DataModel.ResponseModel;

namespace Utility.ResultModel
{
    public partial class POSViewModel
    {
        public List<CategoryModel> category { get; set; }
        public List<CustomerModel> customer { get; set; }
        public List<CountryModel> country { get; set; }
        public List<StateModel> state { get; set; }
        public List<ItemModel> item { get; set; }
        public List<SaleModel> sales { get; set; }

        public string sales_code { get; set; }
    }
}
