using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using RajApi.Data;
using RajApi.Data.Models;
using System.Numerics;
using System.Text;

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
                    if (jsonData != null && jsonData?.Status != null)
                    {
                        existingData.Status = jsonData?.Status;
                        modifiedBy = jsonData?.ModifiedBy;
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

        public async Task<long> SaveBulkkDataAsync(string model, IEnumerable<dynamic> data, CancellationToken token)
        {
            var type = GetType(model);
            if (type == null) { return -1; }
            var method = typeof(LabDataHandler).GetMethod(nameof(LabDataHandler.BulkDataAsync));
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
                        await SaveSubTaskAsync(model, Id, token);
                        await SaveActivityResourceAsync(type, data, Id, token);
                        break;
                }

                if (model?.Equals("PLAN", StringComparison.OrdinalIgnoreCase) == true)
                {
                    var jsonString = data.ToString();
                    var jsonData = JsonConvert.DeserializeObject(jsonString, type);

                    if (jsonData != null && string.Equals(jsonData?.Type?.ToString(), "tower", StringComparison.OrdinalIgnoreCase))
                    {
                        var projectTask = Get("Project", jsonData?.ProjectId);
                        var project = await projectTask; // Assuming Get returns Task or Task<T> and Result is awaited here properly

                        await SaveFloorData(jsonData, Id, project.Name, project.Code, token);
                        await SaveParkingData(jsonData, Id, project.Name, project.Code, token);
                    }
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
                        };

                        long flatId = await SaveDataAsync("Plan", plan, token);
                        await SaveResource(templateId, flatName, flatId, token);

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


        private async Task SaveResource(long templateId, string flatName, long flatId, CancellationToken token)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetFlatTemplateDetails));
                object[] parameters = [templateId];
                var ftDetails = (List<FlatTemplateDetails>)method?.Invoke(handler, parameters);
                foreach (var item in ftDetails)
                {
                    var roomDetails = Get("Room", (long)item.RoomId);
                    var roomName = flatName + "/" + roomDetails.Result.Code;

                    Resource rec = new()
                    {
                        Type = "room",
                        RoomId = item.RoomId,
                        Quantity = (decimal)item.RoomCount,
                        PlanId = flatId,
                        Name = roomName
                    };

                    await SaveDataAsync("Resource", rec, token);
                }

            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in SaveResource method and details: '{ex.Message}'");
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
                        FlatTemplateId = templateId,
                        RoomId = item?.RoomId,
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

                List<Parking> parkings = new();
                foreach (var item in parkingsList)
                {
                    var parkingType = Get("ParkingType", item.parkingTypeId);
                    for (int i = 1; i <= item.noOfParking; i++)
                    {
                        string name = projectName + "/" + jsonData?.Name + "/Parking/" + parkingType.Result.Name + i;

                        Parking parking = new()
                        {
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
                foreach (ActivityResource mainitem in activityResourceList)
                {
                    if (mainitem.AssignedList?.Count > 0)
                    {
                        foreach (var item in mainitem.AssignedList)
                        {
                            var date = StartDate.AddDays(-item.NotifyBefore);
                            ActivityResource details = new()
                            {
                                ActivityId = activityId,
                                AssignedUser = item?.Member,
                                Quantity = mainitem?.Quantity,
                                UOMId = mainitem?.UOMId,
                                AssetId = mainitem?.AssetId,
                                ResourceType = "Item",
                                AvailabilityStatus = AvailablityStatus.NotAvailable,
                                NotificationStartDate = date
                            };

                            await SaveDataAsync("ActivityResource", details, token);
                        }
                    }
                    else
                    {
                        ActivityResource details = new()
                        {
                            ActivityId = activityId,
                            Quantity = mainitem?.Quantity,
                            UOMId = mainitem?.UOMId,
                            AssetId = mainitem?.AssetId,
                            ResourceType = "Item",
                            AvailabilityStatus = AvailablityStatus.NotAvailable
                        };
                        await SaveDataAsync("ActivityResource", details, token);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in SaveSubTaskAsync method, message:'{ex.Message}'");
            }
        }
        private async Task SavaDataIntoDataBase(string model, Activity main, CancellationToken token)
        {
            try
            {
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetResourceDetails));
                object[] parameters = [main.FlatId];
                var lists = (List<Resource>)method?.Invoke(handler, parameters);

                if (lists != null)
                {
                    List<Activity> activities = new();
                    foreach (var item in lists)
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
                            activities.Add(activity);
                        }
                    }
                    await SaveBulkkDataAsync(model, activities, token);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in SavaDataIntoDataBase method, message:'{ex.Message}'");
            }
        }
        private string? GetWorkId(string name, int index, long? DependencyId, long? projectId, CancellationToken token)
        {
            try
            {
                //Work Id formate
                //<Project_Alias>/<Tower_Alias>/<Floor_Number>-<Flat-Number>/<Room-Type-Alias>-<Room-Count-Index>/<Activity_Type_Alias>/<Document_Number>/<Year>
                var dependency = Get("Dependency", (long)DependencyId);

                var docno = GetDocumentNo((long)projectId);

                string year = GetFinancialYear();
                if (dependency != null && docno != null)
                {
                    int newNo = docno?.LastDocumentNo + 1;
                    UpdateProjcetDocNoTracing(docno, newNo, token);

                    string nextDocNo = newNo.ToString("D3");
                    StringBuilder workId = new();
                    workId.Append(name); //<Project_Alias>/<Tower_Alias>/<Floor_Number>-<Flat-Number>/<Room-Type-Alias>
                    workId.Append("-");
                    workId.Append(index); //<Room-Count-Index>
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
                logger.LogError(ex, $"Exception in GetWorkId method, message:'{ex.Message}'");
                throw;
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
                    generic?.Invoke(handler, parameters);
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
    }
}
