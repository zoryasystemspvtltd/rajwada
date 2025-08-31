using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class template : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plans_FlatTemplateDetails_FlatTemplateId",
                table: "Plans");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1881));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1884));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1887));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1925));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1928));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1930));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1592));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1833));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1840));

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_FlatTemplates_FlatTemplateId",
                table: "Plans",
                column: "FlatTemplateId",
                principalTable: "FlatTemplates",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plans_FlatTemplateDetails_FlatTemplateDetailsId",
                table: "Plans");

            migrationBuilder.DropForeignKey(
                name: "FK_Plans_FlatTemplates_FlatTemplateId",
                table: "Plans");

            migrationBuilder.DropIndex(
                name: "IX_Plans_FlatTemplateDetailsId",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "FlatTemplateDetailsId",
                table: "Plans");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 23, 17, 56, 57, 586, DateTimeKind.Utc).AddTicks(6904));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 23, 17, 56, 57, 586, DateTimeKind.Utc).AddTicks(6907));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 23, 17, 56, 57, 586, DateTimeKind.Utc).AddTicks(6909));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 23, 17, 56, 57, 586, DateTimeKind.Utc).AddTicks(6951));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 23, 17, 56, 57, 586, DateTimeKind.Utc).AddTicks(6953));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 23, 17, 56, 57, 586, DateTimeKind.Utc).AddTicks(6958));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 23, 17, 56, 57, 586, DateTimeKind.Utc).AddTicks(6649));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 23, 17, 56, 57, 586, DateTimeKind.Utc).AddTicks(6862));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 23, 17, 56, 57, 586, DateTimeKind.Utc).AddTicks(6865));
        }
    }
}
