using System.Collections.Generic;
using Google.Apis.Books.v1;
using Google.Apis.Services;
using Shelf_Sharks.WebApi.Database;

namespace Shelf_Sharks.Models
{
    public class Catalog
    {
        /// <summary>
        /// Default constructor
        /// </summary>
        public Catalog() {
            //Books = new Dictionary<Int64, Book>();
            var context = new LibraryContext();
            _libraryAccessor = new LibraryAccessor(context);

            // initialize google books service
            // with API key
            BooksService = new BooksService(
            new BaseClientService.Initializer
            {
                    ApplicationName = "ShelfSharks",
                    ApiKey = System.Environment.GetEnvironmentVariable("GOOGLE_BOOKS_API_KEY"),
            });
        }

        /// <summary>
        /// Gets all books in the catalog
        /// </summary>
        /// <returns>Returns an array of book objects</returns>
        public Book[] GetBooks()
        { 
            return _libraryAccessor.GetBooks().ToArray();
        }

        /// <summary>
        /// Checks out a book in the catalog
        /// </summary>
        /// <exception cref="System.Exception">Throws when a book isn't found or is already checked out</exception>
        public void CheckOutBook(Int64 isbn)
        {
            var bookToCheckout = _libraryAccessor.GetBookByISBN(isbn);
            if(bookToCheckout is null)
            {
                throw new System.Exception("Book could not be found");
            } else if(bookToCheckout.IsCheckedOut is true)
            {
                throw new System.Exception("Book is already checked out");
            }
            _libraryAccessor.CheckOutBook(bookToCheckout);
        }

        /// <summary>
        /// Returns a book in the catalog
        /// </summary>
        /// <param name="isbn">The ISBN of the book to return</param>
        /// <exception cref="System.Exception">Throws when a book isn't found or is not checked out</exception>
        public void ReturnBook(Int64 isbn)
        {
            var bookToCheckout = _libraryAccessor.GetBookByISBN(isbn);
            if(bookToCheckout is null)
            {
                throw new System.Exception("Book could not be found");
            } else if(bookToCheckout.IsCheckedOut is false)
            {
                throw new System.Exception("Book is not checked out");
            }
            _libraryAccessor.ReturnBook(bookToCheckout);
        }

        /// <summary>
        /// Adds a new book to the catalog
        /// </summary>
        /// <param name="isbn">The ISBN of the book to add</param>
        public void AddBook(Int64 isbn)
        {
            // add a book using the isbn only constructor
            // this will trigger a Google Books API call
            _libraryAccessor.AddBook(new Book(isbn));
        }

        /// <summary>
        /// Removes a book from the catalog
        /// </summary>
        /// <param name="isbn">The ISBN of the book to remove</param>
        /// <exception cref="System.Exception"></exception>
        public void RemoveBook(Int64 isbn)
        {
            _libraryAccessor.RemoveBook(isbn);
        }

        /// <summary>
        /// The dictionary containing all books in the catalog
        /// </summary>
        // private static Dictionary<Int64, Book> Books { get; set; }

        /// <summary>
        /// The Google Books API service
        /// </summary>
        public static Google.Apis.Books.v1.BooksService BooksService { get; set; }
        private readonly LibraryAccessor _libraryAccessor;
    }
}