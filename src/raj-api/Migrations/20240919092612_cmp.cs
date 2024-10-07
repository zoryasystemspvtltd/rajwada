using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class cmp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BelongTo",
                table: "Companys",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 26, 7, 833, DateTimeKind.Utc).AddTicks(4205));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 26, 7, 833, DateTimeKind.Utc).AddTicks(4216));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 26, 7, 833, DateTimeKind.Utc).AddTicks(4226));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 26, 7, 833, DateTimeKind.Utc).AddTicks(4327));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 26, 7, 833, DateTimeKind.Utc).AddTicks(4336));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 26, 7, 833, DateTimeKind.Utc).AddTicks(4343));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "BelongTo", "Date" },
                values: new object[] { null, new DateTime(2024, 9, 19, 9, 26, 7, 833, DateTimeKind.Utc).AddTicks(3374) });

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 26, 7, 833, DateTimeKind.Utc).AddTicks(4108));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 9, 19, 9, 26, 7, 833, DateTimeKind.Utc).AddTicks(4121));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BelongTo",
                table: "Companys");

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
    }
}
