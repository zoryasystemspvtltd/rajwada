using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class workCheckpoint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PriorityStatus",
                table: "Plans",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ExpectedDuration",
                table: "Dependencies",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignedUser",
                table: "ActivityResources",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvailabilityStatus",
                table: "ActivityResources",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "NotificationStartDate",
                table: "ActivityResources",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "ActivityResources",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UOMId",
                table: "ActivityResources",
                type: "bigint",
                nullable: true);

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

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7833));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7836));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7839));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7874));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7876));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7878));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7615));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7796));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7800));

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResources_UOMId",
                table: "ActivityResources",
                column: "UOMId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityResources_Uoms_UOMId",
                table: "ActivityResources",
                column: "UOMId",
                principalTable: "Uoms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityResources_Uoms_UOMId",
                table: "ActivityResources");

            migrationBuilder.DropTable(
                name: "PostWorkPeriodicCheckings");

            migrationBuilder.DropTable(
                name: "WorkCheckpoints");

            migrationBuilder.DropIndex(
                name: "IX_ActivityResources_UOMId",
                table: "ActivityResources");

            migrationBuilder.DropColumn(
                name: "PriorityStatus",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "ExpectedDuration",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "AssignedUser",
                table: "ActivityResources");

            migrationBuilder.DropColumn(
                name: "AvailabilityStatus",
                table: "ActivityResources");

            migrationBuilder.DropColumn(
                name: "NotificationStartDate",
                table: "ActivityResources");

            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "ActivityResources");

            migrationBuilder.DropColumn(
                name: "UOMId",
                table: "ActivityResources");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7939));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7946));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7949));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7982));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7985));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7987));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7715));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7897));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7900));
        }
    }
}
