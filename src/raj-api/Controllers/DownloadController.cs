using ClosedXML.Excel;
using ILab.Data;
using ILab.Extensionss.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mysqlx.Notice;
using RajApi.Data;
using RajApi.Data.Models;
using System.Data;

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
    private dynamic? GetModuleDetails(string module)
    {
        ListOptions option = new();
        var data = dataService.Get(module, option);

        if (data != null)
        {
            return data.Items;
        }
        else
        {
            logger.LogError("No data retrive from backend for " + module);
            return null;
        }
    }
    private DataTable GetTemplate(string module)
    {
        DataTable dt = new();
        switch (module.ToUpper())
        {
            case "FLAT":
                dt = CreateFlatTemplate();
                break;
            case "TOWER":
                var parking = GetModuleDetails("ParkingType");
                dt = CreateTowerTemplate(parking);
                break;
            case "FLOOR":
                dt = CreateFloorTemplate();
                break;
            case "PROJECT":
                dt = CreateProjectTemplate();
                break;
            case "ROOMTYPE":
                dt = CreateRoomTypeTemplate();
                break;
            case "UOM":
            case "ITEMTYPE":
            case "ITEMGROUP":
            case "OUTSIDEENTITYTYPE":
            case "PARKINGTYPE":
                dt = CreateUOMTemplate();
                break;
            case "CONTRACTOR":
                dt = CreateContractorTemplate();
                break;
            case "SUPPLIER":
                dt = CreateSupplierTemplate();
                break;
            case "ITEM":
                dt = CreateItemTemplate();
                break;
            case "FLATTEMPLATE":
                var roomtype = GetModuleDetails("RoomType");
                dt = CreateFlattempTemplate(roomtype);
                break;
            case "PARKING":
                dt = CreateParkingTemplate();
                break;
            case "OUTSIDEENTITY":
                var outSideEntityType = GetModuleDetails("OutSideEntityType");
                dt = CreateOutSideEntityTemplate(outSideEntityType);
                break;
        }
        return dt;
    }

    private DataTable CreateOutSideEntityTemplate(dynamic? outSideEntityType)
    {
        DataTable dt = new();
        dt.Columns.Add("Project");
        dt.Columns.Add("Tower");
        dt.Columns.Add("Floor");
        if (outSideEntityType != null)
        {
            foreach (var item in outSideEntityType)
            {
                var name = item.Name;
                dt.Columns.Add(name);
            }
        }
        return dt;
    }

    private DataTable CreateParkingTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Project");
        dt.Columns.Add("Tower");
        dt.Columns.Add("Name");
        dt.Columns.Add("Parking Type");
        return dt;
    }

    private DataTable CreateFlattempTemplate(dynamic? roomtype)
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Description");
        if (roomtype != null)
        {
            foreach (var item in roomtype)
            {
                var name = item.Name;
                dt.Columns.Add(name);
            }
        }
        return dt;
    }
   
    private DataTable CreateItemTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Group");
        dt.Columns.Add("Type");
        dt.Columns.Add("Name");
        dt.Columns.Add("Alias");
        dt.Columns.Add("UOM");
        return dt;
    }

    private DataTable CreateSupplierTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Alias");
        dt.Columns.Add("Address 1");
        dt.Columns.Add("Phone");
        dt.Columns.Add("PAN");
        dt.Columns.Add("GST");
        dt.Columns.Add("Licence No");
        dt.Columns.Add("SPOC");
        dt.Columns.Add("Effective Start Date");
        dt.Columns.Add("Effective End Date");
        return dt;
    }

    private DataTable CreateContractorTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Alias");
        dt.Columns.Add("Type");
        dt.Columns.Add("Address 1");
        dt.Columns.Add("Phone");
        dt.Columns.Add("PAN");
        dt.Columns.Add("GST");
        dt.Columns.Add("Licence No");
        dt.Columns.Add("SPOC");
        dt.Columns.Add("Effective Start Date");
        dt.Columns.Add("Effective End Date");
        return dt;
    }

    private DataTable CreateUOMTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Alias");
        return dt;
    }

    private DataTable CreateRoomTypeTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Alias");
        dt.Columns.Add("Description");
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

    private static DataTable CreateTowerTemplate(dynamic? parking)
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Description");
        dt.Columns.Add("Project");
        dt.Columns.Add("Floor Count");
        if (parking != null)
        {
            foreach (var item in parking)
            {
                var name = item.Name;
                dt.Columns.Add(name);
            }
        }
        return dt;
    }
    private static DataTable CreateFlatTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Description");
        dt.Columns.Add("Floor");
        dt.Columns.Add("Priority");
        //if (room != null)
        //{
        //    foreach (var item in room)
        //    {
        //        var name = item.Name;
        //        dt.Columns.Add(name);
        //    }
        //}
        return dt;
    }
    private static DataTable CreateProjectTemplate()
    {
        DataTable dt = new();
        dt.Columns.Add("Name");
        dt.Columns.Add("Alias");
        dt.Columns.Add("Start Fin Year");
        dt.Columns.Add("Planned Start Date");
        dt.Columns.Add("Planned End Date");
        dt.Columns.Add("Completion Certificate Date");
        dt.Columns.Add("Belongs To");
        dt.Columns.Add("Zone");
        dt.Columns.Add("Address 1");
        dt.Columns.Add("Address 2");
        dt.Columns.Add("Address 3");
        dt.Columns.Add("Country");
        dt.Columns.Add("State");
        dt.Columns.Add("City");
        dt.Columns.Add("PIN");
        dt.Columns.Add("Latitude");
        dt.Columns.Add("Longitude");
        dt.Columns.Add("Phone");
        dt.Columns.Add("Contact Name");
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


