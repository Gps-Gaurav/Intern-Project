using Microsoft.AspNetCore.Http;


using System;
using System.Collections.Generic;
using System.IO;

using System.Net;

using System.Data;
using System.Data.SqlClient;
using System.Text;

using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;

using Microsoft.Extensions.Configuration;
using Utility;
using Manager.Interface;

namespace Manager.Impl
{
    public class UploadManager : IUploadManager
    {

       
        IConfiguration _configuration;
        private IDocumentStore _documentStore;
        private readonly IAppConfiguration _appConfiguration;
        public UploadManager(IConfiguration configuration,  IAppConfiguration appConfiguration)

        {
            _configuration = configuration;
         
            _appConfiguration = appConfiguration;

        }
        public APIResponse UploadImages(List<IFormFile> images)
        {
            Dictionary<string, string> uploadedFilePath = new Dictionary<string, string>();
            _documentStore = new DocumentStore(_appConfiguration);


            if (images.Count > 0)
            {
                foreach (var img in images)
                {
                    try
                    {

                        var result = _documentStore.UploadDocument(img);

                        //  var uniqueFileName = Guid.NewGuid() + Path.GetExtension(img.FileName);
                        // var path= UploadFtp(img.OpenReadStream(), img.FileName);

                        //  uploadedFilePath.Add(img.FileName, path);
                        //  whatsappService(path);
                        //var dir = Path.Combine(Directory.GetCurrentDirectory(), "uploadimage");
                        //if (!Directory.Exists(dir))
                        //{
                        //    Directory.CreateDirectory(dir);
                        //}
                        //var uploads = Path.Combine(dir, uniqueFileName);
                        //using (var stream = new FileStream(uploads, FileMode.OpenOrCreate))
                        //{
                        //    img.CopyTo(stream);
                        //    uploadedFilePath.Add(img.FileName, uniqueFileName);

                        //}
                        uploadedFilePath.Add("https://richborn.s3.ap-south-1.amazonaws.com/" + img.FileName, "https://richborn.s3.ap-south-1.amazonaws.com/" + img.FileName);
                    }
                    catch (Exception ex)
                    {
                        uploadedFilePath.Add(img.FileName, "Error : " + ex.Message);
                    }

                }
                return new APIResponse(ResponseCode.SUCCESS, "Image Uploaded Created", uploadedFilePath);
            }
            else
            {
                return new APIResponse(ResponseCode.ERROR, "No image found");
            }
        }

        private  string UploadFtp(Stream fileStream,string filename)
        {
            //FtpWebRequest request = (FtpWebRequest)WebRequest.Create("ftp://richborn.com");
            //request.Method = WebRequestMethods.Ftp.UploadFile;

            //// This example assumes the FTP site uses anonymous logon.
            //request.Credentials = new NetworkCredential("richborn", "NEnUG4a0S@@nn*s");

            //// Copy the contents of the file to the request stream.

            ////await using Stream requestStream = request.GetRequestStream();
            //using (Stream ftpStream = request.GetRequestStream())
            //{
            //    fileStream.CopyTo(ftpStream);
            //}

            //using FtpWebResponse response = (FtpWebResponse)request.GetResponse();
            //Console.WriteLine($"Upload File Complete, status {response.StatusDescription}");



           // string PureFileName = new FileInfo("TotalAmount").Name;
            String uploadUrl = String.Format("{0}/{1}/{2}", "ftp://ftp.richborn.com", "/public_html", filename);
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(uploadUrl);
            request.Method = WebRequestMethods.Ftp.UploadFile;

            // This example assumes the FTP site uses anonymous logon.
            request.Credentials = new NetworkCredential("richborn", "NEnUG4a0S@@nn*s");

            //request.Proxy = null;
            //request.KeepAlive = true;
            //request.UseBinary = true;
            //request.Method = WebRequestMethods.Ftp.UploadFile;

            // Copy the contents of the file to the request stream.
            //StreamReader sourceStream = new StreamReader(@"D:\Sapmle applications\TotalAmount.txt");
            //byte[] fileContents = Encoding.UTF8.GetBytes(sourceStream.ReadToEnd());
            //sourceStream.Close();
            //request.ContentLength = fileContents.Length;

            //Stream requestStream = request.GetRequestStream();
            //fileStream.CopyTo(requestStream);
            ////requestStream.Write(fileContents, 0, fileContents.Length);
            ////requestStream.Close();

            //FtpWebResponse response = (FtpWebResponse)request.GetResponse();

            //Console.WriteLine("Upload File Complete, status {0}", response.StatusDescription);

            using (Stream ftpStream = request.GetRequestStream())
            {
                fileStream.CopyTo(ftpStream);
            }

            using FtpWebResponse response = (FtpWebResponse)request.GetResponse();



            /*##############################################################################################*/


            return "https://richborn.com/" + filename;

        }

      

    }
}
