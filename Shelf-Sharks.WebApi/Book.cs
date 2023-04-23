using System;

namespace Shelf_Sharks.Models
{
    /// <summary>
    /// Represents a single book in the library catalog
    /// </summary>
    public class Book
    {   
        /// <summary>
        /// Constructor for adding a new book that isn't in the catalog.
        /// Without using the Google Books API
        /// </summary>
        /// <param name="author">The book's author</param>
        /// <param name="title">The book's title</param>
        /// <param name="description">A short description of the book</param>
        /// <param name="isbn">The book's ISBN</param>
        /// <param name="checkoutStatus">Has the book been checked out?</param>
        public Book(
            string author,
            string title,
            string description,
            Int64 isbn, // isbn's have 13 digits, which is more than Int32's max val
            bool checkoutStatus = false) {
                Author = author;
                Title = title;
                Description = description;
                ISBN = isbn;
                IsCheckedOut = checkoutStatus;
                UUID = Guid.NewGuid();
        }

        /// <summary>
        /// Constructor for adding a new book that isn't in the catalog. 
        /// Will search Google books API for a matching ISBN and populate
        /// </summary>
        /// <param name="isbn">the ISBN number of the book</param>
        public Book(Int64 isbn)
        {
            ISBN = isbn;
            UUID = Guid.NewGuid();
            IsCheckedOut = false;

            // fetch other data from google books service
            Google.Apis.Books.v1.Data.Volumes result =
                Catalog.BooksService.Volumes.List(isbn.ToString()).Execute();

            if (result != null && result.Items != null)
            {
                // get first book from list of results for ISBN
                Google.Apis.Books.v1.Data.Volume volume = result.Items.First();

                if (volume != null)
                {
                    // set book properties
                    // one or more of these might be null.
                    // If we're at this point in the code, we shouldn't be showing
                    // an error to the user, so we can just use a default value
                    Author = volume.VolumeInfo.Authors.First() ?? "Unknown Author";
                    Title = volume.VolumeInfo.Title ?? "Unknown Title";
                    Description = volume.VolumeInfo.Description ?? "Description not available.";
                    CoverURL = volume.VolumeInfo.ImageLinks.Thumbnail ?? "Unknown";
                }
            }
        }

        public void CheckOut()
        {
            if(IsCheckedOut == true) 
            {
                throw new System.Exception(string.Format("book with isbn {} is already checked out", ISBN));
            }
            IsCheckedOut = true;
            DateCheckedOut = DateTime.Now;
            DateReturnBy = DateTime.Now.AddDays(14);
        }  

        public string? Author { get; init;}
        public string? Title { get; init; }
        public string? Description { get; init; }
        public Int64 ISBN { get; init; }
        public bool IsCheckedOut { get; set; }
        public string? CoverURL { get; init; }
        public Guid UUID { get; init; }
        public DateTime DateAdded { get; init; } = DateTime.Now;
        public DateTime DateCheckedOut { get; set; }
        public DateTime DateReturnBy { get; set; }
        
    }

}