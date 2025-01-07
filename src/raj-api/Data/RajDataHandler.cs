using ILab.Data;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
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
        //if (Array.Exists(typeof(T).GetInterfaces(), i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IAssignable)))
        if ((typeof(T).GetInterfaces().Count(p => p == typeof(IAssignable)) > 0) || (typeof(T).GetInterfaces().Count(p => p == typeof(IApproval)) > 0))
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
            throw;
        }
    }

    public async Task<long> AssignAsync<T>(T item, CancellationToken cancellationToken)
        where T : LabModel
    {
        item.Status = StatusType.Assigne;
        item.Member = item.Member != null ? item.Member : Identity.Member; // Allowing Member to be updated
        item.Date = DateTime.UtcNow;
        //item.Key = Identity.Key; Not changing key anymore

        try
        {
            var id = await base.EditAsync(item, cancellationToken);

            await LogLabModelLog(item, StatusType.Assigne, cancellationToken);

            return id;
        }
        catch (Exception ex)
        {
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