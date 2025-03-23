using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class attachemitem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ItemId",
                table: "Attachments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 3, 23, 10, 38, 1, 844, DateTimeKind.Utc).AddTicks(7062));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 3, 23, 10, 38, 1, 844, DateTimeKind.Utc).AddTicks(7065));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 3, 23, 10, 38, 1, 844, DateTimeKind.Utc).AddTicks(7067));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 3, 23, 10, 38, 1, 844, DateTimeKind.Utc).AddTicks(7112));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 3, 23, 10, 38, 1, 844, DateTimeKind.Utc).AddTicks(7114));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 3, 23, 10, 38, 1, 844, DateTimeKind.Utc).AddTicks(7116));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 3, 23, 10, 38, 1, 844, DateTimeKind.Utc).AddTicks(6767));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 3, 23, 10, 38, 1, 844, DateTimeKind.Utc).AddTicks(7020));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 3, 23, 10, 38, 1, 844, DateTimeKind.Utc).AddTicks(7023));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Attachments");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 26, 5, 29, 37, 180, DateTimeKind.Utc).AddTicks(1833));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 26, 5, 29, 37, 180, DateTimeKind.Utc).AddTicks(1836));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 26, 5, 29, 37, 180, DateTimeKind.Utc).AddTicks(1838));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 26, 5, 29, 37, 180, DateTimeKind.Utc).AddTicks(1897));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 26, 5, 29, 37, 180, DateTimeKind.Utc).AddTicks(1900));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 26, 5, 29, 37, 180, DateTimeKind.Utc).AddTicks(1902));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 26, 5, 29, 37, 180, DateTimeKind.Utc).AddTicks(1190));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 26, 5, 29, 37, 180, DateTimeKind.Utc).AddTicks(1707));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 26, 5, 29, 37, 180, DateTimeKind.Utc).AddTicks(1711));
        }
    }
}
