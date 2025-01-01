using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Utility.DataModel;
using Utility.Models;
using Utility.PostModel;
using Utility.ResultModel;
using static Utility.DataModel.ResponseModel;

namespace GbsRetail.Controllers
{
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IConfiguration _configuration;
        public AccountController(ILogger<AccountController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;

        }
        [HttpGet]
        [Route("login")]
        public IActionResult Login(string ReturnUrl="")
        {
            ViewBag.ReturnUrl = ReturnUrl;
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(PostLoginModel model)
        {
            var response = new ResponseData<LoginModel>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                {"@username",model.username},
                 {"@password",model.pass}
            };

            response = await process.SingleResponseData<LoginModel>(param, "sp_ui_admin_get_login");
            if (response.items != null && response.items.id > 0)
            {
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, response.items.id.ToString()),
            new Claim("FullName", response.items.username),
            new Claim(ClaimTypes.Role, "Guest"),
        };
                var authProperties = new AuthenticationProperties
                {
                    //AllowRefresh = <bool>,
                    // Refreshing the authentication session should be allowed.

                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(10),
                    // The time at which the authentication ticket expires. A 
                    // value set here overrides the ExpireTimeSpan option of 
                    // CookieAuthenticationOptions set with AddCookie.

                    IsPersistent = true,
                    // Whether the authentication session is persisted across 
                    // multiple requests. When used with cookies, controls
                    // whether the cookie's lifetime is absolute (matching the
                    // lifetime of the authentication ticket) or session-based.

                    //IssuedUtc = <DateTimeOffset>,
                    // The time at which the authentication ticket was issued.

                    //RedirectUri = <string>
                    // The full path or absolute URI to be used as an http 
                    // redirect response value.
                };
                var claimsIdentity = new ClaimsIdentity(
         claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(
         CookieAuthenticationDefaults.AuthenticationScheme,
         new ClaimsPrincipal(claimsIdentity),
         authProperties);
                if (!string.IsNullOrEmpty(model.ReturnUrl))
                {
                    return Redirect(model.ReturnUrl);
                }
                   return Redirect("/my-account");

               

            }
            return View();
        }


        public IActionResult Register()
        {
          
            return View();
        }




       
        [HttpPost]
        public async Task<IActionResult> Register(UserRegisterModel model)
        {
            var response = new ResponseData<StatusResult>();
            var process = new ProcessServices(_configuration);
            var param = new Dictionary<string, object>
            {
                {"@mobile",model.mobile },
                {"@password",model.password },
                {"@firstname",model.firstname },
                {"@lastname",model.lastname },
                {"@email",model.email },
                {"@birthday","2022-01-01" }
            };
            response = await process.Execute<StatusResult>(param, "sp_ui_user_add_customer");
            if (response.Status.Equals("1"))
            {

                return RedirectToAction("Login");
            }

            return View();
        }


        public async Task<IActionResult> LogOut()
        {
            //SignOutAsync is Extension method for SignOut    
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            //Redirect to home page    
            return LocalRedirect("/");
        }
    }
}

