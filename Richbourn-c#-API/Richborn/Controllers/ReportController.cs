using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Utility;
using AspNetCore.Reporting.ReportExecutionService;
using AspNetCore.Reporting;
using System.Collections.Generic;
using System.IO;
using Manager.Interface;
using Model;
using System.Linq;
using Newtonsoft.Json;
using Richborn.ViewModel;
using System.Threading.Tasks;

namespace Richborn.Controllers
{
   
    [ApiController]
    public class ReportController : ControllerBase
    {
       
        IRepositoryManager Manager;
        ValidationResult ValidationResult;
        public ReportController(IRepositoryManager manager)
        {
            //log4Net = this.Log<ProductCategoryController>();
            Manager = manager;
            ValidationResult = new ValidationResult();
        }
        [HttpGet]
        [Route(APIEndpoint.DefaultRoute + "/SaleReport")]
        public async Task<ActionResult> SaleReport(int id)
        {



            var response = new ResponseData<string>();
            try
            {
                var param = new Dictionary<string, object>
              {
                {"@PageNo",1},
                {"@PageSize",1 },
                {"@Search",""},
                 {"@id",id },
              };
                //var result =await Manager.GetAllData<ProductCategoryModel>(param, "sp_get_list_product_category");
                var data = await Manager.GetAllData<DataViewModel>(param, "sp_admin_GetInvoiceMast_SlNo_group");
                if (data.items.Count > 0)
                {
                    var d = data.items.FirstOrDefault().Data;
                    var sale_data=JsonConvert.DeserializeObject<List<SaleReportModel>>(d);
                    if (sale_data.Count > 0)
                    {
                        var report_data = sale_data[0];
                        string mimtype = "";
                        int extension = 1;
                        var _reportPath = @"Reports\testeReport.rdlc";

                        LocalReport localReport = new LocalReport(_reportPath);


                        //Dados
                        System.Data.DataTable dt = new System.Data.DataTable();
                        dt.Clear();
                        dt.Columns.Add("Id", typeof(int));
                        dt.Columns.Add("ProdCode", typeof(string));
                        dt.Columns.Add("DesignCode", typeof(string));
                        dt.Columns.Add("HsnCode", typeof(string));
                        dt.Columns.Add("Qty", typeof(string));
                        dt.Columns.Add("Unit", typeof(string));
                        dt.Columns.Add("Mrp", typeof(string));
                        dt.Columns.Add("Rate", typeof(string));
                        dt.Columns.Add("Discount", typeof(string));
                        dt.Columns.Add("Amount", typeof(string));
                        int index = 1;
                        foreach (var item in report_data.usersDetails)
                        {
                            dt.Rows.Add(index, item.ProdCode, item.ProdCode, item.HSNCode, item.Qty,"pcs", item.MRP, item.Rate, item.Discount, item.Amt);
                            index++;
                        }
                       
                      
                        localReport.AddDataSource("DataSet1", dt);


                        //Parametros do relatório
                        var reportParams = new Dictionary<string, string>();
                        reportParams.Add("company_name", report_data.company.FirstOrDefault().Name);
                        reportParams.Add("company_address", report_data.company.FirstOrDefault().Address);
                        reportParams.Add("company_phone", "Phone : " + report_data.company.FirstOrDefault().Phone);
                        reportParams.Add("company_email", report_data.company.FirstOrDefault().Email);
                        reportParams.Add("company_web", report_data.company.FirstOrDefault().Website);
                        reportParams.Add("company_gst", report_data.company.FirstOrDefault().GSTNo);
                       
                        reportParams.Add("party_name", report_data.PartyName);
                        reportParams.Add("party_address", report_data.party_address);
                        reportParams.Add("party_phone", report_data.party_mobile);
                        reportParams.Add("bill_no", report_data.SlNo.ToString());
                        reportParams.Add("bill_date", report_data.InvDate.ToString());
                        reportParams.Add("full_bill_no", report_data.SlNo.ToString());
                        reportParams.Add("party_gst_no", report_data.party_gst_no);
                        //Geração do arquivo
                        System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                        var result = localReport.Execute(RenderType.Pdf, extension, parameters: reportParams);
                        byte[] file = result.MainStream;

                        Stream stream = new MemoryStream(file);
                        return File(stream, "application/pdf", "testeReport.pdf");

                    }

                }

                return Ok(response);

            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new APIResponse(ResponseCode.ERROR, "Exception", ex.Message));
            }
           
        }
    }
}
