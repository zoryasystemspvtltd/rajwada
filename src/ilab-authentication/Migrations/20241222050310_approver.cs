using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IlabAuthentication.Migrations
{
    /// <inheritdoc />
    public partial class approver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Approvers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Module = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Level = table.Column<long>(type: "bigint", nullable: true),
                    UserId = table.Column<long>(type: "bigint", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approvers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Approvers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Privileges",
                columns: new[] { "Id", "Key", "Member", "Module", "Name", "RoleId" },
                values: new object[,]
                {
                    { 32L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "add", 1L },
                    { 33L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "edit", 1L },
                    { 34L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "delete", 1L },
                    { 35L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "view", 1L },
                    { 36L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "list", 1L },
                    { 37L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "add", 2L },
                    { 38L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "edit", 2L },
                    { 39L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "delete", 2L },
                    { 40L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "view", 2L },
                    { 41L, "1536B022-C5C9-4358-BB6A-466F2075B7D4", "root", "approver", "list", 2L }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Approvers_UserId",
                table: "Approvers",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Approvers");

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 32L);

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 33L);

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 34L);

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 35L);

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 36L);

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 37L);

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 38L);

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 39L);

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 40L);

            migrationBuilder.DeleteData(
                table: "Privileges",
                keyColumn: "Id",
                keyValue: 41L);
        }
    }
}
