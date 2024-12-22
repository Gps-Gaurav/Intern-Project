using Manager.Interface;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using Utility;

namespace Manager.Impl
{
	public class AppConfiguration : IAppConfiguration
	{
		// Keep the following details in appsettings.config file or DB or Enivironment variable
		// Get those values from it and assign to the below varibales. Based on the approach , modify the below code.
		private readonly AppSettings _appSettings;
		public AppConfiguration(IOptions<AppSettings> appSettings)
		{
			BucketName = appSettings.Value.BucketName;
			Region = appSettings.Value.Region;
			AwsAccessKey = appSettings.Value.AwsAccessKey;
			AwsSecretAccessKey = appSettings.Value.AwsSecretAccessKey;
			AwsSessionToken = appSettings.Value.AwsSessionToken;
		}

		public string BucketName { get; set; }
		public string Region { get; set; }
		public string AwsAccessKey { get; set; }
		public string AwsSecretAccessKey { get; set; }
		public string AwsSessionToken { get; set; }
	}
}
