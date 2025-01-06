using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class quantity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemName",
                table: "LevelSetupDetails");

            migrationBuilder.RenameColumn(
                name: "Quatity",
                table: "LevelSetupDetails",
                newName: "Quantity");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5053));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5056));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5058));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5098));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5100));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5102));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(4747));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(4991));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(4995));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "LevelSetupDetails",
                newName: "Quatity");

            migrationBuilder.AddColumn<string>(
                name: "ItemName",
                table: "LevelSetupDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 17, 26, 58, 847, DateTimeKind.Utc).AddTicks(8353));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 17, 26, 58, 847, DateTimeKind.Utc).AddTicks(8356));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 17, 26, 58, 847, DateTimeKind.Utc).AddTicks(8358));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 17, 26, 58, 847, DateTimeKind.Utc).AddTicks(8403));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 17, 26, 58, 847, DateTimeKind.Utc).AddTicks(8407));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 17, 26, 58, 847, DateTimeKind.Utc).AddTicks(8409));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 17, 26, 58, 847, DateTimeKind.Utc).AddTicks(8053));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 17, 26, 58, 847, DateTimeKind.Utc).AddTicks(8284));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 17, 26, 58, 847, DateTimeKind.Utc).AddTicks(8286));
        }
    }
}
