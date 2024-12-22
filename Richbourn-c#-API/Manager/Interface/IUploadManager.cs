using Microsoft.AspNetCore.Http;

using System.Collections.Generic;
using Utility;

namespace Manager.Interface
{
    public interface IUploadManager
    {
        APIResponse UploadImages(List<IFormFile> images);
    }
}
