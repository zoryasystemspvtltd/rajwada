using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/datacopy/")]
[Authorize]
public class DataCopyController : ControllerBase
{
    private readonly ILogger<DataCopyController> logger;
    private readonly RajDataService dataService;
    public DataCopyController(ILogger<DataCopyController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }

    [AllowAnonymous]
    [HttpGet("{id}/{type}")]
    public dynamic Get(long id, string type)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var item = dataService.GetData(id, type);
            return item;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get id: '{type}' type :'{type}' message:'{ex.Message}'");
            throw;
        }
    }
}
