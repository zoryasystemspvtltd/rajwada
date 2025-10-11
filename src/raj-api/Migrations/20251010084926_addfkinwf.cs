using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class addfkinwf : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FlatTemplateDetailsId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "FlatTemplateId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "RoomId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7939));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7946));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7949));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7982));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7985));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7987));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7715));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7897));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 10, 10, 8, 49, 24, 93, DateTimeKind.Utc).AddTicks(7900));

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_FlatTemplateDetailsId",
                table: "Workflows",
                column: "FlatTemplateDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_FlatTemplateId",
                table: "Workflows",
                column: "FlatTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_RoomId",
                table: "Workflows",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_FlatTemplateDetails_FlatTemplateDetailsId",
                table: "Workflows",
                column: "FlatTemplateDetailsId",
                principalTable: "FlatTemplateDetails",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_FlatTemplates_FlatTemplateId",
                table: "Workflows",
                column: "FlatTemplateId",
                principalTable: "FlatTemplates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_Rooms_RoomId",
                table: "Workflows",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_FlatTemplateDetails_FlatTemplateDetailsId",
                table: "Workflows");

            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_FlatTemplates_FlatTemplateId",
                table: "Workflows");

            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Rooms_RoomId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_FlatTemplateDetailsId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_FlatTemplateId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_RoomId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "FlatTemplateDetailsId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "FlatTemplateId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Workflows");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5292));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5295));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5298));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5327));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5329));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5332));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5041));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5247));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5250));
        }
    }
}
