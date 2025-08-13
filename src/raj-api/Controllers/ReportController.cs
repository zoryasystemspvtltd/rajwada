using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using ILab.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.Pkcs;
using RajApi.Data;
using RajApi.Data.Models;
using System.Data;
using System.Reflection;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/report/")]
[Authorize]
public class ReportController : ControllerBase
{
    private readonly ILogger<ReportController> logger;
    private readonly RajDataService dataService;
    public ReportController(ILogger<ReportController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<dynamic> Get(long id)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var item = await dataService.GetTaskItemDetails(id);
            return item;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get id: '{id}' message:'{ex.Message}'");
            throw;
        }
    }

    [AllowAnonymous]
    [HttpGet("{startDate}/{endDate}")]
    public dynamic Get(DateOnly startDate, DateOnly endDate)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var item = dataService.GetMobileActivityData(startDate, endDate, member);
            return item;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get startDate: '{startDate}' endDate :'{endDate}' message:'{ex.Message}'");
            throw;
        }
    }

    [AllowAnonymous]
    [HttpPost]
    public dynamic Post(WorkerReportRequestPayload request, CancellationToken token)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var finalData = dataService.GetWorkerStatusReport(request);
           
            //if (request.IsDownload)
            //    return GenerateExcelFile(finalData);
            //else
            return finalData;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get projectId: '{request.ProjectId}',towerId: '{request.TowerId}',floorId: '{request.FloorId}',flatId: '{request.FlatId}', message:'{ex.Message}'");
            throw;
        }
    }

   
    private dynamic GenerateExcelFile(List<WorkerStatusReport>? items)
    {
        DataTable dataTable = new DataTable(typeof(WorkerStatusReport).Name);
        PropertyInfo[] props = typeof(WorkerStatusReport).GetProperties(BindingFlags.Public | BindingFlags.Instance);

        // Create columns in the DataTable from the object properties
        foreach (PropertyInfo prop in props)
        {
            dataTable.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
        }

        // Populate rows in the DataTable with values from the list
        foreach (WorkerStatusReport item in items)
        {
            var values = new object[props.Length];
            for (int i = 0; i < props.Length; i++)
            {
                values[i] = props[i].GetValue(item, null);
            }
            dataTable.Rows.Add(values);
        }

        //Generate Excelsheet
        string base64String;
        using (var wb = new XLWorkbook())
        {
            var sheet = wb.AddWorksheet(dataTable, "WorkerStatusReport");

            // Apply font color to columns 1 to 5
            sheet.Columns(1, 5).Style.Font.FontColor = XLColor.Black;

            using (var ms = new MemoryStream())
            {
                wb.SaveAs(ms);

                // Convert the Excel workbook to a base64-encoded string
                base64String = Convert.ToBase64String(ms.ToArray());
            }
        }

        // Return a CreatedResult with the base64-encoded Excel data
        return new CreatedResult(string.Empty, new
        {
            Code = 200,
            Status = true,
            Message = "Template generated successfully",
            Data = base64String
        });

    }
    
}


