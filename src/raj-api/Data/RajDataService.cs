using DocumentFormat.OpenXml.Drawing.Spreadsheet;
using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RajApi.Data;
using RajApi.Data.Models;
using RajApi.Helpers;
using RajApi.Migrations;
using System.Text;
using System.Timers;

namespace ILab.Data
{
    public class RajDataService : ILabDataService
    {
        public readonly RajDataHandler dataHandler;
        private readonly IConfiguration _configuration;
        public RajDataService(RajDataHandler handler, IConfiguration configuration
            , ILogger<RajDataService> logger)
            : base(handler, logger)
        {
            _configuration = configuration;
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

        public override async Task<long> EditPartialAsync(string module, long id, dynamic data, CancellationToken token)
        {
            try
            {
                var type = GetType(module);
                if (type == null) { return -1; }
                string? remarks = string.Empty;
                string? modifiedBy = string.Empty;

                var jsonString = data.ToString();
                var jsonData = JsonConvert.DeserializeObject(jsonString, type);

                var existingData = await Get(module, id);
                existingData.Member = jsonData.Member;
                existingData.Status = jsonData?.Status;
                if (type == typeof(LevelSetup))
                {
                    if (jsonData != null && jsonData?.Status != null)
                    {
                        existingData.Status = jsonData?.Status;
                    }

                    if (jsonData != null && jsonData?.IsApproved != null)
                    {
                        existingData.ApprovedBy = jsonData?.ApprovedBy;
                        existingData.ApprovedDate = jsonData?.ApprovedDate;
                        existingData.IsApproved = jsonData?.IsApproved;
                        existingData.ApprovedRemarks = jsonData?.ApprovedRemarks;
                        modifiedBy = jsonData?.ModifiedBy;
                    }
                }
                if (type == typeof(Activity))
                {
                    //When Activity Assigned
                    if (jsonData != null && jsonData?.Status != null)
                    {
                        existingData.Status = jsonData?.Status;
                        modifiedBy = jsonData?.ModifiedBy;
                        //Assigned also Project,Tower,Floor,Flat,Room
                        await AssginedLinkedModule(existingData, token);
                    }
                    //When QC Approved
                    if (jsonData != null && jsonData?.IsQCApproved != null)
                    {
                        existingData.IsQCApproved = jsonData?.IsQCApproved;
                        existingData.QCApprovedBy = jsonData?.QCApprovedBy;
                        existingData.QCApprovedDate = jsonData?.QCApprovedDate;
                        existingData.QCRemarks = jsonData?.QCRemarks;
                        remarks = jsonData?.Remarks;
                    }
                    //When HOD Approved
                    if (jsonData != null && jsonData?.IsApproved != null)
                    {
                        existingData.ApprovedBy = jsonData?.ApprovedBy;
                        existingData.ApprovedDate = jsonData?.ApprovedDate;
                        existingData.IsApproved = jsonData?.IsApproved;
                        existingData.HODRemarks = jsonData?.HODRemarks;
                        remarks = jsonData?.HODRemarks;
                    }
                }

                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.EditPartialAsync));
                var generic = method?.MakeGenericMethod(type);
                object[] parameters = { existingData, module, remarks, modifiedBy, token };
                var task = (Task<long>)generic.Invoke(handler, parameters);

                var result = await task;

                return result;
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in EditPartialAsync method and details: " + ex.Message);
                return 0;
            }
        }

        private async Task AssginedLinkedModule(dynamic existingData, CancellationToken token)
        {
            try
            {
                if (existingData.Status.Equals(StatusType.Assigned))
                {
                    var project = await Get("Project", (long)existingData.ProjectId);

                    if (project != null)
                    {
                        await SaveApplicationLogForLinkedModule("Project", project, StatusType.Assigned, token);
                    }
                    if (existingData.TowerId != null)
                    {
                        var tower = await Get("Plan", (long)existingData.TowerId);

                        if (tower != null)
                        {
                            await SaveApplicationLogForLinkedModule("Plan", tower, StatusType.Assigned, token);
                        }
                    }

                    if (existingData.FlatId != null)
                    {
                        var flat = await Get("Plan", (long)existingData.FlatId);

                        if (flat != null)
                        {
                            await SaveApplicationLogForLinkedModule("Plan", flat, StatusType.Assigned, token);
                        }
                    }

                    if (existingData.FloorId != null)
                    {
                        var floor = await Get("Plan", (long)existingData.FloorId);

                        if (floor != null)
                        {
                            await SaveApplicationLogForLinkedModule("Plan", floor, StatusType.Assigned, token);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in AssginedLinkedModule method and details: " + ex.Message);
            }

        }

        private async Task SaveApplicationLogForLinkedModule(string moduel, dynamic data, StatusType activityType, CancellationToken token)
        {

            try
            {
                var type = GetType(moduel);
                if (type != null)
                {
                    var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.LogLabModelLog));
                    var generic = method?.MakeGenericMethod(type);
                    object[] parameters = { data, activityType, token };
                    var task = (Task<long>)generic.Invoke(handler, parameters);

                    var result = await task;
                }

            }
            catch (Exception ex)
            {
                logger.LogError("Exception in SaveApplicationLogForLinkedModule method and details: " + ex.Message);
            }
        }

        public async Task<long> SaveBulkkDataAsync(string model, IEnumerable<dynamic> data, CancellationToken token)
        {
            var type = GetType(model);
            if (type == null) { return -1; }
            var method = typeof(LabDataHandler).GetMethod(nameof(LabDataHandler.BulkAddAsync));
            var generic = method?.MakeGenericMethod(type);
            object[] parameters = { data, token };
            var task = (Task<long>)generic.Invoke(handler, parameters);

            var result = await task;

            return result;
        }

        public async Task<long> SaveDataAsync(string model, dynamic data, CancellationToken token)
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

        public async Task ProcessAddDataAsync(string model, dynamic data, long Id, CancellationToken token)
        {
            try
            {
                var type = GetType(model);
                switch (model?.ToUpperInvariant())
                {
                    case "PROJECT":
                        await SaveProjectDocNoTrackingData(Id, token);
                        break;

                    case "FLATTEMPLATE":
                        await SaveFlatTemplateData(type, data, Id, token);
                        break;

                    case "ACTIVITY":
                        //await SaveSubTaskAsync(model, Id, token);
                        await SaveActivityResourceAsync(type, data, Id, token);
                        break;

                    case "PLAN":
                        var jsonData = JsonConvert.DeserializeObject(data.ToString(), type);

                        if (jsonData != null)
                        {
                            var project = await Get("Project", jsonData?.ProjectId);

                            if (string.Equals(jsonData?.Type?.tostring(), "TOWER", StringComparison.OrdinalIgnoreCase))
                            {
                                await SaveFloorData(jsonData, Id, project.Name, project.Code, token);
                                await SaveParkingData(jsonData, Id, project.Name, token);
                            }
                            if (string.Equals(model, "OUTSIDEENTITY", StringComparison.OrdinalIgnoreCase))
                            {
                                await SaveOutSideEntitiesData(jsonData, project.Name, token);
                            }
                        }
                        break;
                    case "OUTSIDEENTITY":

                        var jsonData1 = JsonConvert.DeserializeObject(data.ToString(), type);

                        if (jsonData1 != null)
                        {
                            var project = await Get("Project", jsonData1?.ProjectId);

                            if (string.Equals(model, "OUTSIDEENTITY", StringComparison.OrdinalIgnoreCase))
                            {
                                await SaveOutSideEntitiesData(jsonData1, project.Name, token);
                            }
                        }
                        break;
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in ProcessAddDataAsync method and details: " + ex.Message);
                throw;
            }
        }

        public async Task ProcessEditDataAsync(string model, dynamic data, long Id, CancellationToken token)
        {
            try
            {
                if (model.Equals("PLAN", StringComparison.CurrentCultureIgnoreCase))
                {
                    Type? type = GetType(model);

                    dynamic jsonString = data.ToString();
                    var jsonData = JsonConvert.DeserializeObject(jsonString, type);
                    if (jsonData != null && jsonData?.Type?.ToLower() == "floor" && jsonData?.FlatTemplates != null)
                    {
                        await SaveFlatData(jsonData, Id, token);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in ProcessEditDataAsync method and details: " + ex.Message);
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
            try
            {
                var data = jsonData?.FlatTemplates;
                var templateList = JsonConvert.DeserializeObject<List<FlatTemplateRawData>>(data);
                var data1 = jsonData as Plan;
                var str = data1?.Name?.Split('/');
                var floorName = $"{str?[0]}/{str?[1]}/{str?[2]?.Substring(5, 1)}";
                var descriptionPrefix = jsonData?.Description ?? "";

                foreach (var template in templateList)
                {
                    long templateId = template.flatTemplateId;
                    var flatType = await Get("FlatTemplate", templateId);
                    if (flatType == null) return 0;

                    var flatTypeName = flatType.Name;
                    int totalFlats = template.noOfFlats;
                    int generated = 0;
                    while (generated < totalFlats)
                    {
                        var suffix = GenerateFlatSuffix(generated); // Reusable generator
                        var flatName = $"{floorName}-{suffix}";
                        var description = $"{descriptionPrefix}_{flatTypeName}{suffix}";

                        var plan = new Plan
                        {
                            Type = "flat",
                            Name = flatName,
                            Description = description,
                            ParentId = floorId,
                            ProjectId = jsonData?.ProjectId,
                            FlatTemplateId = templateId,
                            Blueprint = jsonData?.Blueprint,
                            PriorityStatus = PriorityStatusType.Normal,
                        };

                        long flatId = await SaveDataAsync("Plan", plan, token);
                        await SaveRoomDetails(templateId, flatName, flatId, token);

                        generated++;
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Exception in SaveFlatData: {Message}", ex.Message);
                throw;
            }

            return 0; // Or last flatId if needed
        }

        private string GenerateFlatSuffix(int index)
        {
            if (index < 26)
                return ((char)('A' + index)).ToString();

            index -= 26;
            char first = (char)('A' + (index / 26));
            char second = (char)('A' + (index % 26));
            return $"{first}{second}";
        }


        private async Task SaveRoomDetails(long templateId, string flatName, long flatId, CancellationToken token)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetFlatTemplateDetails));
                object[] parameters = [templateId];
                var flatTemplateDetails = (List<FlatTemplateDetails>)method?.Invoke(handler, parameters);

                List<RoomDetails> roomDetails = new();
                foreach (var item in flatTemplateDetails)
                {
                    var rooms = Get("RoomType", (long)item.RoomTypeId);

                    for (int i = 1; i <= item.RoomCount; i++)
                    {
                        var roomId = flatName + "/" + rooms.Result.Code + "-" + i;
                        RoomDetails rec = new()
                        {
                            RoomId = roomId,
                            Status = StatusType.Draft,
                            Date = DateTime.UtcNow,
                            Member = Identity.Member,
                            Key = Identity.Key,
                            RoomTypeId = item.RoomTypeId,
                            PlanId = flatId,
                            Name = rooms.Result.Code + "-" + i,
                        };
                        roomDetails.Add(rec);
                    }
                }
                await SaveBulkkDataAsync("RoomDetails", roomDetails, token);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in SaveRoomDetails method and details: '{ex.Message}'");
                throw;
            }
        }

        /// <summary>
        /// Save Project Tracking No
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        private async Task SaveProjectDocNoTrackingData(long projectId, CancellationToken token)
        {
            ProjectDocNoTracking details = new()
            {
                ProjectId = projectId,
                LastDocumentNo = 0,
                LastDocumentNoGenerated = DateTime.Now
            };

            await SaveDataAsync("ProjectDocNoTracking", details, token);
        }

        /// <summary>
        /// Save Flat Template data
        /// </summary>
        /// <param name="module"> Module</param>
        /// <param name="type"> Type</param>
        /// <param name="data"> Raw JSON data</param>
        /// <param name="token"> CancellationToken</param>
        private async Task SaveFlatTemplateData(Type type, dynamic data, long templateId, CancellationToken token)
        {
            try
            {
                dynamic jsonString = data.ToString();
                var jsonData = JsonConvert.DeserializeObject(jsonString, type);
                List<FlatTemplateDetails> templatList = JsonConvert.DeserializeObject<List<FlatTemplateDetails>>(jsonData.TemplateDetails);
                List<FlatTemplateDetails> flatTemplateDetails = new();
                foreach (var item in templatList)
                {
                    FlatTemplateDetails details = new()
                    {
                        Status = StatusType.Draft,
                        Date = DateTime.UtcNow,
                        Member = Identity.Member,
                        Key = Identity.Key,
                        FlatTemplateId = templateId,
                        RoomTypeId = item?.RoomTypeId,
                        RoomCount = item?.RoomCount
                    };
                    flatTemplateDetails.Add(details);
                }
                await SaveBulkkDataAsync("FlatTemplateDetails", flatTemplateDetails, token);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in SaveFlatTemplateDetailsData method and details: '{ex.Message}'");
                throw;
            }
        }
        private async Task SaveOutSideEntitiesData(dynamic? jsonData, string projectName, CancellationToken token)
        {
            try
            {
                if (jsonData?.EntitiesList == null)
                    return;

                var outSideList = JsonConvert.DeserializeObject<List<EntitiesList>>(jsonData.EntitiesList);
                if (outSideList == null || outSideList.Count == 0)
                    return;

                var entityList = new List<OutSideEntity>();

                var tower = jsonData?.TowerId != null
                    ? await Get("Plan", jsonData.TowerId)
                    : null;

                var floor = jsonData?.FloorId != null
                    ? await Get("Plan", jsonData.FloorId)
                    : null;

                string locationPrefix = projectName + "/";

                if (tower != null)
                    locationPrefix += tower.Code + "/";

                if (floor != null)
                    locationPrefix += floor.Code + "/";

                foreach (var item in outSideList)
                {
                    var entityType = await Get("OutSideEntityType", item.outSideEntityTypeId);
                    if (entityType == null) continue;

                    for (int i = 1; i <= item.noOfEntity; i++)
                    {
                        var name = $"{locationPrefix}{entityType.Name}-{i}";

                        entityList.Add(new OutSideEntity
                        {
                            Status = StatusType.Draft,
                            Date = DateTime.UtcNow,
                            Member = Identity.Member,
                            Key = Identity.Key,
                            OutSideEntityTypeId = item.outSideEntityTypeId,
                            TowerId = jsonData?.TowerId,
                            FloorId = jsonData?.FloorId,
                            ProjectId = jsonData?.ProjectId,
                            Name = name
                        });
                    }
                }

                if (entityList.Count > 0)
                    await SaveBulkkDataAsync("OutSideEntity", entityList, token);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in SaveOutSideEntitiesData: {ex.Message}");
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
        private async Task SaveParkingData(dynamic jsonData, long towerId, string projectName, CancellationToken token)
        {
            try
            {
                var parkingData = jsonData.Parkings;
                List<ParkingRawData> parkingsList = JsonConvert.DeserializeObject<List<ParkingRawData>>(parkingData);

                List<Parking> parkings = new();
                foreach (var item in parkingsList)
                {
                    var parkingType = Get("ParkingType", item.parkingTypeId);
                    for (int i = 1; i <= item.noOfParking; i++)
                    {
                        string name = projectName + "/" + jsonData?.Name + "/Parking/" + parkingType.Result.Name + i;

                        Parking parking = new()
                        {
                            Status = StatusType.Draft,
                            Date = DateTime.UtcNow,
                            Member = Identity.Member,
                            Key = Identity.Key,
                            ParkingTypeId = item.parkingTypeId,
                            TowerId = towerId,
                            ProjectId = jsonData?.ProjectId,
                            Name = name,
                        };
                        parkings.Add(parking);
                    }
                }
                await SaveBulkkDataAsync("Parking", parkings, token);
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
        private async Task SaveFloorData(dynamic jsonData, long towerId, string projectName, string projectCode, CancellationToken token)
        {

            try
            {
                List<Plan> listplan = new();
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
                        Status = StatusType.Draft,
                        Date = DateTime.UtcNow,
                        Member = Identity.Member,
                        Key = Identity.Key,
                        Type = "floor",
                        Name = floorName,
                        Description = description,
                        ParentId = towerId,
                        ProjectId = jsonData.ProjectId,
                        Blueprint = jsonData.Blueprint,
                        PriorityStatus = PriorityStatusType.Normal,
                    };
                    listplan.Add(plan);
                }
                await SaveBulkkDataAsync("Plan", listplan, token);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in SaveFloorData method and details: '{ex.Message}'");
                throw;
            }

        }


        private async Task SaveActivityResourceAsync(Type type, dynamic data, long activityId, CancellationToken token)
        {
            try
            {
                dynamic jsonString = data.ToString();
                var jsonData = JsonConvert.DeserializeObject(jsonString, type);
                DateOnly StartDate = DateOnly.FromDateTime(jsonData.StartDate);
                var activityResourceList = JsonConvert.DeserializeObject<List<ActivityResource>>(jsonData.Items);
                List<ActivityResource> activityResources = new();

                foreach (ActivityResource mainitem in activityResourceList)
                {
                    if (mainitem.AssignedList?.Count > 0)
                    {
                        foreach (var item in mainitem.AssignedList)
                        {
                            var date = StartDate.AddDays(-item.NotifyBefore);
                            ActivityResource details = new()
                            {
                                Status = StatusType.Draft,
                                Date = DateTime.UtcNow,
                                Member = Identity.Member,
                                Key = Identity.Key,
                                ActivityId = activityId,
                                AssignedUser = item?.Member,
                                Quantity = mainitem?.Quantity,
                                UOMId = mainitem?.UOMId,
                                AssetId = mainitem?.AssetId,
                                ResourceType = "Item",
                                AvailabilityStatus = AvailablityStatus.NotAvailable,
                                NotificationStartDate = date
                            };
                            activityResources.Add(details);
                        }
                    }
                    else
                    {
                        ActivityResource details = new()
                        {
                            Status = StatusType.Draft,
                            Date = DateTime.UtcNow,
                            Member = Identity.Member,
                            Key = Identity.Key,
                            ActivityId = activityId,
                            Quantity = mainitem?.Quantity,
                            UOMId = mainitem?.UOMId,
                            AssetId = mainitem?.AssetId,
                            ResourceType = "Item",
                            AvailabilityStatus = AvailablityStatus.NotAvailable
                        };
                        activityResources.Add(details);
                    }
                }
                await SaveBulkkDataAsync("ActivityResource", activityResources, token);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in SaveSubTaskAsync method, message:'{ex.Message}'");
            }
        }


        /// <summary>
        /// Update the doc with latest no
        /// </summary>
        /// <param name="data"></param>
        /// <param name="newNo"></param>
        /// <param name="token"></param>
        private void UpdateProjcetDocNoTracing(dynamic data, int newNo, CancellationToken token)
        {
            try
            {
                data.LastDocumentNoGenerated = DateTime.Now;
                data.LastDocumentNo = newNo;
                var type = GetType("ProjectDocNoTracking");
                if (type != null)
                {
                    var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.EditAsync));
                    var generic = method?.MakeGenericMethod(type);
                    object[] parameters = { data, token };
                    var result = generic?.Invoke(handler, parameters);
                    if (result is System.Threading.Tasks.Task task)
                    {
                        // Complete the operation before continuing to avoid concurrent DbContext use
                        task.GetAwaiter().GetResult();
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in UpdateProjcetDocNoTracing method and details: " + ex.Message);
            }
        }
        public dynamic GetChallanReport(long id)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetChallanDetails));
                object[] parameters = [id];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetChallanReport method and details: " + ex.Message);
                return 0;
            }
        }

        public dynamic GetDocumentNo(long projectId)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetDocumentNo));
                object[] parameters = [projectId];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetChallanReport method and details: " + ex.Message);
                return 0;
            }
        }
        public dynamic GetChallanReportDateWise(DateTime startDate, DateTime endDate)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetChallanReportDateWise));
                object[] parameters = [startDate, endDate];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetChallanReportDateWise method and details: " + ex.Message);
                return 0;
            }

        }
        internal dynamic GetTaskItemDetails(long id)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetTaskItemDetails));
                object[] parameters = [id];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetTaskItemDetails method and details: " + ex.Message);
                return 0;
            }
        }

        internal dynamic GetMobileActivityData(DateOnly startDate, DateOnly endDate, string member)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetMobileActivityData));
                object[] parameters = [startDate, endDate, member];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetTaskItemDetails method and details: " + ex.Message);
                return 0;
            }
        }

        internal dynamic GetWorkerStatusReport(WorkerReportRequestPayload request)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetWorkerStatusReport));
                object[] parameters = [request.ProjectId, request.TowerId, request.FloorId, request.FlatId];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetWorkerStatusReport method and details: " + ex.Message);
                return 0;
            }
        }

        internal dynamic DownloadWorkerStatusReport(long projectId, long towerId, long floorId, long flatId)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.DownloadWorkerStatusReport));

                object[] parameters = [projectId, towerId, floorId, flatId];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetWorkerStatusReport method and details: " + ex.Message);
                return 0;
            }
        }
        internal dynamic DownloadWorkerChatReport(long projectId, long towerId, long floorId, long flatId)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.DownloadWorkerChatReport));

                object[] parameters = [projectId, towerId, floorId, flatId];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetWorkerStatusReport method and details: " + ex.Message);
                return 0;
            }
        }
        internal dynamic GetAllAssignedUsers(string module, long id)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetAllAssignedUsers));
                object[] parameters = [module, id];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetAllAssignedUsers method and details: " + ex.Message);
                return 0;
            }
        }
        internal dynamic GetAllAssignedModules(string module, string member)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetAllAssignedModules));
                object[] parameters = [module, member];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetAllAssignedModules method and details: " + ex.Message);
                return 0;
            }
        }

        internal dynamic GetAllNotification(string member)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetAllNotification));
                object[] parameters = [member];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetAllNotification method and details: " + ex.Message);
                return 0;
            }
        }

        internal dynamic GetAllAssignedProjects(string member)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetAllAssignedProjects));
                object[] parameters = [member];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetAllAssignedProjects method and details: " + ex.Message);
                return 0;
            }
        }

        internal dynamic GetFinancialYear()
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetFinancialYear));
                object[] parameters = [DateTime.Now];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetFinancialYear method and details: " + ex.Message);
                return 0;
            }
        }

        internal dynamic GetData(long id, string type)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetCopyData));
                object[] parameters = [id, type];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetData method and details: " + ex.Message);
                return 0;
            }
        }
        internal dynamic GetData(string model)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetNullData));
                object[] parameters = [model];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetData method and details: " + ex.Message);
                return 0;
            }
        }
        internal dynamic GetHierarchyData(long id)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetGetHierarchyTree));
                object[] parameters = [id];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetData method and details: " + ex.Message);
                return 0;
            }
        }

        public dynamic GetFileFromFileSystem(string module, string fileName)
        {
            try
            {
                var folderPath = _configuration["FileUploadSettings:UploadFolderPath"] + "/" + module;
                var fullPath = Path.Combine(folderPath, fileName);
                if (!File.Exists(fullPath))
                    return "File not found.";
                byte[] fileBytes = File.ReadAllBytes(fullPath);
                string base64String = Convert.ToBase64String(fileBytes);
                return base64String;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetFileFromFileSystem method and details: '{ex.Message}'");
                throw;
            }
        }

        public async Task<dynamic> ConvertBase64toFile(string module, dynamic data)
        {
            try
            {
                var folderPath = _configuration["FileUploadSettings:UploadFolderPath"] + "/" + module;
                var type = GetType(module);
                dynamic jsonString = data.ToString();
                var jsonData = JsonConvert.DeserializeObject(jsonString, type);
                dynamic modelData;
                modelData = jsonData;
                switch (module?.ToUpper())
                {
                    case "COMPANY":
                        modelData.Logo = Utility.Base64ToFile(modelData.Logo, folderPath);
                        break;
                    case "PROJECT":
                        modelData.Blueprint = Utility.Base64ToFile(modelData.Blueprint, folderPath);
                        break;
                    case "PLAN":
                        modelData.Blueprint = Utility.Base64ToFile(modelData.Blueprint, folderPath);
                        break;
                    case "ACTIVITY":
                        modelData.PhotoUrl = Utility.Base64ToFile(modelData.PhotoUrl, folderPath);
                        break;
                    case "ATTACHMENT":
                        modelData.File = Utility.Base64ToFile(modelData.File, folderPath);
                        break;
                    case "NAMEMASTER":
                        modelData.FatherCertificate = Utility.Base64ToFile(modelData.FatherCertificate, folderPath);
                        modelData.MotherCertificate = Utility.Base64ToFile(modelData.MotherCertificate, folderPath);
                        modelData.GrandFatherCertificate = Utility.Base64ToFile(modelData.GrandFatherCertificate, folderPath);
                        modelData.GrandMotherCertificate = Utility.Base64ToFile(modelData.GrandMotherCertificate, folderPath);
                        break;

                }
                return JsonConvert.SerializeObject(modelData);

            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in ConvertBase64toVarbinary method and details: '{ex.Message}'");
                throw;
            }
        }

        internal async Task<dynamic> GenerateWorkId(string module, dynamic data, CancellationToken token)
        {
            var type = GetType(module);
            dynamic jsonString = data.ToString();
            var jsonData = JsonConvert.DeserializeObject(jsonString, type);
            if (jsonData.Type.ToString().ToUpper() == "INSIDE")
            {
                //Generate WorkId for Inside based on RoomId, DependencyId and Project

                jsonData.WorkId = await GenerateInsideWorkId(jsonData.DependencyId, jsonData.ProjectId, jsonData.RoomId, token);
            }
            else
            {
                jsonData.WorkId = await GenerateOutSideWorkId(jsonData.DependencyId, jsonData.ProjectId, jsonData.TowerId, jsonData.FloorId, jsonData.OutSideEntityId, token);

            }

            return JsonConvert.SerializeObject(jsonData);
        }
        private async Task<string?> GenerateInsideWorkId(long dependencyId, long projectId, long roomId, CancellationToken token)
        {
            try
            {
                //Work Id formate
                //<Project_Alias>/<Tower_Alias>/<Floor_Number>-<Flat-Number>/<Room-Type-Alias>-<Room-Count-Index>/<Activity_Type_Alias>/<Document_Number>/<Year>
                var dependency = await Get("Dependency", dependencyId);
                var roomDetails = await Get("RoomDetails", roomId);
                var docno = GetDocumentNo(projectId);

                string year = GetFinancialYear();
                if (dependency != null && roomDetails != null && docno != null)
                {
                    int newNo = docno?.LastDocumentNo + 1;
                    UpdateProjcetDocNoTracing(docno, newNo, token);

                    string nextDocNo = newNo.ToString("D3");
                    StringBuilder workId = new();
                    workId.Append(roomDetails?.Result.RoomId); //<Project_Alias>/<Tower_Alias>/<Floor_Number>-<Flat-Number>/<Room-Type-Alias>-<Room-Count-Index>                   
                    workId.Append("/");
                    workId.Append(dependency?.Result.Code); //<Activity_Type_Alias>
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
                logger.LogError(ex, $"Exception in GenerateInsideWorkId method, message:'{ex.Message}'");
                throw;
            }
        }

        private async Task<string> GenerateOutSideWorkId(long dependencyId, long projectId, long? towerId, long? floorId, long? outSideEntityId, CancellationToken token)
        {
            try
            {
                //Work Id formate
                //<Project_Alias>/<Tower_Alias>/<Floor_Number>/<OutSidet-Entity TypeId>-<OutSideEntity-Count-Index>/<Activity_Type_Alias>/<Document_Number>/<Year>
                var dependency = await Get("Dependency", dependencyId);
                var outSideEntity = await Get("OutSideEntity", (long)outSideEntityId);
                var docno = GetDocumentNo(projectId);
                string year = GetFinancialYear();

                StringBuilder workId = new();
                if (dependency != null && outSideEntity != null && docno != null && year != null)
                {
                    int newNo = docno?.LastDocumentNo + 1;
                    UpdateProjcetDocNoTracing(docno, newNo, token);
                    string nextDocNo = newNo.ToString("D3");

                    workId.Append(outSideEntity?.Result.Name); //<Project_Alias>/<Tower_Alias>/<Floor_Number>/<Out Side Entity-Type-Alias>-<outSideEntity-Index>                   
                    workId.Append("/");
                    workId.Append(dependency?.Result.Code); //<Activity_Type_Alias>
                    workId.Append("/");
                    workId.Append(nextDocNo); //<Document_Number>
                    workId.Append("/");
                    workId.Append(year); //<Year>
                    return workId.ToString();
                }
                return workId.ToString();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GenerateOutSideWorkId method, message:'{ex.Message}'");
                throw;
            }
        }

        public dynamic GetActivtyDetailsForUser(AssigneUserRequestPayload request)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetActivtyDetailsForUser));
                object[] parameters = [request.Member, request.ProjectId, request.TowerId, request.FloorId, request.FlatId];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in GetAllAssignedUsers method and details: " + ex.Message);
                return 0;
            }
        }
    }
}
