
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace DataAccess.Interface
{
    public interface IDBConnectorRepository
    {
        Task<ResponseData<T>> GetSingleData<T>(Dictionary<string, object> param, string storeProcedure);
        Task<ResponseData<List<T>>> GetListData<T>(Dictionary<string, object> param, string storeProcedure);
        Task<ResponseData<bool>> ExecuteData(Dictionary<string, object> param, string storeProcedure);
        Task<ResponseData<StatusResult>> Execute(Dictionary<string, object> param, string storeProcedure);
    }
}
