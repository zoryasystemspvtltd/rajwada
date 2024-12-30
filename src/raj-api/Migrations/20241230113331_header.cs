using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class header : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LevelSetupDetails_LevelSetupMaster_LevelSetupMasterId",
                table: "LevelSetupDetails");

            migrationBuilder.RenameColumn(
                name: "LevelSetupMasterId",
                table: "LevelSetupDetails",
                newName: "HeaderId");

            migrationBuilder.RenameIndex(
                name: "IX_LevelSetupDetails_LevelSetupMasterId",
                table: "LevelSetupDetails",
                newName: "IX_LevelSetupDetails_HeaderId");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "LevelSetupDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Key",
                table: "LevelSetupDetails",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Member",
                table: "LevelSetupDetails",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "LevelSetupDetails",
                type: "nvarchar(511)",
                maxLength: 511,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "LevelSetupDetails",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 33, 29, 621, DateTimeKind.Utc).AddTicks(6561));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 33, 29, 621, DateTimeKind.Utc).AddTicks(6565));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 33, 29, 621, DateTimeKind.Utc).AddTicks(6567));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 33, 29, 621, DateTimeKind.Utc).AddTicks(6606));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 33, 29, 621, DateTimeKind.Utc).AddTicks(6608));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 33, 29, 621, DateTimeKind.Utc).AddTicks(6611));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 33, 29, 621, DateTimeKind.Utc).AddTicks(6184));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 33, 29, 621, DateTimeKind.Utc).AddTicks(6516));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 33, 29, 621, DateTimeKind.Utc).AddTicks(6521));

            migrationBuilder.AddForeignKey(
                name: "FK_LevelSetupDetails_LevelSetupMaster_HeaderId",
                table: "LevelSetupDetails",
                column: "HeaderId",
                principalTable: "LevelSetupMaster",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LevelSetupDetails_LevelSetupMaster_HeaderId",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "Key",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "Member",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "LevelSetupDetails");

            migrationBuilder.RenameColumn(
                name: "HeaderId",
                table: "LevelSetupDetails",
                newName: "LevelSetupMasterId");

            migrationBuilder.RenameIndex(
                name: "IX_LevelSetupDetails_HeaderId",
                table: "LevelSetupDetails",
                newName: "IX_LevelSetupDetails_LevelSetupMasterId");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 10, 32, 23, 251, DateTimeKind.Utc).AddTicks(3400));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 10, 32, 23, 251, DateTimeKind.Utc).AddTicks(3403));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 10, 32, 23, 251, DateTimeKind.Utc).AddTicks(3406));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 10, 32, 23, 251, DateTimeKind.Utc).AddTicks(3510));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 10, 32, 23, 251, DateTimeKind.Utc).AddTicks(3512));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 10, 32, 23, 251, DateTimeKind.Utc).AddTicks(3515));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 10, 32, 23, 251, DateTimeKind.Utc).AddTicks(3048));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 10, 32, 23, 251, DateTimeKind.Utc).AddTicks(3360));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 10, 32, 23, 251, DateTimeKind.Utc).AddTicks(3363));

            migrationBuilder.AddForeignKey(
                name: "FK_LevelSetupDetails_LevelSetupMaster_LevelSetupMasterId",
                table: "LevelSetupDetails",
                column: "LevelSetupMasterId",
                principalTable: "LevelSetupMaster",
                principalColumn: "Id");
        }
    }
}
