using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class projectIdFieldForWorkflow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ProjectId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectName",
                table: "Workflows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 30, 18, 14, 57, 128, DateTimeKind.Utc).AddTicks(8732));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 30, 18, 14, 57, 128, DateTimeKind.Utc).AddTicks(8736));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 30, 18, 14, 57, 128, DateTimeKind.Utc).AddTicks(8738));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 30, 18, 14, 57, 128, DateTimeKind.Utc).AddTicks(8766));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 30, 18, 14, 57, 128, DateTimeKind.Utc).AddTicks(8768));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 30, 18, 14, 57, 128, DateTimeKind.Utc).AddTicks(8770));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 30, 18, 14, 57, 128, DateTimeKind.Utc).AddTicks(8558));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 30, 18, 14, 57, 128, DateTimeKind.Utc).AddTicks(8704));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 30, 18, 14, 57, 128, DateTimeKind.Utc).AddTicks(8706));

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_ProjectId",
                table: "Workflows",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_Projects_ProjectId",
                table: "Workflows",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Projects_ProjectId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_ProjectId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "ProjectName",
                table: "Workflows");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 16, 14, 51, 0, 168, DateTimeKind.Utc).AddTicks(37));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 16, 14, 51, 0, 168, DateTimeKind.Utc).AddTicks(41));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 16, 14, 51, 0, 168, DateTimeKind.Utc).AddTicks(43));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 16, 14, 51, 0, 168, DateTimeKind.Utc).AddTicks(71));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 16, 14, 51, 0, 168, DateTimeKind.Utc).AddTicks(73));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 16, 14, 51, 0, 168, DateTimeKind.Utc).AddTicks(75));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 16, 14, 51, 0, 167, DateTimeKind.Utc).AddTicks(9812));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 16, 14, 51, 0, 168, DateTimeKind.Utc).AddTicks(8));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 16, 14, 51, 0, 168, DateTimeKind.Utc).AddTicks(11));
        }
    }
}
