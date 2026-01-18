using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RajApi.Data;
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
            long Id = 0;

            var updatedata = await dataService.ConvertBase64toFile(module, data);
            Id = await dataService.AddAsync(module, updatedata, token);
            await dataService.ProcessAddDataAsync(module, updatedata, Id, token);
            return Id;

        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveData method and details: '{ex.Message}'");
            throw;
        }
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
            var updatedata = await dataService.ConvertBase64toFile(module, data);
            await dataService.EditAsync(module, id, updatedata, token);
            await dataService.ProcessEditDataAsync(module, updatedata, id, token);
            return id;
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

    private dynamic UpdateAcutualDate(string model, dynamic data)
    {
        Type type = dataService.GetType(model);
        if (type == null) { return -1L; }

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
}

