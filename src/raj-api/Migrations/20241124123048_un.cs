using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class un : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFatherAlive",
                table: "NameMasters");

            migrationBuilder.DropColumn(
                name: "IsGrandFatherAlive",
                table: "NameMasters");

            migrationBuilder.DropColumn(
                name: "IsGrandMotherAlive",
                table: "NameMasters");

            migrationBuilder.DropColumn(
                name: "IsMotherAlive",
                table: "NameMasters");

            migrationBuilder.AddColumn<string>(
                name: "FatherStatus",
                table: "NameMasters",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GrandFatherStatus",
                table: "NameMasters",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GrandMotherStatus",
                table: "NameMasters",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MotherStatus",
                table: "NameMasters",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 24, 12, 30, 46, 634, DateTimeKind.Utc).AddTicks(1616));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 24, 12, 30, 46, 634, DateTimeKind.Utc).AddTicks(1620));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 24, 12, 30, 46, 634, DateTimeKind.Utc).AddTicks(1624));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 24, 12, 30, 46, 634, DateTimeKind.Utc).AddTicks(1675));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 24, 12, 30, 46, 634, DateTimeKind.Utc).AddTicks(1679));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 24, 12, 30, 46, 634, DateTimeKind.Utc).AddTicks(1683));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 24, 12, 30, 46, 634, DateTimeKind.Utc).AddTicks(1280));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 24, 12, 30, 46, 634, DateTimeKind.Utc).AddTicks(1554));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 24, 12, 30, 46, 634, DateTimeKind.Utc).AddTicks(1559));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FatherStatus",
                table: "NameMasters");

            migrationBuilder.DropColumn(
                name: "GrandFatherStatus",
                table: "NameMasters");

            migrationBuilder.DropColumn(
                name: "GrandMotherStatus",
                table: "NameMasters");

            migrationBuilder.DropColumn(
                name: "MotherStatus",
                table: "NameMasters");

            migrationBuilder.AddColumn<bool>(
                name: "IsFatherAlive",
                table: "NameMasters",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsGrandFatherAlive",
                table: "NameMasters",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsGrandMotherAlive",
                table: "NameMasters",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMotherAlive",
                table: "NameMasters",
                type: "bit",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3940));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3946));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3951));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(4004));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(4007));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(4010));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3622));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3885));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3890));
        }
    }
}
