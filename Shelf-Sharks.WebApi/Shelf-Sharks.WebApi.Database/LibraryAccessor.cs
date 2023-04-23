using System.Linq;
using Shelf_Sharks.Models;

namespace Shelf_Sharks.WebApi.Database
{
    public class LibraryAccessor
    {
        private readonly LibraryContext _context;
        public LibraryAccessor(LibraryContext context)
        {
            _context = context;
        }
        
        public List<Book> GetBooks()
        {
            return _context.Books.ToList();
        }
        
        public Book GetBookByISBN(Int64 isbn)
        {
            return _context.Books.Where(book => book.ISBN == isbn).FirstOrDefault();
        }
        
        public void AddBook(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
        }
    }
}