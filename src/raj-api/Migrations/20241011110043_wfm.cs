using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class wfm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlanStartDate",
                table: "Workflows",
                newName: "WorkflowStartDate");

            migrationBuilder.RenameColumn(
                name: "PlanEndDate",
                table: "Workflows",
                newName: "WorkflowEndDate");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1407));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1414));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1420));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1492));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1498));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1503));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(771));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1262));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1270));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WorkflowStartDate",
                table: "Workflows",
                newName: "PlanStartDate");

            migrationBuilder.RenameColumn(
                name: "WorkflowEndDate",
                table: "Workflows",
                newName: "PlanEndDate");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 10, 50, 29, 988, DateTimeKind.Utc).AddTicks(3208));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 10, 50, 29, 988, DateTimeKind.Utc).AddTicks(3216));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 10, 50, 29, 988, DateTimeKind.Utc).AddTicks(3221));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 10, 50, 29, 988, DateTimeKind.Utc).AddTicks(3307));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 10, 50, 29, 988, DateTimeKind.Utc).AddTicks(3313));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 10, 50, 29, 988, DateTimeKind.Utc).AddTicks(3318));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 10, 50, 29, 988, DateTimeKind.Utc).AddTicks(774));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 10, 50, 29, 988, DateTimeKind.Utc).AddTicks(3103));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 10, 50, 29, 988, DateTimeKind.Utc).AddTicks(3113));
        }
    }
}
