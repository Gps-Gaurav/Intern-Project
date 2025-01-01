using Utility.PostModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static Utility.DataModel.ResponseModel;

namespace Utility.ResultModel
{
    public partial class ItemDropdownModel
    {
        public List<BrandModel> brands { get; set; }
        public List<CategoryModel> category { get; set; }
        public List<UnitModel> units { get; set; }
        public List<TaxModel> tax { get; set; }
        public List<PostItem> item { get; set; }
        public List<GalleryModel> gallery { get; set; }
    }


    public partial class ItemDetailsModel
    {
       
        public List<ItemModel> item { get; set; }
        public List<GalleryModel> gallery { get; set; }
        public List<SliderModel> faqs { get; set; }
        public List<ItemModel> related_items { get; set; }
    }
}
