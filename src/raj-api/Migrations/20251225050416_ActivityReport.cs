using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class ActivityReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "AvailabilityStatus",
                table: "ActivityResources",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ActivityResourceReports",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnitCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    UOMId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityResourceReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityResourceReports_Uoms_UOMId",
                        column: x => x.UOMId,
                        principalTable: "Uoms",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2263));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2266));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2269));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2297));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2299));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2302));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2003));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2203));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 25, 5, 4, 13, 301, DateTimeKind.Utc).AddTicks(2206));

            migrationBuilder.CreateIndex(
                name: "IX_ActivityResourceReports_UOMId",
                table: "ActivityResourceReports",
                column: "UOMId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityResourceReports");

            migrationBuilder.AlterColumn<string>(
                name: "AvailabilityStatus",
                table: "ActivityResources",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 24, 7, 32, 52, 570, DateTimeKind.Utc).AddTicks(409));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 24, 7, 32, 52, 570, DateTimeKind.Utc).AddTicks(412));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 24, 7, 32, 52, 570, DateTimeKind.Utc).AddTicks(417));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 24, 7, 32, 52, 570, DateTimeKind.Utc).AddTicks(452));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 24, 7, 32, 52, 570, DateTimeKind.Utc).AddTicks(455));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 24, 7, 32, 52, 570, DateTimeKind.Utc).AddTicks(457));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 24, 7, 32, 52, 570, DateTimeKind.Utc).AddTicks(197));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 24, 7, 32, 52, 570, DateTimeKind.Utc).AddTicks(364));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 24, 7, 32, 52, 570, DateTimeKind.Utc).AddTicks(367));
        }
    }
}
