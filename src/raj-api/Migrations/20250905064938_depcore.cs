using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class depcore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5174));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5178));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5181));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5217));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5219));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5222));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(4893));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5118));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5121));

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_BelongsTo",
                table: "Dependencies",
                column: "BelongsTo");

            migrationBuilder.AddForeignKey(
                name: "FK_Dependencies_Dependencies_BelongsTo",
                table: "Dependencies",
                column: "BelongsTo",
                principalTable: "Dependencies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dependencies_Dependencies_BelongsTo",
                table: "Dependencies");

            migrationBuilder.DropIndex(
                name: "IX_Dependencies_BelongsTo",
                table: "Dependencies");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 27, 17, 140, DateTimeKind.Utc).AddTicks(7738));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 27, 17, 140, DateTimeKind.Utc).AddTicks(7742));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 27, 17, 140, DateTimeKind.Utc).AddTicks(7745));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 27, 17, 140, DateTimeKind.Utc).AddTicks(7782));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 27, 17, 140, DateTimeKind.Utc).AddTicks(7785));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 27, 17, 140, DateTimeKind.Utc).AddTicks(7787));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 27, 17, 140, DateTimeKind.Utc).AddTicks(7511));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 27, 17, 140, DateTimeKind.Utc).AddTicks(7685));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 27, 17, 140, DateTimeKind.Utc).AddTicks(7688));
        }
    }
}
