using ILab.Extensionss.Data.Models;
using Microsoft.EntityFrameworkCore;
using RajApi.Data.Models;
using System.Reflection.Emit;

namespace RajApi.Data;


public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Project>()
            .Property(p => p.BudgetAllocationAmount).HasDefaultValue(0.0);
        builder.Entity<Project>()
           .Property(p => p.TotalCost).HasDefaultValue(0.0);

        builder.Entity<Plan>()
          .Property(p => p.BudgetAllocationAmount).HasDefaultValue(0.0);
        builder.Entity<Plan>()
           .Property(p => p.TotalCost).HasDefaultValue(0.0);

        builder.Entity<Contractor>()
       .Property(e => e.Type).HasDefaultValue("Contractor");

        builder.Entity<ActivityAmendment>()
       .Property(e => e.RejectedByQC).HasDefaultValue(0);

        builder.Entity<ActivityAmendment>()
       .Property(e => e.AmendmentStatus).HasDefaultValue(0);

        SeedData(builder);
       
    }
    private void SeedData(ModelBuilder builder)
    {
        var rootKey = "1536B022-C5C9-4358-BB6A-466F2075B7D4";

        builder.Entity<Company>().HasData(
            new Company()
            {
                Id = 1,
                Name = "Rajwara",
                Code = "RE",
                Type = "Enterprise",
                Date = DateTime.UtcNow,
                Status = StatusType.Draft,
                Member = "super@rajwada.com",
                Key = rootKey
            });
        builder.Entity<Department>().HasData(
            new Department()
            {
                Id = 1,
                Name = "Civil",
                Code = "CI",
                Date = DateTime.UtcNow,
                Status = StatusType.Draft,
                Member = "super@rajwada.com",
                Key = rootKey
            },
            new Department()
            {
                Id = 2,
                Name = "Legal",
                Code = "LE",
                Date = DateTime.UtcNow,
                Status = StatusType.Draft,
                Member = "super@rajwada.com",
                Key = rootKey
            });
        builder.Entity<ApplicationLog>().HasData(
            new ApplicationLog()
            {
                Id = 1,
                Key = rootKey,
                Name = "Company",
                Date = DateTime.UtcNow,
                Status = StatusType.Draft,
                Member = "super@rajwada.com",
                ActivityType = StatusType.Draft,
                EntityId = 1,
            },
            new ApplicationLog()
            {
                Id = 2,
                Key = rootKey,
                Name = "Department",
                Date = DateTime.UtcNow,
                Status = StatusType.Draft,
                Member = "super@rajwada.com",
                ActivityType = StatusType.Draft,
                EntityId = 1,
            },
            new ApplicationLog()
            {
                Id = 3,
                Key = rootKey,
                Name = "Department",
                Date = DateTime.UtcNow,
                Status = StatusType.Draft,
                Member = "super@rajwada.com",
                ActivityType = StatusType.Draft,
                EntityId = 2,
            });
        builder.Entity<AssetType>().HasData(
            new AssetType()
            {
                Code = "FA",
                Name = "Fixed Asset",
                Status = 0,
                Date = DateTime.UtcNow,
                Id = 1,
                Key = rootKey,
                Member = "super@rajwada.com",
            },
             new AssetType()
             {
                 Code = "CB",
                 Name = "Consumption Base",
                 Status = 0,
                 Date = DateTime.UtcNow,
                 Id = 2,
                 Key = rootKey,
                 Member = "super@rajwada.com",
             }, new AssetType()
             {
                 Code = "SA",
                 Name = "Service Assets",
                 Status = 0,
                 Date = DateTime.UtcNow,
                 Id = 3,
                 Key = rootKey,
                 Member = "super@rajwada.com",
             });
    }

    public virtual DbSet<ApplicationLog> ApplicationLogs { get; set; }

    #region Transactions
    public virtual DbSet<Company> Companys { get; set; }
    public virtual DbSet<Project> Projects { get; set; }
    public virtual DbSet<Plan> Plans { get; set; }
    public virtual DbSet<Activity> Activities { get; set; }
    public virtual DbSet<ActivityTracking> ActivityTrackings { get; set; }
    public virtual DbSet<ActivityResource> ActivityResources { get; set; }
    public virtual DbSet<AssetGroup> AssetGroups { get; set; }
    public virtual DbSet<Asset> Assets { get; set; }
    public virtual DbSet<AssetType> AssetTypes { get; set; }
    public virtual DbSet<Resource> Resources { get; set; }
    public virtual DbSet<LevelSetupDetails> LevelSetupDetails { get; set; }
    public virtual DbSet<Comment> Comments { get; set; }
    public virtual DbSet<Attachment> Attachments { get; set; }
    public virtual DbSet<Parking> Parkings { get; set; }
    public virtual DbSet<FlatTemplateDetails> FlatTemplateDetails { get; set; }
    #endregion

    #region Masters
    public virtual DbSet<Department> Departments { get; set; }
    public virtual DbSet<Uom> Uoms { get; set; }
    public virtual DbSet<Dependency> Dependencies { get; set; }
    public virtual DbSet<Workflow> Workflows { get; set; }
    public virtual DbSet<Mouza> Mouzas { get; set; }
    public virtual DbSet<RsDaag> RsDaags { get; set; }
    public virtual DbSet<NameMaster> NameMasters { get; set; }
    public virtual DbSet<Room> Rooms { get; set; }
    public virtual DbSet<Contractor> Contractors { get; set; }
    public virtual DbSet<Supplier> Suppliers { get; set; }
    public virtual DbSet<LevelSetup> LevelSetup { get; set; }
    public virtual DbSet<UnitOfWork> UnitOfWorks { get; set; }
    public virtual DbSet<FlatTemplate> FlatTemplates { get; set; }
    public virtual DbSet<ParkingType> ParkingTypes { get; set; }
    public virtual DbSet<ProjectDocNoTracking> ProjectDocNoTrackings { get; set; }
    public virtual DbSet<FinancialYear> FinancialYears { get; set; }
    #endregion

}