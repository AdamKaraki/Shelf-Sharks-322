using System.Collections.Generic;
using Google.Apis.Books.v1;
using Google.Apis.Services;

namespace Shelf_Sharks.Models
{
    public class Catalog
    {
        /// <summary>
        /// Default constructor
        /// </summary>
        public Catalog() {
            Books = new Dictionary<Int64, Book>();

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
            return Books.Values.ToArray();
        }

        /// <summary>
        /// Checks out a book in the catalog
        /// </summary>
        /// <exception cref="System.Exception">Throws when a book isn't found or is already checked out</exception>
        public void CheckOutBook(Int64 isbn)
        {
            if(!Books.ContainsKey(isbn)) 
            {
                throw new System.Exception(string.Format("Could not find book with isbn {}", isbn));
            } 
            Books[isbn].CheckOut();
        }

        /// <summary>
        /// Returns a book in the catalog
        /// </summary>
        /// <param name="isbn">The ISBN of the book to return</param>
        /// <exception cref="System.Exception">Throws when a book isn't found or is not checked out</exception>
        public void ReturnBook(Int64 isbn)
        {
            if(!Books.ContainsKey(isbn)) 
            {
                throw new System.Exception(string.Format("Could not find book with isbn {}", isbn));
            } 
            else if(!Books[isbn].IsCheckedOut)
            {
                throw new System.Exception(string.Format("book with isbn {} is not checked out", isbn));
            }
            Books[isbn].IsCheckedOut = false;
        }

        /// <summary>
        /// Adds a new book to the catalog
        /// </summary>
        /// <param name="isbn">The ISBN of the book to add</param>
        public void AddBook(Int64 isbn)
        {
            // add a book using the isbn only constructor
            // this will trigger a Google Books API call
            Books.Add(isbn, new Book(isbn));
        }

        /// <summary>
        /// Removes a book from the catalog
        /// </summary>
        /// <param name="isbn">The ISBN of the book to remove</param>
        /// <exception cref="System.Exception"></exception>
        public void RemoveBook(Int64 isbn)
        {
            if(!Books.ContainsKey(isbn)) 
            {
                throw new System.Exception(string.Format("Could not find book with isbn {}", isbn));
            }
            else if(Books[isbn].IsCheckedOut)
            {
                throw new System.Exception(string.Format("Cannot remove book with isbn {} - already checked out", isbn));
            }
            Books.Remove(isbn);
        }

        /// <summary>
        /// The dictionary containing all books in the catalog
        /// </summary>
        private static Dictionary<Int64, Book> Books { get; set; }

        /// <summary>
        /// The Google Books API service
        /// </summary>
        public static Google.Apis.Books.v1.BooksService BooksService { get; set; }
    }
}