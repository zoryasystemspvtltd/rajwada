using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class activity_contractor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ContractorId",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 1, 10, 21, 55, 109, DateTimeKind.Utc).AddTicks(8976));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 1, 10, 21, 55, 109, DateTimeKind.Utc).AddTicks(8978));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 1, 10, 21, 55, 109, DateTimeKind.Utc).AddTicks(8980));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 1, 10, 21, 55, 109, DateTimeKind.Utc).AddTicks(9021));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 1, 10, 21, 55, 109, DateTimeKind.Utc).AddTicks(9024));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 1, 10, 21, 55, 109, DateTimeKind.Utc).AddTicks(9026));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 1, 10, 21, 55, 109, DateTimeKind.Utc).AddTicks(8659));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 1, 10, 21, 55, 109, DateTimeKind.Utc).AddTicks(8920));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 1, 10, 21, 55, 109, DateTimeKind.Utc).AddTicks(8923));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ContractorId",
                table: "Activities",
                column: "ContractorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Contractors_ContractorId",
                table: "Activities",
                column: "ContractorId",
                principalTable: "Contractors",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Contractors_ContractorId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_ContractorId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "ContractorId",
                table: "Activities");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 28, 1, 44, 13, 986, DateTimeKind.Utc).AddTicks(3991));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 28, 1, 44, 13, 986, DateTimeKind.Utc).AddTicks(3995));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 28, 1, 44, 13, 986, DateTimeKind.Utc).AddTicks(3997));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 28, 1, 44, 13, 986, DateTimeKind.Utc).AddTicks(4038));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 28, 1, 44, 13, 986, DateTimeKind.Utc).AddTicks(4040));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 28, 1, 44, 13, 986, DateTimeKind.Utc).AddTicks(4043));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 28, 1, 44, 13, 986, DateTimeKind.Utc).AddTicks(3620));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 28, 1, 44, 13, 986, DateTimeKind.Utc).AddTicks(3935));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 28, 1, 44, 13, 986, DateTimeKind.Utc).AddTicks(3939));
        }
    }
}
