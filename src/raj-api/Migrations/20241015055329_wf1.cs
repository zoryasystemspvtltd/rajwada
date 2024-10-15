using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RajApi.Migrations
{
    /// <inheritdoc />
    public partial class wf1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Plans_PlanId",
                table: "Workflows");

            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Projects_ProjectId",
                table: "Workflows");

            migrationBuilder.DropForeignKey(
                name: "FK_Workflows_Workflows_ParentId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_ParentId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_PlanId",
                table: "Workflows");

            migrationBuilder.DropIndex(
                name: "IX_Workflows_ProjectId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "ApprovalStatus",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "BudgetAllocationAmount",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "BudgetAmount",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "CompletionCertificateDate",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "ParentName",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "PlanId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "TotalCost",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "WorkflowEndDate",
                table: "Workflows");

            migrationBuilder.DropColumn(
                name: "WorkflowStartDate",
                table: "Workflows");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Workflows",
                newName: "Data");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Workflows",
                newName: "Type");

            migrationBuilder.AddColumn<int>(
                name: "ApprovalStatus",
                table: "Workflows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "BudgetAllocationAmount",
                table: "Workflows",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "BudgetAmount",
                table: "Workflows",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletionCertificateDate",
                table: "Workflows",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "Workflows",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Workflows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Workflows",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ParentId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ParentName",
                table: "Workflows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PlanId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ProjectId",
                table: "Workflows",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Workflows",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "Workflows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalCost",
                table: "Workflows",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "WorkflowEndDate",
                table: "Workflows",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "WorkflowStartDate",
                table: "Workflows",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1407));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1414));

            migrationBuilder.UpdateData(
                table: "ApplicationLogs",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1420));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1492));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1498));

            migrationBuilder.UpdateData(
                table: "AssetTypes",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1503));

            migrationBuilder.UpdateData(
                table: "Companys",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(771));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1262));

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Date",
                value: new DateTime(2024, 10, 11, 11, 0, 36, 388, DateTimeKind.Utc).AddTicks(1270));

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_ParentId",
                table: "Workflows",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_PlanId",
                table: "Workflows",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Workflows_ProjectId",
                table: "Workflows",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_Plans_PlanId",
                table: "Workflows",
                column: "PlanId",
                principalTable: "Plans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_Projects_ProjectId",
                table: "Workflows",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workflows_Workflows_ParentId",
                table: "Workflows",
                column: "ParentId",
                principalTable: "Workflows",
                principalColumn: "Id");
        }
    }
}
