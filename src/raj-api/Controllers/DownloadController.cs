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

    private static DateTime GetDateTime(string startDate)
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
            if (data == null)
            {
                return BadRequest(new
                {
                    error = "InvalidModule",
                    message = $"Module '{module}' is not found."
                });
            }
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
    private DataTable? GetTemplate(string module)
    {
        if (string.IsNullOrWhiteSpace(module))
            return null;

        var preMapping = new Dictionary<string, string>
        {
            ["Flat"] = "FLAT",
            ["Tower"] = "TOWER",
            ["Floor"] = "FLOOR",
            ["Project"] = "PROJECT",
            ["Room Type"] = "ROOMTYPE",

            ["UOM"] = "UOM",
            ["Item Type"] = "ASSETTYPE",
            ["Item Group"] = "ASSETGROUP",
            ["Outside Entity Type"] = "OUTSIDEENTITYTYPE",
            ["Parking Type"] = "PARKINGTYPE",

            ["Contractor Master"] = "CONTRACTOR",
            ["Supplier Master"] = "SUPPLIER",
            ["Item Master"] = "ASSET",

            ["Flat Template"] = "FLATTEMPLATE",
            ["Tower Parking"] = "PARKING",
            ["Outside Entity Mapping"] = "OUTSIDEENTITY",
            ["Work Checkpoint"] = "WORKCHECKPOINT"
        };

        string actModule = preMapping.ContainsKey(module) ? preMapping[module] : null;
        if (actModule == null)
            return null;

        var map = new Dictionary<string, Func<DataTable>>
        {
            ["FLAT"] = CreateFlatTemplate,
            ["TOWER"] = () => CreateTowerTemplate(GetModuleDetails("ParkingType")),
            ["FLOOR"] = CreateFloorTemplate,
            ["PROJECT"] = CreateProjectTemplate,
            ["ROOMTYPE"] = CreateRoomTypeTemplate,

            ["UOM"] = CreateUOMTemplate,
            ["ASSETTYPE"] = CreateUOMTemplate,
            ["ASSETGROUP"] = CreateUOMTemplate,
            ["OUTSIDEENTITYTYPE"] = CreateUOMTemplate,
            ["PARKINGTYPE"] = CreateUOMTemplate,

            ["CONTRACTOR"] = CreateContractorTemplate,
            ["SUPPLIER"] = CreateSupplierTemplate,
            ["ASSET"] = CreateAssetTemplate,

            ["FLATTEMPLATE"] = () => CreateFlatTempTemplate(GetModuleDetails("RoomType")),
            ["PARKING"] = CreateParkingTemplate,
            ["OUTSIDEENTITY"] = () => CreateOutSideEntityTemplate(GetModuleDetails("OutSideEntityType")),
            ["WORKCHECKPOINT"] = CreateWorkCheckPointTemplate,
        };

        return map.TryGetValue(actModule, out var func)
            ? func()
            : new DataTable();
    }

    private DataTable CreateWorkCheckPointTemplate()
    {
        return CreateTable("Name", "Description", "Type", "IsPhotoRequired(Yes/No)", "IsCalendarRequired(Yes/No)");
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
    private static DataTable CreateTable(params string[] columns)
    {
        var dt = new DataTable();
        foreach (var col in columns)
            dt.Columns.Add(col);
        return dt;
    }

    private static void AddDynamicColumns(DataTable dt, dynamic? data)
    {
        if (data == null) return;

        foreach (var item in data)
            dt.Columns.Add(item.Name);
    }


    private static DataTable CreateOutSideEntityTemplate(dynamic? outSideEntityType)
    {
        var dt = CreateTable("Project", "Tower", "Floor");
        AddDynamicColumns(dt, outSideEntityType);
        return dt;
    }

    private static DataTable CreateParkingTemplate()
    {
        return CreateTable("Project", "Tower", "Name", "Parking Type");
    }

    private static DataTable CreateFlatTempTemplate(dynamic? roomtype)
    {
        var dt = CreateTable("Name", "Description");
        AddDynamicColumns(dt, roomtype);
        return dt;
    }

    private static DataTable CreateAssetTemplate()
    {
        return CreateTable("Group", "Type", "Name", "Alias", "UOM");
    }

    private static DataTable CreateSupplierTemplate()
    {
        return CreateTable("Name", "Alias", "Address 1", "Phone", "PAN", "GST", "Licence No", "SPOC", "Effective Start Date", "Effective End Date");
    }

    private static DataTable CreateContractorTemplate()
    {
        return CreateTable(
            "Name", "Alias", "Type", "Address 1", "Phone",
            "PAN", "GST", "Licence No", "SPOC",
            "Effective Start Date", "Effective End Date"
        );
    }

    private static DataTable CreateUOMTemplate()
    {
        return CreateTable("Name", "Alias");
    }

    private static DataTable CreateRoomTypeTemplate()
    {
        return CreateTable("Name", "Alias", "Description");
    }

    private static DataTable CreateFloorTemplate()
    {
        var dt = CreateTable("Name", "Description", "Tower");
        return dt;
    }

    private static DataTable CreateTowerTemplate(dynamic? parking)
    {
        var dt = CreateTable("Name", "Description", "Project", "Floor Count");
        AddDynamicColumns(dt, parking);
        return dt;
    }
    private static DataTable CreateFlatTemplate()
    {
        return CreateTable("Name", "Description", "Floor"); //, "Priority"
    }
    private static DataTable CreateProjectTemplate()
    {
        return CreateTable(
            "Name", "Alias", "Start Fin Year",
            "Planned Start Date", "Planned End Date",
            "Completion Certificate Date", "Belongs To", "Zone",
            "Address 1", "Address 2", "Address 3",
            "Country", "State", "City", "PIN",
            "Latitude", "Longitude", "Phone", "Contact Name"
        );
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


