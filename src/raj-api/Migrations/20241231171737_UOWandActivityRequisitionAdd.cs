using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class UOWandActivityRequisitionAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 28, 7, 30, 18, 778, DateTimeKind.Utc).AddTicks(1063));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 28, 7, 30, 18, 778, DateTimeKind.Utc).AddTicks(1067));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 28, 7, 30, 18, 778, DateTimeKind.Utc).AddTicks(1069));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 28, 7, 30, 18, 778, DateTimeKind.Utc).AddTicks(1111));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 28, 7, 30, 18, 778, DateTimeKind.Utc).AddTicks(1113));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 28, 7, 30, 18, 778, DateTimeKind.Utc).AddTicks(1115));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 28, 7, 30, 18, 778, DateTimeKind.Utc).AddTicks(822));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 28, 7, 30, 18, 778, DateTimeKind.Utc).AddTicks(1025));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 28, 7, 30, 18, 778, DateTimeKind.Utc).AddTicks(1027));
        }
    }
}
