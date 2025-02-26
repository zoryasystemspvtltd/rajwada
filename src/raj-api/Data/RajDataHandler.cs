using DocumentFormat.OpenXml.Wordprocessing;
using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using IlabAuthentication.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RajApi.Data.Models;

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
    public dynamic GetWorkerStatusReport(long projectId, long towerId, long floorId, long flatId)
    {
        try
        {

            var activities = dbContext.Set<Activity>()
                     .Where(l => l.Type == "Sub Task" && l.ProjectId == projectId && l.TowerId == towerId && l.FloorId == floorId).ToList();
            if (flatId > 0)
            {
                activities = activities.Where(l => l.FlatId == flatId).ToList();
            }
            var resource = dbContext.Set<Resource>()
                .ToList();
            var plan = dbContext.Set<Plan>()
                .ToList();
            var room = dbContext.Set<Room>()
               .ToList();
            var workflow = dbContext.Set<Workflow>()
               .ToList();

            var final = resource.Join(activities, rec => rec.PlanId, act => act.FlatId, (rec, act) => new { rec, act })
                .Join(plan, rrec => rrec.rec.PlanId, pl => pl.Id, (rrec, pl) => new { rrec, pl })
                .Join(room, rrrec => rrrec.rrec.rec.RoomId, rm => rm.Id, (rrrec, rm) => new { rrrec, rm })
                 .Join(workflow, aact => aact.rrrec.rrec.act.DependencyId, wf => wf.Id, (aact, wf) => new { aact, wf })
                .Select(m => new WorkerStatusReport()
                {
                    Id = m.aact.rrrec.rrec.act.Id,
                    StartDate = m.aact.rrrec.rrec.act.StartDate,
                    ActualStartDate = m.aact.rrrec.rrec.act.ActualStartDate,
                    EndDate = m.aact.rrrec.rrec.act.EndDate,
                    ActualEndDate = m.aact.rrrec.rrec.act.ActualEndDate,
                    IsOnHold = m.aact.rrrec.rrec.act.IsOnHold,
                    IsCancelled = m.aact.rrrec.rrec.act.IsCancelled,
                    IsQCApproved = m.aact.rrrec.rrec.act.IsQCApproved,
                    IsCompleted = m.aact.rrrec.rrec.act.IsCompleted,
                    IsApproved = m.aact.rrrec.rrec.act.IsApproved,
                    IsAbandoned = m.aact.rrrec.rrec.act.IsAbandoned,
                    ActivityStatus = "",
                    RoomName = m.aact.rm.Name,
                    Data = m.wf.Data,
                    FlatName = m.aact.rrrec.pl.Name
                });
            return final;

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