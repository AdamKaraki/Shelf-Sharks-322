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
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>(entity => {
                entity.ToTable<Book>("Books");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ISBN).IsRequired();
                entity.Property(e => e.IsCheckedOut).IsRequired();
            });


        }
        

        
    }
}