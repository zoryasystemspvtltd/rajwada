using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class outsidemod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_OutSideEntity_OutSideEntityId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntity_OutSideEntityTypes_OutSideEntityTypeId",
                table: "OutSideEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntity_Plans_TowerId",
                table: "OutSideEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntity_Projects_ProjectId",
                table: "OutSideEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OutSideEntity",
                table: "OutSideEntity");

            migrationBuilder.RenameTable(
                name: "OutSideEntity",
                newName: "OutSideEntities");

            migrationBuilder.RenameIndex(
                name: "IX_OutSideEntity_TowerId",
                table: "OutSideEntities",
                newName: "IX_OutSideEntities_TowerId");

            migrationBuilder.RenameIndex(
                name: "IX_OutSideEntity_ProjectId",
                table: "OutSideEntities",
                newName: "IX_OutSideEntities_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_OutSideEntity_OutSideEntityTypeId",
                table: "OutSideEntities",
                newName: "IX_OutSideEntities_OutSideEntityTypeId");

            migrationBuilder.AddColumn<long>(
                name: "FloorId",
                table: "OutSideEntities",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OutSideEntities",
                table: "OutSideEntities",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5721));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5726));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5728));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5771));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5773));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5775));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5445));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5662));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 3, 1, 9, 54, 46, 396, DateTimeKind.Utc).AddTicks(5666));

            migrationBuilder.CreateIndex(
                name: "IX_OutSideEntities_FloorId",
                table: "OutSideEntities",
                column: "FloorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_OutSideEntities_OutSideEntityId",
                table: "Activities",
                column: "OutSideEntityId",
                principalTable: "OutSideEntities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntities_OutSideEntityTypes_OutSideEntityTypeId",
                table: "OutSideEntities",
                column: "OutSideEntityTypeId",
                principalTable: "OutSideEntityTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntities_Plans_FloorId",
                table: "OutSideEntities",
                column: "FloorId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntities_Plans_TowerId",
                table: "OutSideEntities",
                column: "TowerId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntities_Projects_ProjectId",
                table: "OutSideEntities",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_OutSideEntities_OutSideEntityId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntities_OutSideEntityTypes_OutSideEntityTypeId",
                table: "OutSideEntities");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntities_Plans_FloorId",
                table: "OutSideEntities");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntities_Plans_TowerId",
                table: "OutSideEntities");

            migrationBuilder.DropForeignKey(
                name: "FK_OutSideEntities_Projects_ProjectId",
                table: "OutSideEntities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OutSideEntities",
                table: "OutSideEntities");

            migrationBuilder.DropIndex(
                name: "IX_OutSideEntities_FloorId",
                table: "OutSideEntities");

            migrationBuilder.DropColumn(
                name: "FloorId",
                table: "OutSideEntities");

            migrationBuilder.RenameTable(
                name: "OutSideEntities",
                newName: "OutSideEntity");

            migrationBuilder.RenameIndex(
                name: "IX_OutSideEntities_TowerId",
                table: "OutSideEntity",
                newName: "IX_OutSideEntity_TowerId");

            migrationBuilder.RenameIndex(
                name: "IX_OutSideEntities_ProjectId",
                table: "OutSideEntity",
                newName: "IX_OutSideEntity_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_OutSideEntities_OutSideEntityTypeId",
                table: "OutSideEntity",
                newName: "IX_OutSideEntity_OutSideEntityTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OutSideEntity",
                table: "OutSideEntity",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3439));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3443));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3446));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3489));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3492));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3495));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3173));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3394));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2026, 2, 28, 3, 39, 37, 87, DateTimeKind.Utc).AddTicks(3397));

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_OutSideEntity_OutSideEntityId",
                table: "Activities",
                column: "OutSideEntityId",
                principalTable: "OutSideEntity",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntity_OutSideEntityTypes_OutSideEntityTypeId",
                table: "OutSideEntity",
                column: "OutSideEntityTypeId",
                principalTable: "OutSideEntityTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntity_Plans_TowerId",
                table: "OutSideEntity",
                column: "TowerId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OutSideEntity_Projects_ProjectId",
                table: "OutSideEntity",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }
    }
}
