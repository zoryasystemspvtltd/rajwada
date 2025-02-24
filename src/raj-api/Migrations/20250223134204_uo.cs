using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class uo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ActivityId",
                table: "UnitOfWorks",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Attachments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 42, 3, 179, DateTimeKind.Utc).AddTicks(1413));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 42, 3, 179, DateTimeKind.Utc).AddTicks(1416));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 42, 3, 179, DateTimeKind.Utc).AddTicks(1418));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 42, 3, 179, DateTimeKind.Utc).AddTicks(1480));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 42, 3, 179, DateTimeKind.Utc).AddTicks(1483));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 42, 3, 179, DateTimeKind.Utc).AddTicks(1487));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 42, 3, 179, DateTimeKind.Utc).AddTicks(963));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 42, 3, 179, DateTimeKind.Utc).AddTicks(1284));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 42, 3, 179, DateTimeKind.Utc).AddTicks(1286));

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfWorks_ActivityId",
                table: "UnitOfWorks",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_UnitOfWorks_Activities_ActivityId",
                table: "UnitOfWorks",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UnitOfWorks_Activities_ActivityId",
                table: "UnitOfWorks");

            migrationBuilder.DropIndex(
                name: "IX_UnitOfWorks_ActivityId",
                table: "UnitOfWorks");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "UnitOfWorks");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Attachments");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4367));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4369));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4372));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4496));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4499));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4501));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4036));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4317));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4321));
        }
    }
}
