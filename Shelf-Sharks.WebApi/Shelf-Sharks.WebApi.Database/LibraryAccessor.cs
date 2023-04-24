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

        public void RemoveBook(Int64 isbn)
        {
            var bookToRemove = GetBookByISBN(isbn);
            _context.Remove(bookToRemove);
            _context.SaveChanges();
        }

        public void CheckOutBook(Book bookToCheckout)
        {
            bookToCheckout.IsCheckedOut = true;
            bookToCheckout.DateCheckedOut = DateTime.Now;
            bookToCheckout.DateReturnBy = DateTime.Now.AddDays(14);
            _context.SaveChanges();
        }

        public void ReturnBook(Book bookToReturn)
        {
            bookToReturn.IsCheckedOut = false;
            bookToReturn.DateCheckedOut = DateTime.UnixEpoch;
            bookToReturn.DateReturnBy = DateTime.UnixEpoch;
            _context.SaveChanges();
        }
    }
}