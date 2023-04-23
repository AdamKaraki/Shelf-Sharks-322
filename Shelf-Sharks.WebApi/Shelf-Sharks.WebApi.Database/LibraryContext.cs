using Microsoft.EntityFrameworkCore;
using Shelf_Sharks.Models;

namespace Shelf_Sharks.WebApi.Database
{
    public class LibraryContext : DbContext
    {
        
        public DbSet<Book> Books { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=library.db");
        }

        
    }
}