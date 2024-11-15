using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class le : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Mouzas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gl_No = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mouzas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RsDaags",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RsDaagNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RsKhatian = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LrNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LrKhatian = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RsParcha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcernArea = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MouzaId = table.Column<long>(type: "bigint", nullable: true),
                    MouzaName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RsDaags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RsDaags_Mouzas_MouzaId",
                        column: x => x.MouzaId,
                        principalTable: "Mouzas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NameMasters",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LLName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FatherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsFatherAlive = table.Column<bool>(type: "bit", nullable: true),
                    FatherCertificate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MotherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsMotherAlive = table.Column<bool>(type: "bit", nullable: true),
                    MotherCertificate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrandFatherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsGrandFatherAlive = table.Column<bool>(type: "bit", nullable: true),
                    GrandFatherCertificate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrandMotherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsGrandMotherAlive = table.Column<bool>(type: "bit", nullable: true),
                    GrandMotherCertificate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LrNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MouzaId = table.Column<long>(type: "bigint", nullable: true),
                    MouzaName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RsDaagId = table.Column<long>(type: "bigint", nullable: true),
                    RsDaagNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(511)", maxLength: 511, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NameMasters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NameMasters_Mouzas_MouzaId",
                        column: x => x.MouzaId,
                        principalTable: "Mouzas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NameMasters_RsDaags_RsDaagId",
                        column: x => x.RsDaagId,
                        principalTable: "RsDaags",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3940));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3946));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3951));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(4004));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(4007));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(4010));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3622));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3885));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 11, 14, 5, 45, 30, 763, DateTimeKind.Utc).AddTicks(3890));

            migrationBuilder.CreateIndex(
                name: "IX_NameMasters_MouzaId",
                table: "NameMasters",
                column: "MouzaId");

            migrationBuilder.CreateIndex(
                name: "IX_NameMasters_RsDaagId",
                table: "NameMasters",
                column: "RsDaagId");

            migrationBuilder.CreateIndex(
                name: "IX_RsDaags_MouzaId",
                table: "RsDaags",
                column: "MouzaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NameMasters");

            migrationBuilder.DropTable(
                name: "RsDaags");

            migrationBuilder.DropTable(
                name: "Mouzas");

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
    }
}
