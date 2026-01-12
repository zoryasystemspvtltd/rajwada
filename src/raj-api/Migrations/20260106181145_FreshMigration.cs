using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class FreshMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivityAmendment",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RejectedByQC = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    QCRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmendmentReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OldData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmendmentStatus = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    ReviewedBy = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityAmendment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityAmendment_ActivityAmendment_ParentId",
                        column: x => x.ParentId,
                        principalTable: "ActivityAmendment",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ApplicationLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    ActivityType = table.Column<int>(type: "int", nullable: false),
                    ContentHistory = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AssetGroups",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AssetTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Attachments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Module = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    File = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ItemId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tag = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    ActionType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    OldValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChangeSummary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReviewedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReviewedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companys",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BelongTo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PinCode = table.Column<int>(type: "int", nullable: true),
                    Latitude = table.Column<int>(type: "int", nullable: true),
                    Longitude = table.Column<int>(type: "int", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QrCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GSTNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PanNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TinNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Companys_Companys_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Companys",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Contractors",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PanNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GSTNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LicenceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EffectiveStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EffectiveEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SPOC = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "Contractor"),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contractors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dependencies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpectedDuration = table.Column<long>(type: "bigint", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    BelongsTo = table.Column<long>(type: "bigint", nullable: true),
                    Items = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dependencies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dependencies_Dependencies_BelongsTo",
                        column: x => x.BelongsTo,
                        principalTable: "Dependencies",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Dependencies_Dependencies_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Dependencies",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FinancialYears",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FinYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialYears", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FlatTemplates",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlatTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LevelSetup",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InChargeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InChargeId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VechileNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrackingNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DocumentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SupplierId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SupplierName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsApproved = table.Column<bool>(type: "bit", nullable: true),
                    ApprovedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ApprovedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApprovedRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LevelSetup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mouzas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gl_No = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mouzas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ParkingTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PostWorkPeriodicCheckings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPhoto = table.Column<bool>(type: "bit", nullable: true),
                    IsCalendar = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostWorkPeriodicCheckings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PanNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GSTNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LicenceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EffectiveStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EffectiveEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SPOC = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Uoms",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Uoms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkCheckpoints",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPhoto = table.Column<bool>(type: "bit", nullable: true),
                    IsCalendar = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkCheckpoints", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartFinYear = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BelongTo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PinCode = table.Column<int>(type: "int", nullable: true),
                    Latitude = table.Column<int>(type: "int", nullable: true),
                    Longitude = table.Column<int>(type: "int", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Blueprint = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    WorkflowState = table.Column<int>(type: "int", nullable: true),
                    ApprovalStatus = table.Column<int>(type: "int", nullable: true),
                    BudgetAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BudgetAllocationAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false, defaultValue: 0m),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false, defaultValue: 0m),
                    PlanStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PlanEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompletionCertificateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyId = table.Column<long>(type: "bigint", nullable: true),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Companys_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companys",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Projects_Projects_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LevelSetupDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UOMId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UOMName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QualityStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QualityRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReceiverStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReceiverRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeaderId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LevelSetupDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LevelSetupDetails_LevelSetup_HeaderId",
                        column: x => x.HeaderId,
                        principalTable: "LevelSetup",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RsDaags",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RsDaagNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RsKhatian = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LrNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LrKhatian = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RsParcha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcernArea = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MouzaId = table.Column<long>(type: "bigint", nullable: true),
                    MouzaName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RsDaags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RsDaags_Mouzas_MouzaId",
                        column: x => x.MouzaId,
                        principalTable: "Mouzas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FlatTemplateDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlatTemplateId = table.Column<long>(type: "bigint", nullable: false),
                    RoomId = table.Column<long>(type: "bigint", nullable: true),
                    RoomCount = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlatTemplateDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlatTemplateDetails_FlatTemplates_FlatTemplateId",
                        column: x => x.FlatTemplateId,
                        principalTable: "FlatTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlatTemplateDetails_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivityResourceReports",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnitCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    UOMId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityResourceReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityResourceReports_Uoms_UOMId",
                        column: x => x.UOMId,
                        principalTable: "Uoms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UomId = table.Column<long>(type: "bigint", nullable: true),
                    UomName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeId = table.Column<long>(type: "bigint", nullable: false),
                    TypeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupId = table.Column<long>(type: "bigint", nullable: true),
                    GroupName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assets_AssetGroups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "AssetGroups",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Assets_AssetTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "AssetTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assets_Uoms_UomId",
                        column: x => x.UomId,
                        principalTable: "Uoms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProjectDocNoTrackings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: true),
                    LastDocumentNo = table.Column<int>(type: "int", nullable: false),
                    LastDocumentNoGenerated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDocNoTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectDocNoTrackings_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NameMasters",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LLName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FatherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FatherStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FatherCertificate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MotherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MotherStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MotherCertificate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrandFatherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrandFatherStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrandFatherCertificate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrandMotherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrandMotherStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrandMotherCertificate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LrNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MouzaId = table.Column<long>(type: "bigint", nullable: true),
                    MouzaName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RsDaagId = table.Column<long>(type: "bigint", nullable: true),
                    RsDaagNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NameMasters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NameMasters_Mouzas_MouzaId",
                        column: x => x.MouzaId,
                        principalTable: "Mouzas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NameMasters_RsDaags_RsDaagId",
                        column: x => x.RsDaagId,
                        principalTable: "RsDaags",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DependencyResources",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnitCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AssetId = table.Column<long>(type: "bigint", nullable: true),
                    DependencyId = table.Column<long>(type: "bigint", nullable: true),
                    UOMId = table.Column<long>(type: "bigint", nullable: true),
                    NotifyBefore = table.Column<int>(type: "int", nullable: true),
                    AvailabilityStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssignedUser = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DependencyResources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DependencyResources_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DependencyResources_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DependencyResources_Dependencies_DependencyId",
                        column: x => x.DependencyId,
                        principalTable: "Dependencies",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DependencyResources_Uoms_UOMId",
                        column: x => x.UOMId,
                        principalTable: "Uoms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsSubSubType = table.Column<bool>(type: "bit", nullable: true),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DocumentLinks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<long>(type: "bigint", nullable: true),
                    CuringDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsCuringDone = table.Column<bool>(type: "bit", nullable: true),
                    IsCancelled = table.Column<bool>(type: "bit", nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: true),
                    IsOnHold = table.Column<bool>(type: "bit", nullable: true),
                    IsAbandoned = table.Column<bool>(type: "bit", nullable: true),
                    IsQCApproved = table.Column<bool>(type: "bit", nullable: true),
                    QCApprovedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    QCApprovedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QCRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsApproved = table.Column<bool>(type: "bit", nullable: true),
                    ApprovedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ApprovedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HODRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActualItems = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PriorityStatus = table.Column<int>(type: "int", nullable: true),
                    WorkflowState = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApprovalStatus = table.Column<int>(type: "int", nullable: true),
                    CostEstimate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ActualCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    ProgressPercentage = table.Column<int>(type: "int", nullable: false),
                    Items = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActualStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkflowId = table.Column<long>(type: "bigint", nullable: true),
                    TowerId = table.Column<long>(type: "bigint", nullable: true),
                    FloorId = table.Column<long>(type: "bigint", nullable: true),
                    FlatId = table.Column<long>(type: "bigint", nullable: true),
                    ContractorId = table.Column<long>(type: "bigint", nullable: true),
                    LabourProvidedBy = table.Column<long>(type: "bigint", nullable: true),
                    MaterialProvidedBy = table.Column<long>(type: "bigint", nullable: true),
                    DependencyId = table.Column<long>(type: "bigint", nullable: true),
                    AmendmentId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Activities_Activities_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_ActivityAmendment_AmendmentId",
                        column: x => x.AmendmentId,
                        principalTable: "ActivityAmendment",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Contractors_ContractorId",
                        column: x => x.ContractorId,
                        principalTable: "Contractors",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Contractors_LabourProvidedBy",
                        column: x => x.LabourProvidedBy,
                        principalTable: "Contractors",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Contractors_MaterialProvidedBy",
                        column: x => x.MaterialProvidedBy,
                        principalTable: "Contractors",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Dependencies_DependencyId",
                        column: x => x.DependencyId,
                        principalTable: "Dependencies",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivityResources",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnitCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AssetId = table.Column<long>(type: "bigint", nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    UOMId = table.Column<long>(type: "bigint", nullable: true),
                    NotificationStartDate = table.Column<DateOnly>(type: "date", nullable: true),
                    AvailabilityStatus = table.Column<int>(type: "int", nullable: true),
                    AssignedUser = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityResources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityResources_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityResources_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityResources_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityResources_Uoms_UOMId",
                        column: x => x.UOMId,
                        principalTable: "Uoms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivityTrackings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ManPower = table.Column<int>(type: "int", nullable: true),
                    IsOnHold = table.Column<bool>(type: "bit", nullable: true),
                    IsCancelled = table.Column<bool>(type: "bit", nullable: true),
                    IsCuringDone = table.Column<bool>(type: "bit", nullable: true),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Item = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTrackings_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Parkings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: true),
                    TowerId = table.Column<long>(type: "bigint", nullable: true),
                    ParkingTypeId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parkings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Parkings_ParkingTypes_ParkingTypeId",
                        column: x => x.ParkingTypeId,
                        principalTable: "ParkingTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Parkings_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Blueprint = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MarkerJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PriorityStatus = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    State = table.Column<int>(type: "int", nullable: true),
                    ApprovalStatus = table.Column<int>(type: "int", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BudgetAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BudgetAllocationAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false, defaultValue: 0m),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false, defaultValue: 0m),
                    PlanStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PlanEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompletionCertificateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FlatTemplateId = table.Column<long>(type: "bigint", nullable: true),
                    FlatTemplateDetailsId = table.Column<long>(type: "bigint", nullable: true),
                    UnitOfWorkId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Plans_FlatTemplateDetails_FlatTemplateDetailsId",
                        column: x => x.FlatTemplateDetailsId,
                        principalTable: "FlatTemplateDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Plans_FlatTemplates_FlatTemplateId",
                        column: x => x.FlatTemplateId,
                        principalTable: "FlatTemplates",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Plans_Plans_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Plans_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Resources",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RoomId = table.Column<long>(type: "bigint", nullable: true),
                    AssetId = table.Column<long>(type: "bigint", nullable: true),
                    PlanId = table.Column<long>(type: "bigint", nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Resources_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Resources_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Resources_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Resources_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UnitOfWorks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MarkerJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    PlanId = table.Column<long>(type: "bigint", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnitOfWorks_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UnitOfWorks_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UnitOfWorks_UnitOfWorks_ParentId",
                        column: x => x.ParentId,
                        principalTable: "UnitOfWorks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Workflows",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: true),
                    ProjectName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TowerId = table.Column<long>(type: "bigint", nullable: true),
                    FloorId = table.Column<long>(type: "bigint", nullable: true),
                    FlatId = table.Column<long>(type: "bigint", nullable: true),
                    FlatTemplateId = table.Column<long>(type: "bigint", nullable: true),
                    RoomId = table.Column<long>(type: "bigint", nullable: true),
                    FlatTemplateDetailsId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workflows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workflows_FlatTemplateDetails_FlatTemplateDetailsId",
                        column: x => x.FlatTemplateDetailsId,
                        principalTable: "FlatTemplateDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Workflows_FlatTemplates_FlatTemplateId",
                        column: x => x.FlatTemplateId,
                        principalTable: "FlatTemplates",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Workflows_Plans_FlatId",
                        column: x => x.FlatId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Workflows_Plans_FloorId",
                        column: x => x.FloorId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Workflows_Plans_TowerId",
                        column: x => x.TowerId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Workflows_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Workflows_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "ApplicationLogs",
                columns: new[] { "Id", "ActivityType", "ContentHistory", "Date", "EntityId", "Key", "Member", "Name", "Status" },
                values: new object[,]
                {
                    { 1L, 0, null, new DateTime(2026, 1, 6, 18, 11, 44, 666, DateTimeKind.Utc).AddTicks(7648), 1L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Company", 0 },
                    { 2L, 0, null, new DateTime(2026, 1, 6, 18, 11, 44, 666, DateTimeKind.Utc).AddTicks(7652), 1L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Department", 0 },
                    { 3L, 0, null, new DateTime(2026, 1, 6, 18, 11, 44, 666, DateTimeKind.Utc).AddTicks(7654), 2L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Department", 0 }
                });

            migrationBuilder.InsertData(
                table: "AssetTypes",
                columns: new[] { "Id", "Code", "Date", "Key", "Member", "Name", "Status" },
                values: new object[,]
                {
                    { 1L, "FA", new DateTime(2026, 1, 6, 18, 11, 44, 666, DateTimeKind.Utc).AddTicks(7683), "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Fixed Asset", 0 },
                    { 2L, "CB", new DateTime(2026, 1, 6, 18, 11, 44, 666, DateTimeKind.Utc).AddTicks(7685), "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Consumption Base", 0 },
                    { 3L, "SA", new DateTime(2026, 1, 6, 18, 11, 44, 666, DateTimeKind.Utc).AddTicks(7687), "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Service Assets", 0 }
                });

            migrationBuilder.InsertData(
                table: "Companys",
                columns: new[] { "Id", "Address1", "Address2", "Address3", "BelongTo", "City", "Code", "ContactName", "Country", "Currency", "Date", "Email", "GSTNo", "Key", "Latitude", "Logo", "Longitude", "Member", "Name", "PanNo", "ParentId", "PhoneNumber", "PinCode", "QrCode", "State", "Status", "TinNo", "Type", "Website", "Zone" },
                values: new object[] { 1L, null, null, null, null, null, "RE", null, null, null, new DateTime(2026, 1, 6, 18, 11, 44, 666, DateTimeKind.Utc).AddTicks(7457), null, null, "1536B022-C5C9-4358-BB6A-466F2075B7D4", null, null, null, "super@rajwada.com", "Rajwara", null, null, null, null, null, null, 0, null, "Enterprise", null, null });

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "Id", "Code", "Date", "Key", "Member", "Name", "Status" },
                values: new object[,]
                {
                    { 1L, "CI", new DateTime(2026, 1, 6, 18, 11, 44, 666, DateTimeKind.Utc).AddTicks(7597), "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Civil", 0 },
                    { 2L, "LE", new DateTime(2026, 1, 6, 18, 11, 44, 666, DateTimeKind.Utc).AddTicks(7600), "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Legal", 0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_AmendmentId",
                table: "Activities",
                column: "AmendmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ContractorId",
                table: "Activities",
                column: "ContractorId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_DependencyId",
                table: "Activities",
                column: "DependencyId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_FlatId",
                table: "Activities",
                column: "FlatId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_FloorId",
                table: "Activities",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_LabourProvidedBy",
                table: "Activities",
                column: "LabourProvidedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_MaterialProvidedBy",
                table: "Activities",
                column: "MaterialProvidedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ParentId",
                table: "Activities",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ProjectId",
                table: "Activities",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_TowerId",
                table: "Activities",
                column: "TowerId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_WorkflowId",
                table: "Activities",
                column: "WorkflowId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityAmendment_ParentId",
                table: "ActivityAmendment",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResourceReports_UOMId",
                table: "ActivityResourceReports",
                column: "UOMId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResources_ActivityId",
                table: "ActivityResources",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResources_AssetId",
                table: "ActivityResources",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResources_DepartmentId",
                table: "ActivityResources",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResources_UOMId",
                table: "ActivityResources",
                column: "UOMId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrackings_ActivityId",
                table: "ActivityTrackings",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_GroupId",
                table: "Assets",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_TypeId",
                table: "Assets",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_UomId",
                table: "Assets",
                column: "UomId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ActivityId",
                table: "Comments",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Companys_ParentId",
                table: "Companys",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_BelongsTo",
                table: "Dependencies",
                column: "BelongsTo");

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_ParentId",
                table: "Dependencies",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_DependencyResources_AssetId",
                table: "DependencyResources",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_DependencyResources_DepartmentId",
                table: "DependencyResources",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_DependencyResources_DependencyId",
                table: "DependencyResources",
                column: "DependencyId");

            migrationBuilder.CreateIndex(
                name: "IX_DependencyResources_UOMId",
                table: "DependencyResources",
                column: "UOMId");

            migrationBuilder.CreateIndex(
                name: "IX_FlatTemplateDetails_FlatTemplateId",
                table: "FlatTemplateDetails",
                column: "FlatTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_FlatTemplateDetails_RoomId",
                table: "FlatTemplateDetails",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_LevelSetupDetails_HeaderId",
                table: "LevelSetupDetails",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_NameMasters_MouzaId",
                table: "NameMasters",
                column: "MouzaId");

            migrationBuilder.CreateIndex(
                name: "IX_NameMasters_RsDaagId",
                table: "NameMasters",
                column: "RsDaagId");

            migrationBuilder.CreateIndex(
                name: "IX_Parkings_ParkingTypeId",
                table: "Parkings",
                column: "ParkingTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Parkings_ProjectId",
                table: "Parkings",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Parkings_TowerId",
                table: "Parkings",
                column: "TowerId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_FlatTemplateDetailsId",
                table: "Plans",
                column: "FlatTemplateDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_FlatTemplateId",
                table: "Plans",
                column: "FlatTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_ParentId",
                table: "Plans",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_ProjectId",
                table: "Plans",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_UnitOfWorkId",
                table: "Plans",
                column: "UnitOfWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDocNoTrackings_ProjectId",
                table: "ProjectDocNoTrackings",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_CompanyId",
                table: "Projects",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ParentId",
                table: "Projects",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_ActivityId",
                table: "Resources",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_AssetId",
                table: "Resources",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_PlanId",
                table: "Resources",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_RoomId",
                table: "Resources",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_RsDaags_MouzaId",
                table: "RsDaags",
                column: "MouzaId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfWorks_ActivityId",
                table: "UnitOfWorks",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfWorks_ParentId",
                table: "UnitOfWorks",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfWorks_PlanId",
                table: "UnitOfWorks",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_FlatId",
                table: "Workflows",
                column: "FlatId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_FlatTemplateDetailsId",
                table: "Workflows",
                column: "FlatTemplateDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_FlatTemplateId",
                table: "Workflows",
                column: "FlatTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_FloorId",
                table: "Workflows",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_ProjectId",
                table: "Workflows",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_RoomId",
                table: "Workflows",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_TowerId",
                table: "Workflows",
                column: "TowerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Plans_FlatId",
                table: "Activities",
                column: "FlatId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Plans_FloorId",
                table: "Activities",
                column: "FloorId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Plans_TowerId",
                table: "Activities",
                column: "TowerId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Workflows_WorkflowId",
                table: "Activities",
                column: "WorkflowId",
                principalTable: "Workflows",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Parkings_Plans_TowerId",
                table: "Parkings",
                column: "TowerId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_UnitOfWorks_UnitOfWorkId",
                table: "Plans",
                column: "UnitOfWorkId",
                principalTable: "UnitOfWorks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_ActivityAmendment_AmendmentId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Contractors_ContractorId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Contractors_LabourProvidedBy",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Contractors_MaterialProvidedBy",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Dependencies_DependencyId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Plans_FlatId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Plans_FloorId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Plans_TowerId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_UnitOfWorks_Plans_PlanId",
                table: "UnitOfWorks");

            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Plans_FlatId",
                table: "Workflows");

            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Plans_FloorId",
                table: "Workflows");

            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Plans_TowerId",
                table: "Workflows");

            migrationBuilder.DropTable(
                name: "ActivityResourceReports");

            migrationBuilder.DropTable(
                name: "ActivityResources");

            migrationBuilder.DropTable(
                name: "ActivityTrackings");

            migrationBuilder.DropTable(
                name: "ApplicationLogs");

            migrationBuilder.DropTable(
                name: "Attachments");

            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "DependencyResources");

            migrationBuilder.DropTable(
                name: "FinancialYears");

            migrationBuilder.DropTable(
                name: "LevelSetupDetails");

            migrationBuilder.DropTable(
                name: "NameMasters");

            migrationBuilder.DropTable(
                name: "Parkings");

            migrationBuilder.DropTable(
                name: "PostWorkPeriodicCheckings");

            migrationBuilder.DropTable(
                name: "ProjectDocNoTrackings");

            migrationBuilder.DropTable(
                name: "Resources");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "WorkCheckpoints");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "LevelSetup");

            migrationBuilder.DropTable(
                name: "RsDaags");

            migrationBuilder.DropTable(
                name: "ParkingTypes");

            migrationBuilder.DropTable(
                name: "Assets");

            migrationBuilder.DropTable(
                name: "Mouzas");

            migrationBuilder.DropTable(
                name: "AssetGroups");

            migrationBuilder.DropTable(
                name: "AssetTypes");

            migrationBuilder.DropTable(
                name: "Uoms");

            migrationBuilder.DropTable(
                name: "ActivityAmendment");

            migrationBuilder.DropTable(
                name: "Contractors");

            migrationBuilder.DropTable(
                name: "Dependencies");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "UnitOfWorks");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropTable(
                name: "Workflows");

            migrationBuilder.DropTable(
                name: "FlatTemplateDetails");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "FlatTemplates");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Companys");
        }
    }
}
