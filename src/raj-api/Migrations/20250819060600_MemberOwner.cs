using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class MemberOwner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MemberOwner",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberOwner", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7760));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7763));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7765));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7860));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7862));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7864));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7441));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7712));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7716));

            migrationBuilder.InsertData(
                table: "MemberOwner",
                columns: new[] { "Id", "Date", "EntityId", "Key", "Member", "Name", "Status" },
                values: new object[,]
                {
                    { 1L, new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7803), 1L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Company", 0 },
                    { 2L, new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7805), 1L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Department", 0 },
                    { 3L, new DateTime(2025, 8, 19, 6, 5, 59, 728, DateTimeKind.Utc).AddTicks(7807), 2L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "super@rajwada.com", "Department", 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberOwner");

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
