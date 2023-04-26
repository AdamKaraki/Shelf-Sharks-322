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
        public Catalog()
        {
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
        /// Gets a book by UUID
        /// </summary>
        /// <param name="uuid"></param>
        /// <returns></returns>
        public Book GetBook(Guid uuid)
        {
            // make sure the book exists
            if (_libraryAccessor.GetBookByUUID(uuid) == null)
            {
                throw new KeyNotFoundException("Book not found");
            }

            return _libraryAccessor.GetBookByUUID(uuid);
        }

        /// <summary>
        /// Gets the total number of books in the catalog
        /// </summary>
        /// <returns></returns>
        public int GetNumBooks()
        {
            return _libraryAccessor.GetNumBooks();
        }

        /// <summary>
        /// Gets the number of books checked out
        /// </summary>
        /// <returns></returns>
        public Book[] GetRecentlyCheckedOut()
        {
            return _libraryAccessor.GetRecentlyCheckedOut();
        }

        public Book[] GetRecentlyAdded()
        {
            return _libraryAccessor.GetRecentlyAdded();
        }

        /// <summary>
        /// Searches the catalog for a book or books
        /// </summary>
        /// <param name="searchTerm"></param>
        /// <param name="isCatalogSearch"></param>
        /// <returns></returns>
        public Book[] SearchBooks(string searchTerm, bool isCatalogSearch)
        {
            List<Book> results = new List<Book>();
            if (isCatalogSearch == true)
            {
                results = _libraryAccessor.SearchBooks(searchTerm).ToList<Book>();
            }
            // if nothing was found in the catalog
            // search google books
            if (results.Count == 0 && isCatalogSearch == false)
            {
                var google_results = BooksService.Volumes.List(searchTerm).Execute();
                foreach (var item in google_results.Items)
                {
                    // make sure it's not in the catalog
                    if (_libraryAccessor.GetBookByGoogleBooksId(item.Id) != null)
                    {
                        continue;
                    }

                    // find ISBN_13
                    Int64 isbn = 0;
                    foreach (var id in item.VolumeInfo.IndustryIdentifiers)
                    {
                        if (id.Type == "ISBN_13")
                        {
                            isbn = Int64.Parse(id.Identifier);
                        }
                    }
                    // check if the book is already in the catalog
                    // if it is, create the book object from the catalog
                    // otherwise, create a new book object from the google books api
                    var book = _libraryAccessor.GetBookByISBN(isbn);
                    if (book is null)
                    {
                        book = new Book(item);
                        book.InCatalog = false;
                        results.Add(book);
                    }
                    else
                    {
                        // add to front of list
                        results.Insert(0, book);
                    }

                }
            }
            return results.ToArray();
        }

        /// <summary>
        /// Gets the number of books checked out
        /// </summary>
        /// <returns></returns>
        public int GetNumCheckedOut()
        {
            return _libraryAccessor.GetNumCheckedOut();
        }

        /// <summary>
        /// Checks out a book in the catalog
        /// </summary>
        /// <exception cref="System.Exception">Throws when a book isn't found or is already checked out</exception>
        public Book CheckOutBook(Guid uuid)
        {
            var bookToCheckout = _libraryAccessor.GetBookByUUID(uuid);
            if (bookToCheckout is null)
            {
                throw new System.Exception("Book could not be found");
            }
            else if (bookToCheckout.IsCheckedOut is true)
            {
                throw new System.Exception("Book is already checked out");
            }
            _libraryAccessor.CheckOutBook(bookToCheckout);
            return bookToCheckout;
        }

        /// <summary>
        /// Returns a book in the catalog
        /// </summary>
        /// <param name="uuid">The UUID of the book to return</param>
        /// <exception cref="System.Exception">Throws when a book isn't found or is not checked out</exception>
        public Book ReturnBook(Guid uuid)
        {
            var bookToCheckout = _libraryAccessor.GetBookByUUID(uuid);
            if (bookToCheckout is null)
            {
                throw new System.Exception("Book could not be found");
            }
            else if (bookToCheckout.IsCheckedOut is false)
            {
                throw new System.Exception("Book is not checked out");
            }
            _libraryAccessor.ReturnBook(bookToCheckout);
            return bookToCheckout;
        }

        /// <summary>
        /// Adds a book to the catalog
        /// </summary>
        /// <param name="googleBooksId"></param>
        public void AddBook(string googleBooksId)
        {
            // make sure the book isn't already in the catalog
            if (_libraryAccessor.GetBookByGoogleBooksId(googleBooksId) != null)
            {
                throw new System.Exception("Book is already in the catalog");
            }
            // add a book using the google books id only constructor
            // this will trigger a Google Books API call
            _libraryAccessor.AddBook(new Book(googleBooksId));
        }

        /// <summary>
        /// Removes a book from the catalog
        /// </summary>
        /// <param name="uuid">The UUID of the book to remove</param>
        /// <exception cref="System.Exception"></exception>
        public void RemoveBook(Guid uuid)
        {
            // make sure the book is in the catalog
            if (_libraryAccessor.GetBookByUUID(uuid) is null)
            {
                throw new System.Exception("Book is not in the catalog");
            }
            _libraryAccessor.RemoveBook(uuid);
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