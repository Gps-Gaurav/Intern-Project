
using Utility.Repository;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Utility.DataModel.ResponseModel;

namespace Utility.DataModel
{
    public class ProcessServices
    {
        private IDBConnectorRepository _repository = null;

        public ProcessServices(IConfiguration configuration)
        {
            this._repository = new DBConnectorRepository(configuration);
        }
        public string successMessage = "success";
        public string errorMessage = "failed";

        public async Task<ResponseData<List<T>>> ListResponseData<T>(Dictionary<string, object> param, string procedureName) where T : new()
        {
            var response = new ResponseData<List<T>>();
            try
            {
               
                    var data = await _repository.GetListData<T>(param, procedureName);
                    response.items = data;
                    if (data.Count()>0)
                    {
                        response.Status = "1";
                        response.Message = successMessage;
                    }
                    else
                    {
                        response.Status = "0";
                        response.Message = errorMessage;
                    }
                
                
            }
            catch (Exception ex)
            {
                response = ResponseDetails<List<T>>(response, ex);
            }

            return response;
        }

         public async Task<ResponseData<T>> SingleResponseData<T>(Dictionary<string, object> param,string procedureName) where T:new()
        {
            var response = new ResponseData<T>();
            try
            {
               
                    var data = await _repository.GetSingleData<T>( param, procedureName);
                    response.items = data;
                    if(data != null)
                    {
                        response.Status = "1";
                        response.Message = successMessage;
                    }
                    else
                    {
                        response.Status = "0";
                        response.Message = errorMessage;
                    }
               
            }
            catch(Exception ex)
            {
                response = ResponseDetails<T>(response, ex);
            }

            return response;
        }


       
        public async Task<ResponseData<T>> ExecuteNonQuery<T>(Dictionary<string, object> param, string procedureName) where T : new()
        {
            var response = new ResponseData<T>();
            try
            {
               
                    var data = await _repository.ExecuteData( param, procedureName);
                    response.items = (T)Convert.ChangeType(data,typeof(T));
                    if (data)
                    {
                        response.Status = "1";
                        response.Message = successMessage;
                    }
                    else
                    {
                        response.Status = "0";
                        response.Message = errorMessage;
                    }
               
            }
            catch (Exception ex)
            {
                response = ResponseDetails<T>(response,  ex);
            }

            return response;
        }


        public async Task<ResponseData<T>> Execute<T>(Dictionary<string, object> param, string procedureName) where T : new()
        {
            var response = new ResponseData<T>();
            try
            {

                var data = await _repository.Execute(param, procedureName);
                response.items = (T)Convert.ChangeType(data, typeof(T));
                if (data.StatusID>0)
                {
                    response.Status = "1";
                    response.Message = successMessage;
                }
                else
                {
                    response.Status = "0";
                    response.Message = errorMessage;
                }

            }
            catch (Exception ex)
            {
                response = ResponseDetails<T>(response, ex);
            }

            return response;
        }



        public ResponseData<T> ResponseDetails<T>(ResponseData<T> r,Exception ex)
        {
           
            r.Status = "0";
            r.Message = errorMessage + "@" + ex.ToString();
            return r;
        }


        public async Task<ResponseData<List<T>>> ListTotalResponseData<T>(Dictionary<string, object> param, string procedureName) where T : new()
        {
            var response = new ResponseData<List<T>>();
            try
            {

                var data = await _repository.GetTotalListData<T>(param, procedureName);
                response = data;
                


            }
            catch (Exception ex)
            {
                response = ResponseDetails<List<T>>(response, ex);
            }

            return response;
        }

    }
} 
