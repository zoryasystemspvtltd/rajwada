using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class FKForAssetInActAndDependResource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AssetId",
                table: "DependencyResources",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "AssetId",
                table: "ActivityResources",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1479));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1488));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1494));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1556));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1561));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1566));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1092));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1397));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1403));

            migrationBuilder.CreateIndex(
                name: "IX_DependencyResources_AssetId",
                table: "DependencyResources",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResources_AssetId",
                table: "ActivityResources",
                column: "AssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityResources_Assets_AssetId",
                table: "ActivityResources",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DependencyResources_Assets_AssetId",
                table: "DependencyResources",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityResources_Assets_AssetId",
                table: "ActivityResources");

            migrationBuilder.DropForeignKey(
                name: "FK_DependencyResources_Assets_AssetId",
                table: "DependencyResources");

            migrationBuilder.DropIndex(
                name: "IX_DependencyResources_AssetId",
                table: "DependencyResources");

            migrationBuilder.DropIndex(
                name: "IX_ActivityResources_AssetId",
                table: "ActivityResources");

            migrationBuilder.DropColumn(
                name: "AssetId",
                table: "DependencyResources");

            migrationBuilder.DropColumn(
                name: "AssetId",
                table: "ActivityResources");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 14, 17, 12, 685, DateTimeKind.Utc).AddTicks(273));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 14, 17, 12, 685, DateTimeKind.Utc).AddTicks(278));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 14, 17, 12, 685, DateTimeKind.Utc).AddTicks(280));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 14, 17, 12, 685, DateTimeKind.Utc).AddTicks(319));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 14, 17, 12, 685, DateTimeKind.Utc).AddTicks(322));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 14, 17, 12, 685, DateTimeKind.Utc).AddTicks(325));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 14, 17, 12, 685, DateTimeKind.Utc).AddTicks(45));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 14, 17, 12, 685, DateTimeKind.Utc).AddTicks(213));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 14, 17, 12, 685, DateTimeKind.Utc).AddTicks(216));
        }
    }
}
