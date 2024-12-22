using Utility;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Manager.Interface
{
    public interface IRepositoryManager
    {
        Task<ResponseData<List<T>>> GetAllData<T>(Dictionary<string, object> param, string storeProcedure);
        Task<APIResponse> InsertData(Dictionary<string, object> param, string storeProcedure);
        Task<APIResponse> DeleteData(Dictionary<string, object> param, string storeProcedure);
    }
}
