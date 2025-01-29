using ClosedXML.Excel;
using ILab.Data;
using ILab.Extensionss.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;
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

    [HasPrivileges("view")]
    [HttpGet("{module}/{id}/{columnName}")]
    public IActionResult Get(string module, long id, string columnName)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);

            var Base64String = GetFile(module, id, columnName);
            // Convert base64 string to byte array
            byte[] fileBytes = Convert.FromBase64String(Base64String.ToString());

            // Create a memory stream from the byte array
            using (var stream = new MemoryStream(fileBytes))
            {
                // Return the file as a downloadable file
                return File(stream.ToArray(), "application/octet-stream", columnName);
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "An error occurred while processing the file.", error = ex.Message });
        }
    }

    //[HasPrivileges("view")]
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
                var name = string.Concat(item.Name, "Count");
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


