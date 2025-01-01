using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Imgur.API.Authentication;
using Imgur.API.Endpoints;
using Newtonsoft.Json;

namespace Utility.Models
{
    public class CloudImageUpload
    {
        public async Task<string> UploadImage(Stream fileStream, string filePath)
        {
            try
            {
                var apiClient = new ApiClient("f60313a7c967700");
                var httpClient = new HttpClient();
                var imageEndpoint = new ImageEndpoint(apiClient, httpClient);
                var imageUpload = await imageEndpoint.UploadImageAsync(fileStream);


                return imageUpload.Link;

            }
            catch (Exception ex)
            {
                return "";
            }
        }


        public async Task<string> UploadIformImage(string fileStream, string filePath)
        {
            try
            {
               


                var formContent = new FormUrlEncodedContent(new[]
                {
                 new KeyValuePair<string, string>("key", "9b187b05bec4b009bc5c857e04c586a2"),
                 new KeyValuePair<string, string>("image", fileStream),


                });

                var myHttpClient = new HttpClient();
                var response = await myHttpClient.PostAsync(new Uri("https://api.imgbb.com/1/upload?key=9b187b05bec4b009bc5c857e04c586a2").ToString(), formContent);
                if (response.IsSuccessStatusCode) { 
                   string resultJson = response.Content.ReadAsStringAsync().Result;
                    var data = JsonConvert.DeserializeObject<ImgModel>(resultJson);
                    if (data.success)
                    {
                        return data.data.url;
                    }
                }
                return "";

            }
            catch (Exception ex)
            {
                return "";
            }
        }

      
    }


    public class Data
    {
        public string id { get; set; }
        public string title { get; set; }
        public string url_viewer { get; set; }
        public string url { get; set; }
        public string display_url { get; set; }
        public string width { get; set; }
        public string height { get; set; }
        public int size { get; set; }
        public string time { get; set; }
        public string expiration { get; set; }
        public Image image { get; set; }
        public Thumb thumb { get; set; }
        public string delete_url { get; set; }
    }

    public class Image
    {
        public string filename { get; set; }
        public string name { get; set; }
        public string mime { get; set; }
        public string extension { get; set; }
        public string url { get; set; }
    }

    public class ImgModel
    {
        public Data data { get; set; }
        public bool success { get; set; }
        public int status { get; set; }
    }

    public class Thumb
    {
        public string filename { get; set; }
        public string name { get; set; }
        public string mime { get; set; }
        public string extension { get; set; }
        public string url { get; set; }
    }
}
