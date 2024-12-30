using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class hdc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovedBy",
                table: "LevelSetupHeader");

            migrationBuilder.DropColumn(
                name: "ApprovedDate",
                table: "LevelSetupHeader");

            migrationBuilder.RenameColumn(
                name: "supplierName",
                table: "LevelSetupHeader",
                newName: "SupplierName");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 40, 23, 306, DateTimeKind.Utc).AddTicks(89));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 40, 23, 306, DateTimeKind.Utc).AddTicks(92));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 40, 23, 306, DateTimeKind.Utc).AddTicks(95));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 40, 23, 306, DateTimeKind.Utc).AddTicks(125));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 40, 23, 306, DateTimeKind.Utc).AddTicks(128));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 40, 23, 306, DateTimeKind.Utc).AddTicks(130));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 40, 23, 305, DateTimeKind.Utc).AddTicks(9737));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 40, 23, 306, DateTimeKind.Utc).AddTicks(44));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 30, 11, 40, 23, 306, DateTimeKind.Utc).AddTicks(47));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SupplierName",
                table: "LevelSetupHeader",
                newName: "supplierName");

            migrationBuilder.AddColumn<string>(
                name: "ApprovedBy",
                table: "LevelSetupHeader",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovedDate",
                table: "LevelSetupHeader",
                type: "datetime2",
                nullable: true);

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
        }
    }
}
