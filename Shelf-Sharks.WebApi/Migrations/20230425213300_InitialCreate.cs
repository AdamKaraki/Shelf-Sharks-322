using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shelf_Sharks.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Author = table.Column<string>(type: "TEXT", nullable: true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    ISBN = table.Column<long>(type: "INTEGER", nullable: false),
                    IsCheckedOut = table.Column<bool>(type: "INTEGER", nullable: false),
                    CoverURL = table.Column<string>(type: "TEXT", nullable: true),
                    UUID = table.Column<Guid>(type: "TEXT", nullable: false),
                    GoogleBooksId = table.Column<string>(type: "TEXT", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateCheckedOut = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateReturnBy = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");
        }
    }
}
