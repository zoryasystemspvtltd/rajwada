using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class activity_status : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ActivityStatus",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HODRemarks",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAbandoned",
                table: "Activities",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsQCApproved",
                table: "Activities",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QCRemarks",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4194));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4198));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4201));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4244));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4246));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4249));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(3818));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4143));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4147));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActivityStatus",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "HODRemarks",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "IsAbandoned",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "IsQCApproved",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "QCRemarks",
                table: "Activities");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 18, 8, 21, 23, 295, DateTimeKind.Utc).AddTicks(8352));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 18, 8, 21, 23, 295, DateTimeKind.Utc).AddTicks(8356));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 18, 8, 21, 23, 295, DateTimeKind.Utc).AddTicks(8359));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 18, 8, 21, 23, 295, DateTimeKind.Utc).AddTicks(8446));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 18, 8, 21, 23, 295, DateTimeKind.Utc).AddTicks(8450));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 18, 8, 21, 23, 295, DateTimeKind.Utc).AddTicks(8453));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 18, 8, 21, 23, 295, DateTimeKind.Utc).AddTicks(7531));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 18, 8, 21, 23, 295, DateTimeKind.Utc).AddTicks(8261));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 18, 8, 21, 23, 295, DateTimeKind.Utc).AddTicks(8268));
        }
    }
}
