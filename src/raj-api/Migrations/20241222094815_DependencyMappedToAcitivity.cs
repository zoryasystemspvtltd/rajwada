using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class DependencyMappedToAcitivity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DependencyId",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 9, 48, 13, 695, DateTimeKind.Utc).AddTicks(1113));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 9, 48, 13, 695, DateTimeKind.Utc).AddTicks(1116));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 9, 48, 13, 695, DateTimeKind.Utc).AddTicks(1173));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 9, 48, 13, 695, DateTimeKind.Utc).AddTicks(1193));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 9, 48, 13, 695, DateTimeKind.Utc).AddTicks(1195));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 9, 48, 13, 695, DateTimeKind.Utc).AddTicks(1197));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 9, 48, 13, 695, DateTimeKind.Utc).AddTicks(936));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 9, 48, 13, 695, DateTimeKind.Utc).AddTicks(1087));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 22, 9, 48, 13, 695, DateTimeKind.Utc).AddTicks(1089));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_DependencyId",
                table: "Activities",
                column: "DependencyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Workflows_DependencyId",
                table: "Activities",
                column: "DependencyId",
                principalTable: "Workflows",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Workflows_DependencyId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_DependencyId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "DependencyId",
                table: "Activities");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6498));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6501));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6503));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6525));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6527));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6528));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6319));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6466));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 19, 16, 22, 33, 374, DateTimeKind.Utc).AddTicks(6468));
        }
    }
}
