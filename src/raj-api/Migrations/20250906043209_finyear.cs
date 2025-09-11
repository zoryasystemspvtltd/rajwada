using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class finyear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ParentId",
                table: "ActivityAmendment",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FinancialYears",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FinYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialYears", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9010));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9013));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9062));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9106));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9109));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(9111));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(8775));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(8965));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 6, 4, 32, 6, 887, DateTimeKind.Utc).AddTicks(8968));

            migrationBuilder.CreateIndex(
                name: "IX_ActivityAmendment_ParentId",
                table: "ActivityAmendment",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAmendment_ActivityAmendment_ParentId",
                table: "ActivityAmendment",
                column: "ParentId",
                principalTable: "ActivityAmendment",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAmendment_ActivityAmendment_ParentId",
                table: "ActivityAmendment");

            migrationBuilder.DropTable(
                name: "FinancialYears");

            migrationBuilder.DropIndex(
                name: "IX_ActivityAmendment_ParentId",
                table: "ActivityAmendment");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "ActivityAmendment");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5174));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5178));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5181));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5217));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5219));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5222));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(4893));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5118));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 6, 49, 37, 478, DateTimeKind.Utc).AddTicks(5121));
        }
    }
}
