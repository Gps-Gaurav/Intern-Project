using log4net;
using Manager.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Utility;

namespace Richborn.Controllers
{
  
    [ApiController]
    public class UIController : ControllerBase
    {
        ILog log4Net;
        IRepositoryManager Manager;
        ValidationResult ValidationResult;
        public UIController(IRepositoryManager manager)
        {
            //log4Net = this.Log<ProductCategoryController>();
            Manager = manager;
            ValidationResult = new ValidationResult();
        }
     
        [HttpPost]
        [Route(APIEndpoint.DefaultRoute + "/GetAllData")]
        public async Task<ActionResult> GetAllData(SearchModel model)
        {
            var response = new ResponseData<string>();
            try
            {
                var param = new Dictionary<string, object>
              {
                {"@PageNo",model.PageNo },
                {"@PageSize",model.PageSize },
                {"@Search",model.Search },
                 {"@id",model.id },
              };
                //var result =await Manager.GetAllData<ProductCategoryModel>(param, "sp_get_list_product_category");
                var result = await Manager.GetAllData<DataViewModel>(param, model.SPName);
                if (result.items.Count > 0)
                {
                    var d = result.items.FirstOrDefault().Data;
                    response.items = d;
                    response.Message = result.Message;
                    response.Status = result.Status;
                    response.totalCount = result.totalCount;
                }
               
                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, "Exception", ex.Message));
            }
        }


        [HttpPost]
        [Route(APIEndpoint.DefaultRoute + "/GetAllFilterData")]
        public async Task<ActionResult> GetAllFilterData(SearchModel model)
        {
            var response = new ResponseData<string>();
            try
            {
                var param = new Dictionary<string, object>
              {
                {"@PageNo",model.PageNo },
                {"@PageSize",model.PageSize },
                {"@Search",model.Search },
                {"@ColumnName",model.ColumnName },
                {"@ColumnValue",model.ColumnValue },
                {"@id",model.id },
              };
                //var result =await Manager.GetAllData<ProductCategoryModel>(param, "sp_get_list_product_category");
                var result = await Manager.GetAllData<DataViewModel>(param, model.SPName);
                if (result.items.Count > 0)
                {
                    var d = result.items.FirstOrDefault().Data;
                    response.items = d;
                    response.Message = result.Message;
                    response.Status = result.Status;
                    response.totalCount = result.totalCount;
                }

                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, "Exception", ex.Message));
            }
        }

        [HttpPost]
        [Route(APIEndpoint.DefaultRoute + "/GetAllSortData")]
        public async Task<ActionResult> GetAllSortData(SearchModel model)
        {
            var response = new ResponseData<string>();
            try
            {
                var param = new Dictionary<string, object>
              {
                {"@PageNo",model.PageNo },
                {"@PageSize",model.PageSize },
                {"@Search",model.Search },
                {"@ColumnName",model.ColumnName },
                {"@ColumnValue",model.ColumnValue },
                {"@SortColumn",model.SortColumn },
                {"@SortOrder",model.SortOrder },
                {"@id",model.id },
              };
                //var result =await Manager.GetAllData<ProductCategoryModel>(param, "sp_get_list_product_category");
                var result = await Manager.GetAllData<DataViewModel>(param, model.SPName);
                if (result.items.Count > 0)
                {
                    var d = result.items.FirstOrDefault().Data;
                    response.items = d;
                    response.Message = result.Message;
                    response.Status = result.Status;
                    response.totalCount = result.totalCount;
                }

                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, "Exception", ex.Message));
            }
        }

        [HttpPost]
        [Route(APIEndpoint.DefaultRoute + "/InsertData")]
        public async Task<ActionResult> InsertData(SearchModel model)
        {
            try
            {
                var param = new Dictionary<string, object>
              {
              
                {"@JSON_DATA",model.JSNData }

              };
                //var result =await Manager.GetAllData<ProductCategoryModel>(param, "sp_get_list_product_category");
                return Ok(await Manager.InsertData(param, model.SPName));

            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, "Exception", ex.Message));
            }
        }

        [HttpPost]
        [Route(APIEndpoint.DefaultRoute + "/DeleteData")]
        public async Task<ActionResult> DeleteData(ColumnValueModel model)
        {
            try
            {
                var param = new Dictionary<string, object>
              {
                {"@table_name",model.table_name },
                {"@column_name",model.column_name },
                {"@column_value",model.column_value },
                
              };
                //var result =await Manager.GetAllData<ProductCategoryModel>(param, "sp_get_list_product_category");
                return Ok(await Manager.DeleteData(param, "sp_app_delete_item"));

            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, "Exception", ex.Message));
            }
        }

        [HttpPost]
        [Route(APIEndpoint.DefaultRoute + "/MultiDeleteData")]
        public async Task<ActionResult> MultiDeleteData(ColumnValueModel model)
        {
            try
            {
                var param = new Dictionary<string, object>
              {
                {"@table_name",model.table_name },
                {"@column_name",model.column_name },
                {"@column_value",model.column_value },

              };
                //var result =await Manager.GetAllData<ProductCategoryModel>(param, "sp_get_list_product_category");
                return Ok(await Manager.DeleteData(param, "sp_app_multi_delete_item"));

            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, "Exception", ex.Message));
            }
        }

        [HttpPost]
        [Route(APIEndpoint.DefaultRoute + "/CheckData")]
        public async Task<ActionResult> CheckData(ColumnValueModel model)
        {
            try
            {
                var param = new Dictionary<string, object>
              {

                {"@table_name",model.table_name },
                {"@column_name",model.column_name },
                {"@column_value",model.column_value }

              };
                //var result =await Manager.GetAllData<ProductCategoryModel>(param, "sp_get_list_product_category");
                return Ok(await Manager.InsertData(param, "sp_app_get_column_exist"));

            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, "Exception", ex.Message));
            }
        }


        [HttpPost]
        [Route(APIEndpoint.DefaultRoute + "/GetDynamicData")]
        public async Task<ActionResult> GetDynamicData(SearchModel model)
        {
            var response = new ResponseData<string>();
            try
            {
                var param = new Dictionary<string, object>
              {
                {"@PageNo",model.PageNo },
                {"@PageSize",model.PageSize },
                {"@Search",model.Search },
                {"@id",model.id },
                {"@TableName",model.TableName },
                {"@FilterColumn",model.FilterColumn },
                {"@SearchColumn",model.SearchColumn },
              };
                //var result =await Manager.GetAllData<ProductCategoryModel>(param, "sp_get_list_product_category");
                var result = await Manager.GetAllData<DataViewModel>(param, "sp_admin_GetData");
                if (result.items.Count > 0)
                {
                    var d = result.items.FirstOrDefault().Data;
                    response.items = d;
                    response.Message = result.Message;
                    response.Status = result.Status;
                    response.totalCount = result.totalCount;
                }

                return Ok(response);

            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, "Exception", ex.Message));
            }
        }
    }
}
