using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class con : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contractors",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PAN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GST = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LicenceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EffectiveStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EffectiveEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SPOC = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contractors", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3118));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3127));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3130));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3215));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3219));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(3223));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(2617));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(2874));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 19, 1, 290, DateTimeKind.Utc).AddTicks(2879));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contractors");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 16, 33, 860, DateTimeKind.Utc).AddTicks(3110));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 16, 33, 860, DateTimeKind.Utc).AddTicks(3116));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 16, 33, 860, DateTimeKind.Utc).AddTicks(3121));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 16, 33, 860, DateTimeKind.Utc).AddTicks(3205));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 16, 33, 860, DateTimeKind.Utc).AddTicks(3210));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 16, 33, 860, DateTimeKind.Utc).AddTicks(3214));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 16, 33, 860, DateTimeKind.Utc).AddTicks(2467));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 16, 33, 860, DateTimeKind.Utc).AddTicks(2955));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 12, 5, 6, 16, 33, 860, DateTimeKind.Utc).AddTicks(3012));
        }
    }
}
