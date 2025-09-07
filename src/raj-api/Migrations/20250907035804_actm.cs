using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class actm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Workflows_DependencyId",
                table: "Activities");

            migrationBuilder.RenameColumn(
                name: "DependencyId",
                table: "Activities",
                newName: "WorkflowId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_DependencyId",
                table: "Activities",
                newName: "IX_Activities_WorkflowId");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2830));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2834));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2837));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2868));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2871));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2874));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2514));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2763));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2766));

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Workflows_WorkflowId",
                table: "Activities",
                column: "WorkflowId",
                principalTable: "Workflows",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Workflows_WorkflowId",
                table: "Activities");

            migrationBuilder.RenameColumn(
                name: "WorkflowId",
                table: "Activities",
                newName: "DependencyId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_WorkflowId",
                table: "Activities",
                newName: "IX_Activities_DependencyId");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9010));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9013));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9062));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9106));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9109));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9111));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(8775));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(8965));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(8968));

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Workflows_DependencyId",
                table: "Activities",
                column: "DependencyId",
                principalTable: "Workflows",
                principalColumn: "Id");
        }
    }
}
