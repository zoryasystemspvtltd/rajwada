using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;

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


