using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class WorkcheckpointTracking_fk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ActivityTrackingId",
                table: "WorkCheckPointTrackings",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7023));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7026));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7029));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7063));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7066));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7068));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(6810));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(6986));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(6989));

            migrationBuilder.CreateIndex(
                name: "IX_WorkCheckPointTrackings_ActivityTrackingId",
                table: "WorkCheckPointTrackings",
                column: "ActivityTrackingId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkCheckPointTrackings_ActivityTrackings_ActivityTrackingId",
                table: "WorkCheckPointTrackings",
                column: "ActivityTrackingId",
                principalTable: "ActivityTrackings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkCheckPointTrackings_ActivityTrackings_ActivityTrackingId",
                table: "WorkCheckPointTrackings");

            migrationBuilder.DropIndex(
                name: "IX_WorkCheckPointTrackings_ActivityTrackingId",
                table: "WorkCheckPointTrackings");

            migrationBuilder.DropColumn(
                name: "ActivityTrackingId",
                table: "WorkCheckPointTrackings");

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
        }
    }
}
