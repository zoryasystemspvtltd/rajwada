using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IlabAuthentication.Migrations
{
    /// <inheritdoc />
    public partial class privilege_type : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Privileges",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 2L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 3L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 4L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 5L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 6L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 7L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 8L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 9L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 10L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 11L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 12L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 13L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 14L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 15L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 16L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 17L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 18L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 19L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 20L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 21L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 22L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 23L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 24L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 25L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 26L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 27L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 28L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 29L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 30L,
                column: "Type",
                value: null);

            migrationBuilder.UpdateData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 31L,
                column: "Type",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Privileges");
        }
    }
}
