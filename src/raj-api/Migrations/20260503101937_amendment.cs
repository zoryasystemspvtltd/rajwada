using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class amendment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "ActivityAmendment",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 5, 3, 10, 19, 34, 297, DateTimeKind.Utc).AddTicks(532));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 5, 3, 10, 19, 34, 297, DateTimeKind.Utc).AddTicks(537));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 5, 3, 10, 19, 34, 297, DateTimeKind.Utc).AddTicks(539));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 5, 3, 10, 19, 34, 297, DateTimeKind.Utc).AddTicks(576));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 5, 3, 10, 19, 34, 297, DateTimeKind.Utc).AddTicks(578));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 5, 3, 10, 19, 34, 297, DateTimeKind.Utc).AddTicks(580));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 5, 3, 10, 19, 34, 297, DateTimeKind.Utc).AddTicks(343));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 5, 3, 10, 19, 34, 297, DateTimeKind.Utc).AddTicks(490));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 5, 3, 10, 19, 34, 297, DateTimeKind.Utc).AddTicks(494));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "ActivityAmendment",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7023));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7026));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7029));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7063));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7066));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(7068));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(6810));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(6986));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 4, 13, 3, 30, 16, 422, DateTimeKind.Utc).AddTicks(6989));
        }
    }
}
