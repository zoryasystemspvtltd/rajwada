using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using ILab.Data;
using ILab.Extensionss.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;
using RajApi.Data.Models;
using System.Data;
using System.Reflection;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/download/")]
[Authorize]
public class DownloadController : ControllerBase
{
    private readonly ILogger<DownloadController> logger;
    private readonly RajDataService dataService;
    public DownloadController(ILogger<DownloadController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }
    [AllowAnonymous]
    [HttpGet("{module}/{startDate}/{endDate}")]
    public IActionResult Get(string module, string startDate, string endDate)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            DateTime sDate = GetDateTime(startDate);
            DateTime eDate = GetDateTime(endDate);
            IEnumerable<ChallanReport> list = dataService.GetChallanReportDateWise(sDate, eDate);
            DataTable data = ConvertToDataTable(list);
            string base64String;
            using (var wb = new XLWorkbook())
            {
                var sheet = wb.AddWorksheet(data, "Challan Report");

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
                Message = "Report generated successfully",
                Data = base64String
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "An error occurred while generating the report.", error = ex.Message });
        }
    }

    private DateTime GetDateTime(string startDate)
    {
        var newtime = new TimeSpan(00, 00, 0); //12:00 AM
        var updated = Convert.ToDateTime(startDate).Date + newtime;
        return updated;
    }

    [AllowAnonymous]
    [HttpGet("{module}/{id}")]
    public IActionResult GetAsync(string module, long id)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);

            IEnumerable<ChallanReport> list = dataService.GetChallanReport(id);
            DataTable data = ConvertToDataTable(list);
            string base64String;
            using (var wb = new XLWorkbook())
            {
                var sheet = wb.AddWorksheet(data, "Challan Report");

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
                Message = "Report generated successfully",
                Data = base64String
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "An error occurred while generating the report.", error = ex.Message });
        }
    }

    private DataTable ConvertToDataTable<T>(IEnumerable<T> items)
    {
        var dataTable = new DataTable(typeof(T).Name);

        // Get all the properties
        var properties = typeof(T).GetProperties();

        // Loop through all the properties
        foreach (var prop in properties)
        {
            // Setting column names as Property names
            dataTable.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
        }

        foreach (var item in items)
        {
            var values = new object[properties.Length];
            for (var i = 0; i < properties.Length; i++)
            {
                values[i] = properties[i].GetValue(item, null);
            }
            dataTable.Rows.Add(values);
        }

        return dataTable;
    }
    [AllowAnonymous]
    [HttpGet("{module}")]
    public IActionResult Get(string module)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);

            var data = GetTemplate(module);
            string base64String;
            using (var wb = new XLWorkbook())
            {
                var sheet = wb.AddWorksheet(data, string.Concat(module, "Details"));

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
        catch (Exception ex)
        {
            return BadRequest(new { message = "An error occurred while generating the template.", error = ex.Message });
        }
    }
    private dynamic? GetModuleDetails()
    {
        ListOptions option = new();
        var data = dataService.Get("room", option);

        if (data != null)
        {
            return data.Items;
        }
        else
        {
            logger.LogError("No data retrive from backend for room");
            return null;
        }
    }

    private DataTable GetTemplate(string module)
    {
        DataTable dt = new();
        switch (module.ToUpper())
        {
            case "FLAT":
                var room = GetModuleDetails();
                dt = CreateFlatTemplate(room);
                break;
            case "TOWER":
                dt = CreateTowerTemplate();
                break;
            case "FLOOR":
                dt = CreateFloorTemplate();
                break;

        }
        return dt;
    }

    private static DataTable CreateFloorTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Description");
        dt.Columns.Add("Tower");
        return dt;
    }

    private static DataTable CreateTowerTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Description");
        dt.Columns.Add("Project");
        return dt;
    }

    private static DataTable CreateFlatTemplate(dynamic room)
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Description");
        dt.Columns.Add("Floor");
        dt.Columns.Add("Tower");
        if (room != null)
        {
            foreach (var item in room)
            {
                var name = item.Name;
                dt.Columns.Add(name);
            }
        }
        return dt;
    }

    private async Task<dynamic> GetFile(string module, long id, string columnName)
    {
        var data = await dataService.GetUploadedfile(module, id);
        var base64data = "";
        switch (columnName)
        {
            case "FatherCertificate":
                base64data = data.FatherCertificate;
                break;
            case "MotherCertificate":
                base64data = data.MotherCertificate;
                break;
            case "GrandFatherCertificate":
                base64data = data.GrandFatherCertificate;
                break;
            case "GrandMotherCertificate":
                base64data = data.GrandMotherCertificate;
                break;
            case "RsParcha":
                base64data = data.RsParcha;
                break;

        }
        return base64data;
    }
}


