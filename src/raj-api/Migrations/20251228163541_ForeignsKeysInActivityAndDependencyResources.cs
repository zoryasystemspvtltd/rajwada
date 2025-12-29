using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class ForeignsKeysInActivityAndDependencyResources : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DependencyId",
                table: "DependencyResources",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ActivityId",
                table: "ActivityResources",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 28, 16, 35, 37, 967, DateTimeKind.Utc).AddTicks(2927));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 28, 16, 35, 37, 967, DateTimeKind.Utc).AddTicks(2932));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 28, 16, 35, 37, 967, DateTimeKind.Utc).AddTicks(2935));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 28, 16, 35, 37, 967, DateTimeKind.Utc).AddTicks(2972));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 28, 16, 35, 37, 967, DateTimeKind.Utc).AddTicks(2975));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 28, 16, 35, 37, 967, DateTimeKind.Utc).AddTicks(2977));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 28, 16, 35, 37, 967, DateTimeKind.Utc).AddTicks(2630));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 28, 16, 35, 37, 967, DateTimeKind.Utc).AddTicks(2843));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 28, 16, 35, 37, 967, DateTimeKind.Utc).AddTicks(2847));

            migrationBuilder.CreateIndex(
                name: "IX_DependencyResources_DependencyId",
                table: "DependencyResources",
                column: "DependencyId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResources_ActivityId",
                table: "ActivityResources",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityResources_Activities_ActivityId",
                table: "ActivityResources",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DependencyResources_Dependencies_DependencyId",
                table: "DependencyResources",
                column: "DependencyId",
                principalTable: "Dependencies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityResources_Activities_ActivityId",
                table: "ActivityResources");

            migrationBuilder.DropForeignKey(
                name: "FK_DependencyResources_Dependencies_DependencyId",
                table: "DependencyResources");

            migrationBuilder.DropIndex(
                name: "IX_DependencyResources_DependencyId",
                table: "DependencyResources");

            migrationBuilder.DropIndex(
                name: "IX_ActivityResources_ActivityId",
                table: "ActivityResources");

            migrationBuilder.DropColumn(
                name: "DependencyId",
                table: "DependencyResources");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "ActivityResources");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2263));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2266));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2269));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2297));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2299));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2302));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2003));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2203));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2206));
        }
    }
}
