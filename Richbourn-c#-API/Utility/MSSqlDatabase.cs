using Dapper;
using Microsoft.AspNetCore.Http;
using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace Utility
{
    public class MSSqlDatabase
    {
        private readonly string _connectionString;
        private readonly string _workconnectionString;
       
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MSSqlDatabase(string connectionString, string workconnectionString, IHttpContextAccessor httpContextAccessor)
        {
            _connectionString = connectionString;
            _workconnectionString = workconnectionString;
            _httpContextAccessor = httpContextAccessor;
            //_application = application;
        }

        public async Task<IDbConnection> CreateConnection()
        {
            var appname = _httpContextAccessor.HttpContext.Request.Headers["application"].ToString();
            if (appname != null && appname.Equals("work"))
            {
                var response = new ResponseData<List<DataViewModel>>();
                using (IDbConnection con = new SqlConnection(_connectionString))
                {
                    if (con.State == ConnectionState.Closed)
                        con.Open();
                    try
                    {
                        DynamicParameters dynamicParameters = new DynamicParameters();
                      
                        dynamicParameters.Add("@StatusID", DbType.Int32, direction: ParameterDirection.Output);
                        dynamicParameters.Add("@StatusMessage", "", DbType.String, direction: ParameterDirection.Output, size: int.MaxValue);
                        dynamicParameters.Add("@TotalCount", DbType.Int32, direction: ParameterDirection.Output);

                        var result = (await con.QueryAsync<DataViewModel>("sp_admin_GetCurrentApplication", dynamicParameters, commandType: CommandType.StoredProcedure)).AsList();
                        if(result!=null && result.Count > 0)
                        {
                            if (result[0].Data!=null && result[0].Data.Equals("work"))
                            {
                                return new SqlConnection(_workconnectionString);
                            }
                            else
                            {
                                return new SqlConnection(_connectionString);
                            }
                        }
                        else
                        {
                            return new SqlConnection(_connectionString);
                        }

                    }
                    catch (Exception ex)
                    {
                        var x = ex.Message;
                       
                        return new SqlConnection(_connectionString);
                    }
                }
               
            }
            else
            {
                return new SqlConnection(_connectionString);
            }
           
        }
       

    }
}
