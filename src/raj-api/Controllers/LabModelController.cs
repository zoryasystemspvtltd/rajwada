using DocumentFormat.OpenXml.Spreadsheet;
using ILab.Data;
using ILab.Extensionss.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RajApi.Data;
using RajApi.Data.Models;
using RajApi.Helpers;
using System.Text;

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
            long Id = 0;

            Id = await dataService.AddAsync(module, data, token);

            if (module.Equals("PROJECT", StringComparison.CurrentCultureIgnoreCase))
            {
                await SaveProjectDocNoTrackingData(Id, token);
            }

            if (module.Equals("FLATTEMPLATE", StringComparison.CurrentCultureIgnoreCase))
            {
                await SaveFlatTemplateData(module, data, Id, token);
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
                    await SaveFloorData(jsonData, Id, project.Result.Name, project.Result.Code, token);
                    await SaveParkingData(jsonData, Id, project.Result.Name, project.Result.Code, token);
                }
            }
            if (module.Equals("ACTIVITY", StringComparison.CurrentCultureIgnoreCase))
            {
                await SaveSubTaskAsync(module, Id, token);
            }

            return Id;

        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveData method and details: '{ex.Message}'");
            throw;
        }
    }

    private async Task SaveProjectDocNoTrackingData(long projectId, CancellationToken token)
    {
        ProjectDocNoTracking details = new()
        {
            ProjectId = projectId,
            LastDocumentNo = 0,
            LastDocumentNoGenerated = DateTime.Now
        };

        await dataService.SaveDataAsync("ProjectDocNoTracking", details, token);
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
    /// <param name="projectCode">Project Code</param>
    /// <param name="token">Token</param>
    /// <returns></returns>
    private async Task SaveParkingData(dynamic jsonData, long towerId, string projectName, string projectCode, CancellationToken token)
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
                    string name = projectName + "/" + jsonData?.Name + "/Parking/" + parkingType.Result.Name + i;

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
    /// <param name="projectCode">Project Code</param>
    /// <param name="token">Token</param>
    /// <returns></returns>
    private async Task<long> SaveFloorData(dynamic jsonData, long towerId, string projectName, string projectCode, CancellationToken token)
    {
        long activityId = 0;
        try
        {
            for (int i = 0; i < jsonData.NoOfFloors; i++)
            {
                string floorName = string.Empty, description = string.Empty;
                if (i == 0)
                {
                    floorName = projectCode + "/" + jsonData.Name + "/FloorG";
                    description = projectName + "/" + jsonData.Name + "/FloorG";
                }
                else
                {
                    floorName = projectCode + "/" + jsonData.Name + "/Floor" + i;
                    description = projectName + "/" + jsonData.Name + "/Floor" + i;
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
                if (jsonData != null && jsonData?.Type?.ToLower() == "floor" && jsonData?.FlatTemplates != null)
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
        long flatId = 0;
        try
        {
            var data = jsonData?.FlatTemplates;
            List<FlatTemplateRawData> templateList = JsonConvert.DeserializeObject<List<FlatTemplateRawData>>(data);
            var data1 = jsonData as Plan;
            var str = data1?.Name?.Split('/');
            string floorName = str?[0] + "/" + str?[1] + "/" + (str?[2]).Substring(5, 1);
            char c = 'A';

            for (int i = 0; i < templateList.Count; i++)
            {
                long templateId = templateList[i].FlatTemplateId;
                var flatType = Get("FlatTemplate", templateId);
                if (flatType == null)
                    return 0;

                for (int j = 1; j <= templateList[i].NoOfFlats; j++)
                {
                    string flatName = string.Empty, description = string.Empty;

                    flatName = floorName + "-" + c;
                    description = jsonData?.Description + "_" + flatType.Result.Name + c;

                    Plan plan = new()
                    {
                        Type = "flat",
                        Name = flatName,
                        Description = description,
                        ParentId = floorId,
                        ProjectId = jsonData?.ProjectId,
                        FlatTemplateId = templateId,
                        Blueprint = jsonData?.Blueprint,
                    };

                    //Save Flat 
                    flatId = await dataService.SaveDataAsync("Plan", plan, token);

                    //Save Resource
                    await SaveResource(templateId, flatName, flatId, token);
                    c++;
                }
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveFlatData method and details: '{ex.Message}'");
            throw;
        }
        return flatId;
    }

    private async Task SaveResource(long templateId, string flatName, long flatId, CancellationToken token)
    {
        try
        {
            var option = this.GetApiOption();
            var con = new Condition()
            {
                Name = "FlatTemplateId",
                Value = templateId
            };
            option.SearchCondition = con;

            var ftDetails = dataService.Get("FlatTemplateDetails", option);

            foreach (var item in ftDetails.Items)
            {
                var roomDetails = Get("Room", item.RoomId);
                var roomName = flatName + "/" + roomDetails.Result.Code;

                Resource rec = new()
                {
                    Type = "room",
                    RoomId = item.RoomId,
                    Quantity = item.RoomCount,
                    PlanId = flatId,
                    Name = roomName
                };

                await dataService.SaveDataAsync("Resource", rec, token);
            }

        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveResource method and details: '{ex.Message}'");
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
                    await SavaDataIntoDataBase(model, subact, token);
                }
                //else if (subact.FloorId != null)
                //{
                //    var floors = GetResourceDetails("Resource", subact.FloorId, token);
                //    await SavaDataIntoDataBase(floors, model, subact, token);
                //}
                //else if (subact.TowerId != null)
                //{
                //    var towers = GetResourceDetails("Resource", subact.TowerId, token);
                //    await SavaDataIntoDataBase(towers, model, subact, token);
                //}
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
    private async Task SavaDataIntoDataBase(string model, Activity main, CancellationToken token)
    {
        try
        {
            var option = this.GetApiOption();
            var con = new Condition()
            {
                Name = "PlanId",
                Value = main.FlatId
            };
            option.SearchCondition = con;

            var lists = dataService.Get("Resource", option);
            if (lists != null)
            {
                foreach (var item in lists.Items)
                {
                    int quantity = (int)item.Quantity;
                    for (int index = 1; index <= quantity; index++)
                    {
                        var desc = string.Concat(item.Name, "-", index);
                        Activity activity = new()
                        {
                            Type = "Sub Task",
                            ParentId = main.Id,
                            ProjectId = main.ProjectId,
                            WorkflowId = main.WorkflowId,
                            UserId = main.UserId,
                            Name = string.Concat(main.Name, "-", desc),
                            Description = string.Concat(main.Description, "-", desc),
                            StartDate = main.StartDate,
                            EndDate = main.EndDate,
                            Items = main.Items,
                            ContractorId = main.ContractorId,
                            PhotoUrl = main.PhotoUrl,
                            DependencyId = main.DependencyId,
                            MaterialProvidedBy = main.MaterialProvidedBy,
                            LabourProvidedBy = main.LabourProvidedBy
                        };
                        if (main.FlatId != null)
                        {
                            activity.TowerId = main.TowerId;
                            activity.FloorId = main.FloorId;
                            activity.FlatId = main.FlatId;
                            activity.WorkId = GetWorkId(item.Name, index, main.DependencyId, main.ProjectId, token);
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

    private string? GetWorkId(string name, int index, long? DependencyId, long? projectId, CancellationToken token)
    {
        try
        {
            //Work Id formate
            //<Project_Alias>/<Tower_Alias>/<Floor_Number>-<Flat-Number>/<Room-Type-Alias>-<Room-Count-Index>/<Activity_Type_Alias>/<Document_Number>/<Year>
            var dependency = Get("Dependency", (long)DependencyId);

            var docno = dataService.GetDocumentNo((long)projectId);

            string year = dataService.GetFinancialYear();
            if (dependency != null && docno != null)
            {
                int newNo = docno.LastDocumentNo + 1;
                UpdateProjcetDocNoTracing(docno, newNo, token);

                string nextDocNo = newNo.ToString("D3");
                StringBuilder workId = new();
                workId.Append(name); //<Project_Alias>/<Tower_Alias>/<Floor_Number>-<Flat-Number>/<Room-Type-Alias>
                workId.Append("-");
                workId.Append(index); //<Room-Count-Index>
                workId.Append("/");
                workId.Append(dependency.Result.Code); //<Activity_Type_Alias>
                workId.Append("/");
                workId.Append(nextDocNo); //<Document_Number>
                workId.Append("/");
                workId.Append(year); //<Year>
                return workId.ToString();
            }
            else
            { return null; }

        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            throw;
        }
    }

    private void UpdateProjcetDocNoTracing(dynamic data, int newNo, CancellationToken token)
    {
        data.LastDocumentNoGenerated = DateTime.Now;
        data.LastDocumentNo = newNo;
        PutAsync("ProjectDocNoTracking", data.Id, data, token); //Update the doc with latest no
    }
}

