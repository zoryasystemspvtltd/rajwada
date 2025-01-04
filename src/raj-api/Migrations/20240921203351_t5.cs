using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class t5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 33, 50, 377, DateTimeKind.Utc).AddTicks(8560));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 33, 50, 377, DateTimeKind.Utc).AddTicks(8563));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 33, 50, 377, DateTimeKind.Utc).AddTicks(8565));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 33, 50, 377, DateTimeKind.Utc).AddTicks(8599));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 33, 50, 377, DateTimeKind.Utc).AddTicks(8601));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 33, 50, 377, DateTimeKind.Utc).AddTicks(8603));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 33, 50, 377, DateTimeKind.Utc).AddTicks(8304));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 33, 50, 377, DateTimeKind.Utc).AddTicks(8516));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 33, 50, 377, DateTimeKind.Utc).AddTicks(8518));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 18, 21, 465, DateTimeKind.Utc).AddTicks(9552));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 18, 21, 465, DateTimeKind.Utc).AddTicks(9557));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 18, 21, 465, DateTimeKind.Utc).AddTicks(9559));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 18, 21, 465, DateTimeKind.Utc).AddTicks(9593));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 18, 21, 465, DateTimeKind.Utc).AddTicks(9596));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 18, 21, 465, DateTimeKind.Utc).AddTicks(9598));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 18, 21, 465, DateTimeKind.Utc).AddTicks(9296));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 18, 21, 465, DateTimeKind.Utc).AddTicks(9507));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 21, 20, 18, 21, 465, DateTimeKind.Utc).AddTicks(9509));
        }
    }
}
