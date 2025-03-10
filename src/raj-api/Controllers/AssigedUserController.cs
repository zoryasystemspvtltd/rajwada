﻿using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/assigneduser/")]
[Authorize]
public class AssignedUserController : ControllerBase
{
    private readonly ILogger<AssignedUserController> logger;
    private readonly RajDataService dataService;
    public AssignedUserController(ILogger<AssignedUserController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }

    /// <summary>
    /// Get all the assigned userd details for activity
    /// </summary>
    /// <param name="id">Activity Id</param>
    /// <returns></returns>
    [HttpGet("{module}/{id}")]
    public dynamic Get(string module, long id)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var users = dataService.GetAllAssignedUsers(module, id);
            return users;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get module: '{module}' id: '{id}' message:'{ex.Message}'");
            throw;
        }
    }
}


