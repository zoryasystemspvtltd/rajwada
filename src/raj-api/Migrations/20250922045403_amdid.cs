using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class amdid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAmendment_Activities_ActivityId",
                table: "ActivityAmendment");

            migrationBuilder.DropIndex(
                name: "IX_ActivityAmendment_ActivityId",
                table: "ActivityAmendment");

            migrationBuilder.AddColumn<long>(
                name: "AmendmentId",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5292));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5295));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5298));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5327));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5329));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5332));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5041));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5247));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 22, 4, 54, 1, 355, DateTimeKind.Utc).AddTicks(5250));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_AmendmentId",
                table: "Activities",
                column: "AmendmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_ActivityAmendment_AmendmentId",
                table: "Activities",
                column: "AmendmentId",
                principalTable: "ActivityAmendment",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_ActivityAmendment_AmendmentId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_AmendmentId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "AmendmentId",
                table: "Activities");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6013));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6016));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6018));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6051));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6131));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(6133));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(5783));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(5960));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 19, 9, 48, 33, 574, DateTimeKind.Utc).AddTicks(5964));

            migrationBuilder.CreateIndex(
                name: "IX_ActivityAmendment_ActivityId",
                table: "ActivityAmendment",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAmendment_Activities_ActivityId",
                table: "ActivityAmendment",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");
        }
    }
}
