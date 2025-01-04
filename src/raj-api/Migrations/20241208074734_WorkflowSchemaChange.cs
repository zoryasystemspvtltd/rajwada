using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class WorkflowSchemaChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FlatId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "FloorId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TowerId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4645));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4650));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4652));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4685));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4688));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4690));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4450));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4610));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4613));

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_FlatId",
                table: "Workflows",
                column: "FlatId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_FloorId",
                table: "Workflows",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_TowerId",
                table: "Workflows",
                column: "TowerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_Plans_FlatId",
                table: "Workflows",
                column: "FlatId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_Plans_FloorId",
                table: "Workflows",
                column: "FloorId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_Plans_TowerId",
                table: "Workflows",
                column: "TowerId",
                principalTable: "Plans",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Plans_FlatId",
                table: "Workflows");

            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Plans_FloorId",
                table: "Workflows");

            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Plans_TowerId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_FlatId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_FloorId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_TowerId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "FlatId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "FloorId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "TowerId",
                table: "Workflows");

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
        }
    }
}
