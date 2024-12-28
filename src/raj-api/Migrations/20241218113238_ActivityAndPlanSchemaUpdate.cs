using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class ActivityAndPlanSchemaUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Blueprint",
                table: "Plans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "FlatId",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "FloorId",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Items",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TowerId",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5548));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5552));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5554));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5578));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5580));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5582));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5401));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5523));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 18, 11, 32, 36, 790, DateTimeKind.Utc).AddTicks(5525));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_FlatId",
                table: "Activities",
                column: "FlatId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_FloorId",
                table: "Activities",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_TowerId",
                table: "Activities",
                column: "TowerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Plans_FlatId",
                table: "Activities",
                column: "FlatId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Plans_FloorId",
                table: "Activities",
                column: "FloorId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Plans_TowerId",
                table: "Activities",
                column: "TowerId",
                principalTable: "Plans",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Plans_FlatId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Plans_FloorId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Plans_TowerId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_FlatId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_FloorId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_TowerId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Blueprint",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "FlatId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "FloorId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Items",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "TowerId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Activities");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4645));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4650));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4652));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4685));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4688));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4690));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4450));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4610));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 8, 7, 47, 31, 683, DateTimeKind.Utc).AddTicks(4613));
        }
    }
}
