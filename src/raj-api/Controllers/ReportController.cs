using ClosedXML.Excel;
using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;
using RajApi.Data.Models;

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

            return finalData;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get projectId: '{request.ProjectId}',towerId: '{request.TowerId}',floorId: '{request.FloorId}',flatId: '{request.FlatId}', message:'{ex.Message}'");
            throw;
        }
    }

    [AllowAnonymous]
    [HttpGet("{projectId}/{towerId}/{floorId}/{flatId}/{isChat}")]
    public IActionResult Get(long projectId, long towerId, long floorId, long flatId, bool isChat)
    {
        dynamic finalData;
        if (isChat)
            finalData = dataService.DownloadWorkerStatusReport(projectId, towerId, floorId, flatId);
        else
            finalData = dataService.DownloadWorkerChatReport(projectId, towerId, floorId, flatId);

        string base64String;
        using (var wb = new XLWorkbook())
        {
            var sheet = wb.AddWorksheet(finalData, "Worker Status Report");

            // Apply font color to columns 1 to 5
            sheet.Columns(1, 12).Style.Font.FontColor = XLColor.Black;

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

}


