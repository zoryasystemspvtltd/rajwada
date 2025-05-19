using DocumentFormat.OpenXml.Spreadsheet;
using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RajApi.Data.Models;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace RajApi.Data;

public class RajDataHandler : LabDataHandler
{

    public readonly LabDataHandler handler;
    public RajDataHandler(DbContext dbContext,
    ILogger<RajDataHandler> logger)
        : base(dbContext, logger)
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

            return activities;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in GetWorkerStatusReport method and details: '{ex.Message}'");
            throw;
        }
    }
    public dynamic GetResourceDetails(long planId)
    {
        var rooms = dbContext.Set<Room>()
                 .ToList();
        var res = dbContext.Set<Resource>()
            .Where(l => l.PlanId == planId)
            .ToList();

        var final = res.Join(rooms,
                r => r.RoomId,
                rm => rm.Id,
                (r, rm) => new
                {
                    r.Quantity,
                    rm.Name
                });

        return final;
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