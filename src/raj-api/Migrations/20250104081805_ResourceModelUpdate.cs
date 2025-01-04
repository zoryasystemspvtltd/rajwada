using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class ResourceModelUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Resources",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RoomId = table.Column<long>(type: "bigint", nullable: true),
                    AssetId = table.Column<long>(type: "bigint", nullable: true),
                    PlanId = table.Column<long>(type: "bigint", nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Resources_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Resources_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Resources_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Resources_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 18, 5, 344, DateTimeKind.Utc).AddTicks(1465));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 18, 5, 344, DateTimeKind.Utc).AddTicks(1469));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 18, 5, 344, DateTimeKind.Utc).AddTicks(1471));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 18, 5, 344, DateTimeKind.Utc).AddTicks(1506));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 18, 5, 344, DateTimeKind.Utc).AddTicks(1508));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 18, 5, 344, DateTimeKind.Utc).AddTicks(1510));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 18, 5, 344, DateTimeKind.Utc).AddTicks(1251));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 18, 5, 344, DateTimeKind.Utc).AddTicks(1425));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 18, 5, 344, DateTimeKind.Utc).AddTicks(1427));

            migrationBuilder.CreateIndex(
                name: "IX_Resources_ActivityId",
                table: "Resources",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_AssetId",
                table: "Resources",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_PlanId",
                table: "Resources",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_RoomId",
                table: "Resources",
                column: "RoomId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Resources");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9218));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9222));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9224));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9288));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9290));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9292));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9056));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9184));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 4, 8, 4, 24, 24, DateTimeKind.Utc).AddTicks(9186));
        }
    }
}
