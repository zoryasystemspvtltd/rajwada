﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RajApi.Data;

#nullable disable

namespace RajApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240914203320_typ")]
    partial class typ
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RajApi.Data.Models.ApplicationLog", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int>("ActivityType")
                        .HasColumnType("int");

                    b.Property<string>("ContentHistory")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<long>("EntityId")
                        .HasColumnType("bigint");

                    b.Property<string>("Key")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Member")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ApplicationLogs");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            ActivityType = 0,
                            Date = new DateTime(2024, 9, 14, 20, 33, 19, 394, DateTimeKind.Utc).AddTicks(8031),
                            EntityId = 1L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "super@rajwada.com",
                            Name = "Company",
                            Status = 0
                        },
                        new
                        {
                            Id = 2L,
                            ActivityType = 0,
                            Date = new DateTime(2024, 9, 14, 20, 33, 19, 394, DateTimeKind.Utc).AddTicks(8035),
                            EntityId = 1L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "super@rajwada.com",
                            Name = "Department",
                            Status = 0
                        },
                        new
                        {
                            Id = 3L,
                            ActivityType = 0,
                            Date = new DateTime(2024, 9, 14, 20, 33, 19, 394, DateTimeKind.Utc).AddTicks(8037),
                            EntityId = 2L,
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "super@rajwada.com",
                            Name = "Department",
                            Status = 0
                        });
                });

            modelBuilder.Entity("RajApi.Data.Models.Asset", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<long?>("GroupId")
                        .HasColumnType("bigint");

                    b.Property<string>("GroupName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Key")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Member")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<long>("TypeId")
                        .HasColumnType("bigint");

                    b.Property<string>("TypeName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("UomId")
                        .HasColumnType("bigint");

                    b.Property<string>("UomName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("TypeId");

                    b.HasIndex("UomId");

                    b.ToTable("Assets");
                });

            modelBuilder.Entity("RajApi.Data.Models.AssetGroup", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Key")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Member")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("AssetGroups");
                });

            modelBuilder.Entity("RajApi.Data.Models.AssetType", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Key")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Member")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("AssetTypes");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Code = "FA",
                            Date = new DateTime(2024, 9, 14, 20, 33, 19, 394, DateTimeKind.Utc).AddTicks(8078),
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "super@rajwada.com",
                            Name = "Fixed Asset",
                            Status = 0
                        },
                        new
                        {
                            Id = 2L,
                            Code = "CB",
                            Date = new DateTime(2024, 9, 14, 20, 33, 19, 394, DateTimeKind.Utc).AddTicks(8080),
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "super@rajwada.com",
                            Name = "Consumption Base",
                            Status = 0
                        },
                        new
                        {
                            Id = 3L,
                            Code = "SA",
                            Date = new DateTime(2024, 9, 14, 20, 33, 19, 394, DateTimeKind.Utc).AddTicks(8082),
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "super@rajwada.com",
                            Name = "Service Assets",
                            Status = 0
                        });
                });

            modelBuilder.Entity("RajApi.Data.Models.Company", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Address1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Address2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Address3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Currency")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GSTNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Key")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("Latitude")
                        .HasColumnType("int");

                    b.Property<string>("Logo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Longitude")
                        .HasColumnType("int");

                    b.Property<string>("Member")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)");

                    b.Property<string>("PanNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("ParentId")
                        .HasColumnType("bigint");

                    b.Property<string>("ParentName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PinCode")
                        .HasColumnType("int");

                    b.Property<string>("QrCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<string>("TinNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Website")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Zone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Companys");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Code = "RE",
                            Date = new DateTime(2024, 9, 14, 20, 33, 19, 394, DateTimeKind.Utc).AddTicks(7735),
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "super@rajwada.com",
                            Name = "Rajwara",
                            Status = 0,
                            Type = "Enterprise"
                        });
                });

            modelBuilder.Entity("RajApi.Data.Models.Department", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Code")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Key")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Member")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Departments");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Code = "CI",
                            Date = new DateTime(2024, 9, 14, 20, 33, 19, 394, DateTimeKind.Utc).AddTicks(7977),
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "super@rajwada.com",
                            Name = "Civil",
                            Status = 0
                        },
                        new
                        {
                            Id = 2L,
                            Code = "LE",
                            Date = new DateTime(2024, 9, 14, 20, 33, 19, 394, DateTimeKind.Utc).AddTicks(7980),
                            Key = "1536B022-C5C9-4358-BB6A-466F2075B7D4",
                            Member = "super@rajwada.com",
                            Name = "Legal",
                            Status = 0
                        });
                });

            modelBuilder.Entity("RajApi.Data.Models.Plan", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int?>("ApprovalStatus")
                        .HasColumnType("int");

                    b.Property<decimal>("BudgetAllocationAmount")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("BudgetAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CompletionCertificateDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Cost")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Key")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Member")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)");

                    b.Property<long?>("ParentId")
                        .HasColumnType("bigint");

                    b.Property<string>("ParentName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("PlanEndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("PlanStartDate")
                        .HasColumnType("datetime2");

                    b.Property<long?>("ProjectId")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("State")
                        .HasColumnType("int");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalCost")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Plans");
                });

            modelBuilder.Entity("RajApi.Data.Models.Project", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Address1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Address2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Address3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ApprovalStatus")
                        .HasColumnType("int");

                    b.Property<string>("BelongTo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("BudgetAllocationAmount")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("BudgetAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("CompanyId")
                        .HasColumnType("bigint");

                    b.Property<string>("CompanyName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CompletionCertificateDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ContactName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Key")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("Latitude")
                        .HasColumnType("int");

                    b.Property<int?>("Longitude")
                        .HasColumnType("int");

                    b.Property<string>("Member")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)");

                    b.Property<long?>("ParentId")
                        .HasColumnType("bigint");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PinCode")
                        .HasColumnType("int");

                    b.Property<DateTime?>("PlanEndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("PlanStartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("StartFinYear")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("State")
                        .HasColumnType("int");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalCost")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Zone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("ParentId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("RajApi.Data.Models.Uom", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Key")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Member")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .HasMaxLength(511)
                        .HasColumnType("nvarchar(511)");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Uoms");
                });

            modelBuilder.Entity("RajApi.Data.Models.Asset", b =>
                {
                    b.HasOne("RajApi.Data.Models.AssetGroup", "Group")
                        .WithMany("Assets")
                        .HasForeignKey("GroupId");

                    b.HasOne("RajApi.Data.Models.AssetType", "Type")
                        .WithMany("Assets")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RajApi.Data.Models.Uom", "Uom")
                        .WithMany()
                        .HasForeignKey("UomId");

                    b.Navigation("Group");

                    b.Navigation("Type");

                    b.Navigation("Uom");
                });

            modelBuilder.Entity("RajApi.Data.Models.Company", b =>
                {
                    b.HasOne("RajApi.Data.Models.Company", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("RajApi.Data.Models.Plan", b =>
                {
                    b.HasOne("RajApi.Data.Models.Plan", "Parent")
                        .WithMany("Plans")
                        .HasForeignKey("ParentId");

                    b.HasOne("RajApi.Data.Models.Project", "Project")
                        .WithMany("Plans")
                        .HasForeignKey("ProjectId");

                    b.Navigation("Parent");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("RajApi.Data.Models.Project", b =>
                {
                    b.HasOne("RajApi.Data.Models.Company", "Company")
                        .WithMany("Projects")
                        .HasForeignKey("CompanyId");

                    b.HasOne("RajApi.Data.Models.Project", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");

                    b.Navigation("Company");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("RajApi.Data.Models.AssetGroup", b =>
                {
                    b.Navigation("Assets");
                });

            modelBuilder.Entity("RajApi.Data.Models.AssetType", b =>
                {
                    b.Navigation("Assets");
                });

            modelBuilder.Entity("RajApi.Data.Models.Company", b =>
                {
                    b.Navigation("Projects");
                });

            modelBuilder.Entity("RajApi.Data.Models.Plan", b =>
                {
                    b.Navigation("Plans");
                });

            modelBuilder.Entity("RajApi.Data.Models.Project", b =>
                {
                    b.Navigation("Plans");
                });
#pragma warning restore 612, 618
        }
    }
}
