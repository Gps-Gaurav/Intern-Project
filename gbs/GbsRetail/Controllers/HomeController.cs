
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Paytm;
using System.Diagnostics;
using System.Net;
using Utility.DataModel;
using Utility.Models;
using Utility.PostModel;
using Utility.ResultModel;
using X.PagedList;
using static Utility.DataModel.ResponseModel;
using static Utility.DataModel.ResponsePaginationModel;

namespace GbsRetail.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            
        }

        public async Task<IActionResult> Index()
        {
            var response = new ResponseData<List<ItemModel>>();
            var process = new Utility.DataModel.ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {

            };
            response = await process.ListResponseData<ItemModel>(param, "sp_ui_admin_get_item_category");
            var slider = await process.ListResponseData<SliderModel>(param, "sp_ui_admin_get_slider");
            var brand = await process.ListResponseData<BrandModel>(param, "sp_ui_front_get_brand");
            var review = await process.ListResponseData<ReviewModel>(param, "sp_ui_admin_get_review");
            var blog = await process.ListResponseData<BlogModel>(param, "sp_ui_admin_get_blog");
            param = new Dictionary<string, object>
            {
                {"@page_name" ,"home"}
            };
            var page = await process.SingleResponseData<PageSettingsModel>(param, "sp_ui_admin_get_page_settings");
           
            var brand_item = response.items.GroupBy(m => new { m.brand_id, m.brand_name }).
              Select(g => new BrandItemViewModel()
              {
                  brand_id = g.Key.brand_id,
                  brand_name = g.Key.brand_name,
                  items = g.ToList()

              }).ToList();
            ViewBag.branditem = brand_item;
            ViewBag.slider = slider.items;
            ViewBag.brand = brand.items;
            ViewBag.page = page.items;
            ViewBag.blog = blog.items;
            ViewBag.review = review.items;
            await Common("Home");
            return View();
        }

        [HttpGet]
        [Route("privacy-policy")]
        public async Task<IActionResult> Privacy()
        {
            var response = new ResponseData<List<SliderModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                 {"@status",4}
            };
            response = await process.ListResponseData<SliderModel>(param, "sp_ui_admin_get_slider");
            await Common("privacy-policy");
            return View(response.items);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        [HttpGet]
        [Route("product")]
        public async Task<IActionResult> Product(int pageIndex=1, int pageSize=10, int brand = 0,string category_name="", string gender = "", string search = "", string filter = "")
        {
            ViewBag.brand = brand;
            ViewBag.gender = gender;
            ViewBag.search = search;
            ViewBag.category_name = category_name;
            var response = new ResponseData<List<ItemModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                {"@brand_id",brand },
                {"@category_name",category_name ==null?"":category_name},
                {"@gender",gender==null?"":gender },
                {"@search",search==null?"":search },
                {"@filter",filter==null?"":filter },
                {"@Offset", (pageIndex*pageSize) },
                {"@ItemsPerPage",pageSize }
            };
           response = await process.ListTotalResponseData<ItemModel>(param, "sp_ui_front_get_item_ajax");
            var listpaged=new ResponsePaginationData<List<ItemModel>>();
            //var listPaged = GetPagedNames(pageIndex, response.items);
            listpaged.Count = response.totalCount;
            listpaged.items = response.items;
            listpaged.CurrentPage = pageIndex;
            await Common("product");
            return View(listpaged);
        }



        [HttpGet]
        [Route("product-details")]
        public async Task<IActionResult> ProductDetails(string modelno)
        {
            var response = new ResponseData<ItemDetailsModel>();

            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                  {"@sku",modelno},
            };
            var json = await process.ListResponseData<DataViewModel>(param, "sp_ui_admin_get_item_by_modelno");
            if (json.items.Count > 0)
            {
                var info = JsonConvert.DeserializeObject<List<ItemDetailsModel>>(json.items.FirstOrDefault().Data);
                if (info.Count > 0)
                {
                    response.Status = json.Status;
                    response.Message = json.Message;
                    response.items = info.FirstOrDefault();

                }
            }
            await Common("product-details");
            return View(response.items);
        }



        [HttpGet]
        [Route("about-us")]
        public async Task<IActionResult> About()
        {
            var response = new ResponseData<List<SliderModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                 {"@status",8}
            };
            response = await process.ListResponseData<SliderModel>(param, "sp_ui_admin_get_slider");
            await Common("about-us");
            return View(response.items);
        }

        [HttpGet]
        [Route("contact-us")]
        public async Task<IActionResult> Contact()
        {
            var response = new ResponseData<List<SliderModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                 {"@status",9}
            };
            response = await process.ListResponseData<SliderModel>(param, "sp_ui_admin_get_slider");
            await Common("contact-us");
            return View(response.items);
        }

        [HttpGet]
        [Route("faqs")]
        public async Task<IActionResult> Faq()
        {
            var response = new ResponseData<List<SliderModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                 {"@status",3}
            };
            response = await process.ListResponseData<SliderModel>(param, "sp_ui_admin_get_slider");
            await Common("faqs");
            return View(response.items);
        }

        [HttpGet]
        [Route("blog-details/{id}")]
        public async Task<IActionResult> BlogDetails(int id)
        {
            var response = new ResponseData<List<SliderModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                 {"@status",3}
            };
            response = await process.ListResponseData<SliderModel>(param, "sp_ui_admin_get_slider");
            await Common("blog-details");
            return View(response.items);
        }


        #region pagedlist
        protected IPagedList<ItemModel> GetPagedNames(int? page, List<ItemModel> items)
        {
            // return a 404 if user browses to before the first page
            if (page.HasValue && page < 1)
                return null;

            // retrieve list from database/whereverand
            var listUnpaged = items;

            // page the list
            const int pageSize = 20;
            var listPaged = listUnpaged.ToPagedList(page ?? 1, pageSize);

            // return a 404 if user browses to pages beyond last page. special case first page if no items exist
            if (listPaged.PageNumber != 1 && page.HasValue && page > listPaged.PageCount)
                return null;

            return listPaged;
        }
        #endregion

        #region
        [HttpPost]
        public async Task<JsonResult> cartupdate(CartModel model)
        {
            var count = 0;
            if (Request.Cookies["cart"] != null)
            {
                var cookie = Request.Cookies["cart"];
                List<CartModel> carts = JsonConvert.DeserializeObject<List<CartModel>>(cookie);
                if (carts.Where(m => m.product_id.Equals(model.product_id)).Any())
                {
                    foreach (var item in carts)
                    {
                        if (item.product_id.Equals(model.product_id))
                        {
                            item.qty = item.qty + 1;
                            item.subTotal = item.subTotal + model.price;
                        }
                    }
                }
                else
                {
                    carts.Add(model);
                }

                cookie = JsonConvert.SerializeObject(carts);
                count = carts.Count;
                //Response.Cookies.Delete("cart");
                Write("cart", JsonConvert.SerializeObject(carts));


            }
            else
            {

                var data = new List<CartModel>();
                data.Add(model);
                count = data.Count;
                Write("cart", JsonConvert.SerializeObject(data));
            }

            return Json(new { response = "" + count });
        }


        [HttpGet]
        public async Task<PartialViewResult> cartget()
        {

            var cookies = Request.Cookies["cart"];
            var cartsdata = new List<CartModel>();
            if (cookies != null)
            {
                cartsdata = JsonConvert.DeserializeObject<List<CartModel>>(cookies);
            }

            return PartialView("_cart", cartsdata);
        }

        [HttpPost]
        [Route("update-cart")]
        public async Task<PartialViewResult> UpdateCart(int product_id, string update_type)
        {

            var cookies = Request.Cookies["cart"];
            var cartsdata = new List<CartModel>();
            if (cookies != null)
            {
                cartsdata = JsonConvert.DeserializeObject<List<CartModel>>(cookies);
                if (cartsdata.Count > 0)
                {
                    foreach (var item in cartsdata)
                    {
                        if (item.product_id == product_id)
                        {
                            if (update_type.Equals("add"))
                            {
                                item.qty = item.qty + 1;
                                item.subTotal = item.price * item.qty;
                            }
                            else if (update_type.Equals("remove"))
                            {
                                if (item.qty > 1)
                                {
                                    item.qty = item.qty - 1;
                                }
                                item.subTotal = item.price * item.qty;
                            }
                        }
                    }
                }
            }
            Write("cart", JsonConvert.SerializeObject(cartsdata));
            return PartialView("_cart", cartsdata);
        }

        [HttpPost]
        public async Task<JsonResult> cartplusminus(int product_id, string update_type)
        {
            var count = 0;
            var cookies = Request.Cookies["cart"];
            var cartsdata = new List<CartModel>();
            if (cookies != null)
            {
                cartsdata = JsonConvert.DeserializeObject<List<CartModel>>(cookies);
                if (cartsdata.Count > 0)
                {
                    foreach (var item in cartsdata)
                    {
                        if (item.product_id == product_id)
                        {
                            if (update_type.Equals("add"))
                            {
                                item.qty = item.qty + 1;
                                item.subTotal = item.price * item.qty;
                            }
                            else if (update_type.Equals("remove"))
                            {
                                if (item.qty > 1)
                                {
                                    item.qty = item.qty - 1;
                                    item.subTotal = item.price * item.qty;
                                }
                                else
                                {
                                    cartsdata.Remove(item);
                                   // Write("cart", JsonConvert.SerializeObject(cartsdata));
                                    break;
                                }
                                
                            }
                        }
                    }
                }
            }
            Write("cart", JsonConvert.SerializeObject(cartsdata));


            return Json(new { response = "" + count });
        }



        [HttpPost]
        public async Task<JsonResult> cartdelete(int id)
        {
            var count = 0;
            if (Request.Cookies["cart"] != null)
            {
                var cookie = Request.Cookies["cart"];
                List<CartModel> carts = JsonConvert.DeserializeObject<List<CartModel>>(cookie);
                var cart = carts.FirstOrDefault(m => m.product_id == id);
                if (cart != null)
                {
                    carts.Remove(cart);
                }

                count = carts.Count;
                //Response.Cookies.Delete("cart");
                Write("cart", JsonConvert.SerializeObject(carts));

            }


            return Json(new { response = "" + count });
        }

        public void Write(string key, string value)
        {
            var cookieOptions = new Microsoft.AspNetCore.Http.CookieOptions()
            {
                Path = "/",
                HttpOnly = false,
                IsEssential = true, //<- there
                Expires = DateTime.Now.AddMonths(1),
            };

            Response.Cookies.Append
            (key, value, cookieOptions);

        }


        [HttpGet]
        public async Task<PartialViewResult> getAjaxItem(int pageIndex, int pageSize, int brand = 0, string category_name = "", string gender = "", string search = "", string filter = "")
        {

            var response = new ResponseData<List<ItemModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                {"@brand_id",brand },
                {"@category_name",category_name==null?"":category_name },
                {"@gender",gender==null?"":gender },
                {"@search",search==null?"":search },
                {"@filter",filter==null?"":filter },
                {"@Offset", (pageIndex*pageSize) },
                {"@ItemsPerPage",pageSize }
            };
            response = await process.ListResponseData<ItemModel>(param, "sp_ui_front_get_item_ajax");

            return PartialView("_ajax_item", response.items);
        }
        #endregion

        private async Task Common(string page = "")
        {

            var carts = new List<CartModel>();

            if (Request.Cookies["cart"] != null)
            {
                var cookie = Request.Cookies["cart"];
                carts = JsonConvert.DeserializeObject<List<CartModel>>(cookie);
            }

            var response = new ResponseData<List<SeoModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                {"@page",page },
               
            };
            response = await process.ListResponseData<SeoModel>(param, "sp_ui_front_get_seo");
            if(response.items!=null && response.items.Count > 0)
            {
                var seodata = response.items.FirstOrDefault();
                if (seodata != null)
                {
                    ViewBag.title = seodata.title;
                    ViewBag.description = seodata.description;
                    ViewBag.image = seodata.image;
                    ViewBag.url = seodata.url;
                    ViewBag.site_name = seodata.site_name;
                }
            }
            ViewBag.carts = carts;
        }


        [HttpGet]
        [ViewModel.Authorize(Role.Guest)]
        [Route("checkout")]
        public async Task<IActionResult> Checkout()
        {
            List<CartModel> carts = new List<CartModel>();
            if (Request.Cookies["cart"] != null)
            {
                var cookie = Request.Cookies["cart"];
                carts = JsonConvert.DeserializeObject<List<CartModel>>(cookie);
            }

            if (User.Identity.IsAuthenticated)
            {
                var userid = User.Identity.Name;
                if (!string.IsNullOrEmpty(userid))
                {
                    var response = new ResponseData<List<CustomerModel>>();
                    var process = new ProcessServices(_configuration);
                    var param = new Dictionary<string, object>
                     {
                         {"@id",Convert.ToInt32(userid)}

                     };
                    response = await process.ListResponseData<CustomerModel>(param, "sp_ui_user_get_login_id");
                    if (response.items.Count > 0)
                    {
                        var user = response.items.FirstOrDefault();
                        if (!string.IsNullOrEmpty(user.customeraddress))
                        {
                            var address = JsonConvert.DeserializeObject<List<UserAddressModel>>(user.customeraddress);
                            ViewBag.address = address;
                        }

                        ViewBag.user = user;
                    }
                }
            }
            await Common("checkout");
            return View(carts);
        }

        [HttpGet]
        [Route("cart")]
        public async Task<IActionResult> Cart()
        {
            List<CartModel> carts = new List<CartModel>();
            if (Request.Cookies["cart"] != null)
            {
                var cookie = Request.Cookies["cart"];
                carts = JsonConvert.DeserializeObject<List<CartModel>>(cookie);
            }

            if (Request.Cookies["userid"] != null)
            {
                var userid = Request.Cookies["userid"];
                if (!string.IsNullOrEmpty(userid))
                {
                    var response = new ResponseData<List<CustomerModel>>();
                    var process = new ProcessServices(_configuration);
                    var param = new Dictionary<string, object>
                     {
                         {"@id",Convert.ToInt32(userid)}

                     };
                    response = await process.ListResponseData<CustomerModel>(param, "sp_ui_user_get_login_id");
                    if (response.items.Count > 0)
                    {
                        var user = response.items.FirstOrDefault();
                        if (!string.IsNullOrEmpty(user.customeraddress))
                        {
                            var address = JsonConvert.DeserializeObject<List<UserAddressModel>>(user.customeraddress);
                            ViewBag.address = address;
                        }

                        ViewBag.user = user;
                    }
                }
            }
            await Common("cart");
            return View(carts);
        }

        [Route("PaytmToken")]
        [HttpPost]
        public async Task<IActionResult> PaytmToken(int customer_id, int address_id, string note)
        {
            try
            {
                List<CartModel> carts = new List<CartModel>();
                if (Request.Cookies["cart"] != null)
                {
                    var cookie = Request.Cookies["cart"];
                    carts = JsonConvert.DeserializeObject<List<CartModel>>(cookie);
                }
                if (carts.Count > 0)
                {
                    List<PostPos> postPos = new List<PostPos>();
                    foreach (var i in carts)
                    {
                        try
                        {
                            PostPos pos = new PostPos();
                            pos.item_id = i.product_id;
                            pos.sales_qty = i.qty;
                            pos.price_per_unit = i.price * i.qty;
                            pos.total_cost = i.price * i.qty;
                            pos.tax_amt = 0;
                            // pos.tax_type = data["tr_tax_type_" + i][0];
                            pos.tax_type = "Inclusive";
                            // pos.tax_id = Convert.ToInt32(data["tr_tax_id_" + i][0]);
                            pos.tax_id = 0;
                            // pos.tax_value = Convert.ToInt32(data["tr_tax_value_" + i][0]);
                            pos.tax_value = 0;
                            pos.description = i.product_name;
                            pos.single_unit_total_cost = pos.price_per_unit;
                            postPos.Add(pos);
                        }
                        catch (Exception ex)
                        {

                        }

                    }

                    var response = new ResponseData<StatusResult>();
                    //var customer_id = Convert.ToInt32(data.TryGetValue("customer_id", out var customer) ? customer[0] : "0");
                    var process = new ProcessServices(_configuration);
                    var status = "Payment_Pending";
                    var amount = carts.Sum(m => m.price * m.qty)+65;
                    var param = new Dictionary<string, object>
               {

                { "@JSON_DATA",JsonConvert.SerializeObject(postPos) },
                { "@customer_id",customer_id },
                { "@subtotal",carts.Sum(m=>m.price*m.qty) },
                { "@round_off",0 },
                { "@grand_total",carts.Sum(m=>m.price*m.qty)+65 },
                { "@status",status },
                { "@note",note },
                {"@address_id",address_id }
            };
                    response = await process.Execute<StatusResult>(param, "sp_ui_admin_add_order_item_json");

                    if (response.items.StatusMessage.Equals("success"))
                    {
                        Write("cart", "");
                        var mid = "PciFxl44295958772034";
                        var mKey = "RX&Vk@o_ezkDQL9B";

                        Dictionary<string, object> body = new Dictionary<string, object>();
                        Dictionary<string, string> head = new Dictionary<string, string>();
                        Dictionary<string, object> requestBody = new Dictionary<string, object>();

                        Dictionary<string, string> txnAmount = new Dictionary<string, string>();
                        txnAmount.Add("value", Convert.ToDecimal(amount).ToString());
                        txnAmount.Add("currency", "INR");
                        Dictionary<string, string> userInfo = new Dictionary<string, string>();
                        userInfo.Add("custId", "cust_" + customer_id);
                        body.Add("requestType", "Payment");
                        body.Add("mid", mid);
                        body.Add("websiteName", "DEFAULT");
                        body.Add("orderId", "ORDERID_" + response.items.StatusID);
                        body.Add("txnAmount", txnAmount);
                        body.Add("userInfo", userInfo);
                        body.Add("callbackUrl", "https://www.gbsinghstore.com/callback");

                        /*
                        * Generate checksum by parameters we have in body
                        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
                        */
                        string paytmChecksum = Checksum.generateSignature(JsonConvert.SerializeObject(body), mKey);

                        head.Add("signature", paytmChecksum);

                        requestBody.Add("body", body);
                        requestBody.Add("head", head);

                        string post_data = JsonConvert.SerializeObject(requestBody);

                        //For  Staging
                        //string url = "https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=ORDERID_98765";

                        //For  Production 
                        string url = string.Format("https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid={0}&orderId=ORDERID_{1}", mid, response.items.StatusID);

                        HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);

                        webRequest.Method = "POST";
                        webRequest.ContentType = "application/json";
                        webRequest.ContentLength = post_data.Length;

                        using (StreamWriter requestWriter = new StreamWriter(webRequest.GetRequestStream()))
                        {
                            requestWriter.Write(post_data);
                        }

                        string responseData = string.Empty;

                        using (StreamReader responseReader = new StreamReader(webRequest.GetResponse().GetResponseStream()))
                        {
                            responseData = responseReader.ReadToEnd();
                            Console.WriteLine(responseData);
                        }
                        var paytmResponse = JsonConvert.DeserializeObject<PaytmResponseModel>(responseData);
                        var token = "";
                        if (paytmResponse.body.resultInfo.resultMsg.Equals("Success"))
                        {
                            token = paytmResponse.body.txnToken;
                        }


                        return Ok(new { status = "success", token = token, order = "ORDERID_" + response.items.StatusID, price = Convert.ToDecimal(amount).ToString() });
                    }

                }

                return Ok(new { status = "fail", token = "", order = "" });

            }
            catch (Exception ex)
            {
                return Ok(new { status = "fail", token = "", order = "" });

            }
        }


        [HttpGet]
        [Route("return-policy")]
        public async Task<IActionResult> Return()
        {
            var response = new ResponseData<List<SliderModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                 {"@status",5}
            };
            response = await process.ListResponseData<SliderModel>(param, "sp_ui_admin_get_slider");

            return View(response.items);
        }

        [HttpGet]
        [Route("delivery-information-of-orders")]
        public async Task<IActionResult> Delivery()
        {
            var response = new ResponseData<List<SliderModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                 {"@status",6}
            };
            response = await process.ListResponseData<SliderModel>(param, "sp_ui_admin_get_slider");

            return View(response.items);
        }


        [ViewModel.Authorize(Role.Guest)]
        [HttpGet]
        [Route("my-account")]
        public async Task<IActionResult> MyAccount()
        {
          
            var response = new ResponseData<List<CustomerModel>>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                {"@user_id",User.Identity.Name}

            };

            var order = await process.ListResponseData<SaleModel>(param, "sp_ui_user_get_order");

            ViewBag.orders = order.items;
            if (TempData["msg"] != null)
            {
                ViewBag.msg = TempData["msg"];
            }
            await Common();
            param = new Dictionary<string, object>
            {
                {"@id",User.Identity.Name}

            };
            response = await process.ListResponseData<CustomerModel>(param, "sp_ui_admin_get_signin");
            if (response.items.Count > 0)
            {
                return View(response.items.FirstOrDefault());

            }
            else
            {
                return View(new CustomerModel());
            }

           
        }

        [ViewModel.Authorize(Role.Guest)]
        [Route("CodOrder")]
        [HttpPost]
        public async Task<IActionResult> CodOrder(UserAddressModel model)
        {
            try
            {
                List<CartModel> carts = new List<CartModel>();
                if (Request.Cookies["cart"] != null)
                {
                    var cookie = Request.Cookies["cart"];
                    carts = JsonConvert.DeserializeObject<List<CartModel>>(cookie);
                }
                if (carts.Count > 0)
                {
                    List<PostPos> postPos = new List<PostPos>();
                    foreach (var i in carts)
                    {
                        try
                        {
                            PostPos pos = new PostPos();
                            pos.item_id = i.product_id;
                            pos.sales_qty = i.qty;
                            pos.price_per_unit = i.price * i.qty;
                            pos.total_cost = i.price * i.qty;
                            pos.tax_amt = 0;
                            // pos.tax_type = data["tr_tax_type_" + i][0];
                            pos.tax_type = "Inclusive";
                            // pos.tax_id = Convert.ToInt32(data["tr_tax_id_" + i][0]);
                            pos.tax_id = 0;
                            // pos.tax_value = Convert.ToInt32(data["tr_tax_value_" + i][0]);
                            pos.tax_value = 0;
                            pos.description = i.product_name;
                            pos.single_unit_total_cost = pos.price_per_unit;
                            postPos.Add(pos);
                        }
                        catch (Exception ex)
                        {

                        }

                    }

                    var response = new ResponseData<StatusResult>();
                    //var customer_id = Convert.ToInt32(data.TryGetValue("customer_id", out var customer) ? customer[0] : "0");
                    var process = new ProcessServices(_configuration);
                    var status = "Payment_Pending";
                    var amount = carts.Sum(m => m.price * m.qty) + 65;
                    var param = new Dictionary<string, object>
               {

                { "@JSON_DATA",JsonConvert.SerializeObject(postPos) },
                { "@customer_id",User.Identity.Name },
                { "@subtotal",carts.Sum(m=>m.price*m.qty) },
                { "@round_off",0 },
                { "@grand_total",carts.Sum(m=>m.price*m.qty)+65 },
                { "@status",status },
                { "@note",model.message },
                {"@address_id",0 }
            };
                    response = await process.Execute<StatusResult>(param, "sp_ui_admin_add_order_item_json");

                    if (response.items.StatusMessage.Equals("success"))
                    {


                        Write("cart", JsonConvert.SerializeObject(new List<CartModel>()));

                        return Ok(new { status = "success", token = "", order = "" });
                    }

                }

                return Ok(new { status = "fail", token = "", order = "" });

            }
            catch (Exception ex)
            {
                return Ok(new { status = "fail", token = "", order = "" });

            }
        }

        [HttpGet]
        [Route("404")]
        public IActionResult PageNotFound()
        {
            string originalPath = "unknown";
            if (HttpContext.Items.ContainsKey("originalPath"))
            {
                originalPath = HttpContext.Items["originalPath"] as string;
            }
            return View();
        }


        [ViewModel.Authorize(Role.Guest)]
        [HttpGet]
        [Route("order-details")]
        public async Task<IActionResult> OrderDetails(string id)
        {
            string decode = EncodeDecode.Base64Decode(id);
            var response = new ResponseData<PosInvoiceModel>();
            var process = new ProcessServices(_configuration);
            ViewBag.sales_id = Int32.Parse(decode);
            var json = await process.ListResponseData<DataViewModel>(new Dictionary<string, object> { { "@sales_id", decode } }, "sp_ui_admin_get_order_invoice");

            if (json.items.Count > 0)
            {
                var info = JsonConvert.DeserializeObject<List<PosInvoiceModel>>(json.items.FirstOrDefault().Data);
                if (info.Count > 0)
                {
                    response.Status = json.Status;
                    response.Message = json.Message;
                    response.items = info.FirstOrDefault();
                }
            }
            return View(response.items);


        }



        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
         
            return View();
        }

    }
}