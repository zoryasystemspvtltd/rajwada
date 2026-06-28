using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class remarks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "ActivityTrackings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AmendmentRemarks",
                table: "ActivityAmendment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5228));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5231));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5234));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5270));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5272));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5275));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(4881));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5182));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5186));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "ActivityTrackings");

            migrationBuilder.DropColumn(
                name: "AmendmentRemarks",
                table: "ActivityAmendment");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 2, 5, 53, 42, 408, DateTimeKind.Utc).AddTicks(7812));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 2, 5, 53, 42, 408, DateTimeKind.Utc).AddTicks(7816));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 6, 2, 5, 53, 42, 408, DateTimeKind.Utc).AddTicks(7818));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 2, 5, 53, 42, 408, DateTimeKind.Utc).AddTicks(7864));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 2, 5, 53, 42, 408, DateTimeKind.Utc).AddTicks(7867));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 6, 2, 5, 53, 42, 408, DateTimeKind.Utc).AddTicks(7869));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 2, 5, 53, 42, 408, DateTimeKind.Utc).AddTicks(7509));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 2, 5, 53, 42, 408, DateTimeKind.Utc).AddTicks(7749));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 2, 5, 53, 42, 408, DateTimeKind.Utc).AddTicks(7754));
        }
    }
}
