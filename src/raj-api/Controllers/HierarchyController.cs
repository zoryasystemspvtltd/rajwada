using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/hierarchy/")]
[Authorize]
public class HierarchyController : ControllerBase
{
    private readonly ILogger<HierarchyController> logger;
    private readonly RajDataService dataService;
    public HierarchyController(ILogger<HierarchyController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }
    
    [AllowAnonymous]
    [HttpGet("{id}")]
    public dynamic Get(long id)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var item = dataService.GetHierarchyData(id);
            return item;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get id: '{id}' message:'{ex.Message}'");
            throw;
        }
    }
}
