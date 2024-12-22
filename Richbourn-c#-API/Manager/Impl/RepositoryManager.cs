using Utility;
using DataAccess.Interface;
using Manager.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Impl
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly IDBConnectorRepository DataAccess = null;
        public RepositoryManager(IDBConnectorRepository dataAccess)
        {
            DataAccess = dataAccess;
        }

        public async Task<APIResponse> DeleteData(Dictionary<string, object> param, string storeProcedure)
        {
            var result = await DataAccess.ExecuteData(param, storeProcedure);
            if (result.items)
            {
                return new APIResponse(ResponseCode.SUCCESS, "Record Found", result.items);
            }
            else
            {
                return new APIResponse(ResponseCode.ERROR, "No Record Found");
            }
        }

        public async Task<ResponseData<List<T>>> GetAllData<T>(Dictionary<string, object> param, string storeProcedure)
        {

            return await DataAccess.GetListData<T>(param, storeProcedure);
           
        }

        public async Task<APIResponse> InsertData(Dictionary<string, object> param, string storeProcedure)
        {

            var result = await DataAccess.Execute(param, storeProcedure);
            if (result.items != null)
            {
                return new APIResponse(ResponseCode.SUCCESS, "Record Found", result.items, result.Status, result.Message, result.totalCount);
            }
            else
            {
                return new APIResponse(ResponseCode.ERROR, "No Record Found");
            }
        }
    }
}
