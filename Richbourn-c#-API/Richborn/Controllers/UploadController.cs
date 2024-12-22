
using Manager.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using Utility;

namespace Richborn.Controllers
{
	[Authorize]
    [ApiController]
    public class UploadController : ControllerBase
    {
        IUploadManager Manager;
        ValidationResult ValidationResult;
      
        public UploadController(IUploadManager manager)
        {
            Manager = manager;
           
            ValidationResult = new ValidationResult();
        }
        [HttpPost]
        [AllowAnonymous]
        [Route(APIEndpoint.DefaultRoute + "/upload")]
        public ActionResult Post(List<IFormFile> files)
        {
           
            if (HttpContext.Request.Form.Files.Count > 0)
            {
                List<IFormFile> imageList = new List<IFormFile>();
                var filesFromHttp = HttpContext.Request.Form.Files;
                foreach (var file in filesFromHttp)
                {
                    imageList.Add(file);
                }
                return Ok(Manager.UploadImages(imageList));
            }
            else
            {
                return Ok(Manager.UploadImages(files));
            }
        }
    }
}
