using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class AddResourceModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9218));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9222));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9224));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9288));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9290));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9292));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9056));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9184));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9186));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 31, 17, 17, 35, 392, DateTimeKind.Utc).AddTicks(1559));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 31, 17, 17, 35, 392, DateTimeKind.Utc).AddTicks(1563));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 31, 17, 17, 35, 392, DateTimeKind.Utc).AddTicks(1619));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 31, 17, 17, 35, 392, DateTimeKind.Utc).AddTicks(1647));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 31, 17, 17, 35, 392, DateTimeKind.Utc).AddTicks(1648));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 31, 17, 17, 35, 392, DateTimeKind.Utc).AddTicks(1650));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 31, 17, 17, 35, 392, DateTimeKind.Utc).AddTicks(1385));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 31, 17, 17, 35, 392, DateTimeKind.Utc).AddTicks(1530));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 31, 17, 17, 35, 392, DateTimeKind.Utc).AddTicks(1532));
        }
    }
}
