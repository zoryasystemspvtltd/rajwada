using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Helpers;
using ILab.Data;
using RajApi.Data;
using RajApi.Data.Models;
using Newtonsoft.Json;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/")]
[Authorize]
public class LabModelController : ControllerBase
{
    private readonly ILogger<LabModelController> logger;
    private readonly RajDataService dataService;
    public LabModelController(ILogger<LabModelController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }

    [HasPrivileges("list")]
    [HttpGet("{module}")]
    public dynamic Get(string module)
    {
        var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
        var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
        dataService.Identity = new ModuleIdentity(member, key);
        return dataService.Get(module, this.GetApiOption());
    }

    [HasPrivileges("view")]
    [HttpGet("{module}/{id}")]
    public async Task<dynamic> Get(string module, long id)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            var item = await dataService.Get(module, id);
            return item;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in Get module: '{module}' id: '{id}' message:'{ex.Message}'");
            throw;
        }
    }

    [HasPrivileges("add")]
    [HttpPost("{module}")]
    public async Task<long> PostAsync(string module, dynamic data, CancellationToken token)
    {
        var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
        var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
        dataService.Identity = new ModuleIdentity(member, key);
        long activityId = await dataService.AddAsync(module, data, token);

        Type? type = dataService?.GetType(module);
        if (type == null)
        {
            return -1L;
        }

        dynamic jsonString = data.ToString();
        var jsonData = JsonConvert.DeserializeObject(jsonString, type);

        if (jsonData.Type?.ToLower() == "tower" && module.Equals("PLAN", StringComparison.CurrentCultureIgnoreCase))
        {
            activityId = await SaveFloorData(jsonData, activityId, token);
        }
        if (module.Equals("ACTIVITY", StringComparison.CurrentCultureIgnoreCase))
        {
            await SaveSubTaskAsync(module, activityId, token);
        }
        return activityId;
    }

    /// <summary>
    /// Save Floor data from NoOfFloors
    /// </summary>
    /// <param name="jsonData">Tower data</param>
    /// <param name="TowerId">Tower Id</param>
    /// <param name="token">Token</param>
    /// <returns></returns>
    private async Task<long> SaveFloorData(dynamic jsonData, long TowerId, CancellationToken token)
    {
        long activityId = 0;
        try
        {
            for (int i = 0; i < jsonData.NoOfFloors; i++)
            {
                string floorName = "";
                if (i == 0)
                    floorName = jsonData.ProjectName + "_" + jsonData.Name + "_FloorG";
                else
                    floorName = jsonData.ProjectName + "_" + jsonData.Name + "_Floor" + i;

                jsonData.Type = "floor";
                jsonData.Name = floorName;
                jsonData.Description = floorName;
                jsonData.ParrentId = TowerId;
                var data = JsonConvert.SerializeObject(jsonData);
                activityId = await dataService.AddAsync("Plan", data, token);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveFloorData method and details: '{ex.Message}'");
            throw;
        }
        return activityId;
    }

    [HasPrivileges("edit")]
    [HttpPut("{module}/{id}")]
    public async Task<long> PutAsync(string module, long id, dynamic data, CancellationToken token)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            if (module.Equals("ACTIVITY", StringComparison.CurrentCultureIgnoreCase))
            {
                data = UpdateAcutualDate(module, data);
            }
            var activityId = await dataService.EditAsync(module, id, data, token);

            return activityId;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in PutAsync module: '{module}' message:'{ex.Message}'");
            throw;
        }
    }

    // [HasPrivileges("edit")]
    [HttpPatch("{module}/{id}")]
    public async Task<long> PatchAsync(string module, long id, dynamic data, CancellationToken token)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            return await dataService.EditPartialAsync(module, id, data, token);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in PatchAsync module: '{module}' message:'{ex.Message}'");
            throw;
        }
    }


    [HasPrivileges("delete")]
    [HttpDelete("{module}/{id}")]
    public async Task<long> DeleteAsync(string module, long id, CancellationToken token)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            return await dataService.DeleteAsync(module, id, token);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in DeleteAsync module: '{module}' message:'{ex.Message}'");
            throw;
        }
    }
    private async Task SaveSubTaskAsync(string model, long activityId, CancellationToken token)
    {
        try
        {
            var subact = await Get(model, activityId);
            if (subact != null)
            {
                if (subact.FlatId != null)
                {
                    var flats = GetResourceDetails("Resource", subact.FlatId, token);
                    await SavaDataIntoDataBase(flats, model, subact, token);
                }
                else if (subact.FloorId != null)
                {
                    var floors = GetResourceDetails("Resource", subact.FloorId, token);
                    await SavaDataIntoDataBase(floors, model, subact, token);
                }
                else if (subact.TowerId != null)
                {
                    var towers = GetResourceDetails("Resource", subact.TowerId, token);
                    await SavaDataIntoDataBase(towers, model, subact, token);
                }
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveSubTaskAsync method, message:'{ex.Message}'");
            throw;
        }
    }
    private dynamic UpdateAcutualDate(string model, dynamic data)
    {
        Type type = dataService.GetType(model);
        if (type == null)
        {
            return -1L;
        }

        dynamic jsonString = data.ToString();
        var jsonData = JsonConvert.DeserializeObject(jsonString, type);
        if (jsonData.ProgressPercentage > 0 && jsonData.ActualStartDate == null)
        {
            jsonData.ActualStartDate = DateTime.Now;
        }
        if (jsonData.ActualEndDate == null && jsonData.IsApproved == true)//When HOD Approved
        {
            jsonData.ActualEndDate = DateTime.Now;
        }

        return JsonConvert.SerializeObject(jsonData);
    }
    private async Task SavaDataIntoDataBase(dynamic lists, string model, Activity main, CancellationToken token)
    {
        try
        {
            if (lists != null)
            {
                foreach (var item in lists)
                {
                    int quantity = (int)item.Quantity;
                    for (int i = 0; i < quantity; i++)
                    {
                        var desc = string.Concat(item.Name, "-", i + 1);
                        Activity activity = new()
                        {
                            Type = "Sub Task",
                            ParentId = main.Id,
                            ProjectId = main.ProjectId,
                            DependencyId = main.DependencyId,
                            UserId = main.UserId,
                            Name = string.Concat(main.Name, "-", desc),
                            Description = string.Concat(main.Description, "-", desc),
                            StartDate = main.StartDate,
                            EndDate = main.EndDate,
                            Items = main.Items,
                            ContractorId = main.ContractorId,
                            PhotoUrl = main.PhotoUrl,
                        };
                        if (main.FlatId != null)
                        {
                            activity.TowerId = main.TowerId;
                            activity.FloorId = main.FloorId;
                            activity.FlatId = main.FlatId;
                        }
                        else if (main.FloorId != null)
                        {
                            activity.TowerId = main.TowerId;
                            activity.FloorId = main.FloorId;
                        }
                        else if (main.TowerId != null)
                        {
                            activity.TowerId = main.TowerId;
                        }

                        await dataService.SaveDataAsync(model, activity, token);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            throw;
        }
    }

    private dynamic GetResourceDetails(string model, long id, CancellationToken token)
    {
        var data = dataService.GetDetails(id, token);

        if (data != null)
        {
            return data;
        }
        else
        {
            logger.LogError("No data retrive from backend for " + model + "  name:" + id);
            return null;
        }
    }
}

