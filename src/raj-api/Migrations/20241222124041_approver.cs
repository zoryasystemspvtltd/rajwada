using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class approver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "LevelSetupMaster");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "LevelSetupMaster");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "LevelSetupMaster");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "LevelSetupMaster");

            migrationBuilder.DropColumn(
                name: "ApprovedBy",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "ApprovedDate",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "LevelSetupDetails");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 12, 40, 39, 717, DateTimeKind.Utc).AddTicks(919));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 12, 40, 39, 717, DateTimeKind.Utc).AddTicks(924));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 12, 40, 39, 717, DateTimeKind.Utc).AddTicks(927));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 12, 40, 39, 717, DateTimeKind.Utc).AddTicks(1094));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 12, 40, 39, 717, DateTimeKind.Utc).AddTicks(1099));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 12, 40, 39, 717, DateTimeKind.Utc).AddTicks(1102));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 12, 40, 39, 717, DateTimeKind.Utc).AddTicks(101));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 12, 40, 39, 717, DateTimeKind.Utc).AddTicks(747));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 12, 40, 39, 717, DateTimeKind.Utc).AddTicks(757));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "LevelSetupMaster",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "LevelSetupMaster",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "LevelSetupMaster",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "LevelSetupMaster",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApprovedBy",
                table: "LevelSetupDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovedDate",
                table: "LevelSetupDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "LevelSetupDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "LevelSetupDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "LevelSetupDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "LevelSetupDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 10, 8, 39, 114, DateTimeKind.Utc).AddTicks(4970));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 10, 8, 39, 114, DateTimeKind.Utc).AddTicks(4973));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 10, 8, 39, 114, DateTimeKind.Utc).AddTicks(4975));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 10, 8, 39, 114, DateTimeKind.Utc).AddTicks(5005));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 10, 8, 39, 114, DateTimeKind.Utc).AddTicks(5008));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 10, 8, 39, 114, DateTimeKind.Utc).AddTicks(5010));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 10, 8, 39, 114, DateTimeKind.Utc).AddTicks(4710));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 10, 8, 39, 114, DateTimeKind.Utc).AddTicks(4928));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 10, 8, 39, 114, DateTimeKind.Utc).AddTicks(4931));
        }
    }
}
