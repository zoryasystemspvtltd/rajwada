using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class parking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FlatTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlatTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ParkingTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FlatTemplates",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FlatTypeId = table.Column<long>(type: "bigint", nullable: true),
                    NoBedRooms = table.Column<int>(type: "int", nullable: true),
                    NoKitchens = table.Column<int>(type: "int", nullable: true),
                    NoBathRooms = table.Column<int>(type: "int", nullable: true),
                    NoLivingRooms = table.Column<int>(type: "int", nullable: true),
                    NoBalcony = table.Column<int>(type: "int", nullable: true),
                    NoOthers = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlatTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlatTemplates_FlatTypes_FlatTypeId",
                        column: x => x.FlatTypeId,
                        principalTable: "FlatTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Parkings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: true),
                    TowerId = table.Column<long>(type: "bigint", nullable: true),
                    ParkingTypeId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parkings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Parkings_ParkingTypes_ParkingTypeId",
                        column: x => x.ParkingTypeId,
                        principalTable: "ParkingTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Parkings_Plans_TowerId",
                        column: x => x.TowerId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Parkings_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 11, 32, 36, 385, DateTimeKind.Utc).AddTicks(6343));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 11, 32, 36, 385, DateTimeKind.Utc).AddTicks(6346));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 11, 32, 36, 385, DateTimeKind.Utc).AddTicks(6349));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 11, 32, 36, 385, DateTimeKind.Utc).AddTicks(6391));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 11, 32, 36, 385, DateTimeKind.Utc).AddTicks(6394));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 11, 32, 36, 385, DateTimeKind.Utc).AddTicks(6396));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 11, 32, 36, 385, DateTimeKind.Utc).AddTicks(5994));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 11, 32, 36, 385, DateTimeKind.Utc).AddTicks(6303));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 11, 32, 36, 385, DateTimeKind.Utc).AddTicks(6306));

            migrationBuilder.CreateIndex(
                name: "IX_FlatTemplates_FlatTypeId",
                table: "FlatTemplates",
                column: "FlatTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Parkings_ParkingTypeId",
                table: "Parkings",
                column: "ParkingTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Parkings_ProjectId",
                table: "Parkings",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Parkings_TowerId",
                table: "Parkings",
                column: "TowerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlatTemplates");

            migrationBuilder.DropTable(
                name: "Parkings");

            migrationBuilder.DropTable(
                name: "FlatTypes");

            migrationBuilder.DropTable(
                name: "ParkingTypes");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 3, 31, 6, 14, 50, 473, DateTimeKind.Utc).AddTicks(7496));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 3, 31, 6, 14, 50, 473, DateTimeKind.Utc).AddTicks(7499));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 3, 31, 6, 14, 50, 473, DateTimeKind.Utc).AddTicks(7501));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 3, 31, 6, 14, 50, 473, DateTimeKind.Utc).AddTicks(7552));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 3, 31, 6, 14, 50, 473, DateTimeKind.Utc).AddTicks(7554));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 3, 31, 6, 14, 50, 473, DateTimeKind.Utc).AddTicks(7556));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 3, 31, 6, 14, 50, 473, DateTimeKind.Utc).AddTicks(7135));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 3, 31, 6, 14, 50, 473, DateTimeKind.Utc).AddTicks(7449));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 3, 31, 6, 14, 50, 473, DateTimeKind.Utc).AddTicks(7452));
        }
    }
}
