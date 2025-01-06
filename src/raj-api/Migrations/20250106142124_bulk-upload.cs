using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class bulkupload : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UnitOfWorkId",
                table: "Plans",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BulkDataUploads",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataModel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RawData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BulkDataUploads", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UnitOfWorks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MarkerJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlanId = table.Column<long>(type: "bigint", nullable: true),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnitOfWorks_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UnitOfWorks_UnitOfWorks_ParentId",
                        column: x => x.ParentId,
                        principalTable: "UnitOfWorks",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 14, 21, 22, 692, DateTimeKind.Utc).AddTicks(2609));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 14, 21, 22, 692, DateTimeKind.Utc).AddTicks(2612));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 14, 21, 22, 692, DateTimeKind.Utc).AddTicks(2615));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 14, 21, 22, 692, DateTimeKind.Utc).AddTicks(2656));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 14, 21, 22, 692, DateTimeKind.Utc).AddTicks(2659));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 14, 21, 22, 692, DateTimeKind.Utc).AddTicks(2661));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 14, 21, 22, 692, DateTimeKind.Utc).AddTicks(2264));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 14, 21, 22, 692, DateTimeKind.Utc).AddTicks(2544));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 14, 21, 22, 692, DateTimeKind.Utc).AddTicks(2548));

            migrationBuilder.CreateIndex(
                name: "IX_Plans_UnitOfWorkId",
                table: "Plans",
                column: "UnitOfWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfWorks_ParentId",
                table: "UnitOfWorks",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfWorks_PlanId",
                table: "UnitOfWorks",
                column: "PlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_UnitOfWorks_UnitOfWorkId",
                table: "Plans",
                column: "UnitOfWorkId",
                principalTable: "UnitOfWorks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plans_UnitOfWorks_UnitOfWorkId",
                table: "Plans");

            migrationBuilder.DropTable(
                name: "BulkDataUploads");

            migrationBuilder.DropTable(
                name: "UnitOfWorks");

            migrationBuilder.DropIndex(
                name: "IX_Plans_UnitOfWorkId",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "UnitOfWorkId",
                table: "Plans");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5053));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5056));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5058));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5098));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5100));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(5102));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(4747));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(4991));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 1, 6, 5, 6, 52, 742, DateTimeKind.Utc).AddTicks(4995));
        }
    }
}
