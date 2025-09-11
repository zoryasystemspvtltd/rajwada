using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class belongsto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5886));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5890));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5892));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5924));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5926));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5930));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5586));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5838));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5842));

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
    }
}
