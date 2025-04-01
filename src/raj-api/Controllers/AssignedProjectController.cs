using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/assignedproject/")]
[Authorize]
public class AssignedProjectController : ControllerBase
{
    private readonly ILogger<AssignedProjectController> logger;
    private readonly RajDataService dataService;
    public AssignedProjectController(ILogger<AssignedProjectController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }

    /// <summary>
    /// Get all the assigned project details form Plan
    /// </summary>   
    /// <returns></returns>
    [HttpGet]
    public dynamic Get()
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var projects = dataService.GetAllAssignedProjects(member);
            return projects;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get ,message:'{ex.Message}'");
            throw;
        }
    }
}


