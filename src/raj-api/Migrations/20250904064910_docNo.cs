using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class docNo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProjectDocNoTrackings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false),
                    LastDocumentNo = table.Column<int>(type: "int", nullable: false),
                    LastDocumentNoGenerated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDocNoTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectDocNoTrackings_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDocNoTrackings_ProjectId",
                table: "ProjectDocNoTrackings",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectDocNoTrackings");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5009));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5012));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5015));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5048));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5050));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(5052));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(4776));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(4973));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 4, 5, 22, 22, 555, DateTimeKind.Utc).AddTicks(4976));
        }
    }
}
