using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using RajApi.Data;
using RajApi.Data.Models;
using System.Reflection;

namespace ILab.Data
{
    public class RajDataService : ILabDataService
    {

        public readonly RajDataHandler dataHandler;
        public RajDataService(RajDataHandler handler
            , ILogger<RajDataService> logger)
            : base(handler, logger)
        {
            dataHandler = handler;
        }

        /// <summary>
        /// 
        /// </summary>
        public virtual ModuleIdentity Identity { get { return dataHandler.Identity; } set { dataHandler.Identity = value; } }
        public async Task<dynamic> GetUploadedfile(string module, long id)
        {
            var data = await Get(module, id);
            return data;

        }
        public override Type? GetType(string model)
        {
            var asm = typeof(RajDataService).Assembly;

            var type = asm.GetTypes()
                .FirstOrDefault(p => p.Name.Equals(model, StringComparison.OrdinalIgnoreCase)
                    && p.IsSubclassOf(typeof(LabModel)));

            if (type == null) { return null; }

            return type;
        }

        public virtual async Task<long> AssignAsync(string model, long id, dynamic data, CancellationToken token)
        {
            try
            {
                var type = GetType(model);
                if (type == null) { return -1; }

                var jsonString = data.ToString();
                var jsonData = JsonConvert.DeserializeObject(jsonString, type);

                var existingData = await Get(model, id);
                existingData.Member = jsonData.Member;
                if ((bool)((LevelSetup)jsonData)?.IsApproved)
                {
                    existingData.Status = jsonData.Status;
                    existingData.ApprovedBy = jsonData.ApprovedBy;
                    existingData.ApprovedDate = jsonData.ApprovedDate;
                    existingData.IsApproved = jsonData.IsApproved;
                }

                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.AssignAsync));
                var generic = method?.MakeGenericMethod(type);
                object[] parameters = { existingData, token };
                var task = (Task<long>)generic.Invoke(handler, parameters);

                var result = await task;

                return result;
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in AssignAsync method and details: " + ex.Message);
                return 0;
            }
        }

        public virtual async Task<long> SaveDataAsync(string model, dynamic data, CancellationToken token)
        {
            try
            {
                var type = GetType(model);
                if (type == null) { return -1; }

                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.AddAsync));
                var generic = method?.MakeGenericMethod(type);
                object[] parameters = { data, token };
                var task = (Task<long>)generic.Invoke(handler, parameters);

                var result = await task;

                return result;
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in AssignAsync method and details: " + ex.Message);
                return 0;
            }
        }

        public virtual async Task SaveSubTaskAsync(string model, long activityId, CancellationToken token)
        {
            try
            {
                var subact = await Get(model, activityId);
                if (subact != null)
                {
                    if (subact.FlatId != null)
                    {
                        var flats = GetDetails("UnitOfWork", subact.FlatId);
                        await SavaDataIntoDataBase(flats, model, subact, token);
                    }
                    else if (subact.FloorId != null)
                    {
                        var floors = GetDetails("UnitOfWork", subact.FloorId);
                        await SavaDataIntoDataBase(floors, model, subact, token);
                    }
                    else if (subact.TowerId != null)
                    {
                        var towers = GetDetails("UnitOfWork", subact.TowerId);
                        await SavaDataIntoDataBase(towers, model, subact, token);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in SaveSubTaskAsync method and details: " + ex.Message);
                throw;
            }
        }

        private async Task SavaDataIntoDataBase(dynamic lists, string model, Activity main, CancellationToken token)
        {
            try
            {
                if (lists != null)
                {
                    foreach (var item in lists.Items)
                    {
                        var desc = item.Name;
                        Activity activity = new()
                        {
                            Type = "Sub Task",
                            ParentId = main.Id,
                            ProjectId = main.ProjectId,
                            DependencyId = main.DependencyId,
                            UserId = main.UserId,
                            Name = string.Concat(main.Name, "-", desc),
                            Description = string.Concat(main.Description, "-", desc)
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

                        await SaveDataAsync(model, activity, token);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }

        private dynamic GetDetails(string model, long id)
        {
            ListOptions option = new();
            Condition con = new()
            {
                Name = "PlanId",
                Value = id
            };
            option.SearchCondition = con;
            var data = Get(model, option);

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
}
