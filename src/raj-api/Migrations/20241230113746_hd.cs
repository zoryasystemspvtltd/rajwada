using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class hd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LevelSetupDetails_LevelSetupMaster_HeaderId",
                table: "LevelSetupDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LevelSetupMaster",
                table: "LevelSetupMaster");

            migrationBuilder.RenameTable(
                name: "LevelSetupMaster",
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
                value: new DateTime(2024, 12, 30, 11, 37, 43, 949, DateTimeKind.Utc).AddTicks(7919));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 37, 43, 949, DateTimeKind.Utc).AddTicks(7923));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 37, 43, 949, DateTimeKind.Utc).AddTicks(7926));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 37, 43, 949, DateTimeKind.Utc).AddTicks(7982));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 37, 43, 949, DateTimeKind.Utc).AddTicks(7985));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 37, 43, 949, DateTimeKind.Utc).AddTicks(7988));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 37, 43, 949, DateTimeKind.Utc).AddTicks(7343));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 37, 43, 949, DateTimeKind.Utc).AddTicks(7850));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 37, 43, 949, DateTimeKind.Utc).AddTicks(7854));

            migrationBuilder.AddForeignKey(
                name: "FK_LevelSetupDetails_LevelSetupHeader_HeaderId",
                table: "LevelSetupDetails",
                column: "HeaderId",
                principalTable: "LevelSetupHeader",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LevelSetupDetails_LevelSetupHeader_HeaderId",
                table: "LevelSetupDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LevelSetupHeader",
                table: "LevelSetupHeader");

            migrationBuilder.RenameTable(
                name: "LevelSetupHeader",
                newName: "LevelSetupMaster");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LevelSetupMaster",
                table: "LevelSetupMaster",
                column: "Id");

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
    }
}
