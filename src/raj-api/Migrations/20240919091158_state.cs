using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class state : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "State",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkflowState",
                table: "Projects",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 11, 55, 743, DateTimeKind.Utc).AddTicks(3193));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 11, 55, 743, DateTimeKind.Utc).AddTicks(3200));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 11, 55, 743, DateTimeKind.Utc).AddTicks(3205));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 11, 55, 743, DateTimeKind.Utc).AddTicks(3280));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 11, 55, 743, DateTimeKind.Utc).AddTicks(3285));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 11, 55, 743, DateTimeKind.Utc).AddTicks(3289));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 11, 55, 743, DateTimeKind.Utc).AddTicks(2448));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 11, 55, 743, DateTimeKind.Utc).AddTicks(3093));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 11, 55, 743, DateTimeKind.Utc).AddTicks(3099));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkflowState",
                table: "Projects");

            migrationBuilder.AlterColumn<int>(
                name: "State",
                table: "Projects",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 8, 38, 42, 67, DateTimeKind.Utc).AddTicks(8192));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 8, 38, 42, 67, DateTimeKind.Utc).AddTicks(8198));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 8, 38, 42, 67, DateTimeKind.Utc).AddTicks(8203));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 8, 38, 42, 67, DateTimeKind.Utc).AddTicks(8241));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 8, 38, 42, 67, DateTimeKind.Utc).AddTicks(8247));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 8, 38, 42, 67, DateTimeKind.Utc).AddTicks(8250));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 8, 38, 42, 67, DateTimeKind.Utc).AddTicks(7903));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 8, 38, 42, 67, DateTimeKind.Utc).AddTicks(8139));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 8, 38, 42, 67, DateTimeKind.Utc).AddTicks(8145));
        }
    }
}
