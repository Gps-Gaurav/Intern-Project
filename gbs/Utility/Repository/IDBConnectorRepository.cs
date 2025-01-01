using Utility.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Utility.DataModel.ResponseModel;

namespace Utility.Repository
{
   public interface IDBConnectorRepository
    {
        Task<T> GetSingleData<T>(Dictionary<string, object> param, string storeProcedure);
        Task<List<T>> GetListData<T>(Dictionary<string, object> param, string storeProcedure);
        Task<bool> ExecuteData(Dictionary<string, object> param, string storeProcedure);
        Task<StatusResult> Execute(Dictionary<string, object> param, string storeProcedure);
        Task<ResponseData<List<T>>> GetTotalListData<T>(Dictionary<string, object> param, string storeProcedure);

    }
}
