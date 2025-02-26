using DocumentFormat.OpenXml.Office2010.Excel;
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


    [HttpGet("{projectId}/{towerId}/{floorId}/{flatId}")]
    public dynamic Get(long projectId, long towerId, long floorId, long flatId)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var finalData = dataService.GetWorkerStatusReport(projectId, towerId, floorId, flatId);
            if (finalData != null)
            {
                finalData = CalculateWorkStatus(finalData);
            }
            return finalData;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get projectId: '{projectId}',towerId: '{towerId}',floorId: '{floorId}',flatId: '{flatId}', message:'{ex.Message}'");
            throw;
        }
    }
    [HttpGet("{projectId}/{towerId}/{floorId}")]
    public dynamic Get(long projectId, long towerId, long floorId)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var finalData = dataService.GetWorkerStatusReport(projectId, towerId, floorId, 0);
            if (finalData != null)
            {
                finalData = CalculateWorkStatus(finalData);
            }
            return finalData;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get projectId: '{projectId}',towerId: '{towerId}',floorId: '{floorId}', message:'{ex.Message}'");
            throw;
        }
    }

    private dynamic? CalculateWorkStatus(dynamic? list)
    {
        if (list != null)
        {
            foreach (var item in list)
            {
                var status = "";
                var currentDate = DateTime.Now;
                if (item.StartDate != null && item.StartDate < currentDate && item.ActualStartDate == null)
                {
                    status = "Not Started";
                }
                else if (item.StartDate != null && item.StartDate < currentDate && item.EndDate != null
                    && item.EndDate > currentDate && item.ActualStartDate != null)
                {
                    status = "In Progress";
                }
                else if (item.EndDate != null && item.ActualEndDate == null
                    && item.EndDate < currentDate && item.ActualStartDate != null)
                {
                    status = "Delayed";
                }
                else if (item.StartDate != null && item.EndDate != null && item.StartDate < currentDate
                    && currentDate < item.EndDate && item.IsOnHold != null && item.IsOnHold == true)
                {
                    status = "On Hold";
                }
                else if (item.ActualEndDate <= item.EndDate && item.ActualStartDate >= item.StartDate
                    && item.IsCompleted != null && item.IsCompleted == true)
                {
                    status = "Closed";
                }
                else if (item.IsCancelled != null && item.IsCancelled == true)
                {
                    status = "Cancelled";
                }
                else if (item.IsQCApproved == null && item.IsCompleted != null
                    && item.IsCompleted == true) // QC Assigened but not approved
                {
                    status = "Pending QC Approval";
                }
                else if (item.IsCompleted != null && item.IsCompleted == true && item.IsQCApproved != null
                    && item.IsQCApproved == true && item.IsApproved == null) //HOD Assigend but not approved
                {
                    status = "Pending HOD Approval";
                }
                else if (item.IsCompleted != null && item.IsCompleted == true
                    && item.IsQCApproved != null && item.IsQCApproved == true)// QC Approved
                {
                    status = "Inspection Passed";
                }
                else if (item.IsCompleted != null && item.IsCompleted == true
                    && item.IsQCApproved != null && item.IsQCApproved == false) //QC is rejected
                {
                    status = "Inspection Failed/Rework Required";
                }
                else if (item.IsCompleted == true && item.IsAbandoned == true)//Is Abanndoned
                {
                    status = "Short Closed/Abandoned";
                }
                item.ActivityStatus = status;
            }
        }
        return list;
    }
}


