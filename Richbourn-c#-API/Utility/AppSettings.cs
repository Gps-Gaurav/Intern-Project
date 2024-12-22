using System;
using System.Collections.Generic;
using System.Text;

namespace Utility
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public int TokenValidityDay { get; set; }
        public string DefaultTokenUsername { get; set; }
        public string DefaultTokenPassword { get; set; }
        public string BucketName { get; set; }
        public string Region { get; set; }
        public string AwsAccessKey { get; set; }
        public string AwsSecretAccessKey { get; set; }
        public string AwsSessionToken { get; set; }
    }
}
