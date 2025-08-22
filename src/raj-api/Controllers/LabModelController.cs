using DocumentFormat.OpenXml.Wordprocessing;
using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RajApi.Data;
using RajApi.Data.Models;
using RajApi.Helpers;

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
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            long activityId = 0;

            activityId = await dataService.AddAsync(module, data, token);
            if (module.Equals("FLATTEMPLATE", StringComparison.CurrentCultureIgnoreCase))
            {
                await SaveFlatTemplateData(module, data, activityId, token);
            }

            if (module.Equals("PLAN", StringComparison.CurrentCultureIgnoreCase))
            {
                Type? type = dataService?.GetType(module);
                if (type == null)
                {
                    return -1L;
                }

                dynamic jsonString = data.ToString();
                var jsonData = JsonConvert.DeserializeObject(jsonString, type);
                if (jsonData != null && jsonData?.Type?.ToLower() == "tower")
                {
                    var project = Get("Project", jsonData?.ProjectId);
                    activityId = await SaveFloorData(jsonData, activityId, project.Result.Name, token);
                    await SaveParkingData(jsonData, activityId, project.Result.Name, token);
                }
            }
            if (module.Equals("ACTIVITY", StringComparison.CurrentCultureIgnoreCase))
            {
                await SaveSubTaskAsync(module, activityId, token);
            }

            return activityId;

        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveData method and details: '{ex.Message}'");
            throw;
        }
    }

    /// <summary>
    /// Save Flat Template data
    /// </summary>
    /// <param name="module"> Module</param>
    /// <param name="data"> Raw JSON data</param>
    /// <param name="token"> CancellationToken</param>
    private async Task SaveFlatTemplateData(string module, dynamic data, long templateId, CancellationToken token)
    {
        try
        {
            Type? type = dataService?.GetType(module);

            dynamic jsonString = data.ToString();
            var jsonData = JsonConvert.DeserializeObject(jsonString, type);
            List<FlatTemplateDetails> templatList = JsonConvert.DeserializeObject<List<FlatTemplateDetails>>(jsonData.TemplateDetails);
            foreach (var item in templatList)
            {
                FlatTemplateDetails details = new()
                {
                    FlatTemplateId = templateId,
                    RoomId = item?.RoomId,
                    RoomCount = item?.RoomCount
                };

                await dataService.SaveDataAsync("FlatTemplateDetails", details, token);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveFlatTemplateDetailsData method and details: '{ex.Message}'");
            throw;
        }
    }

    /// <summary>
    /// Save parking data
    /// </summary>
    /// <param name="jsonData">Tower data</param>
    /// <param name="towerId">tower Id</param>
    /// <param name="projectName">Project Name</param>
    /// <param name="token">Token</param>
    /// <returns></returns>
    private async Task SaveParkingData(dynamic jsonData, long towerId, string projectName, CancellationToken token)
    {
        try
        {
            var parkingData = jsonData.Parkings;
            List<ParkingRawData> parkingsList = JsonConvert.DeserializeObject<List<ParkingRawData>>(parkingData);
            foreach (var item in parkingsList)
            {
                var parkingType = Get("ParkingType", item.ParkingTypeId);
                for (int i = 1; i <= item.NoOfParking; i++)
                {
                    string name = projectName + "_" + jsonData?.Name + "_Parking_" + parkingType.Result.Name + i;

                    Parking parking = new()
                    {
                        ParkingTypeId = item.ParkingTypeId,
                        TowerId = towerId,
                        ProjectId = jsonData?.ProjectId,
                        Name = name,
                    };

                    await dataService.SaveDataAsync("Parking", parking, token);
                }
            }


        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveParkingData method and details: '{ex.Message}'");
            throw;
        }
    }

    /// <summary>
    /// Save Floor data from NoOfFloors
    /// </summary>
    /// <param name="jsonData">Tower data</param>
    /// <param name="towerId">Tower Id</param>
    /// <param name="projectName">Project Name</param>
    /// <param name="token">Token</param>
    /// <returns></returns>
    private async Task<long> SaveFloorData(dynamic jsonData, long towerId, string projectName, CancellationToken token)
    {
        long activityId = 0;
        try
        {
            for (int i = 0; i < jsonData.NoOfFloors; i++)
            {
                string floorName = "", description = "";
                if (i == 0)
                {
                    floorName = projectName + "_" + jsonData.Name + "_FloorG";
                    description = projectName + "_" + jsonData.Description + "_FloorG";
                }
                else
                {
                    floorName = projectName + "_" + jsonData.Name + "_Floor" + i;
                    description = projectName + "_" + jsonData.Description + "_Floor" + i;
                }
                Plan plan = new()
                {
                    Type = "floor",
                    Name = floorName,
                    Description = description,
                    ParentId = towerId,
                    ProjectId = jsonData.ProjectId,
                    Blueprint = jsonData.Blueprint,
                };

                activityId = await dataService.SaveDataAsync("Plan", plan, token);
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
            if (module.Equals("PLAN", StringComparison.CurrentCultureIgnoreCase))
            {
                Type? type = dataService?.GetType(module);
                if (type == null)
                {
                    return -1L;
                }

                dynamic jsonString = data.ToString();
                var jsonData = JsonConvert.DeserializeObject(jsonString, type);
                if (jsonData != null && jsonData?.Type?.ToLower() == "floor")
                {
                    activityId = await SaveFlatData(jsonData, id, token);
                }
            }
            return activityId;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in PutAsync module: '{module}' message:'{ex.Message}'");
            throw;
        }
    }

    /// <summary>
    /// Save Flat data
    /// </summary>
    /// <param name="jsonData">Raw Flat data</param>
    /// <param name="floorId">Floor id</param>
    /// <param name="token">Token</param>
    /// <returns></returns>
    private async Task<long> SaveFlatData(dynamic? jsonData, long floorId, CancellationToken token)
    {
        long activityId = 0;
        try
        {
            var data = jsonData?.FlatTemplates;
            List<FlatTemplateRawData> templateList = JsonConvert.DeserializeObject<List<FlatTemplateRawData>>(data);

            var project = Get("Project", jsonData?.ProjectId);
            if (project == null)
                return 0;

            var tower = Get("Plan", jsonData?.ParentId);
            if (tower == null)
                return 0;


            for (int i = 0; i < templateList.Count; i++)
            {
                var flatType = Get("FlatTemplate", templateList[i].FlatTemplateId);
                if (flatType == null)
                    return 0;

                for (int j = 1; j <= templateList[i].NoOfFlats; j++)
                {
                    string flatName = "", description = "";

                    flatName = project.Result.Name + "_" + tower.Result.Name + "_" + jsonData?.Name + "_" + flatType.Result.Name + "Flat" + j;
                    description = project.Result.Description + "_" + tower.Result.Description + "_" + jsonData?.Description + "_" + flatType.Result.DescriptionName + "Flat" + j;

                    Plan plan = new()
                    {
                        Type = "flat",
                        Name = flatName,
                        Description = description,
                        ParentId = floorId,
                        ProjectId = jsonData?.ProjectId,
                        FlatTemplateId = templateList[i].FlatTemplateId,
                        Blueprint = jsonData?.Blueprint,
                    };

                    activityId = await dataService.SaveDataAsync("Plan", plan, token);

                }
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveFloorData method and details: '{ex.Message}'");
            throw;
        }
        return activityId;
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

