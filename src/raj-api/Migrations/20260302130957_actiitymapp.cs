using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class actiitymapp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "OutSideEntityId",
                table: "ActivityTrackings",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "OutSideEntityId",
                table: "ActivityResources",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "OutSideEntityId",
                table: "ActivityResourceReports",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 9, 55, 883, DateTimeKind.Utc).AddTicks(8615));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 9, 55, 883, DateTimeKind.Utc).AddTicks(8618));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 9, 55, 883, DateTimeKind.Utc).AddTicks(8620));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 9, 55, 883, DateTimeKind.Utc).AddTicks(8660));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 9, 55, 883, DateTimeKind.Utc).AddTicks(8662));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 9, 55, 883, DateTimeKind.Utc).AddTicks(8664));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 9, 55, 883, DateTimeKind.Utc).AddTicks(8350));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 9, 55, 883, DateTimeKind.Utc).AddTicks(8555));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 13, 9, 55, 883, DateTimeKind.Utc).AddTicks(8560));

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrackings_OutSideEntityId",
                table: "ActivityTrackings",
                column: "OutSideEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResources_OutSideEntityId",
                table: "ActivityResources",
                column: "OutSideEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResourceReports_OutSideEntityId",
                table: "ActivityResourceReports",
                column: "OutSideEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityResourceReports_OutSideEntities_OutSideEntityId",
                table: "ActivityResourceReports",
                column: "OutSideEntityId",
                principalTable: "OutSideEntities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityResources_OutSideEntities_OutSideEntityId",
                table: "ActivityResources",
                column: "OutSideEntityId",
                principalTable: "OutSideEntities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityTrackings_OutSideEntities_OutSideEntityId",
                table: "ActivityTrackings",
                column: "OutSideEntityId",
                principalTable: "OutSideEntities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityResourceReports_OutSideEntities_OutSideEntityId",
                table: "ActivityResourceReports");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityResources_OutSideEntities_OutSideEntityId",
                table: "ActivityResources");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityTrackings_OutSideEntities_OutSideEntityId",
                table: "ActivityTrackings");

            migrationBuilder.DropIndex(
                name: "IX_ActivityTrackings_OutSideEntityId",
                table: "ActivityTrackings");

            migrationBuilder.DropIndex(
                name: "IX_ActivityResources_OutSideEntityId",
                table: "ActivityResources");

            migrationBuilder.DropIndex(
                name: "IX_ActivityResourceReports_OutSideEntityId",
                table: "ActivityResourceReports");

            migrationBuilder.DropColumn(
                name: "OutSideEntityId",
                table: "ActivityTrackings");

            migrationBuilder.DropColumn(
                name: "OutSideEntityId",
                table: "ActivityResources");

            migrationBuilder.DropColumn(
                name: "OutSideEntityId",
                table: "ActivityResourceReports");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 1, 51, 48, 831, DateTimeKind.Utc).AddTicks(5024));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 1, 51, 48, 831, DateTimeKind.Utc).AddTicks(5028));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 1, 51, 48, 831, DateTimeKind.Utc).AddTicks(5031));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 1, 51, 48, 831, DateTimeKind.Utc).AddTicks(5084));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 1, 51, 48, 831, DateTimeKind.Utc).AddTicks(5086));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 1, 51, 48, 831, DateTimeKind.Utc).AddTicks(5088));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 1, 51, 48, 831, DateTimeKind.Utc).AddTicks(4530));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 1, 51, 48, 831, DateTimeKind.Utc).AddTicks(4980));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 2, 1, 51, 48, 831, DateTimeKind.Utc).AddTicks(4984));
        }
    }
}
