using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class chnage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntity_ParkingTypes_ParkingTypeId",
                table: "OutSideEntity");

            migrationBuilder.DropIndex(
                name: "IX_OutSideEntity_ParkingTypeId",
                table: "OutSideEntity");

            migrationBuilder.DropColumn(
                name: "ParkingTypeId",
                table: "OutSideEntity");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3439));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3443));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3446));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3489));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3492));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3495));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3173));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3394));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3397));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ParkingTypeId",
                table: "OutSideEntity",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9116));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9120));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9122));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9165));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9167));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9169));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(8871));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9065));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9071));

            migrationBuilder.CreateIndex(
                name: "IX_OutSideEntity_ParkingTypeId",
                table: "OutSideEntity",
                column: "ParkingTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntity_ParkingTypes_ParkingTypeId",
                table: "OutSideEntity",
                column: "ParkingTypeId",
                principalTable: "ParkingTypes",
                principalColumn: "Id");
        }
    }
}
