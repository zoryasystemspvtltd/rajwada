using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class ty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 25, 30, 963, DateTimeKind.Utc).AddTicks(9291));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 25, 30, 963, DateTimeKind.Utc).AddTicks(9295));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 25, 30, 963, DateTimeKind.Utc).AddTicks(9297));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 25, 30, 963, DateTimeKind.Utc).AddTicks(9334));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 25, 30, 963, DateTimeKind.Utc).AddTicks(9336));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 25, 30, 963, DateTimeKind.Utc).AddTicks(9338));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 25, 30, 963, DateTimeKind.Utc).AddTicks(8968));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 25, 30, 963, DateTimeKind.Utc).AddTicks(9245));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 25, 30, 963, DateTimeKind.Utc).AddTicks(9247));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 14, 3, 212, DateTimeKind.Utc).AddTicks(2127));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 14, 3, 212, DateTimeKind.Utc).AddTicks(2130));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 14, 3, 212, DateTimeKind.Utc).AddTicks(2132));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 14, 3, 212, DateTimeKind.Utc).AddTicks(2173));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 14, 3, 212, DateTimeKind.Utc).AddTicks(2176));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 14, 3, 212, DateTimeKind.Utc).AddTicks(2178));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 14, 3, 212, DateTimeKind.Utc).AddTicks(1860));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 14, 3, 212, DateTimeKind.Utc).AddTicks(2075));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 14, 20, 14, 3, 212, DateTimeKind.Utc).AddTicks(2079));
        }
    }
}
