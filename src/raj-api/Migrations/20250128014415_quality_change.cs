using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class quality_change : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QualityType",
                table: "LevelSetupDetails",
                newName: "ReceiverStatus");

            migrationBuilder.AddColumn<string>(
                name: "QualityStatus",
                table: "LevelSetupDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReceiverRemarks",
                table: "LevelSetupDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApprovedRemarks",
                table: "LevelSetup",
                type: "nvarchar(max)",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QualityStatus",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "ReceiverRemarks",
                table: "LevelSetupDetails");

            migrationBuilder.DropColumn(
                name: "ApprovedRemarks",
                table: "LevelSetup");

            migrationBuilder.RenameColumn(
                name: "ReceiverStatus",
                table: "LevelSetupDetails",
                newName: "QualityType");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 17, 17, 15, 17, 945, DateTimeKind.Utc).AddTicks(9467));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 17, 17, 15, 17, 945, DateTimeKind.Utc).AddTicks(9471));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 17, 17, 15, 17, 945, DateTimeKind.Utc).AddTicks(9473));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 17, 17, 15, 17, 945, DateTimeKind.Utc).AddTicks(9493));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 17, 17, 15, 17, 945, DateTimeKind.Utc).AddTicks(9495));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 17, 17, 15, 17, 945, DateTimeKind.Utc).AddTicks(9497));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 17, 17, 15, 17, 945, DateTimeKind.Utc).AddTicks(9283));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 17, 17, 15, 17, 945, DateTimeKind.Utc).AddTicks(9441));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 17, 17, 15, 17, 945, DateTimeKind.Utc).AddTicks(9444));
        }
    }
}
