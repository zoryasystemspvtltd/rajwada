using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class workflow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "OutSideEntityId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 10, 45, 29, 898, DateTimeKind.Utc).AddTicks(8427));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 10, 45, 29, 898, DateTimeKind.Utc).AddTicks(8434));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 10, 45, 29, 898, DateTimeKind.Utc).AddTicks(8436));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 10, 45, 29, 898, DateTimeKind.Utc).AddTicks(8483));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 10, 45, 29, 898, DateTimeKind.Utc).AddTicks(8486));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 10, 45, 29, 898, DateTimeKind.Utc).AddTicks(8488));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 10, 45, 29, 898, DateTimeKind.Utc).AddTicks(8204));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 10, 45, 29, 898, DateTimeKind.Utc).AddTicks(8381));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 10, 45, 29, 898, DateTimeKind.Utc).AddTicks(8386));

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_OutSideEntityId",
                table: "Workflows",
                column: "OutSideEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_OutSideEntities_OutSideEntityId",
                table: "Workflows",
                column: "OutSideEntityId",
                principalTable: "OutSideEntities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_OutSideEntities_OutSideEntityId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_OutSideEntityId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "OutSideEntityId",
                table: "Workflows");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5721));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5726));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5728));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5771));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5773));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5775));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5445));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5662));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5666));
        }
    }
}
