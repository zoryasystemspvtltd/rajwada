using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class AddItemsColumnDependency : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Items",
                table: "Dependencies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 51, 7, 778, DateTimeKind.Utc).AddTicks(6677));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 51, 7, 778, DateTimeKind.Utc).AddTicks(6681));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 51, 7, 778, DateTimeKind.Utc).AddTicks(6683));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 51, 7, 778, DateTimeKind.Utc).AddTicks(6707));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 51, 7, 778, DateTimeKind.Utc).AddTicks(6709));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 51, 7, 778, DateTimeKind.Utc).AddTicks(6710));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 51, 7, 778, DateTimeKind.Utc).AddTicks(6472));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 51, 7, 778, DateTimeKind.Utc).AddTicks(6620));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 51, 7, 778, DateTimeKind.Utc).AddTicks(6623));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Items",
                table: "Dependencies");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1479));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1488));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1494));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1556));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1561));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1566));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1092));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1397));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 29, 15, 9, 8, 0, DateTimeKind.Utc).AddTicks(1403));
        }
    }
}
