using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Manager.Interface
{
	public interface IDocumentStore
	{
		byte[] DownloadDocument(string documentName);

		bool UploadDocument(IFormFile file);

		bool DeleteDocument(string fileName, string versionId = "");
	}
}
