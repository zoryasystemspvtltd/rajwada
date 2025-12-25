using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/notification/")]
[Authorize]
public class NotificationController : ControllerBase
{
    private readonly ILogger<NotificationController> logger;
    private readonly RajDataService dataService;
    public NotificationController(ILogger<NotificationController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }

    /// <summary>
    /// Get all the notification for the user
    /// </summary>
    /// <param name="member">Member email id</param>
    /// <returns></returns>
    [HttpGet("{member}")]
    public dynamic Get(string member)
    {
        try
        {
            var users = dataService.GetAllNotification(member);
            return users;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get member: '{member}' message:'{ex.Message}'");
            throw;
        }
    }
}


