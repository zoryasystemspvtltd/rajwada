using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class extra : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LevelSetupDetails_LevelSetupHeader_HeaderId",
                table: "LevelSetupDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LevelSetupHeader",
                table: "LevelSetupHeader");

            migrationBuilder.RenameTable(
                name: "LevelSetupHeader",
                newName: "LevelSetup");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LevelSetup",
                table: "LevelSetup",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 16, 28, 46, 345, DateTimeKind.Utc).AddTicks(2823));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 16, 28, 46, 345, DateTimeKind.Utc).AddTicks(2825));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 16, 28, 46, 345, DateTimeKind.Utc).AddTicks(2827));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 16, 28, 46, 345, DateTimeKind.Utc).AddTicks(2860));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 16, 28, 46, 345, DateTimeKind.Utc).AddTicks(2862));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 16, 28, 46, 345, DateTimeKind.Utc).AddTicks(2864));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 16, 28, 46, 345, DateTimeKind.Utc).AddTicks(2585));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 16, 28, 46, 345, DateTimeKind.Utc).AddTicks(2779));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 16, 28, 46, 345, DateTimeKind.Utc).AddTicks(2782));

            migrationBuilder.AddForeignKey(
                name: "FK_LevelSetupDetails_LevelSetup_HeaderId",
                table: "LevelSetupDetails",
                column: "HeaderId",
                principalTable: "LevelSetup",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LevelSetupDetails_LevelSetup_HeaderId",
                table: "LevelSetupDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LevelSetup",
                table: "LevelSetup");

            migrationBuilder.RenameTable(
                name: "LevelSetup",
                newName: "LevelSetupHeader");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LevelSetupHeader",
                table: "LevelSetupHeader",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 15, 54, 29, 302, DateTimeKind.Utc).AddTicks(1295));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 15, 54, 29, 302, DateTimeKind.Utc).AddTicks(1301));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 15, 54, 29, 302, DateTimeKind.Utc).AddTicks(1304));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 15, 54, 29, 302, DateTimeKind.Utc).AddTicks(1340));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 15, 54, 29, 302, DateTimeKind.Utc).AddTicks(1342));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 15, 54, 29, 302, DateTimeKind.Utc).AddTicks(1344));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 15, 54, 29, 302, DateTimeKind.Utc).AddTicks(1053));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 15, 54, 29, 302, DateTimeKind.Utc).AddTicks(1251));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 15, 54, 29, 302, DateTimeKind.Utc).AddTicks(1253));

            migrationBuilder.AddForeignKey(
                name: "FK_LevelSetupDetails_LevelSetupHeader_HeaderId",
                table: "LevelSetupDetails",
                column: "HeaderId",
                principalTable: "LevelSetupHeader",
                principalColumn: "Id");
        }
    }
}
