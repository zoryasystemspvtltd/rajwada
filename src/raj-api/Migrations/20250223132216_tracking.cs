using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class tracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActivityStatus",
                table: "Activities");

            migrationBuilder.CreateTable(
                name: "ActivityTrackings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ManPower = table.Column<int>(type: "int", nullable: true),
                    IsOnHold = table.Column<bool>(type: "bit", nullable: true),
                    IsCancelled = table.Column<bool>(type: "bit", nullable: true),
                    IsCuringDone = table.Column<bool>(type: "bit", nullable: true),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Item = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTrackings_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4367));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4369));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4372));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4496));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4499));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4501));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4036));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4317));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 23, 13, 22, 14, 709, DateTimeKind.Utc).AddTicks(4321));

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrackings_ActivityId",
                table: "ActivityTrackings",
                column: "ActivityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityTrackings");

            migrationBuilder.AddColumn<string>(
                name: "ActivityStatus",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4194));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4198));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4201));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4244));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4246));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4249));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(3818));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4143));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 2, 19, 15, 50, 51, 758, DateTimeKind.Utc).AddTicks(4147));
        }
    }
}
