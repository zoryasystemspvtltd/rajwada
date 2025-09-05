using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class correction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectDocNoTrackings_Projects_ProjectId",
                table: "ProjectDocNoTrackings");

            migrationBuilder.AlterColumn<long>(
                name: "ProjectId",
                table: "ProjectDocNoTrackings",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 9, 50, 13, 362, DateTimeKind.Utc).AddTicks(1106));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 9, 50, 13, 362, DateTimeKind.Utc).AddTicks(1110));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 9, 50, 13, 362, DateTimeKind.Utc).AddTicks(1112));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 9, 50, 13, 362, DateTimeKind.Utc).AddTicks(1147));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 9, 50, 13, 362, DateTimeKind.Utc).AddTicks(1149));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 9, 50, 13, 362, DateTimeKind.Utc).AddTicks(1152));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 9, 50, 13, 362, DateTimeKind.Utc).AddTicks(887));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 9, 50, 13, 362, DateTimeKind.Utc).AddTicks(1072));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 9, 50, 13, 362, DateTimeKind.Utc).AddTicks(1076));

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectDocNoTrackings_Projects_ProjectId",
                table: "ProjectDocNoTrackings",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectDocNoTrackings_Projects_ProjectId",
                table: "ProjectDocNoTrackings");

            migrationBuilder.AlterColumn<long>(
                name: "ProjectId",
                table: "ProjectDocNoTrackings",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 6, 49, 7, 460, DateTimeKind.Utc).AddTicks(8573));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 6, 49, 7, 460, DateTimeKind.Utc).AddTicks(8576));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 6, 49, 7, 460, DateTimeKind.Utc).AddTicks(8580));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 6, 49, 7, 460, DateTimeKind.Utc).AddTicks(8617));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 6, 49, 7, 460, DateTimeKind.Utc).AddTicks(8621));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 6, 49, 7, 460, DateTimeKind.Utc).AddTicks(8624));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 6, 49, 7, 460, DateTimeKind.Utc).AddTicks(8354));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 6, 49, 7, 460, DateTimeKind.Utc).AddTicks(8540));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 6, 49, 7, 460, DateTimeKind.Utc).AddTicks(8544));

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectDocNoTrackings_Projects_ProjectId",
                table: "ProjectDocNoTrackings",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
