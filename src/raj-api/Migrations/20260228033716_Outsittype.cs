using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class Outsittype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_OutsideEntity_OutsideEntityId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_OutsideEntity_ParkingTypes_ParkingTypeId",
                table: "OutsideEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OutsideEntity_Plans_TowerId",
                table: "OutsideEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OutsideEntity_Projects_ProjectId",
                table: "OutsideEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OutsideEntity",
                table: "OutsideEntity");

            migrationBuilder.RenameTable(
                name: "OutsideEntity",
                newName: "OutSideEntity");

            migrationBuilder.RenameIndex(
                name: "IX_OutsideEntity_TowerId",
                table: "OutSideEntity",
                newName: "IX_OutSideEntity_TowerId");

            migrationBuilder.RenameIndex(
                name: "IX_OutsideEntity_ProjectId",
                table: "OutSideEntity",
                newName: "IX_OutSideEntity_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_OutsideEntity_ParkingTypeId",
                table: "OutSideEntity",
                newName: "IX_OutSideEntity_ParkingTypeId");

            migrationBuilder.RenameColumn(
                name: "OutsideEntityId",
                table: "Activities",
                newName: "OutSideEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_OutsideEntityId",
                table: "Activities",
                newName: "IX_Activities_OutSideEntityId");

            migrationBuilder.AddColumn<long>(
                name: "OutSideEntityTypeId",
                table: "OutSideEntity",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ParkingId",
                table: "Activities",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OutSideEntity",
                table: "OutSideEntity",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "OutSideEntityTypes",
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
                    table.PrimaryKey("PK_OutSideEntityTypes", x => x.Id);
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
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9116));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9120));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9122));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9165));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9167));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9169));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(8871));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9065));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 37, 14, 731, DateTimeKind.Utc).AddTicks(9071));

            migrationBuilder.CreateIndex(
                name: "IX_OutSideEntity_OutSideEntityTypeId",
                table: "OutSideEntity",
                column: "OutSideEntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ParkingId",
                table: "Activities",
                column: "ParkingId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_OutSideEntity_OutSideEntityId",
                table: "Activities",
                column: "OutSideEntityId",
                principalTable: "OutSideEntity",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Parkings_ParkingId",
                table: "Activities",
                column: "ParkingId",
                principalTable: "Parkings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntity_OutSideEntityTypes_OutSideEntityTypeId",
                table: "OutSideEntity",
                column: "OutSideEntityTypeId",
                principalTable: "OutSideEntityTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntity_ParkingTypes_ParkingTypeId",
                table: "OutSideEntity",
                column: "ParkingTypeId",
                principalTable: "ParkingTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntity_Plans_TowerId",
                table: "OutSideEntity",
                column: "TowerId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntity_Projects_ProjectId",
                table: "OutSideEntity",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_OutSideEntity_OutSideEntityId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Parkings_ParkingId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntity_OutSideEntityTypes_OutSideEntityTypeId",
                table: "OutSideEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntity_ParkingTypes_ParkingTypeId",
                table: "OutSideEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntity_Plans_TowerId",
                table: "OutSideEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntity_Projects_ProjectId",
                table: "OutSideEntity");

            migrationBuilder.DropTable(
                name: "OutSideEntityTypes");

            migrationBuilder.DropTable(
                name: "Parkings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OutSideEntity",
                table: "OutSideEntity");

            migrationBuilder.DropIndex(
                name: "IX_OutSideEntity_OutSideEntityTypeId",
                table: "OutSideEntity");

            migrationBuilder.DropIndex(
                name: "IX_Activities_ParkingId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "OutSideEntityTypeId",
                table: "OutSideEntity");

            migrationBuilder.DropColumn(
                name: "ParkingId",
                table: "Activities");

            migrationBuilder.RenameTable(
                name: "OutSideEntity",
                newName: "OutsideEntity");

            migrationBuilder.RenameIndex(
                name: "IX_OutSideEntity_TowerId",
                table: "OutsideEntity",
                newName: "IX_OutsideEntity_TowerId");

            migrationBuilder.RenameIndex(
                name: "IX_OutSideEntity_ProjectId",
                table: "OutsideEntity",
                newName: "IX_OutsideEntity_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_OutSideEntity_ParkingTypeId",
                table: "OutsideEntity",
                newName: "IX_OutsideEntity_ParkingTypeId");

            migrationBuilder.RenameColumn(
                name: "OutSideEntityId",
                table: "Activities",
                newName: "OutsideEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_OutSideEntityId",
                table: "Activities",
                newName: "IX_Activities_OutsideEntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OutsideEntity",
                table: "OutsideEntity",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_OutsideEntity_OutsideEntityId",
                table: "Activities",
                column: "OutsideEntityId",
                principalTable: "OutsideEntity",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutsideEntity_ParkingTypes_ParkingTypeId",
                table: "OutsideEntity",
                column: "ParkingTypeId",
                principalTable: "ParkingTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutsideEntity_Plans_TowerId",
                table: "OutsideEntity",
                column: "TowerId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutsideEntity_Projects_ProjectId",
                table: "OutsideEntity",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }
    }
}
