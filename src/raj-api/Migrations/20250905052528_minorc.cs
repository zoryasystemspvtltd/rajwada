using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class minorc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkAmendment");

            migrationBuilder.CreateTable(
                name: "ActivityAmendment",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RejectedByQC = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    QCRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmendmentReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OldValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmendmentStatus = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    ReviewedBy = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ActivityId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityAmendment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityAmendment_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5886));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5890));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5892));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5924));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5926));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5930));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5586));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5838));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 25, 25, 378, DateTimeKind.Utc).AddTicks(5842));

            migrationBuilder.CreateIndex(
                name: "IX_ActivityAmendment_ActivityId",
                table: "ActivityAmendment",
                column: "ActivityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityAmendment");

            migrationBuilder.CreateTable(
                name: "WorkAmendment",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AmendmentReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmendmentStatus = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    NewValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OldValues = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QCRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RejectedByQC = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    ReviewedBy = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    WorkId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkAmendment", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 16, 45, 23, DateTimeKind.Utc).AddTicks(4788));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 16, 45, 23, DateTimeKind.Utc).AddTicks(4792));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 16, 45, 23, DateTimeKind.Utc).AddTicks(4795));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 16, 45, 23, DateTimeKind.Utc).AddTicks(4834));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 16, 45, 23, DateTimeKind.Utc).AddTicks(4836));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 16, 45, 23, DateTimeKind.Utc).AddTicks(4838));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 16, 45, 23, DateTimeKind.Utc).AddTicks(4515));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 16, 45, 23, DateTimeKind.Utc).AddTicks(4699));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2025, 9, 5, 5, 16, 45, 23, DateTimeKind.Utc).AddTicks(4703));
        }
    }
}
