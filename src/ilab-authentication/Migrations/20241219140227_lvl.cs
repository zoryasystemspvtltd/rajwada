﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IlabAuthentication.Migrations
{
    /// <inheritdoc />
    public partial class lvl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Level",
                table: "Approvers",
                type: "bigint",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "Approvers");
        }
    }
}
