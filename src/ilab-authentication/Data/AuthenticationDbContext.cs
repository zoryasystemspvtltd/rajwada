using IlabAuthentication.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IlabAuthentication.Data;


public class AuthenticationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, long>
{
    public AuthenticationDbContext(DbContextOptions<AuthenticationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        SeedData(builder);
    }

    private void SeedData(ModelBuilder builder)
    {
        var rootRoleId = 1;
        var superRoleId = 2;
        var adminRoleId = 3;
        var userRoleId = 4;
        var rootKey = "1536B022-C5C9-4358-BB6A-466F2075B7D4";

        builder.Entity<ApplicationRole>()
            .HasData(
                new ApplicationRole()
                {
                    Id = rootRoleId,
                    Name = "root",
                    ConcurrencyStamp = "1fbd204a-762b-4149-9a54-44ae6354d79c",
                    NormalizedName = "ROOT",
                    Key = rootKey,
                    Member = "root",
                },
                new ApplicationRole()
                 {
                     Id = superRoleId,
                     Name = "Super Admin",
                     ConcurrencyStamp = "26E9A03B-E6BB-4567-A36B-E1DE6B6C1227",
                     NormalizedName = "SUPER",
                     Key = rootKey,
                     Member = "root",
                 },
                new ApplicationRole()
                {
                    Id = adminRoleId,
                    Name = "Admin",
                    ConcurrencyStamp = "d3dff883-d8ba-4f25-8529-29ef5f5343ce",
                    NormalizedName = "ADMIN",
                    Key = rootKey,
                    Member = "root",
                },
                new ApplicationRole()
                {
                    Id = userRoleId,
                    Name = "User",
                    ConcurrencyStamp = "c78c489a-fb53-4a42-aee6-60818a3be800",
                    NormalizedName = "USER",
                    Key = rootKey,
                    Member = "root",
                }
            );
        var systemUserId = 1;
        var superUserId = 2;

        builder.Entity<ApplicationUser>()
            .HasData(
                new ApplicationUser()
                {
                    Id = systemUserId,
                    FirstName = "Root",
                    LastName = "",
                    Email = "root",
                    UserName = "root",
                    NormalizedUserName = "ROOT",
                    NormalizedEmail = "ROOT",
                    PhoneNumber = "0000",
                    EmailConfirmed = true,
                    // Password Admin@123 // TODO Change Password
                    PasswordHash = "AQAAAAIAAYagAAAAEIUXHqy53Dre8nfwKZJ/mfDjLdtvMcpPO0pC7M4VwCb+K+eta6c8nxYOp21EfUbGzg==",
                    SecurityStamp = "R7JOVNY6TU5ACLDKWMJCCXJZIHNATIIJ",
                    ConcurrencyStamp = "a7e26408-644a-48ca-a0a7-7cb94e41315d",
                    Key = rootKey,
                    Member = "root",
                },
                new ApplicationUser()
                {
                    Id = superUserId,
                    FirstName = "Super",
                    LastName = "Admin",
                    Email = "super@rajwada.com",
                    UserName = "super@rajwada.com",
                    NormalizedUserName = "SUPER",
                    NormalizedEmail = "SUPER@RAJWADA.COM",
                    PhoneNumber = "0000",
                    EmailConfirmed = true,
                    // Password Admin@123 // TODO Change Password
                    PasswordHash = "AQAAAAIAAYagAAAAEAvvhBeNuMBXOP4HueTG/lZiPS1ieIlXzH5CWQCcpPu1ouRK53hHwO7cuWDJg8oBzw==",
                    SecurityStamp = "P2GVVVE7O7TUFSSULMZN4QT4MPTC6YHT",
                    ConcurrencyStamp = "e6ac56cd-cb41-4059-b979-a0d7a7ac5fe0",
                    Key = rootKey,
                    Member = "root",
                    ParentId = systemUserId
                }
            );

        builder.Entity<IdentityUserRole<long>>()
            .HasData(
                new IdentityUserRole<long>()
                {
                    RoleId = rootRoleId,
                    UserId = systemUserId
                },
                new IdentityUserRole<long>()
                {
                    RoleId = superRoleId,
                    UserId = superUserId
                }
            );


        builder.Entity<Privilege>()
            .HasData(
                new Privilege()
                {
                    Id = 1,
                    Module = "user",
                    Name = "add",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 2,
                    Module = "user",
                    Name = "edit",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 3,
                    Module = "user",
                    Name = "delete",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 4,
                    Module = "user",
                    Name = "view",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 5,
                    Module = "user",
                    Name = "list",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 6,
                    Module = "role",
                    Name = "add",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 7,
                    Module = "role",
                    Name = "edit",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 8,
                    Module = "role",
                    Name = "delete",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 9,
                    Module = "role",
                    Name = "view",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 10,
                    Module = "role",
                    Name = "list",
                    RoleId = rootRoleId,
                    Key = rootKey,
                    Member = "root",
                },

                new Privilege()
                {
                    Id = 11,
                    Module = "user",
                    Name = "add",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 12,
                    Module = "user",
                    Name = "edit",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 13,
                    Module = "user",
                    Name = "delete",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 14,
                    Module = "user",
                    Name = "view",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 15,
                    Module = "user",
                    Name = "list",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 16,
                    Module = "role",
                    Name = "add",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 17,
                    Module = "role",
                    Name = "edit",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 18,
                    Module = "role",
                    Name = "delete",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 19,
                    Module = "role",
                    Name = "view",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 20,
                    Module = "role",
                    Name = "list",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 21,
                    Module = "company",
                    Name = "add",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 22,
                    Module = "company",
                    Name = "edit",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 23,
                    Module = "company",
                    Name = "delete",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 24,
                    Module = "company",
                    Name = "view",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 25,
                    Module = "company",
                    Name = "list",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 26,
                    Module = "project",
                    Name = "add",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 27,
                    Module = "project",
                    Name = "edit",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 28,
                    Module = "project",
                    Name = "delete",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 29,
                    Module = "project",
                    Name = "view",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 30,
                    Module = "project",
                    Name = "list",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                },
                new Privilege()
                {
                    Id = 31,
                    Module = "department",
                    Name = "list",
                    RoleId = superUserId,
                    Key = rootKey,
                    Member = "root",
                }
            );

    }
    public virtual DbSet<Privilege> Privileges { get; set; }

    public virtual DbSet<Approver> Approvers { get; set; }
}

