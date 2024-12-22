
using Dapper;
using DataAccess.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace DataAccess.Impl
{
    public class DBConnectorRepository : IDBConnectorRepository
    {
        private IHttpContextAccessor _httpContextAccessor;
        private MSSqlDatabase MSSqlDatabase { get; set; }

        public DBConnectorRepository(MSSqlDatabase msSqlDatabase, IHttpContextAccessor httpContextAccessor)
        {
            MSSqlDatabase = msSqlDatabase;
            _httpContextAccessor = httpContextAccessor;

        }
        public async Task<ResponseData<List<T>>> GetListData<T>(Dictionary<string, object> param, string storeProcedure)
        {
            var currentUser = _httpContextAccessor.HttpContext?.User;
            var response = new ResponseData<List<T>>();
            using (IDbConnection con = MSSqlDatabase.CreateConnection().Result)
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                try
                {
                    DynamicParameters dynamicParameters = new DynamicParameters();
                    foreach (string paramName in param.Keys)
                    {
                        object paramValue = param[paramName];
                        dynamicParameters.Add(paramName, paramValue); ;
                    }
                    dynamicParameters.Add("@StatusID", DbType.Int32, direction: ParameterDirection.Output);
                    dynamicParameters.Add("@StatusMessage", "", DbType.String, direction: ParameterDirection.Output, size: int.MaxValue);
                    dynamicParameters.Add("@TotalCount", DbType.Int32, direction: ParameterDirection.Output);
                    dynamicParameters.Add("company_id", currentUser.FindFirst(ClaimTypes.PrimarySid) != null ? currentUser.FindFirst(ClaimTypes.PrimarySid).Value : "0");
                    dynamicParameters.Add("user_id", currentUser.FindFirst(ClaimTypes.Name) != null ? currentUser.FindFirst(ClaimTypes.Name).Value : "0");
                    var result = (await con.QueryAsync<T>(storeProcedure, dynamicParameters, commandType: CommandType.StoredProcedure)).ToList();
                    response.items = result;
                    response.Status = dynamicParameters.Get<int>("StatusID").ToString();
                    response.Message = dynamicParameters.Get<string>("@StatusMessage");
                    response.totalCount = dynamicParameters.Get<int>("TotalCount");
                    return response;
                }
                catch (Exception ex)
                {
                    var x = ex.Message;
                    return null;
                }
            }
        }

        public Task<ResponseData<T>> GetSingleData<T>(Dictionary<string, object> param, string storeProcedure)
        {
            throw new NotImplementedException();
        }

        public async Task<ResponseData<bool>> ExecuteData(Dictionary<string, object> param, string storeProcedure)
        {
            var currentUser = _httpContextAccessor.HttpContext?.User;
            int rowAffected = 0;
            var response = new ResponseData<bool>();
            using (IDbConnection con = MSSqlDatabase.CreateConnection().Result)
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters dynamicParameters = new DynamicParameters();
                foreach (string paramName in param.Keys)
                {
                    object paramValue = param[paramName];
                    dynamicParameters.Add(paramName, paramValue); ;
                }
                dynamicParameters.Add("company_id", currentUser.FindFirst(ClaimTypes.PrimarySid) != null ? currentUser.FindFirst(ClaimTypes.PrimarySid).Value : "0");
                dynamicParameters.Add("user_id", currentUser.FindFirst(ClaimTypes.Name) != null ? currentUser.FindFirst(ClaimTypes.Name).Value : "0");
                rowAffected = await con.ExecuteAsync(storeProcedure, dynamicParameters, commandType: CommandType.StoredProcedure);
                if (rowAffected > 0)
                {
                    response.items = true;
                }
                else
                {

                }

                return response;
            }
        }

        public async Task<ResponseData<StatusResult>> Execute(Dictionary<string, object> param, string storeProcedure)
        {
            var currentUser = _httpContextAccessor.HttpContext?.User;
            int rowAffected = 0;
            var response = new ResponseData<StatusResult>();
            using (IDbConnection con = MSSqlDatabase.CreateConnection().Result)
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters dynamicParameters = new DynamicParameters();
                foreach (string paramName in param.Keys)
                {
                    object paramValue = param[paramName];
                    dynamicParameters.Add(paramName, paramValue); ;
                }
                dynamicParameters.Add("@StatusID", DbType.Int32, direction: ParameterDirection.Output);

                dynamicParameters.Add("@StatusMessage", "", DbType.String, direction: ParameterDirection.Output, size: int.MaxValue);
                dynamicParameters.Add("@TotalCount", DbType.Int32, direction: ParameterDirection.Output);
                dynamicParameters.Add("company_id", currentUser.FindFirst(ClaimTypes.PrimarySid) != null ? currentUser.FindFirst(ClaimTypes.PrimarySid).Value : "0");
                dynamicParameters.Add("user_id", currentUser.FindFirst(ClaimTypes.Name) != null ? currentUser.FindFirst(ClaimTypes.Name).Value : "0");
                rowAffected = await con.ExecuteAsync(storeProcedure, dynamicParameters, commandType: CommandType.StoredProcedure);
                var result = new StatusResult();
                if (rowAffected > 0)
                {
                    result.StatusID = dynamicParameters.Get<int>("StatusID");
                    result.StatusMessage = dynamicParameters.Get<string>("@StatusMessage");
                }
                else
                {
                    result.StatusID = dynamicParameters.Get<int>("StatusID");
                    result.StatusMessage = dynamicParameters.Get<string>("@StatusMessage");
                }
                     response.items = result;
                return response;
            }
        }
    }
}
