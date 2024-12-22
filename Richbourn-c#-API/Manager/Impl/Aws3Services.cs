using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Manager.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Impl
{
	public class Aws3Services : IAws3Services
	{
		private readonly string _bucketName;
		private readonly IAmazonS3 _awsS3Client;

		public Aws3Services(string awsAccessKeyId, string awsSecretAccessKey, string awsSessionToken, string region, string bucketName)
		{
			_bucketName = bucketName;
			_awsS3Client = new AmazonS3Client(awsAccessKeyId, awsSecretAccessKey, RegionEndpoint.GetBySystemName(region));
		}



		public async Task<byte[]> DownloadFileAsync(string file)
		{
			MemoryStream ms = null;

			try
			{
				GetObjectRequest getObjectRequest = new GetObjectRequest
				{
					BucketName = _bucketName,
					Key = file
				};

				using (var response = await _awsS3Client.GetObjectAsync(getObjectRequest))
				{
					if (response.HttpStatusCode == HttpStatusCode.OK)
					{
						using (ms = new MemoryStream())
						{
							await response.ResponseStream.CopyToAsync(ms);
						}
					}
				}

				if (ms is null || ms.ToArray().Length < 1)
					throw new FileNotFoundException(string.Format("The document '{0}' is not found", file));

				return ms.ToArray();
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task<bool> UploadFileAsync(IFormFile file)
		{
			try
			{
				using (var newMemoryStream = new MemoryStream())
				{
					file.CopyTo(newMemoryStream);

					var uploadRequest = new TransferUtilityUploadRequest
					{
						InputStream = newMemoryStream,
						Key = file.FileName,
						BucketName = _bucketName,
						ContentType = file.ContentType
					};

					var fileTransferUtility = new TransferUtility(_awsS3Client);

					await fileTransferUtility.UploadAsync(uploadRequest);

					return true;
				}
			}
			catch (Exception ex)
			{
				return false;
			}
		}




		public Task<bool> DeleteFileAsync(string fileName, string versionId = "")
		{
			throw new NotImplementedException();
		}
	}
}
