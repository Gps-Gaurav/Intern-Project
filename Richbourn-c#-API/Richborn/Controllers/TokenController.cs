using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Utility;

namespace CarRentalAPI.API.Controllers
{
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly AppSettings _appSettings;

        public TokenController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }
        [HttpPost]
        [Route(APIEndpoint.DefaultRoute)]
        public ActionResult Post(AuthenticateModel model)
        {
            try
            {
                var defaultUsername = _appSettings.DefaultTokenUsername;
                var defaultPassword = _appSettings.DefaultTokenPassword;
                //Note: Implement your own logic to get username/passoward and validate
                if (model.Username == defaultUsername && model.Password == defaultPassword)
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                    var day = _appSettings.TokenValidityDay;
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                         new Claim(ClaimTypes.Name, "1"),
                 new Claim("FullName",model.Username),
                 new Claim(ClaimTypes.Role,"admin"),
                 new Claim(ClaimTypes.PrimarySid,"2"),
                        }),
                        Expires = DateTime.UtcNow.AddDays(day),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    if (token != null)
                    {
                        TokenResponse tokenResponse = new TokenResponse()
                        {
                            AccessToken = tokenHandler.WriteToken(token),
                            ValidFrom = token.ValidFrom,
                            ValidTo = token.ValidTo
                        };

                        return Ok(new APIResponse(ResponseCode.SUCCESS, "Bearer Token Generated", tokenResponse));
                    }

                }

                return StatusCode(401, new APIResponse(ResponseCode.ERROR, "Invalid request"));

            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, ex.Message));
            }
        }
    }
    

    public class TokenResponse
    {
        public string AccessToken { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
    }
}