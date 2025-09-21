using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OldValues",
                table: "ActivityAmendment",
                newName: "OldData");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6013));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6016));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6018));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6051));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6131));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6133));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(5783));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(5960));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(5964));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OldData",
                table: "ActivityAmendment",
                newName: "OldValues");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 11, 10, 25, 49, 680, DateTimeKind.Utc).AddTicks(2822));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 11, 10, 25, 49, 680, DateTimeKind.Utc).AddTicks(2827));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 11, 10, 25, 49, 680, DateTimeKind.Utc).AddTicks(2829));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 11, 10, 25, 49, 680, DateTimeKind.Utc).AddTicks(2862));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 11, 10, 25, 49, 680, DateTimeKind.Utc).AddTicks(2864));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 11, 10, 25, 49, 680, DateTimeKind.Utc).AddTicks(2866));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 11, 10, 25, 49, 680, DateTimeKind.Utc).AddTicks(2595));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 11, 10, 25, 49, 680, DateTimeKind.Utc).AddTicks(2769));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 11, 10, 25, 49, 680, DateTimeKind.Utc).AddTicks(2772));
        }
    }
}
