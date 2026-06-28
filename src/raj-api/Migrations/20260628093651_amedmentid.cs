using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class amedmentid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ActivityAmendmentId",
                table: "ActivityTrackings",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 9, 36, 48, 566, DateTimeKind.Utc).AddTicks(2283));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 9, 36, 48, 566, DateTimeKind.Utc).AddTicks(2287));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 9, 36, 48, 566, DateTimeKind.Utc).AddTicks(2290));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 9, 36, 48, 566, DateTimeKind.Utc).AddTicks(2377));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 9, 36, 48, 566, DateTimeKind.Utc).AddTicks(2380));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 9, 36, 48, 566, DateTimeKind.Utc).AddTicks(2382));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 9, 36, 48, 566, DateTimeKind.Utc).AddTicks(2075));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 9, 36, 48, 566, DateTimeKind.Utc).AddTicks(2225));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 9, 36, 48, 566, DateTimeKind.Utc).AddTicks(2229));

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrackings_ActivityAmendmentId",
                table: "ActivityTrackings",
                column: "ActivityAmendmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityTrackings_ActivityAmendment_ActivityAmendmentId",
                table: "ActivityTrackings",
                column: "ActivityAmendmentId",
                principalTable: "ActivityAmendment",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityTrackings_ActivityAmendment_ActivityAmendmentId",
                table: "ActivityTrackings");

            migrationBuilder.DropIndex(
                name: "IX_ActivityTrackings_ActivityAmendmentId",
                table: "ActivityTrackings");

            migrationBuilder.DropColumn(
                name: "ActivityAmendmentId",
                table: "ActivityTrackings");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5228));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5231));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5234));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5270));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5272));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5275));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(4881));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5182));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 6, 28, 8, 18, 36, 366, DateTimeKind.Utc).AddTicks(5186));
        }
    }
}
