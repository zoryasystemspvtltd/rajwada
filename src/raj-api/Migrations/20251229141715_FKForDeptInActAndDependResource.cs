using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class FKForDeptInActAndDependResource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DepartmentId",
                table: "DependencyResources",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DepartmentId",
                table: "ActivityResources",
                type: "bigint",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_DependencyResources_DepartmentId",
                table: "DependencyResources",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResources_DepartmentId",
                table: "ActivityResources",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityResources_Departments_DepartmentId",
                table: "ActivityResources",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DependencyResources_Departments_DepartmentId",
                table: "DependencyResources",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityResources_Departments_DepartmentId",
                table: "ActivityResources");

            migrationBuilder.DropForeignKey(
                name: "FK_DependencyResources_Departments_DepartmentId",
                table: "DependencyResources");

            migrationBuilder.DropIndex(
                name: "IX_DependencyResources_DepartmentId",
                table: "DependencyResources");

            migrationBuilder.DropIndex(
                name: "IX_ActivityResources_DepartmentId",
                table: "ActivityResources");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "DependencyResources");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "ActivityResources");

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
        }
    }
}
