using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;
using RajApi.Data.Models;

namespace RajApi.Controllers
{
    [Route("api/work/status-check")]
    [ApiController]
    [Authorize]
    public class WorkStatusController : ControllerBase
    {
        private readonly ILogger<WorkStatusController> logger;
        private readonly RajDataService dataService;
        public WorkStatusController(ILogger<WorkStatusController> logger, RajDataService dataService)
        {
            this.logger = logger;
            this.dataService = dataService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> GetStatus([FromBody] WorkStatusRequest request)
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);

            if (string.IsNullOrEmpty(request.Type) ||
                (request.Type != "inside" && request.Type != "outside"))
            {
                return BadRequest(new
                {
                    error = new
                    {
                        code = "INVALID_TYPE_VALUE",
                        message = "Type must be 'inside' or 'outside'",
                        field = "type",
                        status = 400
                    }
                });
            }

            var result = await dataService.GetWorkStatusAsync(request);
            return Ok(result);
        }
    }
}
