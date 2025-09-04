using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class contractor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "BelongsTo",
                table: "Dependencies",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ParentId",
                table: "Dependencies",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Contractors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Contractor");

            migrationBuilder.AddColumn<long>(
                name: "LabourProvidedBy",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "MaterialProvidedBy",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkId",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5009));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5012));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5015));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5048));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5050));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5052));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(4776));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(4973));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(4976));

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_BelongsTo",
                table: "Dependencies",
                column: "BelongsTo");

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_ParentId",
                table: "Dependencies",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_LabourProvidedBy",
                table: "Activities",
                column: "LabourProvidedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_MaterialProvidedBy",
                table: "Activities",
                column: "MaterialProvidedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Contractors_LabourProvidedBy",
                table: "Activities",
                column: "LabourProvidedBy",
                principalTable: "Contractors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Contractors_MaterialProvidedBy",
                table: "Activities",
                column: "MaterialProvidedBy",
                principalTable: "Contractors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dependencies_Dependencies_BelongsTo",
                table: "Dependencies",
                column: "BelongsTo",
                principalTable: "Dependencies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dependencies_Dependencies_ParentId",
                table: "Dependencies",
                column: "ParentId",
                principalTable: "Dependencies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Contractors_LabourProvidedBy",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Contractors_MaterialProvidedBy",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Dependencies_Dependencies_BelongsTo",
                table: "Dependencies");

            migrationBuilder.DropForeignKey(
                name: "FK_Dependencies_Dependencies_ParentId",
                table: "Dependencies");

            migrationBuilder.DropIndex(
                name: "IX_Dependencies_BelongsTo",
                table: "Dependencies");

            migrationBuilder.DropIndex(
                name: "IX_Dependencies_ParentId",
                table: "Dependencies");

            migrationBuilder.DropIndex(
                name: "IX_Activities_LabourProvidedBy",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_MaterialProvidedBy",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "BelongsTo",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Contractors");

            migrationBuilder.DropColumn(
                name: "LabourProvidedBy",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "MaterialProvidedBy",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "WorkId",
                table: "Activities");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1881));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1884));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1887));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1925));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1928));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1930));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1592));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1833));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 31, 13, 44, 43, 927, DateTimeKind.Utc).AddTicks(1840));
        }
    }
}
