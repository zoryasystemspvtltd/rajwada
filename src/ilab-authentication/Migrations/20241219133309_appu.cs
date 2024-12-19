﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IlabAuthentication.Migrations
{
    /// <inheritdoc />
    public partial class appu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Approvers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Approvers");
        }
    }
}
