using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RajApi.Data.Models;
using System.Data;
using System.Text;
using Comment = RajApi.Data.Models.Comment;

namespace RajApi.Data;

public class RajDataHandler : LabDataHandler
{
    public readonly LabDataHandler handler;
    public RajDataHandler(DbContext dbContext, ILogger<RajDataHandler> logger) : base(dbContext, logger)
    {
    }

    public ModuleIdentity Identity { get; set; }

    public override IQueryable<T> FilterIdentity<T>(DbSet<T> dbSet)
    {
        // This is used to assign entity to member,
        if ((typeof(T).GetInterfaces().Count(p => p == typeof(IAssignable)) > 0)
            || (typeof(T).GetInterfaces().Count(p => p == typeof(IApproval)) > 0))
        {
            var name = typeof(T).Name;
            var query = dbSet
            .Select(act => new
            {
                data = act,
                Log = dbContext.Set<ApplicationLog>()
                    .Where(apl => apl.EntityId == act.Id && apl.Member.Equals(Identity.Member) && apl.Name.Equals(name))
                    .OrderByDescending(apl => apl.Date)
                    .Select(apl => new { apl.ActivityType, apl.Member, apl.Date })
                    .FirstOrDefault()
            })
            .Where(x => x.Log != null && x.Log.ActivityType != StatusType.UnAssigned && x.data.Status != StatusType.Deleted)
            .Select(x => x.data)
            .AsQueryable();

            return query;
        }

        return dbSet
            .Where(p => p.Key == Identity.Key && p.Status != StatusType.Deleted)
            .AsQueryable();
    }

    public dynamic GetChallanDetails(long id)
    {
        var levelSetups = dbContext.Set<LevelSetup>()
                 .Where(l => l.Id == id).ToList();
        var details = dbContext.Set<LevelSetupDetails>()
            .Where(l => l.HeaderId == id)
            .ToList();

        var final = details.Join(levelSetups,
                d => d.HeaderId,
                m => m.Id,
                (d, m) => new ChallanReport()
                {
                    Project = m.ProjectName,
                    DocumentDate = m.DocumentDate,
                    VechileNo = m.VechileNo,
                    TrackingNo = m.TrackingNo,
                    SupplierName = m.SupplierName,
                    QCChargeName = m.InChargeName,
                    Item = d.Name,
                    Quantity = d.Quantity,
                    Price = d.Price,
                    UOM = d.UOMName,
                    ReceiverStatus = d.ReceiverStatus,
                    ReceiverRemarks = d.ReceiverRemarks,
                    QCStatus = d.QualityStatus,
                    QCRemarks = d.QualityRemarks,
                    DirectorFinalRemarks = m.ApprovedRemarks
                });

        return final;
    }

    public dynamic GetChallanReportDateWise(DateTime startDate, DateTime endDate)
    {
        ListOptions option = new();

        option.SearchCondition = new Condition()
        {
            Name = "DocumentDate",
            Value = startDate,
            Operator = OperatorType.GreaterThan,
            And = new Condition()
            {
                Name = "DocumentDate",
                Value = endDate,
                Operator = OperatorType.LessThan
            }
        };
        var levelSetups = Load<LevelSetup>(option).Items;
        var details = dbContext.Set<LevelSetupDetails>()
            .ToList();

        var final = details.Join(levelSetups,
                d => d.HeaderId,
                m => m.Id,
                (d, m) => new ChallanReport()
                {
                    Project = m.ProjectName,
                    DocumentDate = m.DocumentDate,
                    VechileNo = m.VechileNo,
                    TrackingNo = m.TrackingNo,
                    SupplierName = m.SupplierName,
                    QCChargeName = m.InChargeName,
                    Item = d.Name,
                    Quantity = d.Quantity,
                    Price = d.Price,
                    UOM = d.UOMName,
                    ReceiverStatus = d.ReceiverStatus,
                    ReceiverRemarks = d.ReceiverRemarks,
                    QCStatus = d.QualityStatus,
                    QCRemarks = d.QualityRemarks,
                    DirectorFinalRemarks = m.ApprovedRemarks
                });

        return final;
    }

    public dynamic GetTaskItemDetails(long id)
    {
        try
        {
            var groupActivity = dbContext.Set<ActivityTracking>()
                     .Where(l => l.ActivityId == id).GroupBy(r => r.Date.ToString().Substring(0, 10)).ToList();

            var assets = dbContext.Set<Asset>().Where(l => l.Status == 0).ToList();

            List<FinalItem> draftlist = [];
            foreach (var gactvity in groupActivity)
            {
                var activity = gactvity.OrderByDescending(a => a.Id).FirstOrDefault();

                var taskItems = JsonConvert.DeserializeObject<List<TaskItem>>(activity.Item);
                if (taskItems != null)
                {
                    var final = assets.Join(taskItems,
                        a => a.Id,
                        ti => ti.ItemId,
                        (a, ti) => new FinalItem
                        {
                            TaskId = activity.Id,
                            ItemId = ti.ItemId,
                            ItemName = a.Name,
                            Quantity = ti.Quantity,
                            Cost = activity.Cost,
                            ManPower = activity.ManPower
                        });

                    foreach (var item in final)
                    {
                        item.TransactionDate = gactvity.Key;
                        draftlist.Add(item);
                    }
                }
            }
            List<FinalItem> finallist = [];
            foreach (var item in draftlist)
            {
                var totalquantity = draftlist.GroupBy(item => item.ItemId).Select(group => group.Sum(item => item.Quantity)).First();
                item.TotalQuantity = totalquantity;
                finallist.Add(item);
            }
            return finallist;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in GetTaskItemDetails method and details: '{ex.Message}'");
            throw;
        }
    }

    public dynamic GetMobileActivityData(DateOnly startDate, DateOnly endDate, string member)
    {
        try
        {
            var sDate = startDate.ToDateTime(TimeOnly.Parse("00:00 AM"));
            var eDate = endDate.ToDateTime(TimeOnly.Parse("00:00 AM")); ;

            var tDate = DateTime.Now;
            var activities = dbContext.Set<Activity>()
                .Where(a => a.Type == "Main Task"
                             && (a.ActualStartDate ?? a.StartDate) <= tDate
                             && (a.ActualEndDate == null || a.ActualEndDate <= eDate)
                            )
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    StartDate = x.ActualStartDate != null ? x.ActualStartDate.Value.Date : x.StartDate.Value.Date,
                    EndDate = x.ActualEndDate != null ? x.ActualEndDate.Value.Date : DateTime.Now,
                })
                .Distinct()
                .ToList();

            var activityIds = GetAllAssignedActivities(member);

            var assignedActivities = activities.Where(a => activityIds.Contains(a.Id));

            var curingDate = dbContext.Set<Activity>()
                .Join(dbContext.Set<Activity>(),
                    main => main.Id,
                    sub => sub.ParentId,
                    (main, sub) => new { main, sub })
                .Join(dbContext.Set<ActivityTracking>(),
                    act => act.sub.Id,
                    tr => tr.ActivityId,
                    (act, tr) => new { Id = act.main.Id, Date = tr.Date, IsCuringDone = tr.IsCuringDone })
                .Where(x => x.IsCuringDone == true
                    && x.Date > sDate
                    && x.Date < eDate
                )
                .ToList();

            var result = new List<DateWiseActivity>();
            var lastDays = DateTime.DaysInMonth(endDate.Year, endDate.Month);

            for (int i = 0; i < lastDays; i++)
            {
                var date = new DateTime(startDate.Year, startDate.Month, i + 1);
                var newactivities = assignedActivities.Where(a => a.StartDate <= date && a.EndDate >= date).ToList();
                var isCuring = curingDate.Exists(x => DateOnly.FromDateTime(x.Date.Value) == DateOnly.FromDateTime(date));
                List<DailyActivity> listDAct = new List<DailyActivity>();

                foreach (var item in newactivities)
                {
                    listDAct.Add(new DailyActivity
                    {
                        Id = item.Id,
                        Name = item.Name,
                    });
                }
                result.Add(new DateWiseActivity
                {
                    Date = DateOnly.FromDateTime(date),
                    Activities = listDAct,
                    IsCuringDone = isCuring
                });
            }

            return result;

        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in GetMobileActivityData method and details: '{ex.Message}'");
            throw;
        }
    }
    public dynamic DownloadWorkerStatusReport(long projectId, long towerId, long floorId, long flatId)
    {
        try
        {
            var activities = dbContext.Set<Activity>()
                     .Where(l => l.Type == "Sub Task" && l.ProjectId == projectId
                     && l.TowerId == towerId && l.FloorId == floorId
                     && (l.IsSubSubType == null || l.IsSubSubType == false)).ToList();
            if (flatId > 0)
            {
                activities = activities.Where(l => l.FlatId == flatId).ToList();
            }
            var table = GenerateDataTable(activities, false);

            return activities;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in GetWorkerStatusReport method and details: '{ex.Message}'");
            throw;
        }
    }

    public dynamic DownloadWorkerChatReport(long projectId, long towerId, long floorId, long flatId)
    {
        try
        {
            var activities = dbContext.Set<Activity>()
                     .Where(l => l.Type == "Sub Task" && l.ProjectId == projectId
                     && l.TowerId == towerId && l.FloorId == floorId
                     && (l.IsSubSubType == null || l.IsSubSubType == false)).ToList();
            if (flatId > 0)
            {
                activities = activities.Where(l => l.FlatId == flatId).ToList();
            }
            var table = GenerateDataTable(activities, true);

            return activities;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in GetWorkerStatusReport method and details: '{ex.Message}'");
            throw;
        }
    }
    private DataTable GenerateDataTable(List<Activity> activities, bool flag)
    {
        var item = activities[0];

        var project = dbContext.Set<Project>().Where(a => a.Id == item.ProjectId).FirstOrDefault(); // Ex- Project 1
        var tower = dbContext.Set<Plan>().Where(a => a.Id == item.TowerId && a.Type == "tower").FirstOrDefault(); // Ex- Tower 1       
        var floor = dbContext.Set<Plan>().Where(a => a.Id == item.FloorId && a.Type == "floor").FirstOrDefault(); // Ex- Floor 1
        var flat = dbContext.Set<Plan>().Where(a => a.Id == item.FlatId && a.Type == "flat").FirstOrDefault(); // Ex- Flat 1

        var statuslist = CalculateWorkStatus(activities);

        DataTable table = new();
        table.Columns.Add("Project Name");
        table.Columns.Add("Tower Name");
        table.Columns.Add("Floor Name");
        table.Columns.Add("Flat Name");
        table.Columns.Add("Room Name");
        table.Columns.Add("Activity Name");
        table.Columns.Add("Activity Status");
        table.Columns.Add("ProgressPercentage");
        table.Columns.Add("Duration");
        table.Columns.Add("StartDate");
        table.Columns.Add("EndDate");
        table.Columns.Add("ActualStartDate");
        table.Columns.Add("ActualEndDate");
        if (flag)
        {
            table.Columns.Add("Comment");
            table.Columns.Add("CommentDate");

        }
        var resources = dbContext.Set<Resource>().Where(a => a.PlanId == item.FlatId).ToList();

        foreach (var rec in resources)
        {
            var room = dbContext.Set<Room>().Where(a => a.Id == rec.RoomId).FirstOrDefault(); // Ex- Bedroom
            for (int index = 1; index <= rec.Quantity; index++)
            {
                var roomName = room?.Name + "-" + index.ToString(); // Ex: Bedroom-1
                var filteredActivities = statuslist?.Where(a => a.ActivityName.Contains(roomName)).ToList();
                foreach (var fact in filteredActivities)
                {
                    var activity = activities?.Where(a => a.Id == fact.Id).FirstOrDefault();
                    DataRow row = table.NewRow();
                    row["Project Name"] = project?.Name;
                    row["Tower Name"] = tower?.Name;
                    row["Floor Name"] = floor?.Name;
                    row["Flat Name"] = flat?.Name;
                    row["Room Name"] = roomName;
                    row["Activity Name"] = fact?.ActivityName;
                    row["Activity Status"] = fact?.ActivityStatus;
                    row["ProgressPercentage"] = fact?.ProgressPercentage;
                    row["Duration"] = fact?.Duration;
                    row["StartDate"] = activity?.StartDate;
                    row["EndDate"] = activity?.EndDate;
                    row["ActualStartDate"] = activity?.ActualStartDate;
                    row["ActualEndDate"] = activity?.ActualEndDate;
                    if (flag)
                    {
                        var comments = dbContext.Set<Comment>().Where(a => a.Id == fact.Id).FirstOrDefault();

                        row["Comment"] = comments?.Remarks;
                        row["CommentDate"] = comments?.Date;
                    }
                    table.Rows.Add(row);
                }

            }
        }

        return table;
    }

    public string DataTableToJSON(DataTable table)
    {
        var JSONString = new StringBuilder();
        if (table.Rows.Count > 0)
        {
            JSONString.Append("[");
            for (int i = 0; i < table.Rows.Count; i++)
            {
                JSONString.Append("{");
                for (int j = 0; j < table.Columns.Count; j++)
                {
                    if (j < table.Columns.Count - 1)
                    {
                        JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\",");
                    }
                    else if (j == table.Columns.Count - 1)
                    {
                        JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\"");
                    }
                }
                if (i == table.Rows.Count - 1)
                {
                    JSONString.Append("}");
                }
                else
                {
                    JSONString.Append("},");
                }
            }
            JSONString.Append("]");
        }
        return JSONString.ToString();
    }

    public dynamic GetWorkerStatusReport(long projectId, long towerId, long floorId, long flatId)
    {
        try
        {
            var activities = dbContext.Set<Activity>()
                     .Where(l => l.Type == "Sub Task" && l.ProjectId == projectId
                     && l.TowerId == towerId && l.FloorId == floorId
                     && (l.IsSubSubType == null || l.IsSubSubType == false)).ToList();
            if (flatId > 0)
            {
                activities = activities.Where(l => l.FlatId == flatId).ToList();
            }

            if (activities.Count > 0)
            {
                var finallist = CalculateWorkStatus(activities);

                List<string> dpendencies = GetDependency(activities[0].WorkflowId);

                var table = ConvertDependencytoTable(dpendencies);

                var finaltable = GetRoomNames(flatId, table, finallist);

                var tableJson = DataTableToJSON(finaltable);

                return tableJson;
            }
            else
            {
                return null;
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in GetWorkerStatusReport method and details: '{ex.Message}'");
            throw;
        }
    }

    /// <summary>
    /// Status Type: Draft = 0, Modified = 1,QCAssigned = 2,Assigned = 3,Approved = 4,Hold = 5,Rejected = 6,HODAssigned = 7
    /// </summary>
    /// <param name="rawlist"></param>
    /// <returns></returns>
    private static List<WorkerStatusReport>? CalculateWorkStatus(dynamic? rawlist)
    {
        List<WorkerStatusReport> newlist = [];
        if (rawlist != null)
        {
            var currentDate = DateTime.Now;
            foreach (var item in rawlist)
            {
                string status = "";

                if (item.StartDate != null && item.StartDate < currentDate && item.ActualStartDate == null)
                {
                    status = "Not Started";
                }
                if (item.StartDate != null && item.StartDate < currentDate && item.EndDate != null
                    && item.EndDate > currentDate && item.ActualStartDate != null)
                {
                    status = "In Progress";
                }
                if (item.EndDate != null && item.ActualEndDate == null
                    && item.EndDate < currentDate && item.ActualStartDate != null)
                {
                    status = "Delayed";
                }
                if (item.StartDate != null && item.EndDate != null && item.StartDate < currentDate
                    && currentDate < item.EndDate && item.IsOnHold != null && item.IsOnHold == true)
                {
                    status = "On Hold";
                }
                if (item.IsQCApproved == null && item.IsCompleted != null
                    && item.IsCompleted == true && item.Status == StatusType.QCAssigned) // QC Assigened but not approved
                {
                    status = "Pending QC Approval";
                }
                if (item.ActualEndDate <= item.EndDate && item.ActualStartDate >= item.StartDate
                    && item.IsCompleted != null && item.IsCompleted == true)
                {
                    status = "Closed";
                }
                if (item.IsCancelled != null && item.IsCancelled == true)
                {
                    status = "Cancelled";
                }
                if (item.IsCompleted != null && item.IsCompleted == true
                  && item.IsQCApproved != null && item.IsQCApproved == true)// QC Approved
                {
                    status = "Inspection Passed";
                }
                if (item.IsCompleted != null && item.IsCompleted == true
                    && item.IsQCApproved != null && item.IsQCApproved == false) //QC is rejected
                {
                    status = "Inspection Failed/Rework Required";
                }
                if (item.IsCompleted != null && item.IsCompleted == true && item.IsQCApproved != null
                    && item.IsQCApproved == true && item.IsApproved == null && item.Status == StatusType.HODAssigned) //HOD Assigend but not approved
                {
                    status = "Pending HOD Approval";
                }
                if (item.IsCompleted == true && item.IsAbandoned == true)//Is Abanndoned
                {
                    status = "Short Closed/Abandoned";
                }

                int duration = 0;
                if (item.ActualStartDate != null && item.ActualEndDate == null)
                {
                    TimeSpan difference = currentDate - item.ActualStartDate;
                    duration = difference.Days;
                }
                else if (item.ActualStartDate != null && item.ActualEndDate != null)
                {
                    TimeSpan difference = item.ActualEndDate - item.ActualStartDate;
                    duration = difference.Days;
                }
                else
                {
                    duration = 0;
                }

                WorkerStatusReport obj = new()
                {
                    ActivityStatus = status,
                    Id = item.Id,
                    ActivityName = item.Name,
                    ProgressPercentage = item.ProgressPercentage,
                    Duration = duration
                };
                newlist.Add(obj);
            }
        }
        return newlist;
    }
    private DataTable GetRoomNames(long flatId, DataTable table, List<WorkerStatusReport> activities)
    {
        var resources = dbContext.Set<Resource>().Where(a => a.PlanId == flatId).ToList();

        foreach (var item in resources)
        {
            var room = dbContext.Set<Room>().Where(a => a.Id == item.RoomId).FirstOrDefault(); // Ex- Bedroom
            for (int index = 1; index <= item.Quantity; index++)
            {
                DataRow row = table.NewRow();
                var roomName = room?.Name + "-" + index.ToString(); // Ex: Bedroom-1
                row["RoomName"] = roomName;

                for (int j = 1; j < table.Columns.Count; j += 3)
                {
                    var filteredActivities = activities.Where(a => a.ActivityName.Contains(roomName) && a.ActivityName.Contains(table.Columns[j].ColumnName)).FirstOrDefault();
                    row[table.Columns[j].ColumnName] = filteredActivities?.ActivityStatus;
                    row[table.Columns[j + 1].ColumnName] = filteredActivities?.ProgressPercentage;
                    row[table.Columns[j + 2].ColumnName] = filteredActivities?.Duration;
                }

                table.Rows.Add(row);
            }
        }

        return table;
    }

    private DataTable ConvertDependencytoTable(List<string> dpendencies)
    {
        // Create a new DataTable
        DataTable table = new DataTable();

        DataRow row = table.NewRow();
        table.Columns.Add("RoomName");

        for (int i = 0; i < dpendencies.Count; i++)
        {
            table.Columns.Add(dpendencies[i], typeof(string));
            table.Columns.Add(dpendencies[i] + "_ProgressPercentage", typeof(string));
            table.Columns.Add(dpendencies[i] + "_Duration", typeof(string));
        }

        return table;
    }

    private List<string> GetDependency(long? DependencyId)
    {
        var query = "SELECT distinct JSON_VALUE(node.value, '$.data.label') AS label FROM Workflows " +
                    " CROSS APPLY OPENJSON(data, '$.nodes') AS node " +
                    " where id =" + DependencyId;

        using (var command = dbContext.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = query;
            command.CommandType = CommandType.Text;

            dbContext.Database.OpenConnection();

            using (var result = command.ExecuteReader())
            {
                var entities = new List<string>();

                while (result.Read())
                {
                    entities.Add(result.GetString("label"));
                }

                return entities;
            }
        }
    }

    public dynamic GetAllAssignedUsers(string module, long id)
    {
        var result = dbContext.Set<ApplicationLog>()
                    .Select(p => new
                    {
                        p.Member,
                        p.EntityId,
                        data = dbContext.Set<ApplicationLog>()
                            .Where(apl => apl.EntityId == id && apl.Name.Equals(module) &&
                            apl.EntityId == p.EntityId && apl.Name == p.Name && apl.Member == p.Member)
                            .OrderByDescending(apl => apl.Date)
                            .Select(apl => new { apl.ActivityType, apl.Member, apl.Date })
                            .FirstOrDefault()
                    })
                    .Where(x => x.data != null && x.data.ActivityType != StatusType.UnAssigned)
                    .Select(a => new { a.EntityId, a.Member })
                    .Distinct();

        return result;
    }
    private List<long> GetAllAssignedActivities(string member)
    {
        var query = "select distinct act.Id from [Activities] act" +
             " cross apply(" +
                 " select top 1 ActivityType,Member,Date from[dbo].[ApplicationLogs] apl" +
                 " where apl.EntityId = act.id and Name='Activity' and apl.Member = '" + member + "' order by Date desc" +
            ") x" +
            " WHERE x.ActivityType != -3 ";

        using (var command = dbContext.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = query;
            command.CommandType = CommandType.Text;

            dbContext.Database.OpenConnection();

            using (var result = command.ExecuteReader())
            {
                var entities = new List<long>();

                while (result.Read())
                {
                    entities.Add(result.GetInt64("Id"));
                }

                return entities;
            }
        }
    }

    public List<IdNamePair> GetAllAssignedProjects(string member)
    {
        var query = "select distinct pr.Id,pr.Name from Plans as p inner join dbo.Projects pr on pr.Id = p.ProjectId" +
            " cross apply(" +
                " select top 1 ActivityType,Member,Date from[dbo].[ApplicationLogs] apl" +
                " where apl.EntityId = p.id and apl.Member = '" + member + "' order by Date desc" +
            ") x" +
           " WHERE x.ActivityType != -3 ";

        using (var command = dbContext.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = query;
            command.CommandType = CommandType.Text;

            dbContext.Database.OpenConnection();

            using (var result = command.ExecuteReader())
            {
                var entities = new List<IdNamePair>();

                while (result.Read())
                {
                    entities.Add(new IdNamePair() { Id = result.GetInt64("Id"), Name = result.GetString("Name") });
                }

                return entities;
            }
        }
    }

    public override async Task<long> AddAsync<T>(T item, CancellationToken cancellationToken)
    {
        item.Status = StatusType.Draft;
        item.Date = DateTime.UtcNow;
        item.Member = Identity.Member;
        item.Key = Identity.Key;

        if (typeof(T).GetInterfaces().Count(p => p == typeof(IAssignable)) > 0)
        {
            var assignableItem = (IAssignable)item;
            if (assignableItem.ProjectId == null && assignableItem.ParentId != null)
            {
                assignableItem.ProjectId = getProjectId(item);
            }
        }
        try
        {
            var id = await base.AddAsync(item, cancellationToken);
            await LogLabModelLog(item, StatusType.Draft, cancellationToken);
            await SaveAuditLogs(item, StatusType.Draft, cancellationToken);
            return id;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in AddAsync method and details: '{ex.Message}'");
            throw;
        }
    }

    public override async Task<long> EditAsync<T>(T item, CancellationToken cancellationToken)
    {
        item.Status = StatusType.Modified;
        item.Member = Identity.Member;
        item.Date = DateTime.UtcNow;
        //item.Key = Identity.Key; Not changing key anymore

        if (typeof(T).GetInterfaces().Count(p => p == typeof(IAssignable)) > 0)
        {
            var assignableItem = (IAssignable)item;
            if (assignableItem.ProjectId == null && assignableItem.ParentId != null)
            {
                assignableItem.ProjectId = getProjectId(item);
            }
        }

        try
        {
            var id = await base.EditAsync(item, cancellationToken);

            await LogLabModelLog(item, StatusType.Modified, cancellationToken);
            await SaveAuditLogs(item, StatusType.Modified, cancellationToken);
            return id;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in EditAsync method and details: '{ex.Message}'");
            throw;
        }
    }

    private long? getProjectId<T>(T item)
        where T : LabModel
    {
        if (typeof(T).GetInterfaces().Count(p => p == typeof(IAssignable)) > 0)
        {
            var assignableItem = (IAssignable)item;
            if (assignableItem != null
                && assignableItem.ProjectId == null
                && assignableItem.ParentId != null)
            {
                if (assignableItem.Parent == null)
                {
                    assignableItem.Parent = Load<Plan>((long)assignableItem.ParentId);
                }

                return getProjectId(assignableItem.Parent);
            }
        }
        return null;

    }

    private long? getProjectId(Plan plan)
    {
        var projectId = plan.ProjectId;
        if (projectId == null && plan.Parent != null)
        {
            return getProjectId(plan.Parent);
        }
        return projectId;
    }

    public override async Task<long> DeleteAsync<T>(T item, CancellationToken cancellationToken)
    {
        item.Status = StatusType.Deleted;
        item.Member = Identity.Member;
        item.Date = DateTime.UtcNow;
        //item.Key = Identity.Key; Not changing key anymore

        try
        {
            var id = await base.EditAsync(item, cancellationToken);

            await LogLabModelLog(item, StatusType.ModuleDeleted, cancellationToken);
            await SaveAuditLogs(item, (StatusType)item.Status, cancellationToken);
            return id;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in DeleteAsync method and details: '{ex.Message}'");
            throw;
        }
    }

    public async Task<long> EditPartialAsync<T>(T item, string module, CancellationToken cancellationToken)
        where T : LabModel
    {
        item.Member = item.Member != null ? item.Member : Identity.Member; // Allowing Member to be updated
        item.Date = DateTime.UtcNow;
        //item.Key = Identity.Key; Not changing key anymore
        try
        {
            await LogLabModelLog(item, (StatusType)item.Status, cancellationToken);
            await SaveAuditLogs(item, (StatusType)item.Status, cancellationToken);
            if (item.Status.Equals(StatusType.UnAssigned))
            {
                var data = dbContext.Set<ApplicationLog>().Where(l => l.EntityId == item.Id && l.Name.Equals(module)
                && l.ActivityType.Equals(StatusType.Draft)).FirstOrDefault();

                item.Status = StatusType.Draft;
                item.Member = data?.Member;
            }
            var id = await base.EditAsync(item, cancellationToken);

            return id;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in AssignAsync method and details: '{ex.Message}'");
            throw;
        }
    }

    private async Task<long> LogLabModelLog<T>(T item, StatusType activityType, CancellationToken cancellationToken)
    where T : LabModel
    {
        var module = typeof(T);

        var jitem = JsonConvert.SerializeObject(item,
        Newtonsoft.Json.Formatting.None,
        new JsonSerializerSettings()
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        });

        var log = new ApplicationLog()
        {
            Date = DateTime.UtcNow,
            EntityId = item.Id,
            Name = module.Name,
            ActivityType = activityType,
            Member = item.Member,
            Key = item.Key,
            ContentHistory = jitem
        };
        try
        {
            dbContext.Set<ApplicationLog>().Add(log);
            return await dbContext.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in DeleteAsync method and details: '{ex.Message}'");
            throw;
        }
    }

    private async Task<long> SaveAuditLogs<T>(T item, StatusType activityType, CancellationToken cancellationToken)
    where T : LabModel
    {
        var module = typeof(T);
        var jitem = JsonConvert.SerializeObject(item,
        Newtonsoft.Json.Formatting.None,
        new JsonSerializerSettings()
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        });

        var log = new AuditLog
        {
            Date = DateTime.UtcNow,
            EntityId = item.Id,
            Name = module.Name,
            Member = item.Member,
            ActionType = (activityType == StatusType.Draft ? "Insert" : activityType.ToString()),
            Key = item.Key
        };
        if (activityType == StatusType.Draft)
        {
            log.NewValues = jitem;
        }
        else
        {
            log.OldValues = null;
            log.NewValues = jitem;
            log.ModifiedDate = DateTime.UtcNow;
            log.ModifiedBy = item.Member;
        }

        try
        {
            dbContext.Set<AuditLog>().Add(log);
            return await dbContext.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in DeleteAsync method and details: '{ex.Message}'");
            throw;
        }
    }

    public string? GetFinancialYear(object code)
    {
        DateTime filterDate = DateTime.Now;
        var data = dbContext.Set<FinancialYear>().Where(e => filterDate >= e.StartDate && filterDate <= e.EndDate).FirstOrDefault();
        return data?.FinYear;
    }

    public dynamic? GetDocumentNo(long projectId)
    {
        var data = dbContext.Set<ProjectDocNoTracking>().Where(e => e.ProjectId == projectId).FirstOrDefault();
        return data;
    }

    public dynamic GetCopyData(long id, string type)
    {
        dynamic entities;
        if (type.Equals("tower", StringComparison.CurrentCultureIgnoreCase))
        {
            entities = GetTowerData(id);
        }
        else
        {
            entities = GetFlatData(id);
        }
        return entities;
    }
    internal dynamic GetTowerData(long id)
    {
        var query = "SELECT p.Id,p.Name,p.Description,p.Blueprint,p.ProjectId,ISNULL(pl.FlCount, 0) AS FloorCount," +
                       " pc.ParkingTypeId,ISNULL(pc.PKCount, 0) AS ParkingCount " +
                       "FROM Plans p " +
                       "LEFT JOIN(SELECT TowerId, ParkingTypeId, COUNT(ParkingTypeId) AS PKCount " +
                           "FROM Parkings WHERE TowerId = " + id + " GROUP BY TowerId, ParkingTypeId " +
                       " ) pc ON p.Id = pc.TowerId " +
                       "LEFT JOIN(SELECT ParentId, count(ParentId) as FlCount " +
                         "FROM Plans where ParentId = " + id + " and Type = 'floor' group by ParentId " +
                       ") pl ON p.Id = pl.ParentId " +
                       "WHERE p.Type = 'tower' AND p.Id = " + id;

        using (var command = dbContext.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = query;
            command.CommandType = CommandType.Text;

            dbContext.Database.OpenConnection();

            using (var result = command.ExecuteReader())
            {
                var entities = new Plan();
                var parkingList = new List<ParkingRawData>();
                while (result.Read())
                {
                    parkingList.Add(new ParkingRawData()
                    {
                        ParkingTypeId = result.GetInt64("ParkingTypeId"),
                        NoOfParking = result.GetInt32("ParkingCount")
                    });

                    entities.Id = result.GetInt64("Id");
                    entities.Name = result.GetString("Name");
                    entities.Description = result.GetString("Description");
                    entities.Blueprint = result.GetString("Blueprint");
                    entities.ProjectId = result.GetInt64("ProjectId");
                    entities.NoOfFloors = result.GetInt32("FloorCount");
                  
                }
                entities.Parkings = JsonConvert.SerializeObject(parkingList);
                return entities;
            }
        }
    }
    internal dynamic GetFlatData(long id)
    {
        var query = "SELECT pl.FlatTemplateId,ISNULL(pl.TCount, 0) AS FlatCount " +
                    "  FROM[Plans] p " +
                     " LEFT JOIN( SELECT FlatTemplateId, ParentId, COUNT(FlatTemplateId) as TCount " +
                     " FROM[Plans] where ParentId = " + id + " and Type = 'flat'  group by FlatTemplateId, ParentId " +
                   " ) pl ON  p.Id = pl.ParentId " +
                   " where p.TYPE = 'floor' and p.id =" + id;

        using (var command = dbContext.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = query;
            command.CommandType = CommandType.Text;

            dbContext.Database.OpenConnection();

            using (var result = command.ExecuteReader())
            {
                var list = new List<FlatTemplateRawData>();
                while (result.Read())
                {
                    list.Add(new FlatTemplateRawData()
                    {
                        FlatTemplateId = result.GetInt64("FlatTemplateId"),
                        NoOfFlats = result.GetInt32("FlatCount")
                    });

                }
                // Wrap in FlatData
                FlatData flatData = new FlatData
                {
                    FlatTemplates = list
                };
                return JsonConvert.SerializeObject(flatData);                
            }
        }
    }
}

public class ModuleIdentity
{
    public ModuleIdentity(string member, string key)
    {
        Member = member;
        Key = key;
    }
    public string Member { get; }
    public string Key { get; }
}