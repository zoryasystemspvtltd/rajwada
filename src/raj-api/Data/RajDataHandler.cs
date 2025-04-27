using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RajApi.Data.Models;
using System.Data;


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
            var labModelLog = dbContext.Set<ApplicationLog>()
                .Where(l => l.Name.Equals(name) && l.Member.Equals(Identity.Member))
                .Select(l => new { l.Member, l.EntityId })
                .Distinct()
                .AsQueryable();

            var query = labModelLog.Join(dbSet,
                    l => l.EntityId,
                    m => m.Id,
                    (l, m) => m)
                .AsQueryable()
                .Where(p => p.Status != StatusType.Deleted)
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
        var applog = dbContext.Set<ApplicationLog>().Where(l => l.EntityId == id && l.Name.Equals(module)).
            Select(a => new { a.EntityId, a.Member }).Distinct();

        return applog;
    }

    public List<IdNamePair> GetAllAssignedProjects(string member)
    {
        var query = "select distinct pr.Id,pr.Name from [dbo].[ApplicationLogs] l " +
             "inner join dbo.Plans p on l.EntityId = p.Id " +
             "inner join dbo.Projects pr on pr.Id = p.ProjectId " +
            "where l.Member ='" + member + "'";

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

    public async Task<long> EditPartialAsync<T>(T item, CancellationToken cancellationToken)
        where T : LabModel
    {
        item.Member = item.Member != null ? item.Member : Identity.Member; // Allowing Member to be updated
        item.Date = DateTime.UtcNow;
        //item.Key = Identity.Key; Not changing key anymore

        try
        {
            var id = await base.EditAsync(item, cancellationToken);

            await LogLabModelLog(item, (StatusType)item.Status, cancellationToken);

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