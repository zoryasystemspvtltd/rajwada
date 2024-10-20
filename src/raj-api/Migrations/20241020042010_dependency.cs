using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class dependency : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Workflows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Dependencies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dependencies", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 20, 4, 20, 6, 600, DateTimeKind.Utc).AddTicks(4025));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 20, 4, 20, 6, 600, DateTimeKind.Utc).AddTicks(4028));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 20, 4, 20, 6, 600, DateTimeKind.Utc).AddTicks(4031));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 20, 4, 20, 6, 600, DateTimeKind.Utc).AddTicks(4075));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 20, 4, 20, 6, 600, DateTimeKind.Utc).AddTicks(4080));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 20, 4, 20, 6, 600, DateTimeKind.Utc).AddTicks(4083));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 20, 4, 20, 6, 600, DateTimeKind.Utc).AddTicks(3572));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 20, 4, 20, 6, 600, DateTimeKind.Utc).AddTicks(3938));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 20, 4, 20, 6, 600, DateTimeKind.Utc).AddTicks(3941));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dependencies");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Workflows");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 15, 5, 53, 6, 490, DateTimeKind.Utc).AddTicks(1239));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 15, 5, 53, 6, 490, DateTimeKind.Utc).AddTicks(1245));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 15, 5, 53, 6, 490, DateTimeKind.Utc).AddTicks(1251));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 15, 5, 53, 6, 490, DateTimeKind.Utc).AddTicks(1327));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 15, 5, 53, 6, 490, DateTimeKind.Utc).AddTicks(1333));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 15, 5, 53, 6, 490, DateTimeKind.Utc).AddTicks(1338));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 15, 5, 53, 6, 490, DateTimeKind.Utc).AddTicks(605));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 15, 5, 53, 6, 490, DateTimeKind.Utc).AddTicks(1152));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 15, 5, 53, 6, 490, DateTimeKind.Utc).AddTicks(1160));
        }
    }
}
