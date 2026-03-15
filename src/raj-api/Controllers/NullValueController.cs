using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/nullvalue/")]
[Authorize]
public class NullValueController : ControllerBase
{
    private readonly ILogger<NullValueController> logger;
    private readonly RajDataService dataService;
    public NullValueController(ILogger<NullValueController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }
    
    [AllowAnonymous]
    [HttpGet("{model}")]
    public dynamic Get(string model)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var item = dataService.GetData(model);
            return item;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get model: '{model}' message:'{ex.Message}'");
            throw;
        }
    }
}
