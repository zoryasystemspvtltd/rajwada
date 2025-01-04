using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class con1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PAN",
                table: "Contractors",
                newName: "PanNo");

            migrationBuilder.RenameColumn(
                name: "GST",
                table: "Contractors",
                newName: "GSTNo");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 7, 8, 12, 597, DateTimeKind.Utc).AddTicks(1740));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 7, 8, 12, 597, DateTimeKind.Utc).AddTicks(1745));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 7, 8, 12, 597, DateTimeKind.Utc).AddTicks(1750));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 7, 8, 12, 597, DateTimeKind.Utc).AddTicks(1844));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 7, 8, 12, 597, DateTimeKind.Utc).AddTicks(1849));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 7, 8, 12, 597, DateTimeKind.Utc).AddTicks(1858));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 7, 8, 12, 597, DateTimeKind.Utc).AddTicks(1323));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 7, 8, 12, 597, DateTimeKind.Utc).AddTicks(1681));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 7, 8, 12, 597, DateTimeKind.Utc).AddTicks(1686));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PanNo",
                table: "Contractors",
                newName: "PAN");

            migrationBuilder.RenameColumn(
                name: "GSTNo",
                table: "Contractors",
                newName: "GST");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3118));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3127));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3130));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3215));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3219));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3223));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(2617));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(2874));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(2879));
        }
    }
}
