using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class workcheckpointmapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkCheckPointMappings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkCheckPointId = table.Column<long>(type: "bigint", nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkCheckPointMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkCheckPointMappings_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkCheckPointMappings_WorkCheckpoints_WorkCheckPointId",
                        column: x => x.WorkCheckPointId,
                        principalTable: "WorkCheckpoints",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkCheckPointTrackings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkCheckPointId = table.Column<long>(type: "bigint", nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkCheckPointTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkCheckPointTrackings_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkCheckPointTrackings_WorkCheckpoints_WorkCheckPointId",
                        column: x => x.WorkCheckPointId,
                        principalTable: "WorkCheckpoints",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 9, 14, 13, 19, 304, DateTimeKind.Utc).AddTicks(4079));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 4, 9, 14, 13, 19, 304, DateTimeKind.Utc).AddTicks(4083));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 4, 9, 14, 13, 19, 304, DateTimeKind.Utc).AddTicks(4085));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 9, 14, 13, 19, 304, DateTimeKind.Utc).AddTicks(4122));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 4, 9, 14, 13, 19, 304, DateTimeKind.Utc).AddTicks(4125));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 4, 9, 14, 13, 19, 304, DateTimeKind.Utc).AddTicks(4127));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 9, 14, 13, 19, 304, DateTimeKind.Utc).AddTicks(3780));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 9, 14, 13, 19, 304, DateTimeKind.Utc).AddTicks(4035));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 4, 9, 14, 13, 19, 304, DateTimeKind.Utc).AddTicks(4039));

            migrationBuilder.CreateIndex(
                name: "IX_WorkCheckPointMappings_ActivityId",
                table: "WorkCheckPointMappings",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkCheckPointMappings_WorkCheckPointId",
                table: "WorkCheckPointMappings",
                column: "WorkCheckPointId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkCheckPointTrackings_ActivityId",
                table: "WorkCheckPointTrackings",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkCheckPointTrackings_WorkCheckPointId",
                table: "WorkCheckPointTrackings",
                column: "WorkCheckPointId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkCheckPointMappings");

            migrationBuilder.DropTable(
                name: "WorkCheckPointTrackings");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 16, 11, 26, 10, 606, DateTimeKind.Utc).AddTicks(435));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 16, 11, 26, 10, 606, DateTimeKind.Utc).AddTicks(439));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 16, 11, 26, 10, 606, DateTimeKind.Utc).AddTicks(441));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 16, 11, 26, 10, 606, DateTimeKind.Utc).AddTicks(501));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 16, 11, 26, 10, 606, DateTimeKind.Utc).AddTicks(503));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 16, 11, 26, 10, 606, DateTimeKind.Utc).AddTicks(506));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 16, 11, 26, 10, 606, DateTimeKind.Utc).AddTicks(177));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 16, 11, 26, 10, 606, DateTimeKind.Utc).AddTicks(391));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 16, 11, 26, 10, 606, DateTimeKind.Utc).AddTicks(395));
        }
    }
}
