using Dapper;
using Utility.ResultModel;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using static Utility.DataModel.ResponseModel;

namespace Utility.Repository
{
    public class DBConnectorRepository : IDBConnectorRepository
    {
        IConfiguration _configuration;

        public DBConnectorRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IDbConnection connection
        {
            get
            {
                var cn = _configuration.GetConnectionString("guesapp");
                return new SqlConnection(cn);
            }
        }
        public async Task<bool> ExecuteData(Dictionary<string, object> param, string storeProcedure)
        {
            int rowAffected = 0;
            using (IDbConnection con = connection)
            {
                if (con.State == ConnectionState.Closed)
                    con.Open();
                DynamicParameters dynamicParameters = new DynamicParameters();
                foreach(string paramName in param.Keys)
                {
                    object paramValue = param[paramName];
                    dynamicParameters.Add(paramName, paramValue); ;
                }
                dynamicParameters.Add("@StatusID", DbType.Int32, direction: ParameterDirection.Output);
                dynamicParameters.Add("@StatusMessage", "", DbType.String, direction: ParameterDirection.Output, size: int.MaxValue);
                rowAffected = await con.ExecuteAsync(storeProcedure, dynamicParameters, commandType: CommandType.StoredProcedure);
                if (rowAffected > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            
        }

        public async Task<List<T>> GetListData<T>(Dictionary<string, object> param, string storeProcedure)
        {
            using (IDbConnection con = connection)
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
                    var result = (await con.QueryAsync<T>(storeProcedure, dynamicParameters, commandType: CommandType.StoredProcedure)).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    var x = ex.Message;
                    return null;
                }
            }
         }

        public async Task<T> GetSingleData<T>(Dictionary<string, object> param, string storeProcedure)
        {
            using (IDbConnection con = connection)
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
                var result = (await con.QueryAsync<T>(storeProcedure, dynamicParameters, commandType: CommandType.StoredProcedure)).FirstOrDefault();
                return result;
               
            }
        }


        public async Task<StatusResult> Execute(Dictionary<string, object> param, string storeProcedure)
        {
            int rowAffected = 0;
            using (IDbConnection con = connection)
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
               
                return result;
            }

        }

        //public async Task<T> GetColData<T>(Dictionary<string, object> param, string storeProcedure)
        //{
        //    using (IDbConnection con = connection)
        //    {
        //        if (con.State == ConnectionState.Closed)
        //            con.Open();
        //        try
        //        {
        //            DynamicParameters dynamicParameters = new DynamicParameters();
        //            foreach (string paramName in param.Keys)
        //            {
        //                object paramValue = param[paramName];
        //                dynamicParameters.Add(paramName, paramValue); ;
        //            }
        //            dynamicParameters.Add("@StatusID", DbType.Int32, direction: ParameterDirection.Output);

        //            dynamicParameters.Add("@StatusMessage", "", DbType.String, direction: ParameterDirection.Output, size: int.MaxValue);
        //            var reader = await con.QueryMultipleAsync(storeProcedure, dynamicParameters, commandType: CommandType.StoredProcedure);
        //           // var result = (await con.QueryAsync<T>(storeProcedure, dynamicParameters, commandType: CommandType.StoredProcedure)).ToList();
        //           var data= reader.Read<CategoryOne>().ToList();
        //            return result;
        //        }
        //        catch (Exception ex)
        //        {
        //            var x = ex.Message;
        //            return null;
        //        }
        //    }
        //}


        public async Task<ResponseData<List<T>>> GetTotalListData<T>(Dictionary<string, object> param, string storeProcedure)
        {
            var response = new ResponseData<List<T>>();
            using (IDbConnection con = connection)
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
                    var result = (await con.QueryAsync<T>(storeProcedure, dynamicParameters, commandType: CommandType.StoredProcedure)).ToList();
                    int id = dynamicParameters.Get<int>("TotalCount");
                    response.totalCount = id;
                    response.items = result;
                    return response;
                }
                catch (Exception ex)
                {
                    var x = ex.Message;
                    return response;
                }
            }
        }
    }
}
