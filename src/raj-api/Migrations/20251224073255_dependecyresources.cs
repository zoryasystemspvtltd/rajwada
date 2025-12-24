using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class dependecyresources : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DependencyResources",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnitCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    UOMId = table.Column<long>(type: "bigint", nullable: true),
                    NotifyBefore = table.Column<int>(type: "int", nullable: true),
                    AvailabilityStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssignedUser = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DependencyResources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DependencyResources_Uoms_UOMId",
                        column: x => x.UOMId,
                        principalTable: "Uoms",
                        principalColumn: "Id");
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_DependencyResources_UOMId",
                table: "DependencyResources",
                column: "UOMId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DependencyResources");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7833));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7836));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7839));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7874));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7876));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7878));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7615));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7796));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 12, 22, 8, 39, 24, 198, DateTimeKind.Utc).AddTicks(7800));
        }
    }
}
