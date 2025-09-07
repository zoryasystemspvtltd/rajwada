using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class depa : Migration
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
                value: new DateTime(2025, 9, 7, 4, 20, 49, 84, DateTimeKind.Utc).AddTicks(9715));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 4, 20, 49, 84, DateTimeKind.Utc).AddTicks(9718));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 4, 20, 49, 84, DateTimeKind.Utc).AddTicks(9721));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 4, 20, 49, 84, DateTimeKind.Utc).AddTicks(9754));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 4, 20, 49, 84, DateTimeKind.Utc).AddTicks(9757));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 4, 20, 49, 84, DateTimeKind.Utc).AddTicks(9759));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 4, 20, 49, 84, DateTimeKind.Utc).AddTicks(9505));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 4, 20, 49, 84, DateTimeKind.Utc).AddTicks(9668));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 4, 20, 49, 84, DateTimeKind.Utc).AddTicks(9671));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_DependencyId",
                table: "Activities",
                column: "DependencyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Dependencies_DependencyId",
                table: "Activities",
                column: "DependencyId",
                principalTable: "Dependencies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Dependencies_DependencyId",
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
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2830));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2834));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2837));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2868));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2871));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2874));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2514));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2763));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 7, 3, 58, 2, 175, DateTimeKind.Utc).AddTicks(2766));
        }
    }
}
