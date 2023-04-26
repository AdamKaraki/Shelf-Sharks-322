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

        public int GetNumBooks()
        {
            return _context.Books.Count();
        }

        public Book GetBookByISBN(Int64 isbn)
        {
            return _context.Books.Where(book => book.ISBN == isbn).FirstOrDefault();
        }

        public Book GetBookByUUID(Guid uuid)
        {
            return _context.Books.Where(book => book.UUID == uuid).FirstOrDefault();
        }

        public Book GetBookByGoogleBooksId(string googleBooksId)
        {
            return _context.Books.Where(book => book.GoogleBooksId == googleBooksId).FirstOrDefault();
        }

        public List<Book> SearchBooks(string searchTerm)
        {
            // search by title, author or isbn
            return _context.Books.Where(book =>
                book.Title.ToLower().Contains(searchTerm.ToLower()) ||
                book.Author.ToLower().Contains(searchTerm.ToLower()) ||
                book.ISBN.ToString().Contains(searchTerm)).ToList();
        }

        public int GetNumCheckedOut()
        {
            return _context.Books.Where(book => book.IsCheckedOut).Count();
        }

        public Book[] GetRecentlyCheckedOut()
        {
            return _context.Books.Where(book => book.DateCheckedOut != DateTime.UnixEpoch && book.IsCheckedOut == true).OrderBy(book => book.DateCheckedOut).Take(5).ToArray();
        }

        public Book[] GetRecentlyAdded()
        {
            return _context.Books.OrderByDescending(book => book.DateAdded).Take(5).ToArray();
        }

        public void AddBook(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
        }

        public void RemoveBook(Guid uuid)
        {
            var bookToRemove = GetBookByUUID(uuid);
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