using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class flate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlatTypes");
            migrationBuilder.DropColumn(
                name: "FlatTypeId",
                table: "FlatTemplates");

            migrationBuilder.DropColumn(
                name: "NoBalcony",
                table: "FlatTemplates");

            migrationBuilder.DropColumn(
                name: "NoBathRooms",
                table: "FlatTemplates");

            migrationBuilder.DropColumn(
                name: "NoBedRooms",
                table: "FlatTemplates");

            migrationBuilder.DropColumn(
                name: "NoKitchens",
                table: "FlatTemplates");

            migrationBuilder.DropColumn(
                name: "NoLivingRooms",
                table: "FlatTemplates");

            migrationBuilder.DropColumn(
                name: "NoOthers",
                table: "FlatTemplates");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "FlatTemplates",
                newName: "Description");

            migrationBuilder.AddColumn<long>(
                name: "FlatTemplateId",
                table: "Plans",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FlatTemplateDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlatTemplateId = table.Column<long>(type: "bigint", nullable: false),
                    RoomId = table.Column<long>(type: "bigint", nullable: true),
                    RoomCount = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlatTemplateDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlatTemplateDetails_FlatTemplates_FlatTemplateId",
                        column: x => x.FlatTemplateId,
                        principalTable: "FlatTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlatTemplateDetails_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 22, 9, 50, 37, 120, DateTimeKind.Utc).AddTicks(6348));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 22, 9, 50, 37, 120, DateTimeKind.Utc).AddTicks(6351));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 22, 9, 50, 37, 120, DateTimeKind.Utc).AddTicks(6354));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 22, 9, 50, 37, 120, DateTimeKind.Utc).AddTicks(6386));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 22, 9, 50, 37, 120, DateTimeKind.Utc).AddTicks(6388));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 22, 9, 50, 37, 120, DateTimeKind.Utc).AddTicks(6390));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 22, 9, 50, 37, 120, DateTimeKind.Utc).AddTicks(6147));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 22, 9, 50, 37, 120, DateTimeKind.Utc).AddTicks(6318));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 22, 9, 50, 37, 120, DateTimeKind.Utc).AddTicks(6322));

            migrationBuilder.CreateIndex(
                name: "IX_Plans_FlatTemplateId",
                table: "Plans",
                column: "FlatTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_FlatTemplateDetails_FlatTemplateId",
                table: "FlatTemplateDetails",
                column: "FlatTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_FlatTemplateDetails_RoomId",
                table: "FlatTemplateDetails",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_FlatTemplateDetails_FlatTemplateId",
                table: "Plans",
                column: "FlatTemplateId",
                principalTable: "FlatTemplateDetails",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plans_FlatTemplateDetails_FlatTemplateId",
                table: "Plans");

            migrationBuilder.DropTable(
                name: "FlatTemplateDetails");

            migrationBuilder.DropIndex(
                name: "IX_Plans_FlatTemplateId",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "FlatTemplateId",
                table: "Plans");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "FlatTemplates",
                newName: "Code");

            migrationBuilder.AddColumn<long>(
                name: "FlatTypeId",
                table: "FlatTemplates",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NoBalcony",
                table: "FlatTemplates",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NoBathRooms",
                table: "FlatTemplates",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NoBedRooms",
                table: "FlatTemplates",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NoKitchens",
                table: "FlatTemplates",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NoLivingRooms",
                table: "FlatTemplates",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NoOthers",
                table: "FlatTemplates",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FlatTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlatTypes", x => x.Id);
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

            migrationBuilder.AddForeignKey(
                name: "FK_FlatTemplates_FlatTypes_FlatTypeId",
                table: "FlatTemplates",
                column: "FlatTypeId",
                principalTable: "FlatTypes",
                principalColumn: "Id");
        }
    }
}
