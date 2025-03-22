using DocumentFormat.OpenXml.Office2010.Excel;
using ILab.Data;
using ILab.Extensionss.Data.Models;
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
    [HttpPost]
    public dynamic Post(WorkerReportRequestPayload request, CancellationToken token)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var finalData = dataService.GetWorkerStatusReport(request);
            if (finalData != null)
            {
                finalData = CalculateWorkStatus(finalData);
            }
            return finalData;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get projectId: '{request.ProjectId}',towerId: '{request.TowerId}',floorId: '{request.FloorId}',flatId: '{request.FlatId}', message:'{ex.Message}'");
            throw;
        }
    }
    /// <summary>
    /// Status Type: Draft = 0, Modified = 1,QCAssigned = 2,Assigned = 3,Approved = 4,Hold = 5,Rejected = 6,HODAssigned = 7
    /// </summary>
    /// <param name="rawlist"></param>
    /// <returns></returns>
    private static List<WorkerStatusReport>? CalculateWorkStatus(dynamic? rawlist)
    {
        List<WorkerStatusReport> newlist = [];
        if (rawlist != null)
        {
            var currentDate = DateTime.Now;
            foreach (var item in rawlist)
            {
                var status = "";
                if (item.StartDate != null && item.StartDate < currentDate && item.ActualStartDate == null)
                {
                    status = "Not Started";
                }
                if (item.StartDate != null && item.StartDate < currentDate && item.EndDate != null
                    && item.EndDate > currentDate && item.ActualStartDate != null)
                {
                    status = "In Progress";
                }
                if (item.EndDate != null && item.ActualEndDate == null
                    && item.EndDate < currentDate && item.ActualStartDate != null)
                {
                    status = "Delayed";
                }
                if (item.StartDate != null && item.EndDate != null && item.StartDate < currentDate
                    && currentDate < item.EndDate && item.IsOnHold != null && item.IsOnHold == true)
                {
                    status = "On Hold";
                }
                if (item.IsQCApproved == null && item.IsCompleted != null
                    && item.IsCompleted == true && item.Status == StatusType.QCAssigned) // QC Assigened but not approved
                {
                    status = "Pending QC Approval";
                }
                if (item.ActualEndDate <= item.EndDate && item.ActualStartDate >= item.StartDate
                    && item.IsCompleted != null && item.IsCompleted == true)
                {
                    status = "Closed";
                }
                if (item.IsCancelled != null && item.IsCancelled == true)
                {
                    status = "Cancelled";
                }
                if (item.IsCompleted != null && item.IsCompleted == true
                  && item.IsQCApproved != null && item.IsQCApproved == true)// QC Approved
                {
                    status = "Inspection Passed";
                }
                if (item.IsCompleted != null && item.IsCompleted == true
                    && item.IsQCApproved != null && item.IsQCApproved == false) //QC is rejected
                {
                    status = "Inspection Failed/Rework Required";
                }
                if (item.IsCompleted != null && item.IsCompleted == true && item.IsQCApproved != null
                    && item.IsQCApproved == true && item.IsApproved == null && item.Status == StatusType.HODAssigned) //HOD Assigend but not approved
                {
                    status = "Pending HOD Approval";
                }
                if (item.IsCompleted == true && item.IsAbandoned == true)//Is Abanndoned
                {
                    status = "Short Closed/Abandoned";
                }

                WorkerStatusReport obj = new()
                {
                    ActivityStatus = status,
                    Id = item.Id,
                    ActivityName = item.Name
                };
                newlist.Add(obj);
            }
        }
        return newlist;
    }
}


