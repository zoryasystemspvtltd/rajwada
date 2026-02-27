using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class outsideentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parkings");

            migrationBuilder.AddColumn<long>(
                name: "OutsideEntityId",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OutsideEntity",
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
                    table.PrimaryKey("PK_OutsideEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OutsideEntity_ParkingTypes_ParkingTypeId",
                        column: x => x.ParkingTypeId,
                        principalTable: "ParkingTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OutsideEntity_Plans_TowerId",
                        column: x => x.TowerId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OutsideEntity_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 27, 14, 35, 10, 150, DateTimeKind.Utc).AddTicks(1495));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 27, 14, 35, 10, 150, DateTimeKind.Utc).AddTicks(1499));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 27, 14, 35, 10, 150, DateTimeKind.Utc).AddTicks(1501));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 27, 14, 35, 10, 150, DateTimeKind.Utc).AddTicks(1544));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 27, 14, 35, 10, 150, DateTimeKind.Utc).AddTicks(1546));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 27, 14, 35, 10, 150, DateTimeKind.Utc).AddTicks(1548));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 27, 14, 35, 10, 150, DateTimeKind.Utc).AddTicks(1261));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 27, 14, 35, 10, 150, DateTimeKind.Utc).AddTicks(1448));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 27, 14, 35, 10, 150, DateTimeKind.Utc).AddTicks(1451));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_OutsideEntityId",
                table: "Activities",
                column: "OutsideEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_OutsideEntity_ParkingTypeId",
                table: "OutsideEntity",
                column: "ParkingTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_OutsideEntity_ProjectId",
                table: "OutsideEntity",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_OutsideEntity_TowerId",
                table: "OutsideEntity",
                column: "TowerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_OutsideEntity_OutsideEntityId",
                table: "Activities",
                column: "OutsideEntityId",
                principalTable: "OutsideEntity",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_OutsideEntity_OutsideEntityId",
                table: "Activities");

            migrationBuilder.DropTable(
                name: "OutsideEntity");

            migrationBuilder.DropIndex(
                name: "IX_Activities_OutsideEntityId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "OutsideEntityId",
                table: "Activities");

            migrationBuilder.CreateTable(
                name: "Parkings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParkingTypeId = table.Column<long>(type: "bigint", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: true),
                    TowerId = table.Column<long>(type: "bigint", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
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
                value: new DateTime(2026, 2, 14, 14, 26, 30, 863, DateTimeKind.Utc).AddTicks(7000));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 14, 14, 26, 30, 863, DateTimeKind.Utc).AddTicks(7003));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 14, 14, 26, 30, 863, DateTimeKind.Utc).AddTicks(7006));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 14, 14, 26, 30, 863, DateTimeKind.Utc).AddTicks(7048));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 14, 14, 26, 30, 863, DateTimeKind.Utc).AddTicks(7051));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 14, 14, 26, 30, 863, DateTimeKind.Utc).AddTicks(7054));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 14, 14, 26, 30, 863, DateTimeKind.Utc).AddTicks(6724));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 14, 14, 26, 30, 863, DateTimeKind.Utc).AddTicks(6894));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 14, 14, 26, 30, 863, DateTimeKind.Utc).AddTicks(6898));

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
    }
}
