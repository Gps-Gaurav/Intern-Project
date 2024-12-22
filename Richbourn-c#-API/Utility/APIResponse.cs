using System;
using System.Collections.Generic;
using System.Text;

namespace Utility
{
   public class APIResponse
    {
        public APIResponse()
        {

        }
        public APIResponse(ResponseCode code, string message)
        {
            Code = code;
            Message = message;
           
        }
        public APIResponse(ResponseCode code,string message,object data=null)
        {
            Code = code;
            Message = message;
            Document = data;
        }
        public APIResponse(ResponseCode code, string message, object data = null,string statusID="" , string statusMessage="" , int totalCount=0 )
        {
            Code = code;
            Message = message;
            Document = data;
            StatusID = statusID;
            StatusMessage = statusMessage;
            TotalCount = totalCount;
        }
        public ResponseCode Code { get; set; }
        public string Message { get; set; }
        public object Document { get; set; }
        public string StatusID { get; set; }
        public string StatusMessage { get; set; }
       
        public int TotalCount { get; set; }
    }

    public enum ResponseCode
    {
        ERROR=0,
        SUCCESS=1
    }
}
