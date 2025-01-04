﻿// <auto-generated />
using System;
using IlabAuthentication.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace IlabAuthentication.Migrations
{
    [DbContext(typeof(AuthenticationDbContext))]
    partial class AuthenticationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("IlabAuthentication.Data.Models.ApplicationRole", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Member")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            ConcurrencyStamp = "1fbd204a-762b-4149-9a54-44ae6354d79c",
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Name = "root",
                            NormalizedName = "ROOT"
                        },
                        new
                        {
                            Id = 2L,
                            ConcurrencyStamp = "26E9A03B-E6BB-4567-A36B-E1DE6B6C1227",
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Name = "Super Admin",
                            NormalizedName = "SUPER"
                        },
                        new
                        {
                            Id = 3L,
                            ConcurrencyStamp = "d3dff883-d8ba-4f25-8529-29ef5f5343ce",
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = 4L,
                            ConcurrencyStamp = "c78c489a-fb53-4a42-aee6-60818a3be800",
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Name = "User",
                            NormalizedName = "USER"
                        });
                });

            modelBuilder.Entity("IlabAuthentication.Data.Models.ApplicationUser", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Department")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Disable")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Member")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<long?>("ParentId")
                        .HasColumnType("bigint");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("PhotoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.HasIndex("ParentId");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "a7e26408-644a-48ca-a0a7-7cb94e41315d",
                            Disable = false,
                            Email = "root",
                            EmailConfirmed = true,
                            FirstName = "Root",
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            LastName = "",
                            LockoutEnabled = false,
                            Member = "root",
                            NormalizedEmail = "ROOT",
                            NormalizedUserName = "ROOT",
                            PasswordHash = "AQAAAAIAAYagAAAAEIUXHqy53Dre8nfwKZJ/mfDjLdtvMcpPO0pC7M4VwCb+K+eta6c8nxYOp21EfUbGzg==",
                            PhoneNumber = "0000",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "R7JOVNY6TU5ACLDKWMJCCXJZIHNATIIJ",
                            TwoFactorEnabled = false,
                            UserName = "root"
                        },
                        new
                        {
                            Id = 2L,
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "e6ac56cd-cb41-4059-b979-a0d7a7ac5fe0",
                            Disable = false,
                            Email = "super@rajwada.com",
                            EmailConfirmed = true,
                            FirstName = "Super",
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            LastName = "Admin",
                            LockoutEnabled = false,
                            Member = "root",
                            NormalizedEmail = "SUPER@RAJWADA.COM",
                            NormalizedUserName = "SUPER",
                            ParentId = 1L,
                            PasswordHash = "AQAAAAIAAYagAAAAEAvvhBeNuMBXOP4HueTG/lZiPS1ieIlXzH5CWQCcpPu1ouRK53hHwO7cuWDJg8oBzw==",
                            PhoneNumber = "0000",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "P2GVVVE7O7TUFSSULMZN4QT4MPTC6YHT",
                            TwoFactorEnabled = false,
                            UserName = "super@rajwada.com"
                        });
                });           

            modelBuilder.Entity("IlabAuthentication.Data.Models.Privilege", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Member")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Module")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<long?>("RoleId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Privileges");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "add",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 2L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "edit",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 3L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "delete",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 4L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "view",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 5L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "list",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 6L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "add",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 7L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "edit",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 8L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "delete",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 9L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "view",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 10L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "list",
                            RoleId = 1L
                        },
                        new
                        {
                            Id = 11L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "add",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 12L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "edit",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 13L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "delete",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 14L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "view",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 15L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "user",
                            Name = "list",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 16L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "add",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 17L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "edit",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 18L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "delete",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 19L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "view",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 20L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "role",
                            Name = "list",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 21L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "company",
                            Name = "add",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 22L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "company",
                            Name = "edit",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 23L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "company",
                            Name = "delete",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 24L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "company",
                            Name = "view",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 25L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "company",
                            Name = "list",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 26L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "project",
                            Name = "add",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 27L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "project",
                            Name = "edit",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 28L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "project",
                            Name = "delete",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 29L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "project",
                            Name = "view",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 30L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "project",
                            Name = "list",
                            RoleId = 2L
                        },
                        new
                        {
                            Id = 31L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "root",
                            Module = "department",
                            Name = "list",
                            RoleId = 2L
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<long>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("RoleId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<long>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<long>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<long>", b =>
                {
                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<long>("RoleId")
                        .HasColumnType("bigint");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);

                    b.HasData(
                        new
                        {
                            UserId = 1L,
                            RoleId = 1L
                        },
                        new
                        {
                            UserId = 2L,
                            RoleId = 2L
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<long>", b =>
                {
                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("IlabAuthentication.Data.Models.ApplicationUser", b =>
                {
                    b.HasOne("IlabAuthentication.Data.Models.ApplicationUser", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });
           

            modelBuilder.Entity("IlabAuthentication.Data.Models.Privilege", b =>
                {
                    b.HasOne("IlabAuthentication.Data.Models.ApplicationRole", "Role")
                        .WithMany("Privileges")
                        .HasForeignKey("RoleId");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<long>", b =>
                {
                    b.HasOne("IlabAuthentication.Data.Models.ApplicationRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<long>", b =>
                {
                    b.HasOne("IlabAuthentication.Data.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<long>", b =>
                {
                    b.HasOne("IlabAuthentication.Data.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<long>", b =>
                {
                    b.HasOne("IlabAuthentication.Data.Models.ApplicationRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IlabAuthentication.Data.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<long>", b =>
                {
                    b.HasOne("IlabAuthentication.Data.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("IlabAuthentication.Data.Models.ApplicationRole", b =>
                {
                    b.Navigation("Privileges");
                });
#pragma warning restore 612, 618
        }
    }
}
