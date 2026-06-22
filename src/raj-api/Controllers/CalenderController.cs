using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;
using RajApi.Data.Models;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/calender/")]
[Authorize]
public class CalenderController : ControllerBase
{
    private readonly ILogger<CalenderController> logger;
    private readonly RajDataService dataService;
    public CalenderController(ILogger<CalenderController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }
    
    [AllowAnonymous]
    [HttpPost("active-works-count-by-month")]
    public async Task<IActionResult> GetActiveWorksCountByMonth(
    [FromBody] ActiveWorksCountRequest request,
    CancellationToken cancellationToken)
    {
        var result = await dataService
            .GetActiveWorksCountByMonthAsync(request, cancellationToken);

        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("active-works-by-day")]
    public async Task<IActionResult> GetActiveWorksByDay(
    [FromBody] ActiveWorksByDayRequest request,
    CancellationToken cancellationToken)
    {
        var result = await dataService
            .GetActiveWorksByDayAsync(request, cancellationToken);

        return Ok(result);
    }
}
