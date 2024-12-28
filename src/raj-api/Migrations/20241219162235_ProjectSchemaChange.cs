using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class ProjectSchemaChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Blueprint",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6498));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6501));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6503));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6525));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6527));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6528));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6319));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6466));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6468));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Blueprint",
                table: "Projects");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5548));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5552));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5554));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5578));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5580));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5582));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5401));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5523));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5525));
        }
    }
}
